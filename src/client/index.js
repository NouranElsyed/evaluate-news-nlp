// js files
import { handleSubmit } from './js/formHandler.js'


const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

// alert("I EXIST")
// console.log("CHANGE!!");

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js') 
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// sass files
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/resets.scss';

