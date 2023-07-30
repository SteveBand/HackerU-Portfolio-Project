"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.TaskClass = void 0;
var editWrapper = document.querySelector("section.edit-wrapper");
//Recives a new ID every edit button clicked//
var editedId = "";
//Task class with its methods//
var TaskClass = /** @class */ (function () {
    function TaskClass() {
        var _this = this;
        var _a;
        //Tasks Examples//
        this.tasks = [
            {
                id: "2",
                title: "Gaming",
                description: "Build a safe heaven above necrophilis",
                completed: true,
                priority: PriorityTypes.high
            },
            {
                id: "1",
                title: "Gaming",
                description: "Build a safe heaven above necrophilis",
                completed: false,
                priority: PriorityTypes.low
            },
            {
                id: "3",
                title: "Gaming",
                description: "Build a safe heaven above necrophilis",
                completed: false,
                priority: PriorityTypes.medium
            },
        ];
        this.showTasks();
        (_a = document
            .querySelector("button.add-task-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return _this.addTask(); });
    }
    //Adds task to this.tasks list//
    TaskClass.prototype.addTask = function () {
        var titleInput = document.querySelector("#title");
        var descriptionInput = document.querySelector("#description");
        var priorityInput = document.querySelector("#Priority");
        //Checks if Inputs exist , Typescript requires it//
        if (titleInput && descriptionInput && priorityInput) {
            //Checks the value is not empty//
            if (titleInput.value.length > 1 && descriptionInput.value.length > 1) {
                var createTask = {
                    id: "".concat(new Date().getTime()),
                    title: titleInput.value,
                    description: descriptionInput.value,
                    completed: false,
                    priority: +priorityInput.value
                };
                ///Updats this.tasks list with new Task as index 0 and old tasks///
                this.tasks = __spreadArray([createTask], this.tasks, true);
                this.showTasks();
                titleInput.innerHTML = "";
                descriptionInput.innerHTML = "";
            }
        }
    };
    //Edits task//
    TaskClass.prototype.editTask = function (id) {
        var oldTask = this.tasks.find(function (el) { return el.id == id; });
        var oldIndex = this.tasks.findIndex(function (el) { return el.id == id; });
        var editedTitel = document.querySelector("#edit-title");
        var editedDesc = document.querySelector("#edit-description");
        var editedTask;
        //check if clicked edited task exists//
        if (oldTask) {
            //creates new Task with new or old values//
            editedTask = {
                id: oldTask.id,
                title: editedTitel.value || oldTask.title,
                description: editedDesc.value || oldTask.description,
                completed: oldTask.completed,
                priority: oldTask.priority
            };
            //replaces between old and new Object Task
            this.tasks.splice(oldIndex, 1, editedTask);
            this.showTasks();
            editWrapper.style.display = "none";
        }
        else {
            this.showTasks();
            editWrapper.style.display = "none";
        }
    };
    //Changes completed Value in task Object to true, changes its className //
    TaskClass.prototype.completeTask = function (id) {
        var element = this.tasks.find(function (el) { return el.id === id; });
        element ? (element.completed = true) : null;
        this.showTasks();
    };
    //changes completed Value in task Object to false, changes its className//
    TaskClass.prototype.unCompleteTask = function (id) {
        var element = this.tasks.find(function (el) { return el.id === id; });
        element ? (element.completed = false) : null;
        this.showTasks();
    };
    //Finds task index in this.tasks list and removes it
    TaskClass.prototype.removeTask = function (id) {
        var taskIndex = this.tasks.findIndex(function (el) { return el.id === id; });
        this.tasks.splice(taskIndex, 1);
        this.showTasks();
    };
    //Loops this.tasks and creates each object element an HTML Element which contains the values//
    TaskClass.prototype.showTasks = function () {
        var _this = this;
        var newTasks = document.querySelector("article.new-tasks");
        var completedTasks = document.querySelector("article.completed-tasks");
        //Resets HTML element to avoid duplicates
        if (newTasks) {
            newTasks.innerHTML = "";
        }
        //Resets HTML element to avoid duplicates
        if (completedTasks) {
            completedTasks.innerHTML = "";
        }
        //Loops over this.tasks to create HTML Elements//
        this.tasks.forEach(function (el) {
            var div = document.createElement("div");
            div.id = el.id;
            div.classList.add("task-wrapper");
            div.classList.add(el.priority == PriorityTypes.low
                ? "low"
                : el.priority == PriorityTypes.medium
                    ? "medium"
                    : el.priority == PriorityTypes.high
                        ? "high"
                        : "low");
            //Checks object priority Value and adds the right value for its className//
            // div.innerHTML = `
            //       <h6 class="${
            //        el.priority == PriorityTypes.low
            //          ? "low"
            //          : el.priority == PriorityTypes.medium
            //          ? "medium"
            //          : el.priority == PriorityTypes.high
            //          ? "high"
            //          : "low"
            //      }">${el.title}</h6>
            //       <p>${el.description}</p>
            //   `;
            div.innerHTML = "\n      <h6>".concat(el.title, "</h6>\n      <p>").concat(el.description, "</p>\n      ");
            var buttonsWrapper = document.createElement("span");
            buttonsWrapper.classList.add("buttons-wrapper");
            var removeBtn = document.createElement("button");
            removeBtn.innerHTML = "x";
            removeBtn.classList.add("remove-btn");
            removeBtn.addEventListener("click", function () { return _this.removeTask(el.id); });
            var completeBtn = document.createElement("button");
            completeBtn.innerHTML = "\u2713";
            completeBtn.addEventListener("click", function () { return _this.completeTask(el.id); });
            completeBtn.classList.add("complete-btn");
            var unCompleteBtn = document.createElement("button");
            unCompleteBtn.addEventListener("click", function () { return _this.unCompleteTask(el.id); });
            unCompleteBtn.innerHTML = "\u237B";
            unCompleteBtn.classList.add("uncomplete-btn");
            var editBtn = document.createElement("button");
            editBtn.innerHTML = "\u267A";
            editBtn.classList.add("edit-btn");
            editBtn.addEventListener("click", function (e) {
                var div = e.target.closest("div");
                editedId = div.id;
                editWrapper.style.display = "flex";
                console.log(div);
            });
            if (el.completed) {
                buttonsWrapper.appendChild(removeBtn);
                buttonsWrapper.appendChild(unCompleteBtn);
                div.appendChild(buttonsWrapper);
                completedTasks === null || completedTasks === void 0 ? void 0 : completedTasks.appendChild(div);
            }
            else {
                buttonsWrapper.appendChild(removeBtn);
                buttonsWrapper.appendChild(completeBtn);
                buttonsWrapper.appendChild(editBtn);
                div.appendChild(buttonsWrapper);
                newTasks === null || newTasks === void 0 ? void 0 : newTasks.appendChild(div);
            }
        });
    };
    return TaskClass;
}());
exports.TaskClass = TaskClass;
var PriorityTypes;
(function (PriorityTypes) {
    PriorityTypes[PriorityTypes["low"] = 0] = "low";
    PriorityTypes[PriorityTypes["medium"] = 1] = "medium";
    PriorityTypes[PriorityTypes["high"] = 2] = "high";
})(PriorityTypes || (PriorityTypes = {}));
var liArr = document.querySelectorAll("nav > ul > li");
var completedTasksArr = document.querySelector("article.completed-tasks");
var newTasks = document.querySelector("article.new-tasks");
var addTask = document.querySelector("article.add-task");
//Changes between articles with loop and classNames, adjusting the right buttons for them//
liArr.forEach(function (i) {
    i.addEventListener("click", function () {
        liArr.forEach(function (x) {
            x.classList.remove("active");
        });
        i.classList.add("active");
        if (i.innerHTML == "Completed Tasks") {
            completedTasksArr ? (completedTasksArr.style.display = "grid") : null;
            newTasks ? (newTasks.style.display = "none") : null;
            addTask ? (addTask.style.display = "none") : null;
        }
        else if (i.innerHTML == "New Tasks") {
            completedTasksArr ? (completedTasksArr.style.display = "none") : null;
            newTasks ? (newTasks.style.display = "grid") : null;
            addTask ? (addTask.style.display = "none") : null;
        }
        else if (i.innerHTML == "Add Task") {
            completedTasksArr ? (completedTasksArr.style.display = "none") : null;
            newTasks ? (newTasks.style.display = "none") : null;
            addTask ? (addTask.style.display = "block") : null;
        }
    });
});
///Adds an eventListener to editTask section button//
var saveButton = document.querySelector("button.save-btn");
saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener("click", function (e) {
    e.preventDefault();
    task.editTask(editedId);
    console.log(editedId);
});
var task = new TaskClass();
