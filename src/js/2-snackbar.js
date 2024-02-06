import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state == 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

function formSubmission(event) {
    event.preventDefault();
    const delayInput = form.elements.delay;
    const stateInput = form.elements.state;

  createPromise(delayInput.value, stateInput.value)
    .then(message => {
      iziToast.success({
        pauseOnHover: false,
        position: 'topRight',
        message: message,
        icon: '',
      });
    })
    .catch(message => {
      iziToast.error({
        pauseOnHover: false,
        position: 'topRight',
        message: message,
        icon: '',
      });
    });

  delayInput.value = '';
  stateInput.forEach(element => {
    element.checked = false;
  });
}

form.addEventListener('submit', formSubmission);