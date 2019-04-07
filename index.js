/* jshint esversion:6 */

const tasksDiv = "taskList";
const taskDoneBg = "green";

class Task {
    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}

class TaskList {
    constructor() {
        document.querySelector('#addButton').addEventListener('click', () => this.addTask());

        this.loadTasks();
        this.render();
    }

    loadTasks() {
        this.tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];

        // TODO: If localstorage is empty, load from file
    }

    render() {
        if (document.querySelector('.' + tasksDiv)) {
            document.body.removeChild(document.querySelector('.' + tasksDiv));
        }

        const ul = document.createElement('ul');
        ul.className = tasksDiv;

        this.tasks.forEach((task, taskIndex) => {
            const li = document.createElement('li');
            const removeTaskButton = document.createElement('div');
            const removeIcon = document.createTextNode('\u00D7');

            li.classList.add('task');
            removeTaskButton.className = "delete-task-button";

            li.addEventListener('click', (event) => {
                event.target.classList.add('task-completed');

                if (task.done) {
                    task.done = false;
                } else {
                    task.done = true;
                }

                this.saveToAll();
                this.loadAndRender();
            });

            removeTaskButton.addEventListener('click', () => {
                ul.removeChild(li);
                this.tasks = this.tasks.slice(0, taskIndex).concat(this.tasks.slice(taskIndex + 1, this.tasks.length));
                this.saveToAll();
            });

            if (task.done) {
                li.style.backgroundColor = taskDoneBg;
                li.style.textDecoration = "line-through";
            }

            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1; //January is 0!
            let yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            today = yyyy + '-' + mm + '-' + dd;
            if (task.date == today) {
                li.style.border = "2px solid red";
            }

            removeTaskButton.appendChild(removeIcon);
            li.innerHTML = `${task.title} <br> ${task.description} <br> ${task.date}`;
            li.appendChild(removeTaskButton);
            ul.appendChild(li);

        });

        document.body.appendChild(ul);
    }

    addTask() {
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date').value;

        this.tasks.push(new Task(titleValue, descriptionValue, dateValue));

        this.saveToAll();
        this.loadAndRender();
    }

    saveInLocalStorage() {
        window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    saveToFile() {
        if(this.tasks.length > 0){
            $.post("server.php", {
                save: this.tasks
            }).done(function () {
                console.log("Successfully saved to file");
            }).fail(function () {
                console.log("Failed to save to file");
            });
        }
        else {
            $.post("server.php", {
                save: null
            }).done(function () {
                console.log("Successfully cleared the file");
            }).fail(function () {
                console.log("Failed to cleared the file");
            });
        }
    }

    saveToAll() {
        this.saveInLocalStorage();
        this.saveToFile();
    }

    loadAndRender() {
        this.loadTasks();
        this.render();
    }
}

function forceHttps() {
    // Ensures that the Greeny page is loaded over HTTPS - https://stackoverflow.com/a/4597085
    if (window.location.href.indexOf("greeny.cs.tlu.ee") != -1) {
        if (location.protocol == 'http:') {
            location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }
    }
}

window.onload = function () {
    forceHttps();
    const taskList = new TaskList();
};