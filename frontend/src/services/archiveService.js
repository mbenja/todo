import axios from "axios";

export async function getArchive() {
    return (await axios.get("/archive")).data;
}