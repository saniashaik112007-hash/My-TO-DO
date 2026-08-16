// =========================
// STAGE 2 - TASK MANAGEMENT
// My Daily To-Do
// =========================


// =========================
// DATE
// =========================

const today = new Date();

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

const formattedDate = today.toLocaleDateString(
    "en-US",
    options
);

document.getElementById("currentDate").textContent =
    formattedDate;


// =========================
// GET HTML ELEMENTS
// =========================

const taskInput = document.getElementById("taskInput");

const taskTime = document.getElementById("taskTime");

const addTaskBtn = document.getElementById("addTaskBtn");

const tasksContainer =
    document.getElementById("tasksContainer");

const taskCount =
    document.getElementById("taskCount");

const percentage =
    document.getElementById("percentage");

const progress =
    document.getElementById("progress");

const remainingTasks =
    document.getElementById("remainingTasks");


// =========================
// TASK ARRAY
// =========================

let tasks = [];


// =========================
// ADD TASK
// =========================

addTaskBtn.addEventListener("click", addTask);


function addTask() {

    const title = taskInput.value.trim();

    const time = taskTime.value;


    // Check if task name is empty

    if (title === "") {

        alert("Please enter a task!");

        return;
    }


    // Create task object

    const newTask = {

        id: Date.now(),

        title: title,

        time: time,

        completed: false

    };


    // Add task to array

    tasks.push(newTask);


    // Clear inputs

    taskInput.value = "";

    taskTime.value = "";


    // Display tasks

    displayTasks();

    updateProgress();
}


// =========================
// DISPLAY TASKS
// =========================

function displayTasks() {

    tasksContainer.innerHTML = "";


    // If there are no tasks

    if (tasks.length === 0) {

        tasksContainer.innerHTML = `
            <p style="text-align:center; color:#999;">
                No tasks added yet.
            </p>
        `;

        return;
    }


    // Create task card

    tasks.forEach(function(task) {

        const taskCard =
            document.createElement("div");


        taskCard.className = "task-card";


        // Add completed class

        if (task.completed) {

            taskCard.classList.add("completed");

        }


        taskCard.innerHTML = `

            <div class="task-left">

                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? "checked" : ""}
                >

                <div class="task-details">

                    <div class="task-title">
                        ${task.title}
                    </div>

                    <div class="task-time">
                        ${formatTime(task.time)}
                    </div>

                </div>

            </div>


            <button class="delete-btn">
                🗑️
            </button>

        `;


        // Checkbox

        const checkbox =
            taskCard.querySelector(".task-checkbox");


        checkbox.addEventListener(
            "change",
            function() {

                toggleTask(task.id);

            }
        );


        // Delete button

        const deleteBtn =
            taskCard.querySelector(".delete-btn");


        deleteBtn.addEventListener(
            "click",
            function() {

                deleteTask(task.id);

            }
        );


        // Add card to container

        tasksContainer.appendChild(taskCard);

    });
}


// =========================
// COMPLETE / UNCOMPLETE TASK
// =========================

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });


    displayTasks();

    updateProgress();
}


// =========================
// DELETE TASK
// =========================

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    displayTasks();

    updateProgress();
}


// =========================
// UPDATE PROGRESS
// =========================

function updateProgress() {

    const totalTasks = tasks.length;


    const completedTasks =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    // No tasks

    if (totalTasks === 0) {

        taskCount.textContent =
            "0 / 0 Tasks Completed";

        percentage.textContent = "0%";

        progress.style.width = "0%";

        remainingTasks.textContent =
            "0 remaining";

        return;
    }


    // Calculate percentage

    const progressPercentage =
        Math.round(
            (completedTasks / totalTasks) * 100
        );


    // Update UI

    taskCount.textContent =
        `${completedTasks} / ${totalTasks} Tasks Completed`;


    percentage.textContent =
        `${progressPercentage}%`;


    progress.style.width =
        `${progressPercentage}%`;


    const remaining =
        totalTasks - completedTasks;


    remainingTasks.textContent =
        `${remaining} remaining`;
}


// =========================
// FORMAT TIME
// =========================

function formatTime(time) {

    if (!time) {

        return "No time set";

    }


    const [hours, minutes] =
        time.split(":");


    const date =
        new Date();


    date.setHours(hours);

    date.setMinutes(minutes);


    return date.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );
}