# -*- coding: utf-8 -*-
"""Convert OneDrive marketing materials to WebP under public/images/.
Sources are NEVER modified."""
import os
from PIL import Image

BASE = r"C:\Users\zz490\OneDrive\力得管理\网络营销\英文液压机网站"
DST = r"C:\Users\zz490\Documents\kimi\workspace\lead-website\public\images"

# (src_rel, dst_rel, max_dim)
JOBS = [
    (r"首页\横幅背景.png", "hero-bg.webp", 1920),
    (r"首页\Door Embossing.png", "categories/door-embossing.webp", 1000),
    (r"首页\Four Column Press.png", "categories/four-column.webp", 1000),
    (r"首页\H Frame Hydraulic Press.png", "categories/h-frame.webp", 1000),
    (r"首页\LEAD LOGO彩色.png", "brand/logo-color.webp", 1000),
    (r"首页\纯白logo.png", "brand/logo-white.webp", 1000),
    (r"可用素材\2-工厂or公司场景图\一号车间.png", "factory/workshop-1.webp", 1600),
    (r"可用素材\2-工厂or公司场景图\二号车间.png", "factory/workshop-2.webp", 1600),
    (r"可用素材\2-工厂or公司场景图\公司办公楼.png", "factory/office.webp", 1600),
    (r"可用素材\3-车间图片（图片如有仪器设备，备注）\数控机床.png", "factory/cnc-machining.webp", 1400),
    (r"可用素材\3-车间图片（图片如有仪器设备，备注）\数控火焰切割.png", "factory/cnc-flame-cutting.webp", 1400),
    (r"可用素材\3-车间图片（图片如有仪器设备，备注）\焊接工装及组装场地.png", "factory/welding-assembly.webp", 1400),
    (r"可用素材\3-车间图片（图片如有仪器设备，备注）\焊接工装及组装场地2.png", "factory/welding-assembly-2.webp", 1400),
    (r"可用素材\3-车间图片（图片如有仪器设备，备注）\仓库及零件组装测试场地.png", "factory/warehouse-testing.webp", 1400),
    (r"可用素材\5-客户来访 合影图片\访客1.png", "visitors/visitor-1.webp", 1200),
    (r"可用素材\5-客户来访 合影图片\访客2.png", "visitors/visitor-2.webp", 1200),
    (r"可用素材\5-客户来访 合影图片\访客3.png", "visitors/visitor-3.webp", 1200),
    (r"可用素材\5-客户来访 合影图片\访客4.png", "visitors/visitor-4.webp", 1200),
    (r"可用素材\5-客户来访 合影图片\访客5.png", "visitors/visitor-5.webp", 1200),
    (r"可用素材\5-客户来访 合影图片\访客6.png", "visitors/visitor-6.webp", 1200),
    (r"可用素材\5-客户来访 合影图片\访客7.png", "visitors/visitor-7.webp", 1200),
    (r"可用素材\5-客户来访 合影图片\访客8.png", "visitors/visitor-8.webp", 1200),
    (r"可用素材\6-展会图片\展会照片1.png", "exhibitions/exhibition-1.webp", 1400),
    (r"可用素材\6-展会图片\展会照片2.png", "exhibitions/exhibition-2.webp", 1400),
    (r"可用素材\6-展会图片\展会照片3.png", "exhibitions/exhibition-3.webp", 1400),
    (r"可用素材\8-证书图片\质量管理体系认证书 2025最新年检_2.png", "certificates/iso-9001.webp", 1100),
    (r"可用素材\10-补充：合作客户logo 案例等\合作企业.png", "certificates/partners.webp", 904),
    (r"可用素材\12：产品应用场景图片\布匹打包用.jpg", "applications/baling-press.webp", 1200),
    (r"可用素材\12：产品应用场景图片\微信图片_20170817113158.jpg", "applications/gantry-install.webp", 1200),
    (r"可用素材\12：产品应用场景图片\微信图片_2017081711437.jpg", "applications/press-line.webp", 1200),
    (r"可用素材\12：产品应用场景图片\微信图片_20171110083137.jpg", "applications/blue-press-install.webp", 1200),
    (r"可用素材\12：产品应用场景图片\微信图片_20171110083140.jpg", "applications/blue-press-line.webp", 1200),
    (r"可用素材\13包装运输图片\00000056.jpg", "shipping/truck-load.webp", 1200),
    (r"可用素材\13包装运输图片\02.png", "shipping/container-cylinders.webp", 1200),
    (r"可用素材\13包装运输图片\03.png", "shipping/flatbed.webp", 1200),
    (r"可用素材\13包装运输图片\06.jpg", "shipping/container-press-blue.webp", 1200),
    (r"可用素材\13包装运输图片\07.jpg", "shipping/container-press-yellow.webp", 1200),
    (r"可用素材\13包装运输图片\08.png", "shipping/crane-loading.webp", 1200),
]

def convert(src, dst, max_dim):
    im = Image.open(src)
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if has_alpha else "RGB")
    w, h = im.size
    scale = min(1.0, max_dim / max(w, h))
    if scale < 1.0:
        im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "WEBP", quality=80)

def main():
    total = 0
    for src_rel, dst_rel, max_dim in JOBS:
        src = os.path.join(BASE, src_rel)
        dst = os.path.join(DST, dst_rel)
        convert(src, dst, max_dim)
        kb = os.path.getsize(dst) // 1024
        total += kb
        print(f"{dst_rel}  {kb}KB")
    # single-column category card reuses the 100T product photo
    sc_src = os.path.join(DST, "products", "82", "hero.webp")
    sc_dst = os.path.join(DST, "categories", "single-column.webp")
    os.makedirs(os.path.dirname(sc_dst), exist_ok=True)
    Image.open(sc_src).save(sc_dst, "WEBP", quality=80)
    print("categories/single-column.webp  (from product 82)")
    print(f"TOTAL {total/1024:.1f}MB")

if __name__ == "__main__":
    main()
