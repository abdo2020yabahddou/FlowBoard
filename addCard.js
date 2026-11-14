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
    discountError.forEach((error, index) => {
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

function validateFields() {

    const isNameValid = validateTaskName();

    if (priority.value === "") {
        showError(1, "Veuillez sélectionner une priorité");
    } else {
        hideError(1);
    }

    if (statusTask.value === "") {
        showError(2, "Veuillez sélectionner un statut");
    } else {
        hideError(2);
    }

    if (description.value.trim() === "") {
        showError(3, "La description est obligatoire");
    } else {
        hideError(3);
    }

    if (taskAssigned.value === "") {
        showError(4, "Veuillez sélectionner un mombre");
    } else {
        hideError(4);
    }

    return isNameValid &&
        priority.value !== "" &&
        statusTask.value !== "" &&
        description.value.trim() !== "" &&
        taskAssigned.value !== ""
}

submitBtn.addEventListener("click", () => {
    if (!validateFields()) {
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
    renderCards(state.cards, container);
    emptyFields();
    hideModal();
});