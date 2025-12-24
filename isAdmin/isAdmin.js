const isAdmin =  (user) => {
    if (user === "administrator" || user === "creator") {
        console.log("مهش");
        return true;
    } else {
        return false;
    }    
    
}
export default isAdmin;