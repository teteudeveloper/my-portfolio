document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        if (document.body.classList.contains('active')) {
            document.body.classList.remove('active');
        }
    });
});

let timeout; 

window.onscroll = function() {
    stickyNav();
    hideNavOnScroll();
};

const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;
let lastScrollTop = 0; 
let isScrolling = false; 

function stickyNav() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

function hideNavOnScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScrollTop || currentScroll < lastScrollTop) {
        navbar.classList.add("hidden");
        isScrolling = true;
    }

    if (currentScroll === 0 && !isScrolling) {
        navbar.classList.remove("hidden");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

function stopScrolling() {
    if (window.pageYOffset === 0) {
        navbar.classList.remove("hidden");
    }
    isScrolling = false;
}

window.addEventListener('scroll', () => {
    clearTimeout(timeout); 

    timeout = setTimeout(stopScrolling, 100); 
});

const sections = document.querySelectorAll('section');

function animateSections() {
    const scrollPosition = window.scrollY + window.innerHeight;

    sections.forEach(section => {
        if (scrollPosition > section.offsetTop + 100) {
            section.classList.add('in-view');
        } else {
            section.classList.remove('in-view');
        }
    });
}

window.addEventListener('scroll', animateSections);

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

const menuIcon = document.getElementById('menu-icon');
const body = document.body;

menuIcon.addEventListener('click', () => {
    body.classList.toggle('active');
});
