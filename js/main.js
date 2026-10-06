'use strict';
const upButton = document.querySelector('.up');
const sections = Array.from(document.querySelectorAll('section'));
const navbar = document.getElementById('navbar');
const navList = document.createElement('ul');
const navLinks = sections.map(section => {
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.textContent = section.getAttribute('title');
  link.href = '#' + section.id;
  link.classList.add('nav-link');
  item.appendChild(link);
  navList.appendChild(item);
  return link;
});
navbar.appendChild(navList);

function updateNavigation() {
  const headerBottom = document.querySelector('header').getBoundingClientRect().bottom + 16;
  let activeIndex = 0;
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    section.classList.toggle('inVeiow', rect.top < window.innerHeight && rect.bottom > 0);
    if (rect.top <= headerBottom) activeIndex = index;
  });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    activeIndex = sections.length - 1;
  }
  sections.forEach((section, index) => {
    const active = index === activeIndex;
    section.classList.toggle('active', active);
    navLinks[index].classList.toggle('active', active);
    if (active) navLinks[index].setAttribute('aria-current', 'location');
    else navLinks[index].removeAttribute('aria-current');
  });
  upButton.style.display = window.scrollY >= 300 ? 'block' : 'none';
}
let scheduled = false;
function scheduleUpdate() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(() => {
    scheduled = false;
    updateNavigation();
  });
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('load', updateNavigation);
upButton.addEventListener('click', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ left: 0, top: 0, behavior: reduced ? 'auto' : 'smooth' });
});
updateNavigation();

document.getElementById('loginForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('password').value = '';
  document.getElementById('loginStatus').textContent = 'Demo complete. No account was signed in and no credentials were sent.';
});