// Project data
const projects = [
    {
        title: "Project 1",
        description: "Description of your first project",
        image: "project1.jpg",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "#"
    },
    {
        title: "Project 2",
        description: "Description of your second project",
        image: "project2.jpg",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "#"
    }
    // Add more projects as needed
];

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const projectsGrid = document.querySelector('.projects-grid');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('current-year');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Populate projects grid
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link">View Project</a>
        </div>
    `;
    
    return card;
}

function populateProjects() {
    projects.forEach(project => {
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);
    });
}

// Handle contact form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    try {
        // Replace with your actual form handling logic
        console.log('Form submitted:', formObject);
        contactForm.reset();
        alert('Message sent successfully!');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again.');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Update copyright year
currentYearSpan.textContent = new Date().getFullYear();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateProjects();
});
