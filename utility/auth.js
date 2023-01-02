import axios from "axios";

const API_KEY = "AIzaSyDbrhwh-jSe9HkFSpVdXjCe_yU1koy50E0";

// File that handles the send request. 
// this sends request to FB to create the new user using POST request. 
export async function createUser(email, password) {
    const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true
    });
    // extract data from requested async/await, which returns a promise. 

}