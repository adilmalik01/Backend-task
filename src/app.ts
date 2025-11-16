import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index";
import { setupSwagger } from "./utils/swagger";

const app = express();

app.use(cors());
app.use(bodyParser.json());
setupSwagger(app);


app.get("/", (req, res) => {
    res.json({
      "message" : "Server Is Running"
    })
})

app.use("/api", routes);

export default app;
