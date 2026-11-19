import {container, state} from "./api.js";
import {openEditModal} from "./update.js";
import {deleteItem} from "./delete.js";

export const columns = [
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

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("bg-warning", "text-dark")
    deleteBtn.textContent = "delete"

    deleteBtn.addEventListener("click", () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleted = await deleteItem(card.id)
                if (deleted) {
                    taskCard.remove()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    })

    const updateBtn = document.createElement("button")
    updateBtn.textContent = "update"

    updateBtn.addEventListener("click", () => {
        openEditModal(card)
    })

    taskCard.append(taskTitle, description, priority, br, assignee, deleteBtn, updateBtn);
    return taskCard;
}

export function renderCards() {
    container.innerHTML = "";
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
            const taskCard = createTaskCard(card);
            columnContent.appendChild(taskCard);
        });

        columnElement.appendChild(columnContent);
        container.appendChild(columnElement);
    });
}