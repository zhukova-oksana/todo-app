import service from './serviceStorage.js';
import create from './createElements.js';

const {
  getStorage,
  setStorage,
  addTaskData,
  removeStorage,
} = service;

const {
  createRow,
} = create;

const nameInputControl = () => {
  const nameInput = prompt('Введите своё имя:');
  let newName;
  if (!nameInput) {
    newName = 'Аноним';
  } else {
    newName = nameInput;
  }
  return newName;
};

const addClass = (className) => {
  const classAdd = ['vh-100','w-100','d-flex','align-items-center','justify-content-center','flex-column'];
  const container = document.querySelector(className);
  container.classList.add(...classAdd);
  return container;
};

const addTaskPage = (task, list, index) => {
  list.append(createRow(task, index));
};

const cellNumbering = (list) => {
  const listTr = list.children;
  for (let i = 0; i < listTr.length; i++) {
    listTr[i].children[0].textContent = i + 1;
  }
};

const delTaskPage = (data, list, key) => {
  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-danger')) {
      const className = target.closest('.table-success') ? '.table-success' : '.table-light';
      for (let i = 0; i < data.length; i++) {
        if (target.closest(className).children[1].textContent === data[i].title) {
          data.splice(i, 1);
        }
      }
      target.closest(className).remove();
      removeStorage(key, target.closest(className).children[1].textContent);
      // list.innerHTML = '';
      // renderTask(list, getStorage(key));
      cellNumbering(list);
    }
  });
};

const completeTask = (list, name) => {
  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-success')) {
      const dataNew = getStorage(name);

      for (let i = 0; i < dataNew.length; i++) {
        if (target.closest('.table-light').children[1].textContent === dataNew[i].title) {
          target.closest('.table-light').children[1].classList.add('text-decoration-line-through');
          target.closest('.table-light').children[2].textContent = 'Выполнена';
          dataNew[i].status = 'Выполнена';
          target.closest('.table-light').classList.add('table-success');
          target.closest('.table-light').classList.toggle('table-light');
          setStorage(name, dataNew);
        }
      }
      // list.innerHTML = '';
      // renderTask(list, getStorage(name));
    }
  });
};

const resetControl = (btn, form) => {
  const btnReset = document.querySelector('.btn-warning');

  btnReset.addEventListener('click', e => {
    e.preventDefault();
    form.reset();
    btn.disabled = true;
  });
};

const formControl = (form, list, name, index) => {
  const inpText = document.querySelector('.form-group');
  const btn = document.querySelector('.btn-primary');

  inpText.addEventListener('input', e => {
    const str = e.target.value;
    str.trim() !== '' ? btn.disabled = false : btn.disabled = true;
  });

  resetControl(btn, form);

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);

    index = Number(list.childNodes.length);
    newTask.status = 'В процессе';

    addTaskPage(newTask, list, index);
    addTaskData(name, newTask);
    btn.disabled = true;

    form.reset();
  });
};

export default {
  nameInputControl,
  addClass,
  addTaskPage,
  cellNumbering,
  delTaskPage,
  completeTask,
  formControl,
};
