for file in assets/img/intro-carousel/*; do cwebp "$file" -o "${file%.*}.webp"; done
for file in assets/img/portfolio/abvv-afspraaken/*; do cwebp "$file" -o "${file%.*}.webp"; done
for file in assets/img/portfolio/abvv-werkloos/*; do cwebp "$file" -o "${file%.*}.webp"; done
for file in assets/img/portfolio/kinext/*; do cwebp "$file" -o "${file%.*}.webp"; done
for file in assets/img/portfolio/pwa-scanner/*; do cwebp "$file" -o "${file%.*}.webp"; done
for file in assets/img/*; do cwebp "$file" -o "${file%.*}.webp"; done