import app from "./app.js"
import "./database.js";
async function main(){
    try{
        app.listen(4000);
        console.log("servidor conectado en el puerto 4000");
    } catch(error){
        console.error(error);
    }
}
main();