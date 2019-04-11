/* jshint esversion:6 */

const tasksDiv = "taskList";

// Style variables
const taskDoneBg = "green";
const taskDoneDeco = "line-through";
const taskTodayBord = "2px solid red";

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
        document.querySelector('#sortButton').addEventListener('click', () => this.sort());

        this.loadTasks();
        this.render();
    }

    loadTasks() {
        this.tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];

        /* if (this.tasks == null || this.tasks == "[]"){ // If LS is empty, load from file
            $.post("server.php", {
                load: null
            }); // Need to get the results and put them to LS - https://api.jquery.com/jquery.post/#example-4 https://stackoverflow.com/a/1152922
        } */
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
            const removeIcon = document.createTextNode('❌');

            li.classList.add('task');

            li.addEventListener('click', (event) => {
                event.target.classList.add('completedTask');
                task.done = !task.done; // toggle done status

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
                li.style.textDecoration = taskDoneDeco;
            }

            let today = new Date().toLocaleString("se-SE", { day: 'numeric', month: 'numeric', year: 'numeric' }); // yyyy-mm-dd
            if (task.date == today) {
                li.style.border = taskTodayBord;
            }

            removeTaskButton.className = "removeButton";
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

    sort(){
        const sortProperty = document.querySelector('#sortProperty').value;
        const sortDirection = document.querySelector('#sortDirection').value;

        if (sortDirection == "asc") {
            this.tasks.sort((a,b) => a[sortProperty] > b[sortProperty] ? 1 : -1);
        } else if (sortDirection == "desc") {
            this.tasks.sort((a,b) => a[sortProperty] < b[sortProperty] ? 1 : -1);
        }

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