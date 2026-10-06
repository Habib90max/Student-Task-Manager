document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const taskForm = document.getElementById('task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskDescInput = document.getElementById('task-desc');
  const taskPriorityInput = document.getElementById('task-priority');
  const taskDueDateInput = document.getElementById('task-due-date');
  
  const searchInput = document.getElementById('search-input');
  const taskList = document.getElementById('task-list');

  // Initial State with Sample Tasks
  let tasks = [
    {
      id: 1,
      title: 'Git & GitHub Assignment',
      description: 'Push task manager repo to GitHub and submit URL.',
      priority: 'high',
      dueDate: '2026-10-15'
    },
    {
      id: 2,
      title: 'Database Design Notes',
      description: 'Review ER diagrams and normal forms.',
      priority: 'medium',
      dueDate: '2026-10-20'
    }
  ];

  // Render tasks based on search query
  function renderTasks(filterQuery = '') {
    taskList.innerHTML = '';

    const query = filterQuery.trim().toLowerCase();

    // Filter tasks matching title or description
    const filteredTasks = tasks.filter(task => {
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDesc = task.description.toLowerCase().includes(query);
      return matchesTitle || matchesDesc;
    });

    if (filteredTasks.length === 0) {
      taskList.innerHTML = `<li class="no-tasks">No tasks found.</li>`;
      return;
    }

    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-card priority-${task.priority}`;

      li.innerHTML = `
        <div class="task-header">
          <h3>${escapeHtml(task.title)}</h3>
          <span class="priority-badge ${task.priority}">${task.priority}</span>
        </div>
        ${task.description ? `<p class="task-desc">${escapeHtml(task.description)}</p>` : ''}
        <div class="task-footer">
          <span>Due: ${task.dueDate ? task.dueDate : 'No due date'}</span>
        </div>
      `;

      taskList.appendChild(li);
    });
  }

  // Handle task form submission
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title: taskTitleInput.value,
      description: taskDescInput.value,
      priority: taskPriorityInput.value,
      dueDate: taskDueDateInput.value
    };

    tasks.unshift(newTask); // Add new task to the top
    taskForm.reset();
    renderTasks(searchInput.value);
  });

  // Search Input Event Listener (real-time filtering)
  searchInput.addEventListener('input', (e) => {
    renderTasks(e.target.value);
  });

  // Utility to prevent XSS vulnerability
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (match) => {
      const escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return escape[match];
    });
  }

  // Initial render
  renderTasks();
});