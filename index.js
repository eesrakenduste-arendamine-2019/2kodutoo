/* jshint esversion:8 */

class Todo {
    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}

window.onload = function () {
    forceHttps();
    loadAndRender();
    const toDo = new Todo();
    document.querySelector('#addButton').addEventListener('click', () => this.addTask());
    document.querySelector('#sortButton').addEventListener('click', () => this.sort());

};
const tasksDiv = "task";

async function loadTasks() {
    this.tasks = JSON.parse(window.localStorage.getItem('tasks'));

    await new Promise((resolve) => {
        // Load from database if localstorage is empty - https://api.jquery.com/jquery.post/#example-4
        if (this.tasks == null || this.tasks == "[]") {
            $.post("server.php", {
                load: null
            }).done(data => {
                this.tasks = JSON.parse(data);
                resolve();
            });
        }
        else {
            resolve();
        }
    }).then(() => {
        this.saveInLocalStorage();
    });
}

function render() {

    if (document.querySelector('.' + tasksDiv)) {
        document.body.removeChild(document.querySelector('.' + tasksDiv));
    }

    const ul = document.createElement('ul');
    ul.className = tasksDiv;

    this.tasks.forEach((task, taskIndex) => {
        // Normalize booleans that get saved incorrectly by the parser
        if (task.done === "true"){
            task.done = true;
        }
        else if (task.done === "false"){
            task.done = false;
        }

        const li = document.createElement('li');
        const removeTaskButton = document.createElement('div');
        const removeIcon = document.createTextNode('🍩');

        li.classList.add('task');

        li.addEventListener('click', () => {
            task.done = !task.done; // toggle done status

            this.saveToAll();
            this.render();
        });

        removeTaskButton.addEventListener('click', () => {
            ul.removeChild(li);
            this.tasks = this.tasks.slice(0, taskIndex).concat(this.tasks.slice(taskIndex + 1, this.tasks.length));
            this.saveToAll();
        });

        if (task.done) {
            li.classList.add('completedTask');
        }
        else {
            li.classList.remove('completedTask');
        }

        let today = new Date().toLocaleString("se-SE", { day: 'numeric', month: 'numeric', year: 'numeric' }); // yyyy-mm-dd
        if (task.date == today) {
            li.classList.add('todayTask');
        }
        else {
            li.classList.remove('todayTask');
        }

        removeTaskButton.className = "removeButton";
        removeTaskButton.appendChild(removeIcon);
        li.innerHTML = `${task.title} <br> ${task.description} <br> ${task.date}`;
        li.appendChild(removeTaskButton);
        ul.appendChild(li);

    });

    document.body.appendChild(ul);
}

function addTask() {
    const titleValue = document.querySelector('#title').value;
    const descriptionValue = document.querySelector('#description').value;
    const dateValue = document.querySelector('#date').value;

    this.tasks.push(new Todo(titleValue, descriptionValue, dateValue));

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";



    this.saveToAll();
    this.render();
}

async function loadAndRender(){
    await this.loadTasks();
    this.render();
}

function sort() {
    const sortProperty = document.querySelector('#sortProperty').value;
    const sortDirection = document.querySelector('#sortDirection').value;

    if (sortDirection == "asc") {
        this.tasks.sort((a, b) => a[sortProperty] > b[sortProperty] ? 1 : -1);
    } else if (sortDirection == "desc") {
        this.tasks.sort((a, b) => a[sortProperty] < b[sortProperty] ? 1 : -1);
    }

    this.render();
}

function saveInLocalStorage() {
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
}

function saveToFile() {
    if (this.tasks.length > 0) {
        $.post("server.php", {
            save: this.tasks
        }).done(function () {
            console.log("Successfully saved to file");
        }).fail(function () {
            console.log("Failed to save to file");
        });
    } else {
        $.post("server.php", {
            save: null
        }).done(function () {
            console.log("Successfully cleared the file");
        }).fail(function () {
            console.log("Failed to clear the file");
        });
    }
}

function saveToAll() {
    this.saveInLocalStorage();
    this.saveToFile();
}

function forceHttps() {
    // Ensures that the Greeny page is loaded over HTTPS - https://stackoverflow.com/a/4597085
    if (window.location.href.indexOf("greeny.cs.tlu.ee") != -1) {
        if (location.protocol == 'http:') {
            location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }
    }
}