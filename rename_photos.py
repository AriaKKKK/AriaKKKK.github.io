import os

d = '/Users/aria/Documents/kimi/workspace/aria-homepage/src/assets/friends'
for f in os.listdir(d):
    if f.endswith('.JPG') or ' ' in f:
        old = os.path.join(d, f)
        new_name = f.lower().replace(' ', '-')
        new = os.path.join(d, new_name)
        print(f'Rename: {f} -> {new_name}')
        os.rename(old, new)

print('All renamed!')
