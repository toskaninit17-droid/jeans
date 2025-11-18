// items_homeالخديوي.js — توليد code_new بدون لمس code القديم + عرضهم على الكروت  WideLegPants2
fetch('productsالخديوي.json')
  .then(r => r.json())
  .then(data => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const swiper_items_sale   = document.getElementById("swiper_items_sale");
    const swiper_WideLegPants = document.getElementById("swiper_WideLegPants");
    const swiper_WideLegPants2 = document.getElementById("swiper_WideLegPants2");
    
    const swiper_Charleston   = document.getElementById("swiper_Charleston");
    const swiper_Milton       = document.getElementById("swiper_Milton");
    const swiper_waterproo    = document.getElementById("swiper_waterproo");
    const swiper_Jackets      = document.getElementById("swiper_Jackets");
    const swiper_kids       = document.getElementById("swiper_kids");
    const swiper_skert        = document.getElementById("swiper_skert");
    const swiper_Balloon      = document.getElementById("swiper_Balloon");
    const swiper_top          = document.getElementById("swiper_top");

    const safeAppend = (el, html) => el && el.insertAdjacentHTML('beforeend', html);
    const inCart = id => cart.some(x => String(x.id) === String(id));
    const pct = (oldp, p) => (!oldp || +oldp === 0) ? 0 : Math.max(0, Math.floor((oldp - p) / oldp * 100));

    const makeNewCode = (p, i) => {
      const cat = (p.category || p.catetory || p.name || '').toString();
      const letters = (cat.match(/[A-Za-z]+/g) || []).join('').toUpperCase();
      const prefix = (letters.slice(0,3) || 'SKU');
      const num = Number.isInteger(+p.id) ? +p.id : (i + 1);
      return `${prefix}-${String(num).padStart(4,'0')}`;
    };

    data = (Array.isArray(data) ? data : []).map((p,i) => ({ ...p, code_new: p.code_new || p.code || makeNewCode(p,i) }));

    const codeLines = p => `
      <p class="product-code" style="font-size:12px;color:#666;margin-top:4px;">الكود: ${p.code || '-'}</p>
      <p class="product-new-code" style="font-size:12px;color:#2b6;margin-top:2px;">الكود الجديد: ${p.code_new || '-'}</p>
    `;

    const priceBlock = p => `
      <div class="price">
        <p><span>EGP ${p.price}</span></p>
        ${p.old_price ? `<p class="old_price">LE:${p.old_price}</p>` : ''}
      </div>
    `;

    const cardHTML = p => {
      const disc = p.old_price ? `<span class="sale_present">%${pct(+p.old_price, +p.price)}</span>` : '';
      const active = inCart(p.id) ? 'active' : '';
      const btnTxt = inCart(p.id) ? 'Item in cart' : 'أضف للسلة';
      return `
        <div class="swiper-slide product" id="product-${p.id}" data-code="${p.code || ''}" data-newcode="${p.code_new || ''}">
          ${disc}
          <div class="img_product"><img src="${p.img}" alt=""></div>
          <p class="name_product">${p.name}</p>
          ${codeLines(p)}
          ${priceBlock(p)}
          <div class="icons">
            <span class="btn_add_cart ${active}" data-id="${p.id}" data-code="${p.code || ''}" data-newcode="${p.code_new || ''}">
              <i class="fa-solid fa-cart-shopping"></i>${btnTxt}
            </span>
          </div>
        </div>
      `;
    };

    const renderByCat = (el, cat) => data.forEach(p => { if (p.catetory == cat) safeAppend(el, cardHTML(p)); });

    // عروض
    data.forEach(p => { if (p.old_price) safeAppend(swiper_items_sale, cardHTML(p)); });

    // أقسام
    renderByCat(swiper_WideLegPants, "WideLegPants");
    renderByCat(swiper_WideLegPants2, "WideLegPants2");
    
    renderByCat(swiper_Charleston,   "Charleston");
    renderByCat(swiper_Milton,       "Milton");
    renderByCat(swiper_waterproo,    "waterproo");
    renderByCat(swiper_Jackets,      "Jackets");
    renderByCat(swiper_kids,       "kids");
    renderByCat(swiper_skert,        "skert");
    renderByCat(swiper_Balloon,      "Balloon");
    renderByCat(swiper_top,          "top");
  })
  .catch(e => console.error('Failed to load products:', e));
