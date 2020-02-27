import axios from "axios";

export async function getTodos() {
    return (await axios.get("/todos")).data;
}