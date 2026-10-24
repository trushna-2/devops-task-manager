
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    list.innerHTML = "";
    emptyMessage.style.display = tasks.length ? "none" : "block";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const button = document.createElement("button");

        span.textContent = task.text;
        if (task.completed) span.classList.add("completed");

        span.style.cursor = "pointer";
        span.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        button.textContent = "Delete";
        button.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        li.append(span, button);
        list.appendChild(li);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    tasks.push({ text, completed: false });
    saveTasks();
    displayTasks();

    input.value = "";
});

displayTasks();
