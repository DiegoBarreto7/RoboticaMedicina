
// MENU PARA CELULARES

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const progressBar = document.getElementById("progressBar");

menuToggle.addEventListener("click", () => {

  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );

  menuToggle.textContent = isOpen ? "×" : "☰";

});


// FECHAR MENU AO CLICAR EM UM LINK

mainNav.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";

  });

});


// ANIMAÇÕES DE ENTRADA DOS ELEMENTOS

const revealObserver = new IntersectionObserver(

  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


// APLICAR ANIMAÇÃO AOS ELEMENTOS

document.querySelectorAll(".reveal").forEach(element => {

  revealObserver.observe(element);

});


// BARRA DE PROGRESSO DA PÁGINA

function updateProgress() {

  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollable > 0
      ? (window.scrollY / scrollable) * 100
      : 0;

  progressBar.style.width = `${progress}%`;

}

window.addEventListener("scroll", updateProgress, {
  passive: true
});

updateProgress();


// DESTACAR A SEÇÃO ATUAL NO MENU

const sections = document.querySelectorAll("main section[id]");

const navLinks = document.querySelectorAll(
  "#mainNav a[href^='#']"
);

const sectionObserver = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        navLinks.forEach(link => {

          link.classList.toggle(

            "active",

            link.getAttribute("href") ===
            `#${entry.target.id}`

          );

        });

      }

    });

  },

  {
    rootMargin: "-35% 0px -55% 0px"
  }

);


// OBSERVAR TODAS AS SEÇÕES

sections.forEach(section => {

  sectionObserver.observe(section);

});