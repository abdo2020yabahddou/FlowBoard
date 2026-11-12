import {getData} from './api.js';

const stateFilter = {cards: []};
const filter = document.getElementById("filterForm")
const resetBtn = document.getElementById("resetBtn")
const priorityFilter = document.getElementById("priorityFilter")
const assignedFilter = document.getElementById("assignedFilter")
const errorHandler1 = document.getElementById("errorHandler")
const loader1 = document.getElementById("loader")
const container1 = document.getElementById("container");
const noResults = document.getElementById("noResults");
const keywordFilter = document.getElementById("keywordFilter");

function getDataFilterd() {
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

    loader1.style.display = "block";
    errorHandler1.style.display = "none";

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
            loader1.style.display = "none";
        })
        .catch(error => {
            loader1.style.display = "none";
            errorHandler1.style.display = "block";
            console.log(error.message);
        });
}

function displayFilteredCards() {
    container1.innerHTML = "";
    noResults.style.display = stateFilter.cards.length === 0 ? "block" : "none";
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

    columns.forEach(column => {

        const columnElement = document.createElement("div");
        columnElement.className = "col-md-4 mb-3";

        const columnContent = document.createElement("div");
        columnContent.className = `kanban-column ${column.className}`;

        const filteredCards = stateFilter.cards.filter(card => {
            return card.status === column.status;
        });

        const title = document.createElement("h5");
        title.textContent = `${column.title} (${filteredCards.length})`;

        columnContent.appendChild(title);

        filteredCards.forEach(card => {

            const newItem = document.createElement("div");
            newItem.className = "task-card";

            const taskTitle = document.createElement("h6");
            taskTitle.textContent = card.title;

            const taskDescription = document.createElement("p");
            taskDescription.textContent = card.description;

            const taskPriority = document.createElement("span");
            taskPriority.className = "badge";

            if (card.priority === "high") {
                taskPriority.classList.add("bg-danger");
            } else if (card.priority === "medium") {
                taskPriority.classList.add("bg-warning", "text-dark");
            } else {
                taskPriority.classList.add("bg-success");
            }

            taskPriority.textContent = card.priority;

            const assignee = document.createElement("small");
            assignee.textContent = card.assignee;

            const br = document.createElement("br");

            newItem.append(taskTitle, taskDescription, taskPriority, br, assignee);
            columnContent.appendChild(newItem);
        });

        columnElement.appendChild(columnContent);
        container1.appendChild(columnElement);
    });
}

priorityFilter.addEventListener("change", getDataFilterd);
assignedFilter.addEventListener("change", ()=>{
    console.log("You entered:", keywordFilter.value);
    getDataFilterd()
    }
);
keywordFilter.addEventListener("input", getDataFilterd);
filter.addEventListener("submit", event => {
    event.preventDefault();
});
resetBtn.addEventListener("click", () => {
    filter.reset();
    noResults.style.display = "none"
    container1.innerHTML = ""
    getData()
});

getDataFilterd()