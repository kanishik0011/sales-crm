import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = Path('screenshots')
OUT_DIR.mkdir(parents=True, exist_ok=True)

files = [
    'login.png',
    'dashboard.png',
    'customers.png',
    'activities.png',
    'opportunities.png',
    'leads.png',
    'campaigns.png',
    'sales-manager.png',
    'account-manager.png',
    'marketing.png',
    'product.png',
    'executive.png',
]

W, H = 1280, 720

# Try to use a default font; PIL always has one available.
font = None
try:
    font = ImageFont.load_default()
except Exception:
    font = None

def placeholder(path: Path, title: str):
    img = Image.new('RGB', (W, H), color=(245, 247, 250))
    d = ImageDraw.Draw(img)
    # Border
    d.rectangle([10, 10, W-10, H-10], outline=(30, 41, 59), width=6)
    # Title
    text = f"{title}"\
           "\n(Placeholder screenshot - capture failed)"
    d.multiline_text((60, 200), text, fill=(15, 23, 42), font=font, spacing=8)
    # Footer
    footer = "sales-crm-main"
    d.text((60, H-80), footer, fill=(100, 116, 139), font=font)
    img.save(path)

for f in files:
    title = f.replace('.png','').replace('-',' ').title()
    placeholder(OUT_DIR / f, title)

print('Generated placeholders in', str(OUT_DIR.resolve()))

