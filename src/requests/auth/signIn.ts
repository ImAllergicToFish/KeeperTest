import fetch from "node-fetch";

export default class SignIn {

    private url
    private options = {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: ''
    }

    constructor(url, email, password) {
        this.url = url + "api/auth/sign-in"
        let body = {
            email: email,
            password: password
        }
        this.options.body = JSON.stringify(body)
    }

    async req() {
        const response = await fetch(this.url, this.options);
        return response.text()
    }
}