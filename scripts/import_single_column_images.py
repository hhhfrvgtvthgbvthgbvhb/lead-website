# -*- coding: utf-8 -*-
"""Copy & convert single-column (C-frame) press photos from OneDrive source
into public/images/products/<id>/ as hero.webp + gallery-N.webp.
Source folders are NEVER modified."""
import os, sys, shutil
from PIL import Image

SRC = r"C:\Users\zz490\OneDrive\力得管理\网络营销\英文液压机网站\产品详情\单臂式液压机"
DST = r"C:\Users\zz490\Documents\kimi\workspace\lead-website\public\images\products"

# product id -> list of source folders (merged when duplicate tonnage)
MAP = {
    75: ["5T小单臂出口俄罗斯"],
    76: ["10T单臂液压机系列图及视频", "10吨单臂液压机"],
    77: ["20T单臂液压机", "20吨单柱液压机"],
    78: ["40吨单柱液压机"],
    79: ["60T单臂液压机"],
    80: ["63吨单柱液压机"],
    81: ["80吨单臂液压机"],
    82: ["100吨单柱液压机"],
    83: ["100吨单臂校直机"],
    84: ["200吨单臂式液压机"],
    85: ["200吨单臂校直机"],
    86: ["250吨单臂校直机_单柱液压机"],
    87: ["315T单臂式液压机", "315吨单柱液压机"],
    88: ["400吨单臂式液压机"],
    89: ["500吨单柱液压机"],
}

IMG_EXT = {".png", ".jpg", ".jpeg", ".webp", ".bmp"}
MAX_DIM = 1600
QUALITY = 82
MAX_GALLERY = 5

def collect(folders):
    files = []
    for f in folders:
        d = os.path.join(SRC, f)
        for name in sorted(os.listdir(d)):
            p = os.path.join(d, name)
            if os.path.isfile(p) and os.path.splitext(name)[1].lower() in IMG_EXT:
                files.append(p)
    # hero preference: file whose name contains 首图
    files.sort(key=lambda p: 0 if "首图" in os.path.basename(p) else 1)
    return files

def convert(src_path, dst_path):
    im = Image.open(src_path)
    im = im.convert("RGB")
    w, h = im.size
    scale = min(1.0, MAX_DIM / max(w, h))
    if scale < 1.0:
        im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    im.save(dst_path, "WEBP", quality=QUALITY)

def main():
    total_in = total_out = 0
    for pid, folders in MAP.items():
        imgs = collect(folders)[: 1 + MAX_GALLERY]
        if not imgs:
            print(f"[{pid}] NO IMAGES from {folders}", file=sys.stderr)
            continue
        outdir = os.path.join(DST, str(pid))
        os.makedirs(outdir, exist_ok=True)
        for old in os.listdir(outdir):
            os.remove(os.path.join(outdir, old))
        for i, sp in enumerate(imgs):
            name = "hero.webp" if i == 0 else f"gallery-{i-1}.webp"
            dp = os.path.join(outdir, name)
            convert(sp, dp)
            total_in += os.path.getsize(sp)
            total_out += os.path.getsize(dp)
        print(f"[{pid}] {len(imgs)} images <- {folders}")
    print(f"TOTAL: {total_in/1e6:.1f}MB -> {total_out/1e6:.1f}MB")

if __name__ == "__main__":
    main()
