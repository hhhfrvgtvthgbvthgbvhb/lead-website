# -*- coding: utf-8 -*-
"""Apply hero swaps from scripts/hero_shortlist.json.

For each product marked swap=true:
  1. public/images/products/<id>/: hero.webp <-> candidate gallery file (byte swap,
     so the old hero stays in the gallery under the candidate's name).
  2. public/media/: swap the corresponding product-<id>-hero.webp and
     product-<id>-<candidate>.webp originals, and regenerate the three Payload
     image-size derivatives (400x300, 800x600, 1920x1080, centre-crop) for both.

products.json and payload.db stay valid because every path/filename keeps
pointing at the same logical image role.
"""
import io, json, os, shutil
from PIL import Image

ROOT = r"C:\Users\zz490\Documents\kimi\workspace\lead-website"
PROD = os.path.join(ROOT, "public", "images", "products")
MEDIA = os.path.join(ROOT, "public", "media")
SHORTLIST = os.path.join(ROOT, "scripts", "hero_shortlist.json")
SIZES = [(400, 300), (800, 600), (1920, 1080)]

def center_crop_resize(im, w, h):
    sw, sh = im.size
    scale = max(w / sw, h / sh)
    im = im.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    x = (im.width - w) // 2
    y = (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))

def write_media_variants(base_name, img):
    """Write original + 3 sized derivatives for a media file base name."""
    img.convert("RGB").save(os.path.join(MEDIA, f"{base_name}.webp"), "WEBP", quality=85)
    for w, h in SIZES:
        center_crop_resize(img.convert("RGB"), w, h).save(
            os.path.join(MEDIA, f"{base_name}-{w}x{h}.webp"), "WEBP", quality=85
        )

def main():
    with io.open(SHORTLIST, encoding="utf-8") as f:
        rows = json.load(f)
    swapped = 0
    for r in rows:
        if not r["swap"]:
            continue
        pid = str(r["id"])
        cand = r["best"]["file"]  # e.g. gallery-3.webp
        d = os.path.join(PROD, pid)
        hero_p = os.path.join(d, "hero.webp")
        cand_p = os.path.join(d, cand)
        if not (os.path.exists(hero_p) and os.path.exists(cand_p)):
            print(f"[{pid}] missing files, skipped")
            continue

        # 1) swap bytes in public/images/products
        tmp = hero_p + ".tmp"
        shutil.copy2(hero_p, tmp)
        shutil.copy2(cand_p, hero_p)
        shutil.copy2(tmp, cand_p)
        os.remove(tmp)

        # 2) regenerate media originals + derivatives from the new storefront images
        cand_stem = cand[:-5]  # gallery-3
        new_hero = Image.open(hero_p)
        new_gallery = Image.open(cand_p)
        write_media_variants(f"product-{pid}-hero", new_hero)
        write_media_variants(f"product-{pid}-{cand_stem}", new_gallery)

        swapped += 1
        print(f"[{pid}] hero <- {cand}")
    print(f"swapped {swapped} heroes (storefront + media library in sync)")

if __name__ == "__main__":
    main()
