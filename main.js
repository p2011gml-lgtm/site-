// Menu mobile
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  btn.setAttribute('aria-expanded', false);
}));

// Animação de entrada ao rolar
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contador
document.querySelectorAll('[data-count]').forEach(el => {
  const end = +el.dataset.count, suffix = el.dataset.suffix || '';
  const obs = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    let n = 0;
    const t = setInterval(() => {
      n++; el.textContent = n + suffix;
      if (n >= end) clearInterval(t);
    }, 90);
    obs.disconnect();
  });
  obs.observe(el);
});

// Formulário -> WhatsApp
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target, nome = f.nome;
  if (!nome.value.trim()) { nome.classList.add('invalid'); nome.focus(); return; }
  nome.classList.remove('invalid');
  const texto =
    `Olá! Meu nome é ${nome.value.trim()}.` +
    (f.idade.value ? ` Tenho interesse para uma criança de ${f.idade.value}.` : '') +
    ` Período: ${f.periodo.value}.` +
    (f.msg.value ? ` ${f.msg.value}` : '') +
    ` Gostaria de agendar uma visita à Escola Jean Piaget.`;
  window.open('https://wa.me/557184225217?text=' + encodeURIComponent(texto), '_blank', 'noopener');
});

document.getElementById('ano').textContent = new Date().getFullYear();
