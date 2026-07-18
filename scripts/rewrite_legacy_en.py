# -*- coding: utf-8 -*-
"""Rewrite legacy products (id <= 74) with professional English copy.

For each legacy product:
  - parse type (category) + tonnage from its name
  - build an English spec table from 液压机参数推断表_v2.xlsx (nearest tonnage per type)
  - write a 2-3 sentence application-focused English description
  - replace description_en and specs in products.json (ids/slugs/images untouched)

Run: python scripts/rewrite_legacy_en.py
Then sync the DB with: node --env-file=.env --require ./scripts/patch-next-env.cjs --import tsx scripts/rewrite_legacy_en_sync.mts
"""
import io, json, re
import openpyxl

ROOT = r"C:\Users\zz490\Documents\kimi\workspace\lead-website"
XLSX = r"C:\Users\zz490\Documents\kimi\workspace\液压机参数推断表_v2.xlsx"

# ---------- load spec table ----------
wb = openpyxl.load_workbook(XLSX)
ws = wb.active
rows = []
for r in ws.iter_rows(min_row=2, values_only=True):
    if r[1]:
        rows.append({
            "model": str(r[0]), "type": str(r[1]), "ton": float(r[2]),
            "stroke": r[3], "opening": r[4], "table": r[5], "kw": r[6], "weight": r[7],
        })

def spec_rows_for(category_en: str):
    if category_en == "H Frame Hydraulic Press":
        return [r for r in rows if r["type"] == "H型液压机"]
    if category_en == "Four Column Hydraulic Press":
        return [r for r in rows if r["type"].startswith("四柱液压机")]
    if "Door" in category_en:
        return [r for r in rows if "门板压花机" in r["type"]]
    return []

def nearest_spec(category_en: str, tonnage: float):
    cand = spec_rows_for(category_en)
    if not cand:
        return None
    return min(cand, key=lambda r: abs(r["ton"] - tonnage))

# ---------- copy helpers ----------
APPLICATION_MAP = [
    (r"deep drawing", "deep drawing of sheet metal parts"),
    (r"door panel embossing|door embossing", "steel door skin embossing"),
    (r"smc|bmc|frp|fiberglass|composite|gmt", "SMC/BMC composite and FRP molding"),
    (r"graphite crucible", "graphite crucible molding"),
    (r"manhole cover|trench cover|cable trench", "composite manhole cover and cable trench molding"),
    (r"cold extrusion", "cold extrusion of metal parts"),
    (r"tea cake", "tea cake and brick compacting"),
    (r"powder metallurgy|powder compacting", "powder metallurgy compacting"),
    (r"ceramic", "ceramic and refractory molding"),
    (r"decorative panel|wall panel", "decorative wall panel molding"),
    (r"container roof", "container roof panel forming"),
    (r"hardware", "metal hardware stamping and forming"),
    (r"aluminum", "aluminum and non-ferrous metal stamping"),
    (r"stainless steel|metal steel|sheet plate|sheet metal", "sheet metal stamping and forming"),
    (r"salt", "salt block lick compacting"),
    (r"wheel", "wheelbarrow and trolley part forming"),
    (r"helmet", "helmet shell molding"),
    (r"pipe|tube", "pipe and tube part forming"),
    (r"gas tank|cylinder", "tank and cylinder head forming"),
    (r"tray", "tray and pan deep drawing"),
]

def application_from_name(name_en: str) -> str:
    name = (name_en or "").lower()
    for pattern, phrase in APPLICATION_MAP:
        if re.search(pattern, name):
            return phrase
    return "metal forming and stamping"

def tonnage_from_name(name_en: str, name_cn: str):
    m = re.search(r"(\d+)\s*T\b", name_en or "", re.I) or re.search(r"(\d+)\s*吨", name_cn or "")
    return float(m.group(1)) if m else None

def make_description(category_en: str, tonnage, application: str) -> str:
    app = application[0].lower() + application[1:]
    t = f"{int(tonnage)}T" if tonnage else "custom-tonnage"
    model = f"LD-{int(tonnage)}T" if tonnage else "LD custom"
    if category_en == "H Frame Hydraulic Press":
        return (
            f"The {model} H frame hydraulic press is built for {app}, combining a rigid welded H-frame "
            f"structure with high guiding precision and strong resistance to eccentric loads. "
            f"Cartridge-valve hydraulics and PLC controls deliver smooth, repeatable cycles for continuous "
            f"production. Table size, stroke, and automation level are customized to your process."
        )
    if category_en == "Four Column Hydraulic Press":
        return (
            f"The {model} four column hydraulic press handles {app} with a three-beam four-column "
            f"structure that distributes the {t} nominal force evenly across the worktable. "
            f"Servo-ready hydraulics, pressure holding, and programmable stroke make it a flexible "
            f"platform for stamping, deep drawing, molding, and assembly work."
        )
    if "Door" in category_en:
        return (
            f"The {model} door panel embossing press forms deep, crisp patterns on steel and "
            f"steel-wood door skins in a single cycle. A high-rigidity frame and multi-cylinder "
            f"layout keep pattern depth uniform across the full panel, while quick-die-change "
            f"design supports high-mix door production lines."
        )
    return f"The {model} hydraulic press is engineered for {app}, with customization on request."

def make_specs_block(category_en: str, tonnage, application: str, description: str) -> str:
    lines = [description, ""]
    spec = nearest_spec(category_en, tonnage) if tonnage else None
    if spec:
        lines += [
            "Technical parameters (for reference):",
            f"Nominal force: {int(tonnage)}T",
            f"Slide stroke: {spec['stroke']} mm",
            f"Max. opening height: {spec['opening']} mm",
            f"Worktable size: {spec['table']} mm",
            f"Motor power: {spec['kw']} kW",
            f"Machine weight: approx. {spec['weight']} T",
        ]
    else:
        lines.append("Technical parameters: configured to order — share your part drawings for a tailored datasheet.")
    lines.append("Customization options: worktable size, stroke, opening height, ejector, servo system, light curtain, and PLC/touch-screen controls.")
    return "\n".join(lines)

def main():
    path = ROOT + r"\products.json"
    with io.open(path, encoding="utf-8") as f:
        data = json.load(f)

    updated = with_specs = 0
    per_cat = {}
    for p in data:
        if p["id"] > 74:
            continue
        cat = p["category_en"]
        ton = tonnage_from_name(p.get("name_en"), p.get("name_cn"))
        app = application_from_name(p.get("name_en") or "")
        desc = make_description(cat, ton, app)
        p["description_en"] = desc
        p["specs"] = make_specs_block(cat, ton, app, desc)
        updated += 1
        per_cat[cat] = per_cat.get(cat, 0) + 1
        if "Nominal force:" in p["specs"]:
            with_specs += 1

    with io.open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"updated {updated} legacy products; {with_specs} with numeric spec tables")
    print(per_cat)

if __name__ == "__main__":
    main()
