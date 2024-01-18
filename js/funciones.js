var swiper = new Swiper(".slide-content", {
    slidesPerView: 5,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 5,
        },}
});

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});

const flagsElement1 = document.getElementById('flag1');
const flagsElement2 = document.getElementById('flag2');
const flagsElement3 = document.getElementById('flag3');
const textsToChange = document.querySelectorAll('[data-section]');

const changeLenguaje = async (lenguaje) => {
    const requestJson = await fetch(`./lenguajes/${lenguaje}.json`);
    const texts = await requestJson.json();

    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        if (section == "forms" && (value == "r1"|| value == "r2")) {
            textToChange.innerHTML = texts[section][value]
        } else {
            if (section == "forms" && value != "r8") {
                textToChange.placeholder = texts[section][value]
            } else {
                if (section == "forms" && value == "r8") {
                    textToChange.innerHTML = texts[section][value]
                }
                textToChange.value = texts[section][value]
            }
        }

        if (section != "forms") {
            textToChange.innerHTML = texts[section][value];
        }
    }
};

flagsElement1.addEventListener("click", (e) => {
    changeLenguaje(e.target.parentElement.dataset.lenguaje);
});
flagsElement2.addEventListener("click", (e) => {
    changeLenguaje(e.target.parentElement.dataset.lenguaje);
});
flagsElement3.addEventListener("click", (e) => {
    changeLenguaje(e.target.parentElement.dataset.lenguaje);
});

const miBoton = document.getElementById('btnIdioma');

function cambiartexto(nuevoTexto) {
    miBoton.innerHTML = `<div class="inline-flex items-center">
    <img src="img/${nuevoTexto}.png" alt="" class="rounded-full h-4 w-4 object-cover mr-2">                                        
    ${nuevoTexto}
</div>`
}

function conducirASeccion(idSeccion) {
    // Obtener la referencia a la sección de destino mediante su id
    const seccionDestino = document.getElementById(idSeccion);

    // Usar el método scrollIntoView para desplazarse a la sección de destino
    seccionDestino.scrollIntoView({ behavior: 'smooth' });
}