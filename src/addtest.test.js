document.body.innerHTML = `
    <div id="to-dos">
      <div class="list-item" id="remove"></div>
    </div>
`;

const toDoList = document.getElementById('to-dos');
const addTask = (taskValue) => {
  const taskContainer = document.createElement('div');
  taskContainer.className = 'list-item';
  taskContainer.innerHTML += `
    <input type="checkbox" class="checkbox">
    <span>${taskValue}</span>
    <i class="fas fa-ellipsis-vertical"></i>
    <i class="fas fa-trash-can"></i>
  `;
  toDoList.appendChild(taskContainer);
};

