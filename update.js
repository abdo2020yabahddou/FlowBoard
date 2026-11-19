import {errorHandler, loader, state} from "./api.js";
import axios from "axios";
import {description, hideModal, priority, showModal, statusTask, taskAssigned, taskId, taskName,} from "./addCard.js";
import {renderCards} from "./render.js";

const submitBtnDiv = document.getElementById("submitBtnDiv")
const addTaskTitleElement = document.getElementById("AddTaskTitle")
const saveBtn = document.getElementById("saveButton")

export async function editItem() {
    const id = taskId.value
    const data = {
        title: taskName.value,
        description: description.value,
        status: statusTask.value,
        priority: priority.value,
        assignee: taskAssigned.value
    }
    const url = `https://flowboard-api-virid.vercel.app/cards/${id}?password=1234`;
    try {
        await axios.patch(url, data);
        state.cards = state.cards.filter(card => card.id !== id)
        renderCards(state.cards)
        return true;
    } catch (error) {
        errorHandler(error);
        return false;
    } finally {
        loader.style.display = "none";
    }
}

export function openEditModal(item) {
    taskId.value = item.id
    taskName.value = item.title
    description.value = item.description
    statusTask.value = item.status
    priority.value = item.priority
    taskAssigned.value = item.assignee
    submitBtnDiv.style.display = "none";
    addTaskTitleElement.textContent = "Update the task informations"
    saveBtn.style.display = "block"
    showModal()
}

saveBtn.addEventListener("click", async () => {
    const success = await editItem()
    if (success) {
        Swal.fire({
            title: "Edited!",
            text: "Your item has been edited.",
            icon: "success"
        });
        hideModal()
    }
})