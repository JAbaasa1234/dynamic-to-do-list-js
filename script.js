document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    //Add task function
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
           alert('Please enter a task.');
           return;
        }

        const li = document.createElement('li');

        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function() {
             taskList.removeChild(li);
           };

           li.appendChild(removeButton);
           taskList.appendChild(li);

           taskInput.value = "";
    }

    // Attach Event Listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    //Invoke addTask on DOMContentLoaded
    addTask();
});