const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const appRoutes = require("./routes/v1");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api",appRoutes)

app.get("/", (req,res,next)=>{
    res.send("API is Up");
});
// app middleware
app.use((err, req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

module.exports = app;