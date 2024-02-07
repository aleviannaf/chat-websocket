import { App } from "./App";

const app = new App();

app.server.listen(3333, ()=>{
    console.log('Aplication is running on port 3333');
})