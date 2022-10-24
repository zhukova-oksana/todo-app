import control from './modules/control.js';
import service from './modules/serviceStorage.js';
import render from './modules/render.js';

const {
  delTaskPage,
  completeTask,
  formControl,
} = control;

const {
  getStorage,
} = service;

const {
  renderTask,
  renderToDo,
} = render;

{
  const nameInputControl = () => {
    let nameInput = prompt('Введите своё имя:');
    console.log('name', name);
    if (nameInput === null) {
      nameInput = 'Общий';
    };
    console.log('name', name);
    return nameInput;
  }

// localStorage.clear();
  const init = () => {
    const name = nameInputControl();

    const {
      list,
      form,
    } = renderToDo();
    const data = getStorage(name);

    formControl(form, list, name);

    renderTask(list, data);
    completeTask(list, name);
    delTaskPage(data, list, name);

  };

  init();
}
