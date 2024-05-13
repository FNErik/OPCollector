export default function isUserLogged(verbose: boolean = true){
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
        const user = JSON.parse(storedUser);
        if(verbose) {
            console.log("User:");
            console.log(user);
        }
    } else {
        if(verbose) console.error("User not logged");
    }
    
    return storedUser ? true : false
}