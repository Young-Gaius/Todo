const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = (description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  saveTasksToLocalStorage();
};

const deleteTask = (taskIndex) => {
  tasks.splice(taskIndex, 1);
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
  saveTasksToLocalStorage();
};

// Function to edit a task description
const editTask = (taskIndex, newDescription) => {
  tasks[taskIndex].description = newDescription;
  saveTasksToLocalStorage();
};

const markCompleted = (taskIndex) => {
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  saveTasksToLocalStorage();
};

const filterList = (x) => {
  if (x) {
    if (x.length >= 3) {
      return x;
    }
    alert('Please enter more than 3 words');
    return false;
  }
  return false;
};

// Function to update the UI with the current tasks
const updateUI = () => {
  const list = document.getElementById('list');
  list.innerHTML = '';
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('my-3', 'py-3', 'shadow', 'list-group-item');
    listItem.id = `list${task.index}`;

    const listItemContent = `
      <div class="row">
        <div class="col-1">
          <input class="" type="checkbox" id="check${task.index}" ${task.completed ? 'checked' : ''}>
        </div>
        <div class="col-6">
          <span class="h4 ${task.completed ? 'text-decoration-line-through' : ''}" id="text${task.index}">${task.description}</span>
        </div>
        <div class="col-4">
          <button class="btn btn-dark" data-action="delete" data-task-index="${task.index - 1}">Delete</button>
          <button class="btn btn-dark" data-action="edit" data-task-index="${task.index - 1}">Edit</button>
        </div>
      </div>
    `;

    listItem.innerHTML = listItemContent;
    list.appendChild(listItem);
  });
};

const addList = () => {
  const input = document.getElementById('inputText');
  const inputText = filterList(input.value);
  if (inputText) {
    addTask(inputText);
    updateUI();
    input.value = '';
  }
};

const deleteList = (taskIndex) => {
  const deleteConfirm = window.confirm(`Are you sure to delete ${tasks[taskIndex].description}`);
  if (deleteConfirm) {
    deleteTask(taskIndex);
    updateUI();
  } else {
    console.log('Deletion canceled');
  }
};

const editList = (taskIndex) => {
  const currentText = tasks[taskIndex].description;
  const newText = prompt('Wanna Change list?', currentText);
  if (filterList(newText)) {
    editTask(taskIndex, newText);
    updateUI();
  }
};

document.getElementById('addBtn').addEventListener('click', addList);
document.getElementById('list').addEventListener('click', (event) => {
  const { target } = event;
  if (target.matches('[data-action="delete"]')) {
    const taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
    deleteList(taskIndex);
  } else if (target.matches('[data-action="edit"]')) {
    const taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
    editList(taskIndex);
  } else if (target.matches('[type="checkbox"]')) {
    const taskIndex = parseInt(target.id.replace('check', ''), 10) - 1;
    markCompleted(taskIndex);
    updateUI();
  }
});

updateUI();