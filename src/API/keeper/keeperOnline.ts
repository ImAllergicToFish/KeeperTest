import fetch from "node-fetch";

export default class KeeperOnline {

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

    private session: string|null = null

    constructor(url: string, tenantId: string, Bearer: string, 
        keeperId: string, session: string, proxyToken: string) {

        this.url = url + "api/tenant/" + tenantId + "/keeper/" + keeperId + "/online"
        this.options.headers.Authorization += Bearer
        const body: {
            session: string,
            token: string
        } = {
            session: session,
            token: proxyToken
        }
        this.options.body = JSON.stringify(body)
    }

    async req() {
        const response = await fetch(this.url, this.options);
        if (response.status != 200 && response.status != 403) {
            throw new Error("Error code: " + response.status)   
        }
        if(response.status == 403) {
            return "exp"
        }
        const data = await response.json()
        return data
    }

    async getSession() {
        if (this.session != null) {
            return String(this.session)
        }
        else {
            const keeper = await this.req()
            this.session = keeper.session
            return String(this.session)
        }
    }

}