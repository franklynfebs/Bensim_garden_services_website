// Toggle mobile menu
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
    const navButtons = document.querySelector('.nav-buttons');
    navButtons.classList.toggle('show-nav');
});

// Check Service Availability Within Greater Manchester
const serviceablePostcodes = [
    "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M11", "M12", "M13", "M14", "M15", "M16", "M17", "M18", "M19", 
    "M20", "M21", "M22", "M23", "M24", "M25", "M26", "M27", "M28", "M29", "M30", "M31", "M32", "M33", "M34", "M35", "M38", 
    "M40", "M41", "M43", "M44", "M45", "M46", "M50", "M60", "M61", "M90",
    "BL0", "BL1", "BL2", "BL3", "BL4", "BL5", "BL6", "BL7", "BL8", "BL9",
    "OL1", "OL2", "OL3", "OL4", "OL5", "OL6", "OL7", "OL8", "OL9", "OL10", "OL11", "OL12", "OL16",
    "SK1", "SK2", "SK3", "SK4", "SK5", "SK6", "SK7", "SK8", "SK14", "SK15", "SK16",
    "WN1", "WN2", "WN3", "WN4", "WN5", "WN6", "WN7",
    "WA13", "WA14", "WA15"
];

document.getElementById('postcode-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const postcode = document.getElementById('postcode').value.toUpperCase().trim();
    const resultDiv = document.getElementById('result');
    
    if (serviceablePostcodes.includes(postcode)) {
        resultDiv.innerHTML = `
            <div style="margin: 1%; font-size:1.3rem; color: white; border: 1px solid brown; padding: 10px; border-radius: 5px;">
                <p>Great news! We offer our services in your area. Feel free to reach out to us for more details.</p>
            </div>`;
    } else {
        resultDiv.innerHTML = `
            <div style=" font-size:1.3rem; margin: 1%; color: red; border: 1px solid red; padding: 10px; border-radius: 5px;">
                <p>Sorry, we do not offer services in your area. Please enter a postcode within Greater Manchester.</p>
            </div>`;
    }
});

// Search functionality

// Define the searchable content
const content = [
    // Home Page
    { title: 'Welcome to Bensim Garden Services', text: 'Your trusted partner for all your gardening and maintenance needs. We offer top-quality services to keep your garden looking its best throughout the year.' },
    { title: 'Why Choose Us?', text: 'With over 5 years of experience, our professional team is dedicated to delivering exceptional results with reliability and care.' },
    { title: 'Our Expertise', text: 'We specialize in a range of gardening services, ensuring every aspect of your garden is expertly maintained.' },

    // Services Page
    { title: 'Artificial Grass Laying', text: 'Transform your garden with our high-quality artificial grass laying services, ensuring a lush, green lawn all year round. Our artificial grass is durable and low-maintenance, providing a perfect solution for any garden.' },
    { title: 'Grass Cutting', text: 'Professional grass cutting services for a well-manicured lawn. Our team ensures your grass is cut to the ideal height for a healthy and attractive appearance.' },
    { title: 'Tree Cutting', text: 'Safe and efficient tree cutting and removal services. We handle all aspects of tree management, including pruning and complete removal, to maintain the health and safety of your landscape.' },
    { title: 'Hedge Cutting', text: 'Expert hedge cutting to keep your hedges neat and well-maintained. We offer both shaping and trimming services to enhance the appearance and growth of your hedges.' },
    { title: 'Fencing', text: 'Durable and stylish fencing solutions to enhance your property’s security and appearance. We provide a variety of fencing options to meet your needs and preferences.' },
    { title: 'Decking', text: 'Custom decking solutions to create beautiful and functional outdoor spaces. Our decking services include design and installation, using high-quality materials for lasting results.' },
    { title: 'Painting & Decorating', text: 'Professional painting and decorating services to refresh and enhance the look of your property. We use premium paints and techniques to ensure a flawless finish.' },
    { title: 'Laminate Flooring', text: 'Expert installation of laminate flooring for a stylish and durable finish. Our flooring services include advice on the best options and professional installation.' },
    { title: 'Tiling', text: 'High-quality tiling services for both interior and exterior spaces. We handle everything from design to installation, ensuring a perfect fit and finish.' },
    { title: 'Block Paving', text: 'Reliable block paving services for driveways and paths. We use high-quality materials to create durable and aesthetically pleasing surfaces.' },
    { title: 'Flagging & Plastering', text: 'Expert flagging and plastering services to improve the look and functionality of your outdoor and indoor spaces.' },
    { title: 'Removals', text: 'Efficient and reliable removal services to help you move items or clear spaces quickly and safely.' },

    // About Page
    { title: 'About Us', text: 'Bensim Garden Services has been serving the community with professional gardening and maintenance solutions for over 5 years. Our team is committed to providing high-quality services tailored to your needs.' },
    { title: 'Our Mission', text: 'To deliver exceptional gardening services with a focus on reliability, quality, and customer satisfaction.' },
    { title: 'Our Team', text: 'Meet our skilled team of gardening professionals who are passionate about making your garden look its best. Each member brings expertise and dedication to every project.' },

    // Contact Page
    { title: 'Contact Information', text: 'General Inquiries: bensimgardeningservices@gmail.com, Phone: +44 7377 088442, Operating Hours: Monday - Saturday, 9 AM - 6 PM.' },
    { title: 'Get In Touch', text: 'Use our contact form to reach us for any inquiries or feedback. Provide your name, email, and message, and we\'ll get back to you shortly.' },
    { title: 'Social Media', text: 'Connect with us on Facebook, Instagram, WhatsApp, and via Email for the latest updates and direct communication.' },

    // Additional Content
    { title: 'Reliability', text: 'Our team is committed to providing reliable and high-quality services you can count on. We prioritize customer satisfaction and strive for excellence in every job we undertake.' },
    { title: 'Free Quotations', text: 'Contact us for a free quotation on any of our gardening services. We provide transparent and competitive pricing to suit your needs.' },
    { title: 'Customer Reviews', text: 'Read what our satisfied customers have to say about our services and the exceptional results we deliver. Your feedback is important to us and helps us improve our services.' }
];

// Index the content for search
const indexContent = (content) => {
    return content.map(item => ({
        title: item.title.toLowerCase(),
        text: item.text.toLowerCase().split(' ')
    }));
};

const indexedContent = indexContent(content);

// Tokenize input
const tokenizeInput = (input) => {
    return input.toLowerCase().split(' ');
};

// Match content
const matchContent = (tokens, indexedContent) => {
    return indexedContent.filter(item => {
        return tokens.some(token => item.text.includes(token));
    });
};

// Search function
function search(query) {
    const tokens = tokenizeInput(query);
    const matchedContent = matchContent(tokens, indexedContent);
    return matchedContent;
}

document.getElementById('search-bar').addEventListener('input', () => {
    performSearch();
});

function performSearch() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    // Define user queries
    const userQueries = [
        "how can i get my garden well taken care of?",
        "I need a gardener",
        "why is my greater manchester post code not working? i really need a gardener now.",
        "Can you help me with my garden?",
        "Looking for garden maintenance services",
        "Do you provide tree cutting services?",
        "I need help with grass cutting",
        "Hedge trimming services in Greater Manchester",
        "Fencing services near me",
        "Decking installation in Manchester",
        "Painting and decorating for garden",
        "Best laminate flooring services",
        "Tiling experts in Greater Manchester",
        "Artificial grass installation",
        "Gardening and maintenance",
        "Reliable garden services",
        "Garden services near me",
        "Emergency gardening help",
        "Landscaping services in Manchester",
        "Pruning and trimming services",
        "Affordable garden services",
        "Quick garden maintenance",
        "Expert gardeners in Manchester",
        "Professional gardening company",
        "Local gardening services",
        "Gardening tips and services",
        "Hire a gardener in Manchester",
        "Gardening advice",
        "Best gardening services",
        "Gardening company contact",
        "Find a gardener near me",
        "Gardening service inquiry",
        "Block paving for driveways",
        "Flagging and plastering services",
        "Need help with removals",
        "General gardening inquiries",
        "Contact Bensim Garden Services",
        "Follow Bensim Garden Services on social media",
        "Request a free quotation",
        "Customer reviews for Bensim Garden Services",
        "Reliable gardening services"
    ];

    // Add your search function here

    // Filter the content based on the search query
    const results = content.filter(item => item.title.toLowerCase().includes(query) || item.text.toLowerCase().includes(query));

    // Display the search results
    if (results.length > 0) {
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }

    // Show search results and the close button
    resultsContainer.classList.remove('hidden');
    document.getElementById('close-results-button').classList.remove('hidden');
}

// Hide search results when clicking the close button
document.getElementById('close-results-button').addEventListener('click', function() {
    document.getElementById('search-results').classList.add('hidden');
    this.classList.add('hidden');
});

// Image slider functionality
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}

setInterval(nextSlide, 3000);

// Swipe up/down functionality
let startY;
let endY;
const contentSection = document.querySelector('.content-section');

contentSection.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

contentSection.addEventListener('touchmove', (event) => {
    endY = event.touches[0].clientY;
});

contentSection.addEventListener('touchend', () => {
    if (startY > endY + 50) {
        contentSection.classList.add('swipe-up');
    } else if (endY > startY + 50) {
        contentSection.classList.remove('swipe-up');
    }
});

/*Toggle_btn behavior */
const menuToggle = document.getElementById("menuToggle");
const navButtons = document.querySelector(".nav-buttons");
const menuOverlay = document.getElementById("menuOverlay");



menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
});

menuOverlay.addEventListener("click", () => {
  menuToggle.classList.remove("active");
  navButtons.classList.remove("show-nav");
  menuOverlay.classList.remove("active");
});