const editWrapper = document.querySelector(
  "section.edit-wrapper"
) as HTMLSelectElement;

//Type of newTask//

interface newTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: PriorityTypes;
}

//Recives a new ID every edit button clicked//
let editedId: string = "";
//Task class with its methods//
export class TaskClass {
  //Tasks Examples//
  tasks: newTask[] = [
    {
      id: `2`,
      title: "Gaming",
      description: "Build a safe heaven above necrophilis",
      completed: true,
      priority: PriorityTypes.high,
    },
    {
      id: `1`,
      title: "Gaming",
      description: "Build a safe heaven above necrophilis",
      completed: false,
      priority: PriorityTypes.low,
    },
    {
      id: `3`,
      title: "Gaming",
      description: "Build a safe heaven above necrophilis",
      completed: false,
      priority: PriorityTypes.medium,
    },
  ];

  constructor() {
    this.showTasks();
    document
      .querySelector("button.add-task-btn")
      ?.addEventListener("click", () => this.addTask());
  }
  //Adds task to this.tasks list//
  addTask() {
    const titleInput = document.querySelector("#title") as HTMLInputElement;
    const descriptionInput = document.querySelector(
      "#description"
    ) as HTMLInputElement;
    const priorityInput = document.querySelector(
      "#Priority"
    ) as HTMLSelectElement;
    //Checks if Inputs exist , Typescript requires it//
    if (titleInput && descriptionInput && priorityInput) {
      //Checks the value is not empty//
      if (titleInput.value.length > 1 && descriptionInput.value.length > 1) {
        const createTask: newTask = {
          id: `${new Date().getTime()}`,
          title: titleInput.value,
          description: descriptionInput.value,
          completed: false,
          priority: +priorityInput.value,
        };
        ///Updats this.tasks list with new Task as index 0 and old tasks///
        this.tasks = [createTask, ...this.tasks];
        this.showTasks();
        titleInput.innerHTML = "";
        descriptionInput.innerHTML = "";
      }
    }
  }
  //Edits task//
  editTask(id: string) {
    const oldTask = this.tasks.find((el) => el.id == id);
    const oldIndex = this.tasks.findIndex((el) => el.id == id);
    let editedTitel = document.querySelector("#edit-title") as HTMLInputElement;
    let editedDesc: HTMLTextAreaElement | null =
      document.querySelector("#edit-description");
    let editedTask: newTask;
    //check if clicked edited task exists//
    if (oldTask) {
      //creates new Task with new or old values//
      editedTask = {
        id: oldTask.id,
        title: editedTitel.value || oldTask.title,
        description: editedDesc!.value || oldTask.description,
        completed: oldTask.completed,
        priority: oldTask.priority,
      };
      //replaces between old and new Object Task
      this.tasks.splice(oldIndex, 1, editedTask);
      this.showTasks();
      editWrapper.style.display = "none";
    } else {
      this.showTasks();
      editWrapper.style.display = "none";
    }
  }
  //Changes completed Value in task Object to true, changes its className //
  completeTask(id: string) {
    const element = this.tasks.find((el) => el.id === id);
    element ? (element.completed = true) : null;
    this.showTasks();
  }

  //changes completed Value in task Object to false, changes its className//
  unCompleteTask(id: string) {
    const element = this.tasks.find((el) => el.id === id);
    element ? (element.completed = false) : null;
    this.showTasks();
  }

  //Finds task index in this.tasks list and removes it
  removeTask(id: string) {
    const taskIndex = this.tasks.findIndex((el) => el.id === id);
    this.tasks.splice(taskIndex, 1);
    this.showTasks();
  }
  //Loops this.tasks and creates each object element an HTML Element which contains the values//
  showTasks() {
    const newTasks = document.querySelector("article.new-tasks");
    const completedTasks = document.querySelector("article.completed-tasks");
    //Resets HTML element to avoid duplicates
    if (newTasks) {
      newTasks.innerHTML = "";
    }
    //Resets HTML element to avoid duplicates
    if (completedTasks) {
      completedTasks.innerHTML = "";
    }
    //Loops over this.tasks to create HTML Elements//
    this.tasks.forEach((el) => {
      const div: HTMLDivElement = document.createElement("div");
      div.id = el.id;
      div.classList.add("task-wrapper");
      div.classList.add(
        el.priority == PriorityTypes.low
          ? "low"
          : el.priority == PriorityTypes.medium
          ? "medium"
          : el.priority == PriorityTypes.high
          ? "high"
          : "low"
      );

      div.innerHTML = `
      <h6>${el.title}</h6>
      <p>${el.description}</p>
      `;
      const buttonsWrapper = document.createElement("span");
      buttonsWrapper.classList.add("buttons-wrapper");
      const removeBtn: HTMLButtonElement = document.createElement("button");
      removeBtn.innerHTML = `x`;
      removeBtn.classList.add("remove-btn");
      removeBtn.addEventListener("click", () => this.removeTask(el.id));
      const completeBtn: HTMLButtonElement = document.createElement("button");
      completeBtn.innerHTML = `✓`;
      completeBtn.addEventListener("click", () => this.completeTask(el.id));
      completeBtn.classList.add("complete-btn");
      const unCompleteBtn: HTMLButtonElement = document.createElement("button");
      unCompleteBtn.addEventListener("click", () => this.unCompleteTask(el.id));
      unCompleteBtn.innerHTML = `⍻`;
      unCompleteBtn.classList.add("uncomplete-btn");
      const editBtn: HTMLButtonElement = document.createElement("button");
      editBtn.innerHTML = `♺`;
      editBtn.classList.add("edit-btn");
      editBtn.addEventListener("click", (e) => {
        const div = (e.target as HTMLButtonElement).closest("div");
        editedId = div!.id;
        editWrapper.style.display = "flex";
        console.log(div);
      });
      if (el.completed) {
        buttonsWrapper.appendChild(removeBtn);
        buttonsWrapper.appendChild(unCompleteBtn);
        div.appendChild(buttonsWrapper);
        completedTasks?.appendChild(div);
      } else {
        buttonsWrapper.appendChild(removeBtn);
        buttonsWrapper.appendChild(completeBtn);
        buttonsWrapper.appendChild(editBtn);
        div.appendChild(buttonsWrapper);
        newTasks?.appendChild(div);
      }
    });
  }
}

enum PriorityTypes {
  low,
  medium,
  high,
}

const liArr = document.querySelectorAll("nav > ul > li");
const completedTasksArr: HTMLElement | null = document.querySelector(
  "article.completed-tasks"
);
const newTasks: HTMLElement | null =
  document.querySelector("article.new-tasks");

const addTask: HTMLElement | null = document.querySelector("article.add-task");

//Changes between articles with loop and classNames, adjusting the right buttons for them//
liArr.forEach((i) => {
  i.addEventListener("click", () => {
    liArr.forEach((x) => {
      x.classList.remove("active");
    });
    i.classList.add("active");
    if (i.innerHTML == "Completed Tasks") {
      completedTasksArr ? (completedTasksArr.style.display = "grid") : null;
      newTasks ? (newTasks.style.display = "none") : null;
      addTask ? (addTask.style.display = "none") : null;
    } else if (i.innerHTML == "New Tasks") {
      completedTasksArr ? (completedTasksArr.style.display = "none") : null;
      newTasks ? (newTasks.style.display = "grid") : null;
      addTask ? (addTask.style.display = "none") : null;
    } else if (i.innerHTML == "Add Task") {
      completedTasksArr ? (completedTasksArr.style.display = "none") : null;
      newTasks ? (newTasks.style.display = "none") : null;
      addTask ? (addTask.style.display = "block") : null;
    }
  });
});

///Adds an eventListener to editTask section button//
const saveButton = document.querySelector("button.save-btn");
saveButton?.addEventListener("click", (e) => {
  e.preventDefault();
  task.editTask(editedId);
  console.log(editedId);
});

const task = new TaskClass();
