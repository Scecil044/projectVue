const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");

const defaultRoutes =[
    {
        path:"/users",
        route: userRoutes,
    }
];

defaultRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

module.exports = router;