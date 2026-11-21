import {renderCards} from "./render.js";
import axios from "axios";

export const state = {cards: []};
export const refreshBtn = document.getElementById("refreshBtn")
export const errorHandlerMsg = document.getElementById("errorHandler")
export const loader = document.getElementById("loader")
export const container = document.getElementById("container");


export async function getData() {
    loader.style.display = "block";
    const url = "https://flowboard-api-virid.vercel.app/cards"
    try {
        const response = await axios.get(url);
        state.cards = response.data;
        await displayCards()
    } catch (error) {
        errorHandler(error);
    } finally {
        loader.style.display = "none";
    }
}

export function errorHandler(error) {
    errorHandlerMsg.style.display = "block"
    loader.style.display = "none";
    console.log(error.message)
}

refreshBtn.addEventListener("click", async () => {
    await getData();
})

export async function displayCards() {
    renderCards();
}