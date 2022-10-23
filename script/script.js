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

// localStorage.clear();
  const init = () => {
    const name = prompt('Введите своё имя:');
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
