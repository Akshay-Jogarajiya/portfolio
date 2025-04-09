// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const header = document.querySelector('.header');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navList = document.querySelector('.nav-list');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
  // Reveal animations when page loads
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    element.style.opacity = '1';
  });
  
  // Initialize skill progress bars
  animateSkillBars();
});

// Navbar Active State Control
function setActiveLink() {
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = sectionId;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Header Scroll Effect
function headerScroll() {
  if (window.scrollY > 50) {
    header.style.padding = '0.7rem 0';
    header.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.padding = '1rem 0';
    header.style.boxShadow = 'none';
  }
}

// Animate skill bars when they come into view
function animateSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-bar-fill');
        progressBar.style.width = progressBar.style.width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillItems.forEach(item => {
    observer.observe(item);
  });
}

// Mobile Navigation Toggle
mobileNavToggle.addEventListener('click', () => {
  mobileNavToggle.classList.toggle('active');
  navList.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNavToggle.classList.remove('active');
    navList.classList.remove('active');
  });
});

// Scroll Events
window.addEventListener('scroll', () => {
  setActiveLink();
  headerScroll();
});

// Intersection Observer for animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.project-card, .skill-item, .contact-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    observer.observe(element);
  });
};

animateOnScroll();

// Contact Form Submission
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Basic validation
  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill all required fields.';
    formMessage.className = 'form-message error';
    return;
  }
  
  // Email format validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!email.match(emailPattern)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.className = 'form-message error';
    return;
  }
  
  // Simulate form submission (in a real app, this would be an AJAX request to a server)
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  setTimeout(() => {
    // Simulate successful submission
    formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
    formMessage.className = 'form-message success';
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      formMessage.textContent = '';
    }, 5000);
  }, 1500);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop - 80;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("https://formsubmit.co/39b2f4e8bce62b15736814d6e2e36a32", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        messageBox.innerHTML = "<span style='color: green;'>✅ Message sent successfully!</span>";
        form.reset();
      } else {
        messageBox.innerHTML = "<span style='color: red;'>❌ Something went wrong. Please try again.</span>";
      }
    })
    .catch(error => {
      messageBox.innerHTML = "<span style='color: red;'>❌ Failed to send message. Try again later.</span>";
    });
  });

