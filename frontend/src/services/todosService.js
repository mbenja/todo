import axios from "axios";
import { createArchive } from "./archiveService";

export async function getTodos() {
    return (await axios.get("/todos")).data;
}

export async function createTodo(text) {
    return (await axios.post("/todos/create", { text: text }));
}

export async function deleteTodo(id) {
    return (await axios.delete("/todos/delete", { params: { id: id } }));
}

export async function archiveTodo(todo) {
    const postResponse = await createArchive(todo.text);
    if (postResponse.status !== 200) {
        return { postResponse: postResponse, deleteResponse: { status: 0 } };
    }
    const deleteResponse = await deleteTodo(todo.id);
    return { postResponse: postResponse, deleteResponse: deleteResponse };
    
}