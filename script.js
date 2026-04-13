// Load tasks from localStorage or start empty
let tasks = [];
let filter = "all"; // NEW

// Load saved tasks when page opens
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
    renderTasks();
    updateRemainingCount();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// FILTER FUNCTION (NEW)
function setFilter(type) {
    filter = type;
    renderTasks();
}

// Update remaining tasks counter
function updateRemainingCount() {
    const remaining = tasks.filter(task => !task.completed).length;
    const remainingSpan = document.getElementById('remainingCount');
    if (remainingSpan) {
        remainingSpan.textContent = remaining;
    }
    updateProgressBar();
}

// Update progress bar
function updateProgressBar() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const percentage = total === 0 ? 0 : (completed / total) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
}

// Add a new task (CREATE)
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    updateRemainingCount();
    
    input.value = '';
    input.focus();
}

// Delete a task (DELETE)
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateRemainingCount();
}

// Toggle complete status (UPDATE)
function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateRemainingCount();
    }
}

// Edit a task (UPDATE)
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newText = prompt('Edit your task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            saveTasks();
            renderTasks();
            updateRemainingCount();
        }
    }
}

// Render all tasks to the screen (READ + FILTER)
function renderTasks() {
    const taskList = document.getElementById('taskList');
    const taskCountSpan = document.getElementById('taskCount');

    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li class="empty-message">No tasks yet. Add one above! ✨</li>';
        taskCountSpan.textContent = '0';
        return;
    }

    taskCountSpan.textContent = filteredTasks.length;

    let html = '';

    for (let i = 0; i < filteredTasks.length; i++) {
        const task = filteredTasks[i];
        const completedClass = task.completed ? 'completed' : '';

        html += `
            <li class="task-item">
                <span class="task-text ${completedClass}">${escapeHtml(task.text)}</span>
                <div class="task-buttons">
                    <button class="complete-btn" onclick="toggleComplete(${task.id})">
                        ${task.completed ? '↩️ Undo' : '✓ Done'}
                    </button>
                    <button class="edit-btn" onclick="editTask(${task.id})">✏️ Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️ Delete</button>
                </div>
            </li>
        `;
    }

    taskList.innerHTML = html;
}

// Simple security to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load tasks when page loads
loadTasks();