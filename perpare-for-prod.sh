minify -o assets/css/style.min.css assets/css/style.css
minify -o assets/css/offerte/offer.min.css assets/css/offerte/offer.css

terser --compress --mangle --output assets/js/main.min.js assets/js/main.js
terser --compress --mangle --output assets/js/init-sw.min.js assets/js/init-sw.js
terser --compress --mangle --output assets/js/navbar.min.js assets/js/navbar.js
terser --compress --mangle --output assets/js/offerte/jquery.bootstrap.wizard.min.js assets/js/offerte/jquery.bootstrap.wizard.js


sed -i 's/style.css/style.min.css/' index.html
sed -i 's/main.js/main.min.js/' index.html
sed -i 's/init-sw.js/init-sw.min.js/' index.html
sed -i 's/navbar.js/navbar.min.js/' index.html

sed -i 's/style.css/style.min.css/' en/index.html
sed -i 's/main.js/main.min.js/' en/index.html
sed -i 's/init-sw.js/init-sw.min.js/' en/index.html
sed -i 's/navbar.js/navbar.min.js/' en/index.html

sed -i 's/style.css/style.min.css/' offerte/index.html
sed -i 's/offer.css/offer.min.css/' offerte/index.html
sed -i 's/init-sw.js/init-sw.min.js/' offerte/index.html
sed -i 's/navbar.js/navbar.min.js/' offerte/index.html
sed -i 's/wizard.js/wizard.min.js/' offerte/index.html

sed -i 's/style.css/style.min.css/' en/offer/index.html
sed -i 's/offer.css/offer.min.css/' en/offer/index.html
sed -i 's/init-sw.js/init-sw.min.js/' en/offer/index.html
sed -i 's/navbar.js/navbar.min.js/' en/offer/index.html
sed -i 's/wizard.js/wizard.min.js/' en/offer/index.html