module.exports = (setroute = require("./Setroute")) => {
    let root_1 = "qldean.com";

    setroute.pushRoute(root_1,"GET","api/home", "qldean/HomeController@firstload");

    return setroute.getRoute();
}