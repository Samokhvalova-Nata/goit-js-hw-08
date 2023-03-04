import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state"

const form = document.querySelector('.feedback-form');
const input = form.querySelector('input');
const textarea = form.querySelector('textarea');

const formData = {};

form.addEventListener('input', throttle(hahdleInputChange, 500));
form.addEventListener('submit', handleFormSubmit);

populateInputs();

function hahdleInputChange(evt) {
    formData[evt.target.name] = evt.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    const { elements: { email, message } } = evt.target;
    if (email.value === '' || message.value === '') {
        return alert('Всі поля повинні бути заповнені');
    } 

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
}

function populateInputs() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);

    if (parsedData) {
        input.value = parsedData.email
        textarea.value = parsedData.message
    }
}