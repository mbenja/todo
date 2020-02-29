import axios from "axios";
import { createTodo } from "./todosService";

export async function getArchive() {
    return (await axios.get("/archive")).data;
}

export async function createArchive(text) {
    return (await axios.post("/archive/create", { text: text }));
}

export async function deleteArchive(id) {
    return (await axios.delete("/archive/delete", { params: { id: id } }));
}

export async function restoreArchive(todo) {
    const postResponse = await createTodo(todo.text);
    if (postResponse.status !== 200) {
        return { postResponse: postResponse, deleteResponse: { status: 0 } };
    }
    const deleteResponse = await deleteArchive(todo.id);
    return { postResponse: postResponse, deleteResponse: deleteResponse };
    
}