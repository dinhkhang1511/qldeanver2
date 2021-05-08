module.exports = (setroute = require("./Setroute")) => {
    let root_1 = "qldean.com";

    // setroute.pushRoute(root_1,"GET","api/home", "qldean/HomeController@firstload");
    // setroute.pushRoute(root_1,"GET","api/danhsachkhoa", "qldean/AdminController@danhsachkhoa");
    // setroute.pushRoute(root_1,"GET","api/themkhoa", "qldean/AdminController@themkhoa");
    // setroute.pushRoute(root_1,"GET","api/suakhoa", "qldean/AdminController@suakhoa");
    // setroute.pushRoute(root_1,"GET","api/xoakhoa", "qldean/AdminController@xoakhoa");
    // setroute.pushRoute(root_1,"GET","api/timmakhoa", "qldean/AdminController@timmakhoa");
    // setroute.pushRoute(root_1,"GET","api/danhsachGVphancongTB", "qldean/AdminController@danhsachGVphancongTB");
    // setroute.pushRoute(root_1,"GET","api/addGVintoTieuban", "qldean/AdminController@addGVintoTieuban");

    
    setroute.pushRoute(root_1,"GET","api/danhsachtieuban", "qldean/AdminTieubanController@danhsachtieuban");
    setroute.pushRoute(root_1,"GET","api/dieukienthemtb", "qldean/AdminTieubanController@dieukienthemtb");
    setroute.pushRoute(root_1,"GET","api/themtb", "qldean/AdminTieubanController@themtb");
    setroute.pushRoute(root_1,"GET","api/suatb", "qldean/AdminTieubanController@suatb");
    setroute.pushRoute(root_1,"GET","api/xoatb", "qldean/AdminTieubanController@xoatb");
    setroute.pushRoute(root_1,"GET","api/timmatb", "qldean/AdminTieubanController@timmatb");

    setroute.pushRoute(root_1,"GET","api/themkhoasv", "qldean/AdminSinhvienController@themkhoasv");
    setroute.pushRoute(root_1,"GET","api/danhsachsinhvien", "qldean/AdminSinhvienController@danhsachsinhvien");
    setroute.pushRoute(root_1,"GET","api/dieukienthemsv", "qldean/AdminSinhvienController@dieukienthemsv");
    setroute.pushRoute(root_1,"GET","api/themsv", "qldean/AdminSinhvienController@themsv");
    setroute.pushRoute(root_1,"GET","api/suasv", "qldean/AdminSinhvienController@suasv");
    setroute.pushRoute(root_1,"GET","api/xoasv", "qldean/AdminSinhvienController@xoasv");
    setroute.pushRoute(root_1,"GET","api/timmasv", "qldean/AdminController@timmasv");

    setroute.pushRoute(root_1,"GET","api/danhsachgiangvien", "qldean/AdminController@danhsachgiangvien");
    setroute.pushRoute(root_1,"GET","api/dieukienthemgv", "qldean/AdminController@dieukienthemgv");
    setroute.pushRoute(root_1,"GET","api/themgv", "qldean/AdminController@themgv");
    setroute.pushRoute(root_1,"GET","api/suagv", "qldean/AdminController@suagv");
    setroute.pushRoute(root_1,"GET","api/xoagv", "qldean/AdminController@xoagv");
    setroute.pushRoute(root_1,"GET","api/timmagv", "qldean/AdminController@timmagv");

    setroute.pushRoute(root_1,"GET","api/danhsachphancongHD", "qldean/AdminController@danhsachphancongHD");
    setroute.pushRoute(root_1,"GET","api/danhsachGVHDphancong", "qldean/AdminController@danhsachGVHDphancong");
    setroute.pushRoute(root_1,"GET","api/addGVHDphancong", "qldean/AdminController@addGVHDphancong");

    setroute.pushRoute(root_1,"GET","api/danhsachphancongPB", "qldean/AdminController@danhsachphancongPB");
    setroute.pushRoute(root_1,"GET","api/danhsachGVPBphancong", "qldean/AdminController@danhsachGVPBphancong");
    setroute.pushRoute(root_1,"GET","api/addGVPBphancong", "qldean/AdminController@addGVPBphancong");


    setroute.pushRoute(root_1,"GET","api/danhsachphancongTB", "qldean/AdminController@danhsachphancongTB");
    setroute.pushRoute(root_1,"GET","api/danhsachTBphancong", "qldean/AdminController@danhsachTBphancong");
    setroute.pushRoute(root_1,"GET","api/addTBphancong", "qldean/AdminController@addTBphancong");

    
    
    

    setroute.pushRoute(root_1,"GET","api/danhsachtatcadoan", "qldean/TeacherController@danhsachtatcadoan");
    setroute.pushRoute(root_1,"GET","api/danhsachdoanhuongdan", "qldean/TeacherController@danhsachdoanhuongdan");

    return setroute.getRoute();
}