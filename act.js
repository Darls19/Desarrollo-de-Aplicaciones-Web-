document.addEventListener("DOMContentLoaded", function() {
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskFormContainer = document.querySelector('.container2');
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('newTaskInput');
  const startDate = document.getElementById('dateStartedInput');
  const endDate = document.getElementById('dateEndInput');
  const responsableTask = document.getElementById('responsableTask');
  const taskList = document.getElementById('taskList');
  const searchInput = document.getElementById('searchInput');
  const showAllBtn = document.getElementById('showAllBtn');
  const showOverdueBtn = document.getElementById('showOverdueBtn');
  const showResolvedBtn = document.getElementById('showResolvedBtn');
  const errorContainer = document.getElementById('errorContainer');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function loadTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
  }

  function hideTaskForm() {
    taskFormContainer.classList.add('d-none'); 
  }

  function showError(message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove('d-none');
    setTimeout(() => {
      errorContainer.classList.add('d-none');
    }, 3000);
  }

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = {
      name: taskInput.value.trim(),
      startDate: startDate.value,
      endDate: endDate.value,
      responsable: responsableTask.value.trim(),
      resolved: false
    };

    if (newTask.startDate > newTask.endDate) {
      showError("La fecha de fin no puede ser menor que la fecha de inicio.");
      return;
    }

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskForm.reset();
    hideTaskForm(); 
  });

  function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = `list-group-item ${getClassName(task)}`;
    li.innerHTML = `${task.name} (Inicio: ${task.startDate}, Fin: ${task.endDate})<br>Responsable: ${task.responsable}`;
    
    const today = new Date().toISOString().split('T')[0];

    if (!task.resolved && task.endDate >= today) {
      const resolveBtn = document.createElement('button');
      resolveBtn.textContent = 'Resuelta';
      resolveBtn.className = 'btn btn-outline-secondary btn-sm float-end resolve-btn';
      resolveBtn.addEventListener('click', function() {
        task.resolved = true;
        updateTask(task);
      });
      li.appendChild(resolveBtn);
    } else if (task.resolved) {
      const unresolveBtn = document.createElement('button');
      unresolveBtn.textContent = 'Desmarcar';
      unresolveBtn.className = 'btn btn-secondary btn-sm float-end unresolve-btn';
      unresolveBtn.addEventListener('click', function() {
        task.resolved = false;
        updateTask(task);
      });
      li.appendChild(unresolveBtn);
    }

    if (task.endDate < today || task.resolved) {
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.className = 'btn btn-danger btn-sm float-end me-2 delete-btn';
      deleteBtn.addEventListener('click', function() {
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        renderTasks();
      });
      li.appendChild(deleteBtn);
    }

    taskList.appendChild(li);
  }

  function getClassName(task) {
    const today = new Date().toISOString().split('T')[0];
    if (task.resolved) return 'resolved';
    if (task.endDate < today) return 'overdue';
    return 'pending';
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function updateTask(updatedTask) {
    const taskIndex = tasks.findIndex(task => task.name === updatedTask.name && task.startDate === updatedTask.startDate && task.endDate === updatedTask.endDate);
    if (taskIndex > -1) {
      tasks[taskIndex] = updatedTask;
      saveTasks();
      renderTasks();
    }
  }

  function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    if (filteredTasks.length === 0) {
      const noTasksItem = document.createElement('li');
      noTasksItem.className = 'list-group-item no-tasks';
      noTasksItem.textContent = 'No hay tareas pendientes';
      taskList.appendChild(noTasksItem);
    } else {
      filteredTasks.forEach(task => addTaskToDOM(task));
    }
  }

  searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => 
      task.name.toLowerCase().includes(searchTerm) || 
      task.responsable.toLowerCase().includes(searchTerm)
    );
    renderTasks(filteredTasks);
  });

  showAllBtn.addEventListener('click', function() {
    renderTasks(tasks);
  });

  showOverdueBtn.addEventListener('click', function() {
    const today = new Date().toISOString().split('T')[0];
    const overdueTasks = tasks.filter(task => task.endDate < today && !task.resolved);
    renderTasks(overdueTasks);
  });

  showResolvedBtn.addEventListener('click', function() {
    const resolvedTasks = tasks.filter(task => task.resolved);
    renderTasks(resolvedTasks);
  });

  addTaskBtn.addEventListener('click', function() {
    taskFormContainer.classList.remove('d-none'); 
  });

  loadTasks();
});
