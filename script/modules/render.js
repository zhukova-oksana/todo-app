import create from './createEments.js';
import control from './control.js';

const {
  createTitle,
  createForm,
  createContainer,
  createTable,
  createRow,
} = create;

const {
  addClass,
} = control;

const renderTask = (elem, data) => {
  const allRow = data.map((elem, index) => createRow(elem, index));

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

export default {
  renderTask,
  renderToDo,
}
