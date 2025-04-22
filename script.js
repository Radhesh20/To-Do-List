let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    input.value = '';
    saveTasks();
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();

  document.getElementById('filter-all').classList.remove('active-filter');
  document.getElementById('filter-active').classList.remove('active-filter');
  document.getElementById('filter-completed').classList.remove('active-filter');

  if (filter === 'all') {
    document.getElementById('filter-all').classList.add('active-filter');
  } else if (filter === 'active') {
    document.getElementById('filter-active').classList.add('active-filter');
  } else if (filter === 'completed') {
    document.getElementById('filter-completed').classList.add('active-filter');
  }
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const icon = document.createElement('i');
    icon.className = task.completed ? 'bi bi-check-circle-fill text-success fs-5 me-3' : 'bi bi-circle fs-5 text-secondary me-3';
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', () => toggleComplete(index));

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.className = 'fs-5';
    if (task.completed) {
      taskText.classList.add('text-decoration-line-through', 'text-muted');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-outline-danger';
    deleteBtn.innerHTML = '✖';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    const leftDiv = document.createElement('div');
    leftDiv.className = 'd-flex align-items-center';
    leftDiv.appendChild(icon);
    leftDiv.appendChild(taskText);

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

setFilter('all');
