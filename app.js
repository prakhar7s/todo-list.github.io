const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoNew = document.querySelector('.new-todo');
const filterOption = document.querySelector('.filter');
const i = document.querySelector('.todo-app');
const n = i.childNodes[1];
i.setAttribute("style","color:black");
todoInput.setAttribute('placeholder', 'To do items!');


document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoNew.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event){
    event.preventDefault();
    const todoDiv = worker('div', 'todo', false);
    const newInput  = worker('li', 'output', true, 1, todoInput.value);
    todoDiv.appendChild(newInput);
    localTodo(todoInput.value);
     const completeButton = worker('button', 'complete-button', true, 0, '<i class="fas fa-check"></i>');
     const deleteButton = worker('button', 'delete-button', true, 0, '<i class="fas fa-trash"></i>' );
     todoDiv.appendChild(completeButton);
     todoDiv.appendChild(deleteButton);

    todoNew.appendChild(todoDiv);
    todoInput.value = '';
}

function worker(elementName, className, further, innerOrHTML, inner){
    const creation = document.createElement(elementName);
    creation.classList.add(className);
    if(further){
        if(innerOrHTML==0){
            creation.innerHTML = inner;
        }
        else{
            creation.innerText = inner;
        }
    }
    return creation;
}

function deleteCheck(e){
    const  item = e.target;
    if(item.classList[0] === 'delete-button'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeTodoLocal(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });

    }if(item.classList[0] === 'complete-button'){
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoNew.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }   
                else{
                    todo.style.display = 'none';
                }    
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }      
        }
    });
}
function localTodo(t){
    let tt;
    if(localStorage.getItem("todos")===null ){
        tt = [];
    }
    else
    {
        tt = JSON.parse(localStorage.getItem("todos"));
    }

    tt.push(t);
    localStorage.setItem("todos", JSON.stringify(tt));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        const todoDiv = worker("div", "todo", false);
        const newInput = worker("li", "output", true, 1, todo);
        const completeButton = worker("button", "complete-button", true, 0, "<i class='fas fa-check'></i>");
        const deleteButton = worker("button", "delete-button", true, 0, "<i class='fas fa-trash'></i>");
        todoDiv.appendChild(newInput);
        todoDiv.appendChild(completeButton);
        todoDiv.appendChild(deleteButton);
        todoNew.appendChild(todoDiv);
    });
}

function removeTodoLocal(todo){
    let todos;
    if(localStorage.getItem("todos")==null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const remo=todo.children[0].innerText;
    todos.splice(todos.indexOf(remo),1);
    localStorage.setItem("todos",  JSON.stringify(todos));
}