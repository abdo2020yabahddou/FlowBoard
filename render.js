import {container, getData, state} from "./api.js";
import {openEditModal} from "./update.js";
import {deleteItem} from "./delete.js";
import {changeStatus} from "./changeStatus.js";

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

const switchModal = document.getElementById("switchModal")
const closeSwitchModal = document.getElementById("closeSwitchModal")
const switchOptions = document.getElementById("switchOptions")

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
    deleteBtn.classList.add("task-btn", "delete-btn")
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
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                    });
                    await getData()
                }
            }
        });
    })

    const updateBtn = document.createElement("button")
    updateBtn.classList.add("task-btn", "update-btn")
    updateBtn.textContent = "update"

    updateBtn.addEventListener("click", () => {
        openEditModal(card)
    })

    const switchBtn = document.createElement("button")
    switchBtn.classList.add("task-btn", "switch-btn")
    switchBtn.textContent = "switch"
    switchBtn.addEventListener("click", () => {
        const statutes = ["todo", "in-progress", "done"]
        const filteredStatues = statutes.filter(statue => statue !== card.status)

        function hideStatusModal() {
            switchOptions.textContent = ""
            switchModal.style.display = "none"
        }

        closeSwitchModal.addEventListener("click", () => {
            hideStatusModal()
        })

        switchModal.addEventListener("click",(event)=>{
            if (event.target === switchModal) {
                hideStatusModal()
            }
        })
        filteredStatues.forEach(filteredStatue => {
            const btn = document.createElement("button")
            btn.textContent = filteredStatue
            btn.classList.add("status-option", `status-${filteredStatue}`);

            btn.addEventListener("click", async () => {
                btn.disabled = true;
                const success = await changeStatus(card.id, filteredStatue)
                if (success) {
                    Swal.fire({
                        title: "Moved!",
                        text: "Your item has been moved.",
                        icon: "success"
                    });
                    switchOptions.textContent = ""
                    hideStatusModal()
                    await getData()
                } else {
                    switchOptions.textContent = ""
                    btn.disabled = false;
                }
            })
            switchOptions.append(btn)
        });
        switchModal.style.display = "flex"

        /*if (card.status === "todo") {
            const div = document.createElement("div")
            const progressBtn = document.createElement("button")
            progressBtn.textContent = "in-progress"
            const doneBtn = document.createElement("button")
            doneBtn.textContent = "done"
            div.append(progressBtn, doneBtn)
            switchModal.style.display = "block"
            switchModal.append(div)
            taskCard.append(switchModal)
            progressBtn.addEventListener("click", async () => {
                const success = await changeStatus(card.id, "in-progress")
                if (success) {
                    Swal.fire({
                        title: "Moved!",
                        text: "Your item has been moved.",
                        icon: "success"
                    });
                }
                div.textContent = ""
                await getData()
            })
            doneBtn.addEventListener("click", async () => {
                const success = await changeStatus(card.id, "done")
                if (success) {
                    Swal.fire({
                        title: "Moved!",
                        text: "Your item has been moved.",
                        icon: "success"
                    });
                }
                div.textContent = ""
                await getData()
            })
        }
        if (card.status === "in-progress") {
            switchBtn.disabled = true
            const div = document.createElement("div")
            const toDoBtn = document.createElement("button")
            toDoBtn.textContent = "todo"
            const doneBtn = document.createElement("button")
            doneBtn.textContent = "done"
            div.append(toDoBtn, doneBtn)
            switchModal.style.display = "block"
            switchModal.append(div)
            taskCard.append(switchModal)
            toDoBtn.addEventListener("click", async () => {
                const success = await changeStatus(card.id, "todo")
                if (success) {
                    Swal.fire({
                        title: "Moved!",
                        text: "Your item has been moved.",
                        icon: "success"
                    });
                }
                div.textContent = ""
                await getData()
            })
            doneBtn.addEventListener("click", async () => {
                const success = await changeStatus(card.id, "done")
                if (success) {
                    Swal.fire({
                        title: "Moved!",
                        text: "Your item has been moved.",
                        icon: "success"
                    });
                }
                div.textContent = ""
                await getData()
            })
        }
        if (card.status === "done") {
            switchBtn.disabled = true
            const div = document.createElement("div")
            const toDoBtn = document.createElement("button")
            toDoBtn.textContent = "todo"
            const progressBtn = document.createElement("button")
            progressBtn.textContent = "in-progress"
            div.append(toDoBtn, progressBtn)
            switchModal.style.display = "block"
            switchModal.append(div)
            taskCard.append(switchModal)
            toDoBtn.addEventListener("click", async () => {
                const success = await changeStatus(card.id, "todo")
                if (success) {
                    Swal.fire({
                        title: "Moved!",
                        text: "Your item has been moved.",
                        icon: "success"
                    });
                }
                div.textContent = ""
                await getData()
            })
            progressBtn.addEventListener("click", async () => {
                const success = await changeStatus(card.id, "in-progress")
                if (success) {
                    Swal.fire({
                        title: "Moved!",
                        text: "Your item has been moved.",
                        icon: "success"
                    });
                }
                div.textContent = ""
                await getData()
            })
        }*/
    })
    const div = document.createElement("div")
    div.classList.add("task-actions")
    div.append(deleteBtn, updateBtn, switchBtn)
    taskCard.append(taskTitle, description, priority, br, assignee, div);
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