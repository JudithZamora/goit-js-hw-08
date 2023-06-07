import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// guardar los valores 
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

// valores de los campos 
const loadFormState = () => {
  const savedFormState = localStorage.getItem('feedback-form-state');
  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

// Cargar y establecer los valores del formulario al cargar la página
window.addEventListener('DOMContentLoaded', loadFormState);

// input guardar los valores del formulario
form.addEventListener('input', saveFormState);

//  submit: Borrar el almacenamiento y los campos del formulario
form.addEventListener('submit', e => {
  e.preventDefault();

  // Obtener los valores actuales del formulario
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  // Borrar el almacenamiento
  localStorage.removeItem('feedback-form-state');

  // Borrar los campos del formulario
  emailInput.value = '';
  messageInput.value = '';

  // Emitir los valores actuales del formulario a la consola
  console.log(formState);
});

