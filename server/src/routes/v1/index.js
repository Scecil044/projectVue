const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const roleRoutes = require("./role.routes");

const defaultRoutes =[
    {
        path:"/users",
        route: userRoutes,
    },
    {
        path:"/roles",
        route: roleRoutes,
    }
];

defaultRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

module.exports = router;