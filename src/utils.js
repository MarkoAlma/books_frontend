import axios from "axios";
const baseURL = "http://localhost:8000/books/"

export const getCategories = async ()=>{
    const resp = await axios.get(baseURL+"categories")
    return resp
}