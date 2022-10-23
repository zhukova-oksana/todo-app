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
        <input type="text" class="form-control" name="title" placeholder="ввести задачу">
      </label>
    `);

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
      disabled: true,
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

const createRow = ({title, status}, index) => {
  const tr = document.createElement('tr');
  (status === 'Выполнена') ? tr.classList.add('table-success') : tr.classList.add('table-light');

  const tdNum = document.createElement('td');
  tdNum.textContent = index + 1;

  const tdTitle = document.createElement('td');
  tdTitle.textContent = title;
  if (status === 'Выполнена') {
    tdTitle.classList.add('text-decoration-line-through');
  }

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

export default {
  createTitle,
  createButtonsGroup,
  createForm,
  createContainer,
  createTable,
  createRow,
}
