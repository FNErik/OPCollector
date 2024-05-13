import { User } from "../types/User";
import isUserLogged from "./isUserLogged.ts";

export default function getCurrentUser(){
    if(isUserLogged(false)){
        const storedUser = localStorage.getItem("user");
        if (storedUser !== null) {
            const user: User = JSON.parse(storedUser);
            return user
        }
    }
    return null
}