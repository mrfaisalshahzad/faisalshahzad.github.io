// Typewriter Effect
const text = "Faisal Shahzad – Fintech Sales Leader";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
typeWriter();

// Timeline Toggle
document.querySelectorAll('.toggle-details').forEach(button => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    details.classList.toggle('hidden');
  });
});

// Animate Skills on Scroll
window.addEventListener('scroll', () => {
  document.querySelectorAll('.bar').forEach(bar => {
    const skillLevel = bar.dataset.skill;
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      bar.style.setProperty('--width', `${skillLevel}%`);
      bar.style.width = `${skillLevel}%`;
    }
  });
});

// Light/Dark Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = document.querySelector('#theme-toggle i');
  icon.classList.toggle('fa-sun');
  icon.classList.toggle('fa-moon');
});

// Contact Form Validation
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const status = document.getElementById("form-status");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    status.textContent = "Please enter a valid email address.";
    status.style.color = "red";
  } else {
    status.textContent = "Message sent successfully!";
    status.style.color = "green";
    this.reset();
  }
});
