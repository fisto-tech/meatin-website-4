with open('src/components/HeroSection.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Update default prop
text = text.replace(
    'export const HeroSection: React.FC<HeroSectionProps> = ({ totalFrames = 563 }) => {',
    'export const HeroSection: React.FC<HeroSectionProps> = ({ totalFrames = 1271 }) => {'
)

# Update paths in getReadyImg and loadFrame
old_path_1 = '''        const frameStr = String(num).padStart(5, '0');
        const src = `/Home/Hero/video-frames-opt/${frameStr}.jpg`;'''
new_path_1 = '''        const frameStr = String(num).padStart(5, '0');
        const src = `/Home/Hero/hero-video/${frameStr}.webp`;'''

assert old_path_1 in text, "old_path_1 not found"
text = text.replace(old_path_1, new_path_1)

old_path_2 = '''    const frameStr = String(frameNum).padStart(5, '0');
    const src = `/Home/Hero/video-frames-opt/${frameStr}.jpg`;'''
new_path_2 = '''    const frameStr = String(frameNum).padStart(5, '0');
    const src = `/Home/Hero/hero-video/${frameStr}.webp`;'''

assert old_path_2 in text, "old_path_2 not found"
text = text.replace(old_path_2, new_path_2)

with open('src/components/HeroSection.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated HeroSection.tsx successfully!')

