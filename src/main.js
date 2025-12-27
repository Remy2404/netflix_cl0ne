import './style.css'

// Function to load HTML sections
async function loadSection(id, file) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

// Load all sections
async function loadSections() {
  await Promise.all([
    loadSection('nav', '/sections/nav.html'),
    loadSection('hero', '/sections/hero.html'),
    loadSection('trending', '/sections/trending.html'),
    loadSection('features', '/sections/features.html'),
    loadSection('faq', '/sections/faq.html'),
    loadSection('pricing', '/sections/pricing.html'),
    loadSection('footer', '/sections/footer.html')
  ]);
}

document.addEventListener('DOMContentLoaded', async () => {
  // Load sections first
  await loadSections();

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
  }

  if (mobileMenuBtn && closeMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
  }

  // Navbar Scroll Logic
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.remove('bg-linear-to-b', 'from-black/80', 'to-transparent');
      navbar.classList.add('bg-black');
    } else {
      navbar.classList.add('bg-linear-to-b', 'from-black/80', 'to-transparent');
      navbar.classList.remove('bg-black');
    }
  });

  // Testimonial Carousel Logic
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const items = track.children;
    const totalItems = items.length;

    function updateCarousel() {
      const translateX = -(currentIndex * 100);
      track.style.transform = `translateX(${translateX}%)`;
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });
  }

  // FAQ Accordion Logic
  const faqButtons = document.querySelectorAll('.faq-btn');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('svg');
      
      // Toggle content visibility
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
      
      // Rotate icon
      icon.classList.toggle('rotate-45');
    });
  });
});
