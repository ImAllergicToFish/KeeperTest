import fetch from "node-fetch";

export default class AuthMe {

    private url
    private options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer '
        }
    }

    constructor(url, Bearer: string) {
        this.url = url + "api/auth/me"
        this.options.headers.Authorization += Bearer
    }

    async req() {
        const response = await fetch(this.url, this.options);
        const data = await response.json();
        return data
    }
}