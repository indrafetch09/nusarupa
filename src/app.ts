import express from "express";
import authRoutes from "../backend/routes/auth.routes";
// import routes...

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use('api/auth', authRoutes);
// app.use(routes here..)

export default app;