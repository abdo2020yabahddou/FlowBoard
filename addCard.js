import {renderCards} from "./render.js";
import {container, state} from "./api.js";

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

function validateTaskName() {
    const namePattern = /^[\p{L}\s]+$/u;
    if (!namePattern.test(taskName.value.trim())) {
        throw new Error("Le nom doit contenir uniquement des lettres");
    }
}

submitBtn.addEventListener("click", () => {
    try {
        validateTaskName()
        if (priority.value === "" || description.value.trim() === "" || statusTask.value === "" || taskAssigned.value === "") {
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
        const newTask = {
            title: taskName.value,
            description: description.value,
            priority: priority.value,
            assignee: taskAssigned.value,
            status: statusTask.value
        };
        state.cards.push(newTask);
        renderCards(state.cards, container);
        emptyFields()
        hideModal()
    } catch (e) {
        alert(e.message)
    }
})