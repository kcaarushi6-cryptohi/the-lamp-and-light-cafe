// ---------- Menu data (edit your items here) ----------
const MENU = {
  "Coffee & Espresso": [
    ["Signature Espresso", "Rich, bold single-origin shot with a velvety crema.", ["Vegan", "Gluten-Free"]],
    ["Flat White", "Silky steamed milk over a double ristretto.", ["Gluten-Free"]],
    ["Café Latte", "Smooth espresso with creamy steamed milk, hot or iced.", ["Gluten-Free"]],
    ["Cold Brew", "Slow-steeped for 18 hours, naturally sweet and smooth.", ["Vegan", "Gluten-Free"]]
  ],
  "Teas & Drinks": [
    ["Masala Chai", "Spiced tea simmered with milk, ginger and cardamom.", ["Gluten-Free"]],
    ["Green Tea", "Fragrant, light and refreshing.", ["Vegan", "Gluten-Free"]],
    ["Fresh Lemonade", "Squeezed to order with a hint of mint.", ["Vegan", "Gluten-Free"]],
    ["Hot Chocolate", "Dark cocoa, steamed milk and a touch of cream.", ["Gluten-Free"]]
  ],
  "Bakery & Pastries": [
    ["Butter Croissant", "Flaky, golden and baked fresh every morning.", []],
    ["Cinnamon Roll", "Soft, swirled with cinnamon and glaze.", []],
    ["Chocolate Brownie", "Fudgy and rich with a crackly top.", ["Gluten-Free"]],
    ["Banana Walnut Loaf", "Moist, naturally sweet and dairy-free.", ["Vegan"]]
  ],
  "Breakfast & Lunch": [
    ["Avocado Toast", "Sourdough, smashed avocado, chili flakes and seeds.", ["Vegan"]],
    ["Veggie Omelette", "Farm eggs folded with seasonal vegetables.", ["Gluten-Free"]],
    ["Grilled Sandwich", "Toasted bread, melted cheese and fresh greens.", []],
    ["Garden Salad", "Crisp greens with house vinaigrette.", ["Vegan", "Gluten-Free"]]
  ]
};

// ---------- Tabbed menu ----------
const tabs = document.getElementById('tabs');
const items = document.getElementById('items');

function showCategory(name) {
  [...tabs.children].forEach(b => b.classList.toggle('on', b.textContent === name));
  items.innerHTML = MENU[name].map(i => `
    <div class="item">
      <h3>${i[0]}</h3>
      <p>${i[1]}</p>
      ${i[2].map(t => `<span class="tag ${t === 'Vegan' ? '' : 'g'}">${t}</span>`).join('')}
    </div>`).join('');
}

Object.keys(MENU).forEach(name => {
  const b = document.createElement('button');
  b.className = 'tab';
  b.textContent = name;
  b.onclick = () => showCategory(name);
  tabs.appendChild(b);
});
showCategory("Coffee & Espresso");

// ---------- Gallery + lightbox (uses gallery-1.jpg ... gallery-6.jpg) ----------
const GALLERY_LABELS = ['Cafe Ambience', 'Signature Coffee', 'Fresh Pastries', 'Cozy Corner', 'Breakfast Plate', 'Latte Art'];
const gal = document.getElementById('gal');
const lb = document.getElementById('lb');
const lbc = document.getElementById('lbc');

GALLERY_LABELS.forEach((label, i) => {
  const n = i + 1;
  const d = document.createElement('div');
  d.className = 'ph';
  d.innerHTML = `<span>[INSERT GALLERY PHOTO ${n}]<br>${label}</span>
                 <img src="gallery-${n}.jpg" alt="${label}" onerror="this.remove()">`;
  d.onclick = () => {
    const img = d.querySelector('img');
    lbc.innerHTML = img
      ? `<img src="${img.src}" alt="${label}">`
      : `<span>[INSERT GALLERY PHOTO ${n}]<br>${label}</span>`;
    lb.classList.add('on');
  };
  gal.appendChild(d);
});

lb.onclick = e => { if (!lbc.contains(e.target)) lb.classList.remove('on'); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('on'); });

// ---------- Opening hours (Mon–Sun 7:00 AM – 8:30 PM, today highlighted) ----------
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = DAYS[new Date().getDay()];
document.getElementById('hours').innerHTML =
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    .map(d => `<tr class="${d === today ? 'today' : ''}"><td>${d}</td><td>7:00 AM – 8:30 PM</td></tr>`)
    .join('');

// ---------- Sticky header + mobile menu ----------
const hd = document.getElementById('hd');
const nav = document.getElementById('nav');
addEventListener('scroll', () => hd.classList.toggle('s', scrollY > 40), { passive: true });
document.getElementById('burger').onclick = () => nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a => a.onclick = () => nav.classList.remove('open'));

// ---------- Newsletter (front-end only) ----------
document.getElementById('sub').onclick = () => {
  const v = document.getElementById('em').value;
  document.getElementById('nlm').textContent =
    /\S+@\S+\.\S+/.test(v) ? 'Thank you for subscribing!' : 'Please enter a valid email.';
};

// ---------- Footer year ----------
document.getElementById('yr').textContent = new Date().getFullYear();

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));