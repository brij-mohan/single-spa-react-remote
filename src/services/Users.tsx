import { UserType } from "../types/UserType";

const URL = "http://localhost:3001/users"

export async function getAllUsers() {
    const res = await fetch(URL) 
    return res.json();
}

export async function addNewUser(body: UserType) {
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export async function deleteUser(id: number) {
    return fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })
}

export async function showUserDetail(body: UserType) {
    return fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}