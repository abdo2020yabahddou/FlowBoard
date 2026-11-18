import {renderCards} from "./render.js";
import {state} from "./api.js";

const addCardBtn = document.getElementById("addCardBtn")
const addCardModal = document.getElementById("addCardModal")
const closeBtn = document.querySelector(`.close`)
export const taskId = document.getElementById("idTask")
export const taskName = document.getElementById("taskName")
export const taskAssigned = document.getElementById("taskAssigned")
export const priority = document.getElementById("priority")
export const description = document.getElementById("description")
export const statusTask = document.getElementById("status")
const submitBtn = document.getElementById("submitBtn")
const discountError = document.querySelectorAll(".discountError")

function showError(index, message) {
    discountError[index].textContent = message;
    discountError[index].style.display = "block";
}

function hideError(index) {
    discountError[index].textContent = "";
    discountError[index].style.display = "none";
}

function hideAllErrors() {
    discountError.forEach((_, index) => {
        hideError(index);
    });
}

function emptyFields() {
    taskName.value = "";
    taskAssigned.value = "";
    description.value = "";
    priority.value = "";
    statusTask.value = ""
    hideAllErrors()
}

export function hideModal() {
    addCardModal.style.display = "none"
}

export function showModal() {
    addCardModal.style.display = "block"
}

addCardBtn.addEventListener("click", () => {
    showModal()
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
    if (taskName.value.trim() === "") {
        showError(0, "Le nom est obligatoire.");
        return false;
    }

    if (!namePattern.test(taskName.value.trim())) {
        showError(0, "Le nom doit contenir uniquement des lettres.");
        return false;
    }

    hideError(0);
    return true;
}

export function validateFields() {
    const isNameValid = validateTaskName();
    const isPriorityValid = priority.value !== "";
    const isStatusValid = statusTask.value !== "";
    const isDescriptionValid = description.value.trim() !== "";
    const isAssigneeValid = taskAssigned.value !== "";

    if (!isPriorityValid) {
        showError(1, "Veuillez sélectionner une priorité");
    } else {
        hideError(1);
    }

    if (!isStatusValid) {
        showError(2, "Veuillez sélectionner un statut");
    } else {
        hideError(2);
    }

    if (!isDescriptionValid) {
        showError(3, "La description est obligatoire");
    } else {
        hideError(3);
    }

    if (!isAssigneeValid) {
        showError(4, "Veuillez sélectionner un membre");
    } else {
        hideError(4);
    }

    return isNameValid && isPriorityValid && isStatusValid && isDescriptionValid && isAssigneeValid;
}

submitBtn.addEventListener("click", () => {
    if (validateFields() === false) {
        return;
    }

    const newTask = {
        title: taskName.value.trim(),
        description: description.value.trim(),
        priority: priority.value,
        assignee: taskAssigned.value,
        status: statusTask.value
    };

    state.cards.push(newTask);
    renderCards(state.cards);
    emptyFields();
    hideModal();
});