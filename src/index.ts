import AuthMe from "./requests/auth/authMe"
import SignIn from "./requests/auth/signIn"

const url = 'http://localhost:8080/'


async function test() {
    const Bearer = await new SignIn(url, "nne_leps@mail.ru", "123").req()
    const res = await new AuthMe(url, Bearer).req()
    console.log(res)
}

test()

// Сервер, не бузи <3
// С любовью, сладусик 


 