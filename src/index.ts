import AuthMe from "./API/auth/authMe"
import SignIn from "./API/auth/signIn"
import PostProxy from "./API/proxy/postProxy"
import KeeperOnline from "./API/keeper/keeperOnline"
import KeeperOffline from "./API/keeper/keeperOffline"

const url = 'http://localhost:8080/'


async function test() {
    try {
        const keeper = "614496c24da72af8d8f4c13e"
        const Bearer = await new SignIn(url, "nne_leps@mail.ru", "123").req() 
        
        const t = await new AuthMe(url, Bearer).getTenantId()
        
       
        let st = new Date().getTime()
        for(let i = 0; i < 500; i++) {
            const token = await new PostProxy(url, t, Bearer, "localhost", 5000).getToken()
            const session = await new KeeperOnline(url, t, Bearer, keeper, String(i), token).getSession()
            // if(session == String(i)) {
            //     console.log(`TRUE: ${i}/${session}`)
            // }
            // else {
            //     const msg = `FALSE: ${i}/${session}`
            //     throw new Error(msg)
            // }
            
            // console.log("_______________________________________________________ \n")
        }
        let end = new Date().getTime()
        console.log("Done: " + (end - st) + "ms")

    } catch(e) {
        console.log(e)
    }
    
}

test()




 