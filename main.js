// Invoke the displayTasks function to show the tasks on the page
displayTasks();

// Invoke the validateDateTime function to perform initial validation on the date and time input
validateDateTime();

"use strict";

/*
 * Saves a new task by capturing the input values, validating them, and inserting the task into storage.
 * It also updates the display, clears the input fields, and applies a fade-in effect to the newly added task.
 */
function save() {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Take DOM Elements
    const descriptionBox = document.getElementById("descriptionBox");
    const timeBox = document.getElementById("timeBox");

    // Create task object
    const description = descriptionBox.value;
    const time = timeBox.value;

    // Validate the values:
    const isFormValid = validator(description, time);

    //If One of the values invalid, exit the function:
    if (isFormValid === false)
        return;

    // Create task object
    const task = { description, time };

    // Insert the task into storage
    insertTaskToStorage(task);

    displayTasks();

    // Clear the input fields
    descriptionBox.value = "";
    timeBox.value = "";

    // Apply fade-in class to the newly added task
    const sectionTasks = document.getElementById("sectionTasks");
    const newTaskElement = sectionTasks.firstElementChild;

    // Apply fade-in class to the newly added task
    newTaskElement.classList.add("fade-in");
}

// Display tasks on the page
function displayTasks() {

    // Take data from storage
    let json = localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];

    let html = ``;

    // Loop through the tasks array in reverse order
    for (let i = tasks.length - 1; i >= 0; i--) {
        const taskDate = new Date(tasks[i].time);

        // Format the task date as "dd/mm/yyyy HH:MM"
        const formattedDate = `${taskDate.getDate()}/${taskDate.getMonth() + 1}/${taskDate.getFullYear()}\n${taskDate.toLocaleTimeString('en-US')}`;

        // Build the HTML for each task
        html += `
            <div class="task">
            
                <div class="task-image">
                    <img src="assets/images/note4.png" class="stickyNoteImg" alt="Sticky note">
                </div>
                <br>
                <button class="remove" onclick="remove(${i})"><i class="fas fa-calendar-times"></i></button>
                <div class="task-content">
                    ${tasks[i].description}
                    <hr>
                </div>
                <div class="task-date">            
                    ${formattedDate}
                </div>
            </div>`;
    }

    // Get the sectionTasks element by its ID
    const sectionTasks = document.getElementById("sectionTasks");

    // Update the innerHTML of the sectionTasks element with the generated HTML
    sectionTasks.innerHTML = html;
}

// Remove a task from storage and update the display
function remove(index) {
    // Retrieve the JSON string representing the tasks from the local storage
    const taskString = localStorage.getItem("tasks");

    // Parse the JSON string into an array of tasks
    const tasks = JSON.parse(taskString);

    tasks.splice(index, 1); // Remove the task at the given index

    // Convert the modified tasks array back to a JSON string
    const tasksString = JSON.stringify(tasks);

    // Update the tasks data in the local storage
    localStorage.setItem("tasks", tasksString);

    // Update the display to reflect the changes
    displayTasks();
}

// Validate the description and time inputs
function validator(description, time) {
    // Take DOM Elements
    const descriptionBox = document.getElementById("descriptionBox");
    const timeBox = document.getElementById("timeBox");

    if (description === "") {
        alert("description must contain a value");
        descriptionBox.focus();
        return false;
    }

    if (timeBox.value === "") {
        // I check just that the user insert a value
        // Because each value will be valid because only future values ​​can be selected
        alert("time must contain a value");
        timeBox.focus();
        return false;
    }

    // If the validations pass successfully return true
    return true;
}

function validateDateTime() {
    // Retrieve the time input element from the DOM
    const timeBox = document.getElementById("timeBox");

    // Get the current date and time
    const now = new Date();

    // Get the selected date and time from the input element
    const selectedDateTime = new Date(timeBox.value);

    // Check if the selected date and time is in the past
    if (selectedDateTime < now) {
        // Reset the value if a past date and time is selected
        timeBox.value = "";
    }

    // Set the minimum date and time to the current date and time
    const minDateTime = now.toISOString().slice(0, 16);
    timeBox.setAttribute("min", minDateTime);
}

// Insert a task into storage
function insertTaskToStorage(task) {
    // Take data from storage
    let json = localStorage.getItem("tasks");

    // Parse the JSON string into an array of tasks or create an empty array if no data is found
    const tasks = json ? JSON.parse(json) : [];

    // Add the new task to the tasks array
    tasks.push(task);

    // Convert the tasks array back to JSON string
    json = JSON.stringify(tasks);

    // Save the updated tasks data back to local storage
    localStorage.setItem("tasks", json);
}