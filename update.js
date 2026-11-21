import {errorHandler, getData, loader} from "./api.js";
import axios from "axios";
import {description, hideModal, priority, showModal, statusTask, taskAssigned, taskId, taskName, validateFields,} from "./addCard.js";
import {renderCards} from "./render.js";

const submitBtnDiv = document.getElementById("submitBtnDiv")
export const addTaskTitleElement = document.getElementById("AddTaskTitle")
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
        renderCards()
        return true;
    } catch (error) {
        errorHandler(error);
        return false;
    } finally {
        loader.style.display = "none";
    }
}

export function openEditModal(card) {
    taskId.value = card.id
    taskName.value = card.title
    description.value = card.description
    statusTask.value = card.status
    priority.value = card.priority
    taskAssigned.value = card.assignee
    submitBtnDiv.style.display = "none";
    addTaskTitleElement.textContent = "Update the task informations"
    saveBtn.style.display = "block"
    showModal()
}

saveBtn.addEventListener("click", async () => {
    if (validateFields() === false) {
        return;
    }
    const success = await editItem()
    if (success) {
        Swal.fire({
            title: "Edited!",
            text: "Your item has been edited.",
            icon: "success"
        });
        hideModal()
        await getData()
    }
})