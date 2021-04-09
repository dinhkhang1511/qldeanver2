module.exports = (setroute = require("./Setroute")) => {
    let root_1 = "qldean.com";

    // setroute.pushRoute(root_1,"GET","api/home", "qldean/HomeController@firstload");
    setroute.pushRoute(root_1,"GET","api/danhsachkhoa", "qldean/AdminController@danhsachkhoa");
    setroute.pushRoute(root_1,"GET","api/themkhoa", "qldean/AdminController@themkhoa");
    setroute.pushRoute(root_1,"GET","api/suakhoa", "qldean/AdminController@suakhoa");
    setroute.pushRoute(root_1,"GET","api/xoakhoa", "qldean/AdminController@xoakhoa");
    setroute.pushRoute(root_1,"GET","api/timmakhoa", "qldean/AdminController@timmakhoa");

    setroute.pushRoute(root_1,"GET","api/danhsachtieuban", "qldean/AdminController@danhsachtieuban");
    setroute.pushRoute(root_1,"GET","api/dieukienthemtb", "qldean/AdminController@dieukienthemtb");
    setroute.pushRoute(root_1,"GET","api/themtb", "qldean/AdminController@themtb");
    setroute.pushRoute(root_1,"GET","api/suatb", "qldean/AdminController@suatb");
    setroute.pushRoute(root_1,"GET","api/xoatb", "qldean/AdminController@xoatb");
    setroute.pushRoute(root_1,"GET","api/timmatb", "qldean/AdminController@timmatb");

    setroute.pushRoute(root_1,"GET","api/danhsachsinhvien", "qldean/AdminController@danhsachsinhvien");
    setroute.pushRoute(root_1,"GET","api/dieukienthemsv", "qldean/AdminController@dieukienthemsv");
    setroute.pushRoute(root_1,"GET","api/themsv", "qldean/AdminController@themsv");
    setroute.pushRoute(root_1,"GET","api/suasv", "qldean/AdminController@suasv");
    setroute.pushRoute(root_1,"GET","api/xoasv", "qldean/AdminController@xoasv");
    setroute.pushRoute(root_1,"GET","api/timmasv", "qldean/AdminController@timmasv");


    setroute.pushRoute(root_1,"GET","api/danhsachgiangvien", "qldean/AdminController@danhsachgiangvien");
    setroute.pushRoute(root_1,"GET","api/dieukienthemgv", "qldean/AdminController@dieukienthemgv");
    setroute.pushRoute(root_1,"GET","api/themgv", "qldean/AdminController@themgv");
    setroute.pushRoute(root_1,"GET","api/suagv", "qldean/AdminController@suagv");
    setroute.pushRoute(root_1,"GET","api/xoagv", "qldean/AdminController@xoagv");
    setroute.pushRoute(root_1,"GET","api/timmagv", "qldean/AdminController@timmagv");
    

    return setroute.getRoute();
}