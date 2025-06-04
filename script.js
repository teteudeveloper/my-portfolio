let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });


let header = document.querySelector('.header');

header.classList.toggle('sticky', window.scrollY > 100);


menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

};


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});


let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};


ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        nome: form.querySelector('input[name="nome"]').value,
        email: form.querySelector('input[name="email"]').value,
        telefone: form.querySelector('input[name="telefone"]').value,
        assunto: form.querySelector('input[name="assunto"]').value,
        mensagem: form.querySelector('textarea[name="mensagem"]').value,
        dataEnvio: new Date().toLocaleString()
    };

    const relatorio = `
        Novo Contato Recebido:
        
        Nome: ${formData.nome}
        Email: ${formData.email} 
        Telefone: ${formData.telefone}
        Assunto: ${formData.assunto}
        Mensagem: ${formData.mensagem}
        Data/Hora: ${formData.dataEnvio}
    `;

    fetch("https://formspree.io/f/xgvyegde", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...formData,
            relatorio: relatorio
        })
    })
    .then(response => {
        if(response.ok) {
            alert("Mensagem enviada com sucesso!");
            form.reset();
        } else {
            throw new Error("Erro ao enviar mensagem");
        }
    })
    .catch(error => {
        alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
        console.error(error);
    });
});