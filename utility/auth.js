import axios from "axios";

const API_KEY = "AIzaSyDbrhwh-jSe9HkFSpVdXjCe_yU1koy50E0";

// mode is signUp/signIn w/ password.
// Main shared function containing the logic. 
async function authenticate(mode, email, password) {
    // template literal, url generates dynamically
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    // set POST request to that URL
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    console.log(response.data); 
    console.log("LOGGED IN WITH MY ACCOUNT")
}

// These are 2 seperate functions for creating, and logging in. 
// File that handles the send request; to FB to create the new user using POST request. 
// extract data from requested async/await, which returns a promise. 
export async function createUser(email, password) {
    await authenticate('signUp', email, password); // 'signUp'.. must be written exactly like url segment in FB
}

export async function login(email, password) {
    await authenticate('signInWithPassword', email, password);
}