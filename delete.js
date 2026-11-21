import axios from "axios";
import {errorHandler, loader} from "./api.js";
import {renderCards} from "./render.js";

export async function deleteItem(id) {
    const url = `https://flowboard-api-virid.vercel.app/cards/${id}?password=1234`;
    try {
        await axios.delete(url);
        renderCards()
        return true;
    } catch (error) {
        errorHandler(error);
        return false;
    } finally {
        loader.style.display = "none";
    }
}