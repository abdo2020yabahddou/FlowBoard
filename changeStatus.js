import {displayCards, errorHandler, loader} from "./api.js";
import axios from "axios";

export async function changeStatus(id, status) {

    const options = {
        method: 'PATCH',
        url: `https://flowboard-api-virid.vercel.app/cards/${id}?password=1234`,
        headers: {
            'X-Workspace': 'public',
            'Content-Type': 'application/json'
        },
        data: {
            status: status
        }
    }

    try {
        await axios.request(options)
        await displayCards()
        return true;
    } catch (error) {
        errorHandler(error);
        return false;
    } finally {
        loader.style.display = "none";
    }
}