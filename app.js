const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners()

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded' , getTasks );
    //add task
    form.addEventListener('submit', addTask);

    //remove task
    taskList.addEventListener('click' , removeTask);

    //clear task
    clearBtn.addEventListener('click' , clearTask);

    //filter tasks
    filter.addEventListener('keyup' , filterTasks)
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        
        const li = document.createElement('li');

        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove" ></i>';

        li.appendChild(link);
    })

}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

const li = document.createElement('li');

li.className = 'collection-item';

li.appendChild(document.createTextNode(taskInput.value));

const link = document.createElement('a');

link.className = 'delete-item secondary-content';

link.innerHTML = '<i class="fa fa-remove" ></i>';

li.appendChild(link);

taskList.appendChild(li);

console.log(li);

taskInput.value = '';

storeTasksInLocalStorage();

e.preventDefault();

}

function storeTasksInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function removeTask(e){
     if(e.target.parentElement.classList.contains('delete-item')){
         if(confirm('Are you sure ?')){
            e.target.parentElement.parentElement.remove();
         }
     }
}

function clearTask(){
    // taskList.innerHTML = '';

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item')
        .forEach(function(task) {

            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
    });
}