import {renderCards} from "./render.js";

export const state = {cards: []};
export const refreshBtn = document.getElementById("refreshBtn")
export const errorHandlerMsg = document.getElementById("errorHandler")
export const loader = document.getElementById("loader")

export function getData() {
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
                console.log(result)
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
    console.log(error.message)
    refreshBtn.addEventListener("click", () => {
        getData()
        loader.style.display = "block"
    })
}

export const container = document.getElementById("container");

export function displayCards() {
    renderCards(state.cards, container);
}

getData();