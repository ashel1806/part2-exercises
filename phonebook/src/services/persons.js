import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll2 = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newNum) => {
    const request = axios.put(`${baseUrl}/${id}`, newNum)
    return request.then(response => response.data)
}

const deleteNote = (id, personObj) => {
    const request = axios.delete(`${baseUrl}/${id}`, personObj)
    return request.then(response => response.data)
}

const services ={
    getAll2,
    create,
    update,
    deleteNote
}

export default services;