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

export function createTaskCard(card) {
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

    const br = document.createElement("br");

    taskCard.append(taskTitle, description, priority, br, assignee);
    return taskCard;
}

export function renderCards(cards, container) {
    container.innerHTML = "";
    columns.forEach(column => {
        const columnElement = document.createElement("div");
        columnElement.className = "col-md-4 mb-3";

        const columnContent = document.createElement("div");
        columnContent.className = `kanban-column ${column.className}`;

        const filteredCards = cards.filter(card => {
            return card.status === column.status;
        });

        const title = document.createElement("h5");
        title.textContent = `${column.title} (${filteredCards.length})`;

        columnContent.appendChild(title);

        filteredCards.forEach(card => {
            const taskCard = createTaskCard(card);
            columnContent.appendChild(taskCard);
        });

        columnElement.appendChild(columnContent);
        container.appendChild(columnElement);
    });
}