import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('.feedback-form input'),
  textareaMessage: document.querySelector('.feedback-form textarea'),
};
populateTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onEmailInput, 500));

function onEmailInput(event) {
  const data = {
    email: refs.inputEmail.value.trim(),
    message: refs.textareaMessage.value.trim(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  console.log(data);
}

// function onFormSubmit(event) {
//   let data = localStorage.getItem(LOCAL_KEY);
//   data = data ? JSON.parse(data) : {};
//   let { email, message } = form.elements;
//   data = {
//     email: email.value.trim(),
//     message: message.value.trim(),
//   };
//   localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
// }
function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value.trim() === '' || message.value.trim() === '') {
    return alert('Please fill in all the fields! M.Jackson');
  } else {
    console.log({ email: email.value, message: message.value });

    localStorage.removeItem(STORAGE_KEY);
    event.currentTarget.reset();
  }
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage === null) {
    // console.log(savedMessage);
    return;
  }
  refs.inputEmail.value = savedMessage['email'] || '';
  refs.textareaMessage.value = savedMessage['message'] || '';
}
