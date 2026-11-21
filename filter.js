import {container, errorHandler, getData, loader, state} from './api.js';
import {renderCards} from "./render.js";
import axios from "axios";

const filter = document.getElementById("filterForm")
const resetBtn = document.getElementById("resetBtn")
const priorityFilter = document.getElementById("priorityFilter")
const assignedFilter = document.getElementById("assignedFilter")
const noResults = document.getElementById("noResults");
const keywordFilter = document.getElementById("keywordFilter");

async function getDataFiltered() {
    const params = new URLSearchParams();

    if (priorityFilter.value !== "") {
        params.append("priority", priorityFilter.value);
    }

    if (assignedFilter.value !== "") {
        params.append("assignee", assignedFilter.value);
    }

    if (keywordFilter.value.trim() !== "") {
        params.append("q", keywordFilter.value.trim());
    }

    const url = `https://flowboard-api-virid.vercel.app/cards?${params.toString()}`;
    try {
        const response = await axios.get(url)
        state.cards = response.data
        displayFilteredCards()
    } catch (error) {
        errorHandler(error);
    } finally {
        loader.style.display = "none";
    }
}

function displayFilteredCards() {
    noResults.style.display = state.cards.length === 0 ? "block" : "none";
    renderCards();
}

priorityFilter.addEventListener("change", getDataFiltered);
assignedFilter.addEventListener("change", getDataFiltered);
keywordFilter.addEventListener("input", getDataFiltered);
resetBtn.addEventListener("click", async () => {
    filter.reset();
    noResults.style.display = "none"
    container.innerHTML = ""
    await getData()
});

await getDataFiltered()