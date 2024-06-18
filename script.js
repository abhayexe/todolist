document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('li');
        listItem.draggable = true;

        const taskNumber = document.createElement('span');
        taskNumber.className = 'task-number';
        taskNumber.textContent = taskList.children.length + 1;
        listItem.appendChild(taskNumber);

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
            updateTaskNumbers();
        });
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
        taskInput.value = '';
        enableDragAndDrop();
    }
}

function updateTaskNumbers() {
    const taskList = document.getElementById('task-list');
    Array.from(taskList.children).forEach((task, index) => {
        task.querySelector('.task-number').textContent = index + 1;
    });
}

function enableDragAndDrop() {
    const taskList = document.getElementById('task-list');
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(task => {
        task.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.effectAllowed = 'move';
            setTimeout(() => {
                task.classList.add('hide');
            }, 0);
        });

        task.addEventListener('dragend', function() {
            task.classList.remove('hide');
        });

        task.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        task.addEventListener('drop', function(e) {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(id);
            const dropZone = e.target.closest('li');
            if (draggedElement !== dropZone) {
                const draggedIndex = Array.from(taskList.children).indexOf(draggedElement);
                const targetIndex = Array.from(taskList.children).indexOf(dropZone);
                if (draggedIndex < targetIndex) {
                    taskList.insertBefore(draggedElement, dropZone.nextSibling);
                } else {
                    taskList.insertBefore(draggedElement, dropZone);
                }
                updateTaskNumbers();
            }
        });
    });
}

enableDragAndDrop();
