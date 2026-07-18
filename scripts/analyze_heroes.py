# -*- coding: utf-8 -*-
"""Analyze product photos to find the best hero (dark background, bright subject).

Metric: luminance mean + std per image.
score = std - 0.35 * mean   (contrast wins, bright backgrounds lose)
Swap rule: best gallery candidate must score clearly better than the current
hero AND be clearly darker on average.

Outputs scripts/hero_shortlist.json and contact sheets in scripts/hero_sheets/.
Apply with: python scripts/apply_hero_swaps.py
"""
import io, json, os
from PIL import Image, ImageDraw

PROD = r"C:\Users\zz490\Documents\kimi\workspace\lead-website\public\images\products"
OUT_JSON = r"C:\Users\zz490\Documents\kimi\workspace\lead-website\scripts\hero_shortlist.json"
SHEETS = r"C:\Users\zz490\Documents\kimi\workspace\lead-website\scripts\hero_sheets"

def stats(path):
    im = Image.open(path).convert("L")
    im.thumbnail((200, 200))
    px = list(im.getdata())
    n = len(px)
    mean = sum(px) / n
    var = sum((v - mean) ** 2 for v in px) / n
    return mean, var ** 0.5

def score(path):
    mean, std = stats(path)
    return std - 0.35 * mean, mean, std

def main():
    rows = []
    for pid in sorted(os.listdir(PROD), key=lambda x: int(x)):
        d = os.path.join(PROD, pid)
        if not os.path.isdir(d):
            continue
        hero = os.path.join(d, "hero.webp")
        if not os.path.exists(hero):
            continue
        galleries = sorted(
            os.path.join(d, f) for f in os.listdir(d)
            if f.startswith("gallery-") and f.endswith(".webp")
        )
        h_score, h_mean, h_std = score(hero)
        best = None
        for g in galleries:
            s, m, sd = score(g)
            if best is None or s > best["score"]:
                best = {"file": os.path.basename(g), "score": s, "mean": m, "std": sd}
        swap = False
        reason = ""
        if not galleries:
            reason = "single image"
        elif best is None:
            reason = "no candidates"
        elif best["score"] > h_score * 1.12 + 3 and best["mean"] < h_mean - 8:
            swap = True
            reason = "darker + more contrast"
        else:
            reason = "current hero best"
        rows.append({
            "id": int(pid),
            "hero": {"score": round(h_score, 1), "mean": round(h_mean, 1), "std": round(h_std, 1)},
            "best": best and {"file": best["file"], "score": round(best["score"], 1), "mean": round(best["mean"], 1), "std": round(best["std"], 1)},
            "swap": swap,
            "reason": reason,
        })
    with io.open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(rows, f, indent=1)
    n_swap = sum(1 for r in rows if r["swap"])
    print(f"analyzed {len(rows)} products; proposed swaps: {n_swap}")
    for r in rows:
        if r["swap"]:
            print(f"  [{r['id']}] hero mean {r['hero']['mean']} -> {r['best']['file']} mean {r['best']['mean']} (score {r['hero']['score']} -> {r['best']['score']})")

    # contact sheets: current hero vs proposed candidate
    os.makedirs(SHEETS, exist_ok=True)
    swaps = [r for r in rows if r["swap"]]
    keeps = [r for r in rows if not r["swap"]]
    sample = swaps[:14] + keeps[:: max(1, len(keeps) // 6)][:6]
    TH = 320
    cells = []
    for r in sample:
        d = os.path.join(PROD, str(r["id"]))
        pair = []
        for label, fname in (("CURRENT", "hero.webp"), ("PROPOSED" if r["swap"] else "BEST ALT", r["best"]["file"] if r["best"] else "hero.webp")):
            im = Image.open(os.path.join(d, fname)).convert("RGB")
            im.thumbnail((TH, TH))
            cell = Image.new("RGB", (TH + 10, TH + 34), "white")
            cell.paste(im, ((TH + 10 - im.width) // 2, 24 + (TH - im.height) // 2))
            dr = ImageDraw.Draw(cell)
            dr.text((6, 6), f"#{r['id']} {label}", fill="black")
            pair.append(cell)
        cells.append(pair)
    cols = 4  # pairs of 2
    w = cols * 2 * (TH + 10)
    rows_n = (len(cells) + cols - 1) // cols
    sheet = Image.new("RGB", (w, rows_n * (TH + 34)), (230, 230, 230))
    for i, pair in enumerate(cells):
        x = (i % cols) * 2 * (TH + 10)
        y = (i // cols) * (TH + 34)
        sheet.paste(pair[0], (x, y))
        sheet.paste(pair[1], (x + TH + 10, y))
    out = os.path.join(SHEETS, "review.jpg")
    sheet.save(out, quality=82)
    print("sheet:", out, f"({len(cells)} products)")

if __name__ == "__main__":
    main()
