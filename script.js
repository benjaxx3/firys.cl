const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const year = document.getElementById("year");
const carousel = document.getElementById("hero-carousel");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const carouselDots = document.getElementById("carousel-dots");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const correo = String(data.get("correo") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!nombre || !emailOk || !mensaje) {
      formMessage.textContent = "Revisa los campos: todos son obligatorios y el correo debe ser valido.";
      formMessage.className = "text-sm font-medium text-rose-600";
      return;
    }

    formMessage.textContent = "Mensaje enviado. En produccion puedes conectarlo a tu backend o servicio de formularios.";
    formMessage.className = "text-sm font-medium text-emerald-600";
    form.reset();
  });
}

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = carouselDots ? Array.from(carouselDots.querySelectorAll(".carousel-dot")) : [];
  let current = 0;
  let timer = null;

  const renderCarousel = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-white", i === index);
      dot.classList.toggle("bg-white/50", i !== index);
    });
  };

  const goToSlide = (index) => {
    current = (index + slides.length) % slides.length;
    renderCarousel(current);
  };

  const startAutoPlay = () => {
    if (slides.length < 2) {
      return;
    }
    timer = window.setInterval(() => {
      goToSlide(current + 1);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  if (carouselPrev) {
    carouselPrev.addEventListener("click", () => {
      goToSlide(current - 1);
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener("click", () => {
      goToSlide(current + 1);
      stopAutoPlay();
      startAutoPlay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  if (slides.length < 2) {
    if (carouselPrev) {
      carouselPrev.classList.add("hidden");
    }
    if (carouselNext) {
      carouselNext.classList.add("hidden");
    }
    if (carouselDots) {
      carouselDots.classList.add("hidden");
    }
  }

  renderCarousel(current);
  startAutoPlay();
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
