"""Process raw-photo.jpg into a watercolor-style portrait for the homepage.

Steps: portrait crop around the face -> warm-cast white balance -> painterly
smoothing + posterize blend -> cool color grade -> fine paper grain.
Output: src/assets/portrait.jpg
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).parent
SRC = ROOT / "raw-photo.jpg"
OUT = ROOT / "src" / "assets" / "portrait.jpg"

img = Image.open(SRC).convert("RGB")

# --- 1. portrait crop (3:4) around the face -------------------------------
# face centre ~ x 890, hair top ~ y 210 in the 1936x1292 original
w, h = 862, 1150  # 3:4
cx, top = 890, 100
img = img.crop((cx - w // 2, top, cx + w // 2, top + h))

# --- 2. tame the warm indoor cast (partial gray-world) --------------------
arr = np.asarray(img).astype(np.float32)
means = arr.reshape(-1, 3).mean(axis=0)
gray = means.mean()
gain = gray / means            # per-channel gain
gain = 1.0 + (gain - 1.0) * 0.6  # apply only 60% so it stays natural
arr = np.clip(arr * gain, 0, 255).astype(np.uint8)
img = Image.fromarray(arr)

# --- 3. painterly smoothing + light posterize (gouache feel) --------------
smooth = img.filter(ImageFilter.SMOOTH_MORE).filter(ImageFilter.SMOOTH_MORE)
poster = ImageOps.posterize(smooth, 4)
img = Image.blend(smooth, poster, 0.4)

# --- 4. color grade toward the site's cool paper palette ------------------
img = ImageEnhance.Color(img).enhance(0.86)
img = ImageEnhance.Brightness(img).enhance(1.03)
img = ImageEnhance.Contrast(img).enhance(1.02)
arr = np.asarray(img).astype(np.float32)
arr[..., 0] *= 0.965   # pull reds down
arr[..., 2] *= 1.035   # lift blues a touch
arr = np.clip(arr, 0, 255)

# --- 5. fine paper grain ---------------------------------------------------
rng = np.random.default_rng(42)
noise = rng.normal(0, 4.5, arr.shape[:2])[..., None]
arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
img = Image.fromarray(arr)

# --- save (displayed ~144px wide, keep 720px for retina) -------------------
img = img.resize((720, int(720 * img.height / img.width)), Image.LANCZOS)
OUT.parent.mkdir(parents=True, exist_ok=True)
img.save(OUT, quality=88)
print(f"saved {OUT} {img.size}")
