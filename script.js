let tasks = [];
let filter = "all";

function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) tasks = JSON.parse(saved);

    renderTasks();
    updateStats();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) return;

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
    updateStats();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;

    saveTasks();
    renderTasks();
    updateStats();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit task:", task.text);

    if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

function setFilter(type, event) {
    filter = type;

    document.querySelectorAll(".filter-buttons button")
        .forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");

    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    const count = document.getElementById("taskCount");

    let filtered = tasks;

    if (filter === "active") {
        filtered = tasks.filter(t => !t.completed);
    }
    if (filter === "completed") {
        filtered = tasks.filter(t => t.completed);
    }

    if (filtered.length === 0) {
        list.innerHTML = `<li class="empty-message">No tasks ✨</li>`;
        count.textContent = 0;
        return;
    }

    count.textContent = filtered.length;

    list.innerHTML = filtered.map(task => `
        <li class="task-item">
            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="task-buttons">
                <button onclick="toggleComplete(${task.id})">✓</button>
                <button onclick="editTask(${task.id})">✏️</button>
                <button onclick="deleteTask(${task.id})">🗑</button>
            </div>
        </li>
    `).join("");
}

function updateStats() {
    const remaining = tasks.filter(t => !t.completed).length;
    document.getElementById("remainingCount").textContent = remaining;

    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;

    const percent = total ? (done / total) * 100 : 0;
    document.getElementById("progressBar").style.width = percent + "%";
}

loadTasks();