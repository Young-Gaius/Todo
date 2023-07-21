import './index.css';
const tasks = [
    { description: 'Task 1', completed: false, index: 1 },
    { description: 'Task 2', completed: true, index: 2 },
    { description: 'Task 3', completed: false, index: 3 },
  ];
  
  function renderTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; 
  
    tasks
      .sort((a, b) => a.index - b.index) 
      .forEach((task) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.description;
        listItem.classList.add(task.completed ? 'completed' : 'pending');
        todoList.appendChild(listItem);
      });
  }
  
  document.addEventListener('DOMContentLoaded', renderTasks);
  