const form = document.getElementById('admissionForm');

function setInvalidField(el, message) {
  if (!el) return;
  el.classList.add('invalid');
  try { el.setCustomValidity(message); } catch (e) {}
}

function clearInvalidField(el) {
  if (!el) return;
  el.classList.remove('invalid');
  try { el.setCustomValidity(''); } catch (e) {}
}

function validateForm() {
  let valid = true;

  const firstName = form.querySelector('#firstName');
  const lastName = form.querySelector('#lastName');
  const dob = form.querySelector('#dob');
  const parentEmail = form.querySelector('#parentEmail');
  const parentPhone = form.querySelector('#parentPhone');
  const address = form.querySelector('#address');
  const grade = form.querySelector('#grade');
  const agree = form.querySelector('#agree');

  // Clear previous custom errors
  [firstName, lastName, dob, parentEmail, parentPhone, address, grade, agree].forEach(clearInvalidField);

  // Name validation: letters, spaces, min length 2
  const nameRe = /^[A-Za-z\s'-]{2,}$/;
  if (!firstName.value || !nameRe.test(firstName.value.trim())) {
    setInvalidField(firstName, 'Enter a valid first name (letters only, min 2 characters).');
    valid = false;
  }
  if (!lastName.value || !nameRe.test(lastName.value.trim())) {
    setInvalidField(lastName, 'Enter a valid last name (letters only, min 2 characters).');
    valid = false;
  }

  // DOB: not in the future, reasonable age (<=120, >=2)
  if (!dob.value) {
    setInvalidField(dob, 'Please provide date of birth.');
    valid = false;
  } else {
    const birth = new Date(dob.value);
    const today = new Date();
    if (birth > today) {
      setInvalidField(dob, 'Date of birth cannot be in the future.');
      valid = false;
    } else {
      const age = (today - birth) / (365.25 * 24 * 60 * 60 * 1000);
      if (age < 2) {
        setInvalidField(dob, 'Applicant must be at least 2 years old.');
        valid = false;
      } else if (age > 120) {
        setInvalidField(dob, 'Please enter a valid date of birth.');
        valid = false;
      }
    }
  }

  // Email: rely on browser validity but add check
  if (!parentEmail.value || !parentEmail.checkValidity()) {
    setInvalidField(parentEmail, 'Enter a valid email address.');
    valid = false;
  }

  // Phone: basic pattern allow +, digits, spaces, -, min 7 digits
  const phoneRe = /^\+?[0-9\s-]{7,}$/;
  if (!parentPhone.value || !phoneRe.test(parentPhone.value.trim())) {
    setInvalidField(parentPhone, 'Enter a valid phone number (digits, optional +).');
    valid = false;
  }

  // Address min length
  if (!address.value || address.value.trim().length < 8) {
    setInvalidField(address, 'Enter a more complete address (min 8 characters).');
    valid = false;
  }

  // Grade selection
  if (!grade.value) {
    setInvalidField(grade, 'Select a grade.');
    valid = false;
  }

  // Agree checkbox
  if (!agree.checked) {
    setInvalidField(agree, 'You must confirm the information is accurate.');
    valid = false;
  }

  return valid;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const ok = validateForm();

  // Use browser reportValidity to show messages for the first invalid control
  if (!ok) {
    form.reportValidity();
    return;
  }

  // Prepare form data
  const formData = new FormData(form);
  const payload = {};
  formData.forEach((v, k) => { payload[k] = v; });

  // If a custom endpoint is configured on the form (e.g., Formspree), POST to it
  const endpoint = form.dataset.endpoint;
  if (endpoint) {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => {
      if (res.ok) {
        alert('Thank you! Your application has been submitted successfully.');
        // form.reset();
      } else {
        alert('Submission failed. Opening email client as fallback.');
        openMailClient(payload);
      }
    }).catch(err => {
      console.error('Submit error', err);
      alert('Submission error. Opening email client as fallback.');
      openMailClient(payload);
    });
    return;
  }

  // No endpoint — fall back to opening user's email client via mailto:
  openMailClient(payload);
});

// Helper: normalize recipient and open mail client with prefilled body
function normalizeEmail(raw) {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (trimmed.includes('@')) return trimmed;
  // common mistake: user typed 'name.gmail.com' instead of 'name@gmail.com'
  if (/^[^@\s]+\.gmail\.com$/i.test(trimmed)) return trimmed.replace('.', '@');
  return trimmed;
}

function openMailClient(payload) {
  // recipient provided by user request; update here if needed
  const rawRecipient = 'manamousjack.gmail.com';
  const recipient = normalizeEmail(rawRecipient);
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(recipient)) {
    alert('Recipient email appears invalid: ' + recipient + '. Please provide a valid email or set a POST endpoint on the form.');
    return;
  }

  const subject = encodeURIComponent('HBIS Admission Application');
  let body = '';
  Object.keys(payload).forEach(k => {
    body += `${k}: ${payload[k]}\n`;
  });
  const mailto = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(body)}`;
  // Open mail client
  window.location.href = mailto;
}

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Utility: header offset for sticky navbar
    function getHeaderOffset() {
      const nav = document.querySelector('.navbar');
      return nav ? nav.offsetHeight : 0;
    }

    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink(activeLink) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (activeLink) activeLink.classList.add('active');
    }

// Smooth scroll to section with offset and close mobile menu
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // ignore bare "#" anchors or external links
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
        window.scrollTo({ top, behavior: 'smooth' });
        updateActiveLink(this);
      }
      // Close mobile menu
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

    // Highlight nav item on scroll using IntersectionObserver
const sections = Array.from(navLinks)
  .map(l => l.getAttribute('href'))
  .filter(h => h && h.startsWith('#') && h.length > 1)
  .map(id => document.querySelector(id))
  .filter(Boolean);

if (sections.length > 0) {
  if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: `-${getHeaderOffset()}px 0px -40% 0px`,
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            const link = document.querySelector(`.nav-link[href="${id}"]`);
            if (link) updateActiveLink(link);
          }
        });
      }, observerOptions);

      sections.forEach(s => observer.observe(s));
  } else {
    // Fallback: update on scroll
    window.addEventListener('scroll', () => {
      let current = sections[0];
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top - getHeaderOffset() <= 10) current = section;
      }
      const id = '#' + current.id;
      const link = document.querySelector(`.nav-link[href="${id}"]`);
      if (link) updateActiveLink(link);
    });
  }
}

/* ---------- Gallery carousel ---------- */
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  index++;
  if (index >= slides.length) {
    index = 0;
  }
  updateCarousel();
}

function prevSlide() {
  index--;
  if (index < 0) {
    index = slides.length - 1;
  }
  updateCarousel();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

/* Auto transition every 3 seconds */
setInterval(nextSlide, 3000);

/* ---------- Lazy Loading for Images ---------- */
const imageObserverOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.01
};

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
      // Handle data-src attribute for lazy loading
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      
      // Handle data-srcset for responsive images
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
        img.removeAttribute('data-srcset');
      }
      
      // Stop observing this image once loaded
      imageObserver.unobserve(img);
      
      // Add loaded class for animations if needed
      img.classList.add('image-loaded');
    }
  });
}, imageObserverOptions);

// Observe all images on the page
const allImages = document.querySelectorAll('img');
allImages.forEach(img => {
  imageObserver.observe(img);
});