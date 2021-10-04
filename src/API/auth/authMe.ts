import fetch from "node-fetch";

export default class AuthMe {

    private url
    private options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer '
        }
    }

    private tenantId: string|null = null

    constructor(url, Bearer: string) {
        this.url = url + "api/auth/me"
        this.options.headers.Authorization += Bearer
    }

    async req() {
        const response = await fetch(this.url, this.options);
        if (response.status != 200) {
            throw new Error("Error code: " + response.status)   
        }
        const data = await response.json();
        return data
    }

    async getTenantId() {
        if(this.tenantId != null) {
            return String(this.tenantId)
        }
        else {
            const user = await this.req()
            this.tenantId = user.tenants[0].tenant._id
            return String(this.tenantId)
        }
    }
}