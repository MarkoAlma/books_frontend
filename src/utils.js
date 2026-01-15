import axios from "axios";
const baseURL = "http://localhost:8000/books/"

export const getCategories = async ()=>{
    const resp = await axios.get(baseURL+"categories")
    return resp
}

export const getBooksByCateg = async ({queryKey})=>{
    const resp = await axios.get(baseURL+"categ/"+queryKey[1])
    return resp
}

export const getBooksByTitle = async ({queryKey})=>{
    const resp = await axios.get(baseURL+"title/"+queryKey[1])
    return resp
}