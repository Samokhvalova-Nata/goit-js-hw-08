import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state"

const form = document.querySelector('.feedback-form');
const input = form.querySelector('input');
const textarea = form.querySelector('textarea');

populateInputs();

form.addEventListener('input', throttle(hahdleInputChange, 500));
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
    evt.preventDefault();

    const { elements: { email, message } } = evt.target;
    if (email.value === '' || message.value === '') {
        return alert('Всі поля повинні бути заповнені');
    }
    const formData = { email: email.value, message: message.value };
    console.log(formData);
    evt.target.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function hahdleInputChange(evt) {
    let filledInputs = localStorage.getItem(STORAGE_KEY);
    filledInputs = filledInputs ? JSON.parse(filledInputs) : {};
    filledInputs[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filledInputs));
}

function populateInputs() {
    let savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        savedData = JSON.parse(savedData);
        Object.entries(savedData).forEach(([name, value]) => {
        form.elements[name].value = value;
        })
    }
}