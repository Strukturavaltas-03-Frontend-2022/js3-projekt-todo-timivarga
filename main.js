//Variables

let todoItems = [];
const todoInput =document.querySelector('.todo-input')
const completedTodosDiv= document.querySelector('.completed-todos');
const uncompletedTodosDiv = document.querySelector('.uncompleted-todos');

//Get todos list on first boot
window.onload = () => {
    let storageTodoItems = localStorage.getItem('todoItems')
    if(storageTodoItems != null){
        todoItems = JSON.parse(storageTodoItems);
    }

    render();

}

//Get the content typed into the input
todoInput.onkeyup = ((e) => {
    let value = e.target.value.replace(/^\s+/, "");
    if( value && e.keyCode === 13){ //Enter
        addTodo(value);
        todoInput.value='';
        todoInput.focus();

    }
})

//Add todo
function addTodo(text){
    todoItems.push({
        id:Date.now(),
        text,
        completed: false
    })
    saveAndRender();
}

//Remove todo
function removeTodo(id){
    todoItems = todoItems.filter(todo => todo.is !== Number(id))
    saveAndRender()
}

//Mark as completed
function markAsCompleted(id){
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)){
            todo.completed = true;
        }
        return todo;

        saveAndRender;
    })
}

//Mark as uncompleted
function markAsUncompleted(id){
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)){
            todo.completed = false;
        }
        return todo;

        saveAndRender;
    })
}

//Save is localstorage
function save(){
    localStorage.setItem('todoItems',JSON.stringify(todoItems))
}

//Render
function render(){
    let uncompletedTodos = todoItem.filter(item => !item.completed)
    let completedTodos = todoItems.filter(item => item.completed)

    completedTodosDiv.innerHTML = '';
    uncompletedTodosDiv.innerHTML = '';

    if(uncompletedTodos.length >0){
        uncompletedTodos.forEach(todo => {
            uncompletedTodosDiv.append(createTodoElement(todo))
        })
    } else{
        uncompletedTodosDiv.innerHTML = '<div class ="empty"> No uncompleted todos</div>';
    
        if(uncompletedTodos.length > 0){
            completedTodosDiv.innerHTML = `<div class="completed-title">Completed (${completedTodos.length} / ${todoItems.length}))`
        }

        completedTodos.forEach(todo => {
            completedTodosDiv.append(createTodoElement(todo))
        })
    }

}

//Save as render
function saveAndRender(){
    save();
    render();
}

//Create todo item List
function createTodoElement(todo){
    //create todo list container
    const todoDiv = document.createElement('div');
    todoDiv.setAttribute('data-id', todo.id);
    todoDiv.className = 'todo-item';

    //create todo item text
    const todoTextSpan = document.createElement('span');
    todoTextSpan.innerHTML =todo.text

    //checkbox for list
    const todoInputCheckbox = document.createElement('input');
    todoInputCheckbox.type = 'checkBox';
    todoInputCheckbox.checked = todo.completed;
    todoInputCheckbox.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id;
        e.target.checked ? markAsCompleted(id) : markAsCompleted(id)
    }

    //Delete button for list
    const todoRemoveBtn = document.createElement('a');
    todoRemoveBtn.href = '#';
    todoRemoveBtn.innerHTML = 'Delete';

    todoRemoveBtn.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        removeTodo(id)
    }

    todoTextSpan.prepend(todoInputCheckbox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveBtn)

    return todoDiv;    

}


