import {displayCards, errorHandler, getData, loader} from "./api.js";
import axios from "axios";
import {CONFIG} from "./config.js";

const generateWithAIBtn = document.getElementById("generateWithAI")
const addTasksByAiModal = document.getElementById("addTasksByAiModal")
const createTasksByAIBtn = document.getElementById("createTasksByAI")
const descriptionForAi = document.getElementById("descriptionForAi")
const countElement = document.getElementById("count")
const closeAiModalElement = document.getElementById("closeAiModal")

generateWithAIBtn.addEventListener("click", () => {
    addTasksByAiModal.style.display = "block"
})

function emptyAIFields() {
    descriptionForAi.value = ""
    closeAiModalElement.value = ""
}

closeAiModalElement.addEventListener("click", () => {
    addTasksByAiModal.style.display = "none"
    emptyAIFields()
})

window.onclick = function (event) {
    if (event.target === addTasksByAiModal) {
        addTasksByAiModal.style.display = "none"
        emptyAIFields()
    }
}

createTasksByAIBtn.addEventListener("click", async () => {
    if (descriptionForAi.value === "" || countElement.value === "") {
        return false;
    }
    const success = await addTasksByAi()
    if (success) {
        Swal.fire({
            title: "Success!",
            text: "Your cards has been created",
            icon: "success"
        });
        addTasksByAiModal.style.display = "none"
        await getData()
    }
})

async function addTasksByAi() {
    const options = {
        method: 'POST',
        url: 'https://flowboard-api-virid.vercel.app/ai/cards/?password=1234',
        headers: {
            'X-Workspace': 'public',
            'Content-Type': 'application/json',
        },
        data: {
            description: descriptionForAi.value,
            apiKey: CONFIG.API_URL,
            count: Number(countElement.value)
        }
    }

    try {
        await axios.request(options)
        await displayCards()
        return true;
    } catch (error) {
        errorHandler(error);
        return false;
    } finally {
        loader.style.display = "none";
    }
}