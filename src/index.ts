import express, { Request, Response} from "express";

const app = express();

app.get("/", (req:Request, res:Response ) => {
    return res.json({
        status: "success oii",
    });
});

app.listen(3000, () => console.log("listening on port 3000"));
