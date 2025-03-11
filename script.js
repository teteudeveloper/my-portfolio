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

window.onscroll = function() {
    stickyNav();
};

const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;

function stickyNav() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

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
