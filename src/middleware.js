import { getTokenFromCookie } from "./lib/lib";

export function middleware(){
    const token = getTokenFromCookie()
    console.log(token)
}
