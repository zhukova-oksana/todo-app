'use strict';

const data = [
  {
    number: 1,
    name: 'Нина',
    title: 'Купить слона',
    status: 'В процессе',
  },
  {
    number: 2,
    name: 'Нина',
    title: 'Помыть кота',
    status: 'Выполнена',
  },
];

{
  const addClass = (className) => {
    const classAdd = ['vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column'];
    const container = document.querySelector(className);
    container.classList.add(...classAdd);
    return container;
  };

  const createTitle = (name) => {
    const title = document.createElement('h3');
    title.textContent = name;
    return title;
  }

  const createButtonsGroup = params => {
    const btns = params.map(({className, type, text, disabled}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      button.disabled = disabled;
      return button;
    });

    return {
      btns,
    };
  };

  const createForm = () => {
    const form = document.createElement('form');
    form.classList.add('d-flex', 'align-items-center', 'mb-3');

    form.insertAdjacentHTML('beforeend', `
      <label class="form-group me-3 mb-0">
        <input type="text" class="form-control" placeholder="ввести задачу">
      </label>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary me-3',
        type: 'submit',
        text: 'Сохранить',
        disabled: false,
      },
      {
        className: 'btn btn-warning',
        type: 'reset',
        text: 'Очистить',
        disabled: false,
      },
    ]);

    form.append(...buttonGroup.btns);

    return form;
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('table-wrapper');
    return container;
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
    `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createRow = ({task: name, number, title, status}) => {
    const tr = document.createElement('tr');
    (status === 'Выполнена') ? tr.classList.add('table-success') : tr.classList.add('table-light');

    const tdNum = document.createElement('td');

    tdNum.textContent = number;
    const tdTitle = document.createElement('td');

    if (status === 'Выполнена') {
      tdTitle.classList.add('text-decoration-line-through');
    }

    tdTitle.textContent = title;
    const tdStatus = document.createElement('td');
    tdStatus.textContent = status;
    const tdActions = document.createElement('td');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('btn', 'btn-danger', 'me-1');
    buttonDel.textContent = 'Удалить';
    const buttonFinish = document.createElement('button');
    buttonFinish.classList.add('btn', 'btn-success');
    buttonFinish.textContent = 'Завершить';
    tdActions.append(buttonDel, buttonFinish);

    tr.append(tdNum, tdTitle, tdStatus, tdActions);

    return tr;
  };

  const renderTask = (elem, data) => {
    const allRow = data.map((elem) => createRow(elem));

    elem.append(...allRow);
    return allRow;
  };

  const renderToDo = () => {
    const container = addClass('.app-container');
    const tableWrapper = createContainer();
    const form = createForm();
    const table = createTable();

    container.append(createTitle('Todo App'));
    container.append(form);
    tableWrapper.append(table);
    container.append(tableWrapper);

    return {
      list: table.tbody,
      form,
    }
  };

  const getStorage = (key) =>
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

  const setStorage = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
  };

  const addTaskData = (key, task) => {
    const data = getStorage(key);
    data.push(task);
    setStorage(key, data);
  };

  const resetControl = (inpText) => {
    const btnReset = document.querySelector('.btn-warning');

    btnReset.addEventListener('click', e => {
      if ((inpText.placeholder !== '') || (inpText.placeholder !== 'ввести задачу')) {
        return inpText.placeholder === 'ввести задачу';
      }
    })
  };

  const addTaskPage = (task, list) => {
    list.append(createRow(task));
  };

  const formControl = (form, list, name) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      console.log('e.target', e.target);
      const formData = new FormData(e.target);
      const newTask = Object.fromEntries(formData);

      console.log('formData', formData);
      console.log('newTask', newTask);

      addTaskPage(newTask, list);
      addTaskData(name, newTask);

      // form.reset();
    });
  };

// localStorage.clear();
  const init = () => {
    const name = prompt('Введите своё имя:');
    // const name = 'Нина';
    const {
      list,
      form,
    } = renderToDo();

    const inpText = document.querySelector('.form-control');

    const data = getStorage(name);


    const allRow = renderTask(list, data);
    formControl(form, list, name);
  };

  init();
}
