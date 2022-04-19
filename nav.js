//NAV LINKS
let navLinksContainer = document.querySelector('.nav-links-container');
let navLinks = document.querySelector('.nav-links');
const hamburgerContainer = document.querySelector('.mobile-nav-btn-container');

window.addEventListener('click', (e)=> {
    if(e.target == navLinksContainer) {
        closeNav();
    }
});
hamburgerContainer.addEventListener('click', ()=> {
    
    if(navLinks.classList.contains('nav-links-open')) {
       closeNav();
    }
    else {
        openNav();
    }
});

let closeNav = ()=> {
    navLinksContainer.classList.remove('overlay');
    navLinks.classList.remove('nav-links-open');
    hamburgerContainer.style = `background-image: url(./images/icon-hamburger.svg)`;
}
let openNav = ()=> {
    navLinksContainer.classList.add('overlay');
    navLinks.classList.add('nav-links-open');
    hamburgerContainer.style = `background-image: url(./images/icon-close-menu.svg)`;
}