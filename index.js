const form = document.getElementById('admissionForm');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic client-side validation
      if (!form.checkValidity()) {
        alert('Please fill in all required fields correctly.');
        form.reportValidity();
        return;
      }

      // Simulate form submission
      alert('Thank you! Your application has been submitted successfully.\n\nWe will contact you within 3-5 business days.\nHarford Bridge International School Admissions Team');

      // Optional: Reset form after submission
      // form.reset();

      // In real use, you would send data to a server here using fetch() or Formspree, etc.
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });