const menu = document.getElementById('menu');
const menuButton = document.querySelector('.menu-button');
menu.remove();

const toggleMenu = (event) => {
  event.stopPropagation();
  if(menuButton.contains(menu)) menu.remove();
  else menuButton.appendChild(menu);
}

menuButton.addEventListener('click', toggleMenu);

window.addEventListener('click', () => {
  if(menuButton.contains(menu)) menu.remove();
});
