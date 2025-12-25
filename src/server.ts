// The server.ts file is the entry point
import app from "./app";

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
    console.log(`API jalan di ${PORT}`);
});