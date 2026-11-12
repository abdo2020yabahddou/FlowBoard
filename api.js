const state = {cards: []};
const refreshBtn = document.getElementById("refreshBtn")
const errorHandler = document.getElementById("errorHandler")
const loader = document.getElementById("loader")

function getData() {
    fetch("https://flowboard-api-virid.vercel.app/cards")
        .then(response => {
            loader.style.display = "block"
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return response.json();
        })
        .then(
            result => {
                state.cards = result;
                displayCards();
                loader.style.display = "none"
            })
        .catch(error => {
            errorHandler.style.display = "block"
            console.log(error.message)
            refreshBtn.addEventListener("click", () => getData())
        });
}


function displayCards() {
    const container = document.getElementById("container");
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

        const filteredCards = state.cards.filter(card => {
            return card.status === column.status;
        });

        const title = document.createElement("h5");
        title.textContent = `${column.title} (${filteredCards.length})`;

        columnContent.appendChild(title);

        filteredCards.forEach(card => {
            const taskCard = document.createElement("div");
            taskCard.className = "task-card";

            const taskTitle = document.createElement("h6");
            taskTitle.textContent = card.title;

            const description = document.createElement("p");
            description.textContent = card.description;

            const priority = document.createElement("span");
            priority.className = "badge";

            if (card.priority === "high") {
                priority.classList.add("bg-danger");

            } else if (card.priority === "medium") {
                priority.classList.add("bg-warning", "text-dark");

            } else {
                priority.classList.add("bg-success");
            }
            priority.textContent = card.priority;

            const assignee = document.createElement("small");
            assignee.textContent = card.assignee;
            const br = document.createElement("br")
            taskCard.append(taskTitle, description, priority, br, assignee,);
            columnContent.appendChild(taskCard);
        });
        columnElement.appendChild(columnContent);
        container.appendChild(columnElement);
    });
}

getData();