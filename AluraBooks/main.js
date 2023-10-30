const botaoMenu = document.querySelector('.botton_menu');
const botaoMenuTabletPc = document.querySelector('.botton_menu_tablet_pc');
const menuAtivo = document.querySelector('.open_menu');

botaoMenu.addEventListener('click', () => {
    menuAtivo.classList.toggle('open_menu--ativo');
    botaoMenu.classList.toggle('botton_menu--ativo');
})

botaoMenuTabletPc.addEventListener('click', () => {
    menuAtivo.classList.toggle('open_menu--ativo');
    botaoMenuTabletPc.classList.toggle('botton_menu_tablet_pc--open');
})