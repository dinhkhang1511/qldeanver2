//FILE SYSTEM
const http = require("http");
let url = require('url');

//CONNECT MONGO
let Connect = require("./Connect");
const connect = new Connect();

//RES REQ
const reqUest = require("./request/Request");
const resPonse = require("./response/Response");
const responseFile = require("./response/ResponseFile.js");
let InleModel = require("./model/InleModel");

//LIST ROUTE
let routeother_ = require("./route/RouteOther");
const routeother = routeother_();
let routeapi_ = require("./route/RouteApi");
const routeapi = routeapi_();

//SCANNER
const scanner = {};

//CREATE SERVER
let SERVER = async (con) => {
    scanner.sql = con;
    scanner.inleModel = new InleModel(scanner.sql);
    
    http.createServer((req, res) => {
            scanner.req = req;
            scanner.res = res;

            if((req.url).includes("api")) scanner.req_bundle = reqUest(req,routeapi);
            else scanner.req_bundle = reqUest(req,routeother);
        
            if (scanner.req_bundle.status == 1) responseFile(scanner.res, scanner.req_bundle);
            else resPonse(scanner);
            
    }).listen(connect.portSERVER, () => console.log("server run on PORT:" + connect.portSERVER));;
}
//RUN SERVER
connect.connectMongoDB(SERVER);