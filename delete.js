import axios from "axios";
import {errorHandler, loader, state} from "./api.js";
import {renderCards} from "./render.js";

export async function deleteItem(id) {
    const url = `https://flowboard-api-virid.vercel.app/cards/${id}?password=1234`;
    try {
        await axios.delete(url);
        state.cards = state.cards.filter(card => card.id !== id)
        renderCards(state.cards)
        return true;
    } catch (error) {
        errorHandler(error);
        return false;
    } finally {
        loader.style.display = "none";
    }
}