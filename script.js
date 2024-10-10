// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to add a task (and optionally save it to Local Storage)
    function addTask(taskText, save = true) {
        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li) element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Attach an event to the remove button to delete the task when clicked
        removeButton.onclick = function() {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskText); // Also remove the task from Local Storage
        };

        // Append the remove button to the list item (li)
        taskItem.appendChild(removeButton);

        // Append the list item to the task list (ul)
        taskList.appendChild(taskItem);

        // Clear the input field after adding the task
        taskInput.value = "";

        // Save the task to Local Storage if 'save' is true
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Add event listener for the 'Add Task' button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Allow pressing "Enter" key to add tasks
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function(taskText) {
            addTask(taskText, false); // false indicates not to save again to Local Storage
        });
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(function(task) {
            return task !== taskText;
        });
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});
