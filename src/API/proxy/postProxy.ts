import fetch from "node-fetch";

export default class PostProxy {

    private url
    private options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ',
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: ''
    }
    private token: string|null = null
    private refreshToken: string|null = null

    constructor(url: string, tenantId: string, Bearer: string, ip: string, port:number) {
        this.url = url + "api/tenant/" + tenantId + "/proxy"
        this.options.headers.Authorization += Bearer
        const body: {
            data: {
                ip: string,
                port: number
            }
        } = {
            data: {
                ip: ip,
                port: port
            }
        }
        this.options.body = JSON.stringify(body)
    }

    async req() {
        const response = await fetch(this.url, this.options);
        if (response.status != 200) {
            throw new Error("Error code: " + response.status)   
        }
        const data = await response.json()
        return data
    }

    async getToken() {
        if (this.token != null) {
            return this.token
        }
        else {
            const proxy = await this.req()
            this.token = proxy.token
            return String(this.token)
        }
    }

    async getRefreshToken() {
        if (this.refreshToken != null) {
            return this.refreshToken
        }
        else {
            const proxy = await this.req()
            this.refreshToken = proxy.refreshToken
            return String(this.refreshToken)
        }
    }
}