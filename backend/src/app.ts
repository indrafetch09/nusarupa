// The server.ts file is the entry point
import express from "express";

const app = express();
const router = app.router
const port = 5000;

router.get('/', (req:any, res:any) => { 
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`API jalan di port ${port}`)
})

