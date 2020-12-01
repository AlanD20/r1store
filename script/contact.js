const contactFormEvent = document.querySelector("#contactForm");
const contactContainerElement = document.querySelector('.contactContainer');


contactFormEvent.addEventListener('submit', e=>{
    e.preventDefault();   
    
    notify('Thank you for contacting us! We will get back to you soon.', 3000);  
});