const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-links');

menuButton.hidden = false;
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.extension-card');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  document.querySelector('.collection-count').textContent = `${count} extension${count === 1 ? '' : 's'}`;
}));

const themes = { lime: ['Lime', '01'], violet: ['Violet', '02'], blue: ['Blue', '03'], coral: ['Coral', '04'] };
const swatches = document.querySelectorAll('.swatch');
swatches.forEach(button => button.addEventListener('click', () => {
  const theme = button.dataset.theme;
  document.querySelector('.live-preview').dataset.theme = theme;
  document.querySelector('#theme-name').textContent = themes[theme][0];
  document.querySelector('#preview-color').textContent = `${theme.toUpperCase()} / ${themes[theme][1]}`;
  swatches.forEach(swatch => {
    const selected = swatch === button;
    swatch.classList.toggle('selected', selected);
    swatch.setAttribute('aria-pressed', String(selected));
  });
}));
document.querySelector('#year').textContent = new Date().getFullYear();

