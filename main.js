const guidGenerator = () => {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const getDate = (dateString) => {
    const d = dateString.split(".");
    return new Date(d[2], d[1] - 1, d[0])
}

const getTodos = () => {
    $.get('database.txt', function(data){
        console.clear();
        let content = JSON.parse(data).content;
        content.forEach(function(todo, todoIndex){
            console.log(todo);
        });
    });
    return (localStorage.todos && localStorage.todos.length) ?
        JSON.parse(localStorage.todos) :
        [];
}

const setTodos = (todos) => {
    $.post('server.php', {save: todos});
    return localStorage.todos = JSON.stringify(todos);
}

const initializeTodoList = () => {
    let todos = getTodos();

    const todoList = $("#todoList");
    const form = $("#todoForm");
    
    const todoEl = $("<input/>").addClass("form-control").attr("placeholder", "Ülesanne").attr("type", "text").appendTo(form);
    const dueDateEl = $("<input/>").addClass("form-control").attr("placeholder", "Tähtaeg (ntks 10.02.2019)").attr("type", "text").appendTo(form);
    $("<button/>").addClass("btn btn-primary").css("width", "100%").text("Lisa ülesanne").click(() => addTodo(todoEl.val(), dueDateEl.val())).appendTo(form);
    // Lisaülesanne 1: otsing
    const searchEl = $("<input/>").addClass("form-control").attr("placeholder", "Otsi ülesannet").attr("type", "text").change(() => searchTodo()).css("margin-top", "20px").appendTo(form);
    
    const searchTodo = () => {
        const searchString = searchEl.val();
        todos = todos.map(todo => {
            if (searchString && !todo.todo.includes(searchString)) {
                todo.hidden = true;
                return todo;
            }
            todo.hidden = false;
            return todo;
        });
        refreshTodoList();
    }

    const addTodo = (todo, dueDate) => {
        todos.push({
            id: guidGenerator(),
            todo,
            dueDate,
        });
        setTodos(todos);
        refreshTodoList();
    }

    const deleteTodo = (id) => {
        todos = todos.filter(todo => todo.id !== id);
        setTodos(todos);
        getTodos();
        refreshTodoList();
    }

    const markTodoDone = (id) => {
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.done = true;
            }
            return todo;
        });
        setTodos(todos);
        refreshTodoList();
    }

    const sortTodosByAlphabetically = () => {
        todos.sort((a, b) => (a.todo < b.todo) ? -1 : (a.todo > b.todo) ? 1 : 0);
        refreshTodoList();
    }

    const sortTodosByDueDate = () => {
        todos.sort((a, b) => getDate(b.dueDate) - getDate(a.dueDate));
        refreshTodoList();
    }

    const refreshTodoList = () => {
        todoList.empty();

        const tableHeader = $("<thead/>").appendTo(todoList);
        const tableHeaderRow = $("<tr/>").appendTo(tableHeader);
        $("<th/>").text("Ülesanne").css("cursor", "pointer").click(sortTodosByAlphabetically).appendTo(tableHeaderRow);
        $("<th/>").text("Tähtaeg").css("cursor", "pointer").click(sortTodosByDueDate).appendTo(tableHeaderRow);
        $("<th/>").appendTo(tableHeaderRow);

        const tableBody = $("<tbody/>").appendTo(todoList);
        for (const todo of todos) {
            const tableRow = $("<tr/>").appendTo(tableBody);

            if (todo.hidden) {
                tableRow.css("display", "none");
            }

            if (todo.done) {
                tableRow.css("background-color", "green");
            }

            // Lisaülesanne 2: märkida oranži värviga ülesanne, mille kuupäev on täna või varem
            if (getDate(todo.dueDate).toDateString() > new Date().toDateString()) {
                tableRow.css("background-color", "orange");
            }

            $("<td/>").text(todo.todo).appendTo(tableRow);
            $("<td/>").text(todo.dueDate).appendTo(tableRow);
            const buttonCell = $("<td/>").appendTo(tableRow);

            if (!todo.done) {
                $("<button/>").addClass("btn btn-primary btn-success").text("Märgi tehtuks").click(() => markTodoDone(todo.id)).appendTo(buttonCell);
            }
            $("<button/>").addClass("btn btn-primary btn-danger").text("Kustuta").click(() => deleteTodo(todo.id)).appendTo(buttonCell);
        }
    }

    refreshTodoList();
}

$(initializeTodoList);