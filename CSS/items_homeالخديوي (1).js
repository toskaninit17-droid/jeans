// items_homeالخديوي.js — نسخة كاملة مُصلّحة وتضيف code_new دون المساس بـ code القديم

fetch('productsالخديوي.json')
  .then(response => response.json())
  .then(data => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // عناصر السلايدر (قد لا تكون كلها موجودة على الصفحة)
    const swiper_items_sale   = document.getElementById("swiper_items_sale");
    const swiper_WideLegPants = document.getElementById("swiper_WideLegPants");
    const swiper_Boyfriend    = document.getElementById("swiper_Boyfriend");
    const swiper_Charleston   = document.getElementById("swiper_Charleston");
    const swiper_Milton       = document.getElementById("swiper_Milton");
    const swiper_waterproo    = document.getElementById("swiper_waterproo");
    const swiper_Classic      = document.getElementById("swiper_Classic");
    const swiper_Skinny       = document.getElementById("swiper_Skinny");
    const swiper_skert        = document.getElementById("swiper_skert");
    const swiper_Balloon      = document.getElementById("swiper_Balloon");
    const swiper_top          = document.getElementById("swiper_top");

    // —— Helpers ——
    function safeAppend(container, html) {
      if (container) container.insertAdjacentHTML('beforeend', html);
    }

    function inCart(id) {
      return cart.some(ci => String(ci.id) === String(id));
    }

    function percent(oldP, p) {
      const oldPrice = Number(oldP);
      const price = Number(p);
      if (!oldPrice || isNaN(oldPrice) || isNaN(price) || oldPrice === 0) return 0;
      return Math.max(0, Math.floor((oldPrice - price) / oldPrice * 100));
    }

    // توليد code_new وقت التشغيل (لا نلمس code القديم)
    function makeNewCode(prod, idx) {
      const cat = (prod.category || prod.catetory || prod.name || '').toString();
      const letters = (cat.match(/[A-Za-z]+/g) || []).join('').toUpperCase();
      const prefix = (letters.slice(0,3) || 'SKU');
      const num = Number.isInteger(+prod.id) ? +prod.id : (idx + 1);
      return `${prefix}-${String(num).padStart(4,'0')}`;
    }

    // تهيئة البيانات: أضف code_new لو ناقص فقط
    data = (Array.isArray(data) ? data : []).map((p, i) => ({
      ...p,
      code_new: p.code_new || makeNewCode(p, i)
    }));

    function codeLines(product) {
      return `
        <p class="product-code" style="font-size:12px;color:#666;margin-top:4px;">الكود: ${product.code || '-'}</p>
        <p class="product-new-code" style="font-size:12px;color:#2b6;margin-top:2px;">الكود الجديد: ${product.code_new || '-'}</p>
      `;
    }

    function priceBlock(product) {
      const oldP = product.old_price ? `<p class="old_price">LE:${product.old_price}</p>` : "";
      return `
        <div class="price">
          <p><span>EGP ${product.price}</span></p>
          ${oldP}
        </div>
      `;
    }

    function cardHTML(product) {
      const isIncart = inCart(product.id);
      const pDisc = product.old_price ? percent(product.old_price, product.price) : 0;
      const discHTML = product.old_price ? `<span class="sale_present">%${pDisc}</span>` : "";
      return `
        <div class="swiper-slide product" id="product-${product.id}" data-code="${product.code || product.code_new || ''}">
          ${discHTML}
          <div class="img_product">
            <img src="${product.img}" alt="">
          </div>
          <p class="name_product">${product.name}</p>
          ${codeLines(product)}
          ${priceBlock(product)}
          <div class="icons">
            <span class="btn_add_cart ${isIncart ? 'active' : ''}" data-id="${product.id}" data-code="${product.code || product.code_new || ''}">
              <i class="fa-solid fa-cart-shopping"></i>${isIncart ? 'Item in cart' : 'أضف للسلة'}
            </span>
          </div>
        </div>
      `;
    }

    function renderByCat(container, catName) {
      // المفتاح في ملفك هو "catetory"
      data.forEach(product => {
        if (product.catetory == catName) {
          safeAppend(container, cardHTML(product));
        }
      });
    }

    // —— عروض ساخنة (old_price موجود) ——
    data.forEach(product => {
      if (product.old_price) {
        safeAppend(swiper_items_sale, cardHTML(product));
      }
    });

    // —— الأقسام —— (استدعاءات آمنة)
    renderByCat(swiper_WideLegPants, "WideLegPants");
    renderByCat(swiper_Boyfriend,    "Boyfriend");
    renderByCat(swiper_Charleston,   "Charleston");
    renderByCat(swiper_Milton,       "Milton");
    renderByCat(swiper_waterproo,    "waterproo");
    renderByCat(swiper_Classic,      "Classic");
    renderByCat(swiper_Skinny,       "Skinny");
    renderByCat(swiper_skert,        "skert");
    renderByCat(swiper_Balloon,      "Balloon");
    renderByCat(swiper_top,          "top");
  })
  .catch(err => {
    console.error('Failed to load products:', err);
  });
