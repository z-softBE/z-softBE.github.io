minify -o assets/css/style.min.css assets/css/style.css

terser --compress --mangle --output assets/js/main.min.js assets/js/main.js

sed -i 's/style.css/style.min.css/' index.html
sed -i 's/main.js/main.min.js/' index.html