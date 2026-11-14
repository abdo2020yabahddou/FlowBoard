import {renderCards} from "./render.js";

export const state = {cards: []};
export const refreshBtn = document.getElementById("refreshBtn")
export const errorHandlerMsg = document.getElementById("errorHandler")
export const loader = document.getElementById("loader")

export function getData() {
    loader.style.display = "block"
    fetch("https://flowboard-api-virid.vercel.app/cards")
        .then(response => {
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
                errorHandler(error);
            }
        )
}

export function errorHandler(error) {
    errorHandlerMsg.style.display = "block"
    loader.style.display = "none";
    console.log(error.message)
}

refreshBtn.addEventListener("click", () => {
    getData()
})

export const container = document.getElementById("container");
export function displayCards() {
    renderCards(state.cards, container);
}