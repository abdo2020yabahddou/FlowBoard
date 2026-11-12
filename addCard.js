const addCardBtn = document.getElementById("addCardBtn")
const addCardModal = document.getElementById("addCardModal")
const closeBtn = document.querySelector(`.close`)
const taskName = document.getElementById("taskName")
const taskAssigned = document.getElementById("taskAssigned")
const priority = document.getElementById("priority")
const description = document.getElementById("description")
const statusTask = document.getElementById("status")
const submitBtn = document.getElementById("submitBtn")

function emptyFields() {
    taskName.value = "";
    taskAssigned.value = "";
    description.value = "";
    priority.value = "";
    statusTask.value = ""
}

function hideModal() {
    addCardModal.style.display = "none"
}

addCardBtn.addEventListener("click", () => {
    addCardModal.style.display = "block"
})

window.onclick = function (event) {
    if (event.target === addCardModal) {
        hideModal()
        emptyFields()
    }
}

closeBtn.addEventListener("click", () => {
    hideModal()
    emptyFields()
})

function validateName(name) {
    const namePattern = /^[\p{L}\s]+$/u;
    if (!namePattern.test(name.value.trim())) {
        throw new Error("Le nom doit contenir uniquement des lettres");
    }
}

submitBtn.addEventListener("click", () => {
    try {
        validateName(taskName)
        validateName(taskAssigned)
        if (priority.value === "" || description.value.trim() === "" || statusTask.value === "") {
            throw new Error("Veuillez remplir tous les champs obligatoires");
        }
        const columns = [
            {
                title: "To Do",
                status: "todo",
                className: "todo"
            },
            {
                title: "In Progress",
                status: "in-progress",
                className: "in-progress"
            },
            {
                title: "Done",
                status: "done",
                className: "done"
            }
        ];
        columns.filter((item) => {
            return item.status = statusTask
        })
        const newItem = document.createElement("div");
        newItem.className = "task-card";

        const taskTitle = document.createElement("h6");
        taskTitle.textContent = taskName.value

        const taskDescription = document.createElement("p");
        taskDescription.textContent = description.value

        const taskPriority = document.createElement("span");
        taskPriority.className = "badge";
        if (priority.value === "high") {
            taskPriority.classList.add("bg-danger");
        } else if (priority.value === "medium") {
            taskPriority.classList.add("bg-warning", "text-dark");
        } else {
            taskPriority.classList.add("bg-success");
        }
        taskPriority.textContent = priority.value

        const assignee = document.createElement("small");
        assignee.textContent = taskAssigned.value

        const br = document.createElement("br")
        newItem.append(taskTitle, taskDescription, taskPriority, br, assignee)
        const selectedColumn = document.querySelector(`.kanban-column.${statusTask.value}`);
        selectedColumn.appendChild(newItem);
        emptyFields()
        hideModal()
    } catch (e) {
        alert(e.message)
    }
})