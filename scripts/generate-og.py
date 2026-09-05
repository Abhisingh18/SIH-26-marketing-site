"""Generates app/opengraph-image.png — the social card for Sangam.

Mirrors the hero: saffron above, periwinkle below, the confluence mark, then the
headline in a serif. Georgia stands in for Instrument Serif, which is a webfont
and not available to a rasteriser here; at card size the difference is a little
less stroke contrast, and nothing else.

Re-run with `python scripts/generate-og.py` after changing the headline or
the palette. Writes both opengraph-image.png and twitter-image.png.
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
import pathlib

W, H = 1200, 630
PAPER = (252, 251, 249)
INK = (17, 17, 19)
BODY = (86, 86, 92)
ACCENT = (35, 56, 204)
SAFFRON = (244, 124, 20)
PERIWINKLE = (179, 192, 242)

F = "C:/Windows/Fonts/"
serif = lambda s: ImageFont.truetype(F + "georgia.ttf", s)
sans = lambda s: ImageFont.truetype(F + "segoeui.ttf", s)

card = Image.new("RGB", (W, H), PAPER)


def vramp(full_to, zero_at):
    """Vertical alpha ramp: opaque until `full_to`, gone by `zero_at`."""
    ramp = Image.new("L", (1, H))
    px = ramp.load()
    for y in range(H):
        if y <= full_to:
            a = 255
        elif y >= zero_at:
            a = 0
        else:
            a = round(255 * (1 - (y - full_to) / (zero_at - full_to)))
        px[0, y] = a
    return ramp.resize((W, H))


def field(colour, box, blur, full_to, zero_at, strength=1.0):
    """A blurred ellipse of flat colour, faded out down the card."""
    layer = Image.new("RGBA", (W, H), colour + (0,))
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).ellipse(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(blur))
    # multiply the shape's own softness by the vertical fade
    ramp = vramp(full_to, zero_at)
    mask = Image.composite(mask, Image.new("L", (W, H), 0), ramp)
    if strength != 1.0:
        mask = mask.point(lambda v: round(v * strength))
    layer.putalpha(mask)
    return layer


# Composited as separate layers rather than blended into one image: mixing the
# two hues directly drops lightness where they meet and the band between them
# goes grey — the same trap as the hero wash.
card = card.convert("RGBA")
# periwinkle sits low enough that the saffron has already faded before it
# arrives — stacked with any real overlap the two go grey-brown between them
card.alpha_composite(field(PERIWINKLE, [-420, 215, W + 420, 665], 95, 470, 630, 0.9))
card.alpha_composite(field(SAFFRON, [-170, -330, W + 170, 270], 74, 190, 335))
# and a paper scrim opens the centre, so the headline lands on near-white while
# the colour stays out at the shoulders
card.alpha_composite(field(PAPER, [150, 245, W - 150, 615], 105, H, H + 1, 0.82))
card = card.convert("RGB")

d = ImageDraw.Draw(card)


def bezier(p0, p1, p2, p3, n=48):
    pts = []
    for i in range(n + 1):
        t = i / n
        u = 1 - t
        pts.append(
            (
                u**3 * p0[0] + 3 * u**2 * t * p1[0] + 3 * u * t**2 * p2[0] + t**3 * p3[0],
                u**3 * p0[1] + 3 * u**2 * t * p1[1] + 3 * u * t**2 * p2[1] + t**3 * p3[1],
            )
        )
    return pts


def logomark(draw, cx, top, size, colour):
    """The three streams, drawn from the same geometry as the SVG."""
    k = size / 24
    x = lambda v: cx + (v - 12) * k
    y = lambda v: top + v * k
    w = max(2, round(1.85 * k))
    draw.line([(x(12), y(3.4)), (x(12), y(20.6))], fill=colour, width=w)
    for sx in (1, -1):
        pts = bezier(
            (x(12 + sx * 7.4), y(3.4)),
            (x(12 + sx * 7.4), y(8.6)),
            (x(12 + sx * 4.5), y(11.3)),
            (x(12), y(12.7)),
        )
        draw.line(pts, fill=colour, width=w, joint="curve")


def centre(text, font, y, fill):
    tw = d.textlength(text, font=font)
    d.text(((W - tw) / 2, y), text, font=font, fill=fill)
    return tw


# ---- wordmark ----
mark_size, gap = 46, 14
name_font = sans(31)
name_w = d.textlength("Sangam", font=name_font)
block = mark_size * 0.72 + gap + name_w
mx = (W - block) / 2
logomark(d, mx + mark_size * 0.36, 70, mark_size, INK)
d.text((mx + mark_size * 0.72 + gap, 76), "Sangam", font=name_font, fill=INK)

# ---- kicker, rules either side ----
kick = sans(21)
kw = centre("Sovereign AI infrastructure", kick, 152, ACCENT)
for x0, x1 in [((W - kw) / 2 - 116, (W - kw) / 2 - 28), ((W + kw) / 2 + 28, (W + kw) / 2 + 116)]:
    d.line([(x0, 163), (x1, 163)], fill=(255, 255, 255), width=2)

# ---- headline ----
head = serif(74)
for i, line in enumerate(["Your AI.", "Your infrastructure.", "Your data."]):
    centre(line, head, 224 + i * 88, INK)

# ---- supporting line ----
centre(
    "An on-premise agentic AI workbench for confidential industrial work.",
    sans(25),
    520,
    BODY,
)

out = pathlib.Path(__file__).resolve().parent.parent / "app" / "opengraph-image.png"
card.save(out, optimize=True)
card.save(out.with_name("twitter-image.png"), optimize=True)
print("written", out, card.size, out.stat().st_size, "bytes")
