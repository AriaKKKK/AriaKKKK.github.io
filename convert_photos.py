import subprocess
import os
import glob
import shutil

src = '/Users/aria/Desktop/Photo'
dst = '/Users/aria/Documents/kimi/workspace/aria-homepage/src/assets/friends'
os.makedirs(dst, exist_ok=True)

# Find all HEIC files
heic_files = []
for folder in ['2023', '2024', '2025', '2026']:
    heic_files.extend(glob.glob(os.path.join(src, folder, '*.HEIC')))
    heic_files.extend(glob.glob(os.path.join(src, folder, '*.heic')))

print('Found HEIC files:', heic_files)

for f in heic_files:
    bn = os.path.splitext(os.path.basename(f))[0]
    out_path = os.path.join(dst, bn + '.jpg')
    print(f'Converting {f} -> {out_path}')
    subprocess.run(['sips', '-s', 'format', 'jpeg', f, '--out', out_path], check=False)

# Copy all JPG files
jpg_files = []
for folder in ['2023', '2024', '2025', '2026']:
    jpg_files.extend(glob.glob(os.path.join(src, folder, '*.JPG')))
    jpg_files.extend(glob.glob(os.path.join(src, folder, '*.jpg')))

print('Found JPG files:', jpg_files)

for f in jpg_files:
    bn = os.path.basename(f)
    out_path = os.path.join(dst, bn)
    print(f'Copying {f} -> {out_path}')
    shutil.copy2(f, out_path)

print('Done!')
