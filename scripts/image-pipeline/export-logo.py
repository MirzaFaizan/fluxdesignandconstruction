#!/usr/bin/env python3
"""Export FluX logo SVG + favicon PNGs from the PSD raster.

The PSD has no vector paths for the mark. The split ring is reconstructed
as two geometric arcs (measured from the raster). FL/UX and the tagline
are traced from the two inks. Favicon PNGs are resized from the PSD layer.
"""
from __future__ import annotations

import json
import math
from pathlib import Path

import numpy as np
from PIL import Image
from psd_tools import PSDImage
from skimage import measure, morphology

ROOT = Path(__file__).resolve().parents[2]
PSD = ROOT / "Logo" / "Logo Alphabets.psd"
OUT = ROOT / "web-media" / "logo"

STEEL = "#5d6d80"
CHARCOAL = "#2b3642"
WHITE_RGB = (255, 255, 255, 255)

# Measured on Layer 5 (2050×2267), y-down, 0° = east, clockwise.
CX = 1025.0
CY = 1025.0
RING_R = 985.5
RING_STROKE = 77.0
STEEL_ARC = (100.0, 270.0)  # clockwise
CHAR_ARC = (280.0, 50.0)


def polar(deg: float, r: float = RING_R) -> tuple[float, float]:
    rad = math.radians(deg)
    return CX + r * math.cos(rad), CY + r * math.sin(rad)


def arc_d(start_deg: float, end_deg: float) -> str:
    """Clockwise SVG arc from start_deg to end_deg (y-down, 0° east)."""
    delta = (end_deg - start_deg) % 360.0
    large = 1 if delta > 180 else 0
    sx, sy = polar(start_deg)
    ex, ey = polar(end_deg)
    return (
        f"M{sx:.1f},{sy:.1f} "
        f"A{RING_R:.1f},{RING_R:.1f} 0 {large} 1 {ex:.1f},{ey:.1f}"
    )


def simplify_closed(points: np.ndarray, tolerance: float) -> np.ndarray:
    pts = np.asarray(points, dtype=float)
    if len(pts) < 4:
        return pts
    closed = np.hypot(*(pts[0] - pts[-1])) < 1.5
    body = pts[:-1] if closed else pts
    simp = measure.approximate_polygon(body, tolerance=tolerance)
    if closed and (len(simp) == 0 or np.hypot(*(simp[0] - simp[-1])) > 0.5):
        simp = np.vstack([simp, simp[0]]) if len(simp) else pts[:1]
    return simp


def mask_to_d(mask: np.ndarray, tolerance: float = 0.6, min_area: float = 40) -> str:
    mask = morphology.binary_closing(mask, morphology.disk(1))
    mask = morphology.remove_small_objects(mask, 32)
    mask = morphology.remove_small_holes(mask, 32)
    parts = []
    for c in measure.find_contours(mask.astype(float), 0.5):
        pts = np.stack([c[:, 1], c[:, 0]], axis=1)
        simp = simplify_closed(pts, tolerance)
        if len(simp) < 4:
            continue
        x, y = simp[:, 0], simp[:, 1]
        area = 0.5 * np.abs(np.dot(x, np.roll(y, 1)) - np.dot(y, np.roll(x, 1)))
        if area < min_area:
            continue
        d = [f"M{simp[0, 0]:.1f},{simp[0, 1]:.1f}"]
        for px, py in simp[1:]:
            d.append(f"L{px:.1f},{py:.1f}")
        d.append("Z")
        parts.append("".join(d))
    return " ".join(parts)


def write_svg(path: Path, width: int, height: int, steel_letters: str, char_letters: str, title: str) -> None:
    steel_ring = arc_d(*STEEL_ARC)
    char_ring = arc_d(*CHAR_ARC)
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{title}">
  <title>{title}</title>
  <g fill="none" stroke-width="{RING_STROKE:.0f}" stroke-linecap="butt">
    <path stroke="{STEEL}" d="{steel_ring}"/>
    <path stroke="{CHARCOAL}" d="{char_ring}"/>
  </g>
  <path fill="{STEEL}" fill-rule="evenodd" d="{steel_letters}"/>
  <path fill="{CHARCOAL}" fill-rule="evenodd" d="{char_letters}"/>
</svg>
"""
    path.write_text(svg, encoding="utf-8")


def padded_mark(im: Image.Image, pad_ratio: float = 0.08) -> Image.Image:
    w, h = im.size
    side = max(w, h)
    pad = int(side * pad_ratio)
    canvas_side = side + pad * 2
    canvas = Image.new("RGBA", (canvas_side, canvas_side), (0, 0, 0, 0))
    canvas.paste(im, ((canvas_side - w) // 2, (canvas_side - h) // 2), im)
    return canvas


def resize_rgba(im: Image.Image, size: int) -> Image.Image:
    return im.resize((size, size), Image.Resampling.LANCZOS)


def letter_mask(opaque: np.ndarray) -> np.ndarray:
    """Keep FL/UX + tagline; drop the ring annulus except where L and X meet it."""
    h, w = opaque.shape
    yy, xx = np.ogrid[:h, :w]
    dx = xx - CX
    dy = yy - CY
    r = np.sqrt(dx * dx + dy * dy)
    ang = (np.degrees(np.arctan2(dy, dx)) + 360.0) % 360.0
    annulus = (r >= 930) & (r <= 1035)
    # L stem continues through the top split (x 1046–1120).
    l_meet = (xx >= 1044) & (xx <= 1122) & (yy <= 220) & (r <= 1035)
    x_meet = annulus & (ang >= 42) & (ang <= 78)
    tagline = yy >= 1985
    inner = r < 948
    return opaque & (inner | l_meet | x_meet | tagline)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    if not PSD.exists():
        raise SystemExit(f"PSD not found: {PSD}")

    psd = PSDImage.open(PSD)
    layer = next(
        (l for l in psd.descendants() if l.name == "Layer 5" and l.kind == "pixel"),
        None,
    )
    if layer is None:
        raise SystemExit("Visible mark layer (Layer 5) not found in PSD")

    lockup = layer.composite().convert("RGBA")
    lw, lh = lockup.size
    mark_side = lw
    mark = lockup.crop((0, 0, mark_side, mark_side))

    arr = np.array(lockup)
    rgb = arr[:, :, :3].astype(np.float32)
    alpha = arr[:, :, 3]
    opaque = alpha > 160
    lum = rgb.mean(axis=2)
    letters = letter_mask(opaque)
    yy = np.arange(lh)[:, None]
    steel = letters & (lum >= 70)
    charcoal = letters & (lum < 70)
    mark_cut = yy < 1980

    steel_d = mask_to_d(steel)
    char_d = mask_to_d(charcoal)
    steel_mark_d = mask_to_d(steel & mark_cut)
    char_mark_d = mask_to_d(charcoal & mark_cut)
    if not steel_d or not char_d:
        raise SystemExit("Letter trace produced an empty path")

    write_svg(OUT / "flux-lockup.svg", lw, lh, steel_d, char_d, "FluX Design and Construction")
    write_svg(OUT / "flux-mark.svg", mark_side, mark_side, steel_mark_d, char_mark_d, "FluX")

    padded = padded_mark(mark)
    for size, name in (
        (512, "favicon-512.png"),
        (256, "favicon-256.png"),
        (32, "favicon-32.png"),
    ):
        resize_rgba(padded, size).save(OUT / name, "PNG", optimize=True)

    # Charcoal ink vanishes on charcoal; apple-touch sits on white so both inks read.
    apple = Image.new("RGBA", (180, 180), WHITE_RGB)
    apple = Image.alpha_composite(apple, resize_rgba(padded, 180))
    apple.save(OUT / "apple-touch-180.png", "PNG", optimize=True)

    lockup_png = lockup.copy()
    lockup_png.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
    lockup_png.save(OUT / "flux-lockup.png", "PNG", optimize=True)

    meta = {
        "source": str(PSD.relative_to(ROOT)),
        "psd_size": list(psd.size),
        "lockup_px": [lw, lh],
        "mark_px": [mark_side, mark_side],
        "ring": {
            "cx": CX,
            "cy": CY,
            "r": RING_R,
            "stroke": RING_STROKE,
            "steelArcDeg": list(STEEL_ARC),
            "charcoalArcDeg": list(CHAR_ARC),
        },
        "note": "PSD mark is raster-only. SVG ring is geometric; letters/tagline are traced. PNGs are resized from the PSD layer.",
        "files": [
            "flux-lockup.svg",
            "flux-mark.svg",
            "flux-lockup.png",
            "favicon-512.png",
            "favicon-256.png",
            "favicon-32.png",
            "apple-touch-180.png",
        ],
    }
    (OUT / "logo-meta.json").write_text(json.dumps(meta, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(meta, indent=2))


if __name__ == "__main__":
    main()
