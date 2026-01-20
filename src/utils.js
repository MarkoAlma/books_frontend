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

export const getBooks = async ()=>{
    const resp = await axios.get(baseURL)
    return resp
}

export const readBooks = async (setBooks)=>{
    const resp = await axios.get(baseURL)
    setBooks(resp.data)
}

export const createBook = async (newBook)=>{
    const resp = await axios.post(baseURL, newBook)
    return resp.data
}

export const deleteBook = async (id)=> {
    const resp = await axios.delete(baseURL+id)
    return resp.data
}

export const updateBook = async (id, updatedData)=> {
    const resp = await axios.put(baseURL+id,updatedData)
    return resp.data
}