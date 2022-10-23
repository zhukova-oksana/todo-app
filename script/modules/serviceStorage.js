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

const removeStorage = (key, titleTask) => {
  const data = getStorage(key);
  const dataNew = data.filter(item => item.title !== titleTask);
  setStorage(key, dataNew);
};

export default {
  getStorage,
  setStorage,
  removeStorage,
  addTaskData,
};
