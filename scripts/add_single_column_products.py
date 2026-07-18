# -*- coding: utf-8 -*-
"""Append 15 Single Column (C-Frame) Hydraulic Press products to products.json.
Idempotent: removes any existing entries with category Single Column first."""
import json, io

PATH = r"C:\Users\zz490\Documents\kimi\workspace\lead-website\products.json"
CAT_EN = "Single Column Hydraulic Press"
CAT_CN = "产品4 单柱液压机"

# specs from 液压机参数推断表_v2.xlsx (C型液压机 rows)
SPECS = {
    5:   (200, 400, "350 x 350", 2.2, 0.6),
    10:  (250, 500, "450 x 410", 3, 0.8),
    20:  (260, 500, "450 x 410", 4, 1.2),
    40:  (300, 600, "600 x 500", 5.5, 2),
    60:  (300, 700, "700 x 600", 5.5, 2.5),
    63:  (300, 700, "700 x 600", 5.5, 2.5),
    80:  (320, 700, "700 x 700", 7.5, 3.5),
    100: (320, 800, "800 x 700", 7.5, 4.5),
    200: (400, 1000, "900 x 800", 11, 8),
    250: (400, 1000, "900 x 800", 15, 10),
    315: (500, 1200, "1050 x 900", 15, 13),
    400: (500, 1500, "1800 x 1800", 18.5, 18),
    500: (500, 1600, "1800 x 2000", 22, 25),
}

def spec_text(ton, model, kind):
    stroke, opening, table, kw, weight = SPECS[ton]
    use = ("This straightening (shaft/profile alignment) configuration features an open-front C-frame "
           "that gives operators unobstructed access for positioning shafts, bars, and profiles.")
    base = (
        f"{model} is a {ton}-ton single column (C-frame) hydraulic press built on a rigid welded steel "
        f"frame with stress-relief treatment for long-term accuracy. The open three-side working area "
        f"makes loading and unloading fast, while the cartridge-valve integrated hydraulic system delivers "
        f"smooth, shock-free pressing with reliable pressure holding.\n"
        f"Operation modes include jog, manual, and semi-automatic cycles with both stroke-limited and "
        f"pressure-limited forming. Pressure and stroke are easily adjusted from the control panel, and "
        f"PLC control with optional light-curtain safety protection is available.\n"
        f"Technical parameters (for reference):\n"
        f"Nominal force: {ton}T\n"
        f"Slide stroke: {stroke} mm\n"
        f"Max. opening height: {opening} mm\n"
        f"Worktable size: {table} mm\n"
        f"Motor power: {kw} kW\n"
        f"Machine weight: approx. {weight} T\n"
        f"Customization options: worktable size, stroke, opening height, ejector, servo system, "
        f"light curtain, and PLC/touch-screen controls."
    )
    return (use + "\n" + base) if kind == "straightening" else base

def desc(ton, kind):
    if kind == "straightening":
        return (f"The LD-{ton}T C-frame straightening hydraulic press is designed for precision straightening "
                f"of shafts, bars, tubes, and profiles. Its open-front single column frame allows quick workpiece "
                f"positioning, while adjustable pressure and stroke ensure accurate, repeatable correction from 5T to 500T class machines.")
    return (f"The LD-{ton}T single column hydraulic press (C-frame) handles straightening, press-fitting, punching, "
            f"bending, and assembly tasks in a compact footprint. A rigid welded frame and cartridge-valve hydraulic "
            f"system deliver stable, accurate pressing for small to medium workpieces.")

PRODUCTS = [
    (75, 5,   "std", "LD-5T Single Column Hydraulic Press",
     "5T小单臂液压机（出口俄罗斯）"),
    (76, 10,  "std", "LD-10T Single Column Hydraulic Press",
     "10T单臂液压机"),
    (77, 20,  "std", "LD-20T Single Column Hydraulic Press",
     "20T单柱液压机"),
    (78, 40,  "std", "LD-40T Single Column Hydraulic Press",
     "40吨单柱液压机"),
    (79, 60,  "std", "LD-60T Single Column Hydraulic Press",
     "60T单臂液压机"),
    (80, 63,  "std", "LD-63T Single Column Hydraulic Press",
     "63吨单柱液压机"),
    (81, 80,  "std", "LD-80T Single Column Hydraulic Press",
     "80吨单臂液压机"),
    (82, 100, "std", "LD-100T Single Column Hydraulic Press",
     "100吨单柱液压机"),
    (83, 100, "straightening", "LD-100T C-Frame Straightening Hydraulic Press",
     "100吨单臂校直机"),
    (84, 200, "std", "LD-200T Single Column Hydraulic Press",
     "200吨单臂式液压机"),
    (85, 200, "straightening", "LD-200T C-Frame Straightening Hydraulic Press",
     "200吨单臂校直机"),
    (86, 250, "straightening", "LD-250T C-Frame Straightening Hydraulic Press",
     "250吨单臂校直机_单柱液压机"),
    (87, 315, "std", "LD-315T Single Column Hydraulic Press",
     "315T单臂式液压机"),
    (88, 400, "std", "LD-400T Single Column Hydraulic Press",
     "400吨单臂式液压机"),
    (89, 500, "std", "LD-500T Single Column Hydraulic Press",
     "500吨单柱液压机"),
]

def keywords(ton, kind):
    base = (f"{ton} ton hydraulic press, single column hydraulic press, C-frame press, "
            f"YQ41 hydraulic press, press fitting press, punching press")
    if kind == "straightening":
        base += f", {ton}T straightening press, shaft straightening machine"
    return base

def main():
    with io.open(PATH, encoding="utf-8") as f:
        data = json.load(f)
    data = [p for p in data if p.get("category_en") != CAT_EN]
    for pid, ton, kind, name_en, folder_cn in PRODUCTS:
        kind_cn = "校直机" if kind == "straightening" else "液压机"
        data.append({
            "id": pid,
            "name_cn": f"{ton}吨单柱{kind_cn}" if kind == "std" else f"{ton}吨单臂校直机",
            "name_en": name_en,
            "category_cn": CAT_CN,
            "category_en": CAT_EN,
            "description_en": desc(ton, kind),
            "seo_keywords": keywords(ton, kind),
            "hero_image": f"public/images/products/{pid}/hero.webp",
            "all_images": [f"public/images/products/{pid}/hero.webp"],
            "specs": spec_text(ton, name_en, kind),
            "directory": f"单臂式液压机/{folder_cn}",
        })
    with io.open(PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("total products:", len(data))
    from collections import Counter
    print(Counter(p["category_en"] for p in data))

if __name__ == "__main__":
    main()
