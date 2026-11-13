import {container, errorHandler, errorHandlerMsg, getData, loader} from './api.js';
import {renderCards} from "./render.js";

const stateFilter = {cards: []};
const filter = document.getElementById("filterForm")
const resetBtn = document.getElementById("resetBtn")
const priorityFilter = document.getElementById("priorityFilter")
const assignedFilter = document.getElementById("assignedFilter")
const noResults = document.getElementById("noResults");
const keywordFilter = document.getElementById("keywordFilter");

function getDataFiltered() {
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

    loader.style.display = "block";
    errorHandlerMsg.style.display = "none";

    console.log("Request URL:", url);
    console.log("Search value:", keywordFilter.value);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            stateFilter.cards = result;
            displayFilteredCards();
            loader.style.display = "none";
        })
        .catch(error => {
            errorHandler(error)
        });
}

function displayFilteredCards() {
    noResults.style.display =
        stateFilter.cards.length === 0 ? "block" : "none";

    renderCards(stateFilter.cards, container);
}

priorityFilter.addEventListener("change", getDataFiltered);
assignedFilter.addEventListener("change", () => {
        console.log("You entered:", keywordFilter.value);
        getDataFiltered()
    }
);
keywordFilter.addEventListener("input", getDataFiltered);
filter.addEventListener("submit", event => {
    event.preventDefault();
});
resetBtn.addEventListener("click", () => {
    filter.reset();
    noResults.style.display = "none"
    container.innerHTML = ""
    getData()
});

getDataFiltered()