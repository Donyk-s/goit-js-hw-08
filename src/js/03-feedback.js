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
  dataInput = {
    email: refs.inputEmail.value.trim(),
    message: refs.textareaMessage.value.trim(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataInput));
  console.log(dataInput);
}

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
  refs.inputEmail.value = savedMessage['message'] || '';
  refs.textareaMessage.value = savedMessage['email'] || '';
}
