module.exports = (setroute = require("./Setroute")) => {
    let root_1 = "qldean.com";
    
    setroute.pushRoute(root_1,"GET","api/danhsachtieuban", "qldean/AdminTieubanController@danhsachtieuban");
    setroute.pushRoute(root_1,"GET","api/danhsachdulieutieuban", "qldean/AdminTieubanController@danhsachdulieutieuban");
    setroute.pushRoute(root_1,"GET","api/timmatb", "qldean/AdminTieubanController@timmatb");

    setroute.pushRoute(root_1,"GET","api/dieukienthemtb", "qldean/AdminTieubanController@dieukienthemtb");

    setroute.pushRoute(root_1,"GET","api/themtb", "qldean/AdminTieubanController@themtb");
    setroute.pushRoute(root_1,"GET","api/suatb", "qldean/AdminTieubanController@suatb");
    setroute.pushRoute(root_1,"GET","api/xoatb", "qldean/AdminTieubanController@xoatb");

    setroute.pushRoute(root_1,"GET","api/danhsachGVphancongTB", "qldean/AdminTieubanController@danhsachGVphancongTB");
    setroute.pushRoute(root_1,"GET","api/checkaddGVintoTieuban", "qldean/AdminTieubanController@checkaddGVintoTieuban");
    setroute.pushRoute(root_1,"GET","api/addGVintoTieuban", "qldean/AdminTieubanController@addGVintoTieuban");



    setroute.pushRoute(root_1,"GET","api/themkhoasv", "qldean/AdminSinhvienController@themkhoasv");
    setroute.pushRoute(root_1,"GET","api/danhsachsinhvien", "qldean/AdminSinhvienController@danhsachsinhvien");
    setroute.pushRoute(root_1,"GET","api/dieukienthemsv", "qldean/AdminSinhvienController@dieukienthemsv");

    setroute.pushRoute(root_1,"GET","api/danhsach-theo-nghanh", "qldean/AdminSinhvienController@danhsach-theo-nghanh");
    setroute.pushRoute(root_1,"GET","api/danhsach-theo-nganhvakhoa", "qldean/AdminSinhvienController@danhsach-theo-nganhvakhoa");
    setroute.pushRoute(root_1,"GET","api/danhsach-theo-chuyennganhvakhoa", "qldean/AdminSinhvienController@danhsach-theo-chuyennganhvakhoa");
    setroute.pushRoute(root_1,"GET","api/taomoilop", "qldean/AdminSinhvienController@taomoilop");
    setroute.pushRoute(root_1,"GET","api/layniemkhoatheonam", "qldean/AdminSinhvienController@layniemkhoatheonam");
    

    setroute.pushRoute(root_1,"GET","api/themsv", "qldean/AdminSinhvienController@themsv");
    setroute.pushRoute(root_1,"GET","api/dieukiensuasv", "qldean/AdminSinhvienController@dieukiensuasv");
    setroute.pushRoute(root_1,"GET","api/suasv", "qldean/AdminSinhvienController@suasv");
    setroute.pushRoute(root_1,"GET","api/xoasv", "qldean/AdminSinhvienController@xoasv");

    setroute.pushRoute(root_1,"GET","api/danhsachgiangvien", "qldean/AdminGiangvienController@danhsachgiangvien");
    setroute.pushRoute(root_1,"GET","api/dieukienthemgv", "qldean/AdminGiangvienController@dieukienthemgv");
    setroute.pushRoute(root_1,"GET","api/themgv", "qldean/AdminGiangvienController@themgv");
    setroute.pushRoute(root_1,"GET","api/suagv", "qldean/AdminGiangvienController@suagv");
    setroute.pushRoute(root_1,"GET","api/xoagv", "qldean/AdminGiangvienController@xoagv");
    setroute.pushRoute(root_1,"GET","api/danhsachdulieugiangvien", "qldean/AdminGiangvienController@danhsachdulieugiangvien");
    // setroute.pushRoute(root_1,"GET","api/timmagv", "qldean/AdminGiangvienController@timmagv");

    setroute.pushRoute(root_1,"GET","api/danhsachphancongHD", "qldean/AdminPhancongHuongdanController@danhsachphancongHD");
    setroute.pushRoute(root_1,"GET","api/danhsachGVHDphancong", "qldean/AdminPhancongHuongdanController@danhsachGVHDphancong");
    setroute.pushRoute(root_1,"GET","api/addGVHDphancong", "qldean/AdminPhancongHuongdanController@addGVHDphancong");

    setroute.pushRoute(root_1,"GET","api/danhsachphancongPB", "qldean/AdminPhancongPhanbienController@danhsachphancongPB");
    setroute.pushRoute(root_1,"GET","api/danhsachGVPBphancong", "qldean/AdminPhancongPhanbienController@danhsachGVPBphancong");
    setroute.pushRoute(root_1,"GET","api/addGVPBphancong", "qldean/AdminPhancongPhanbienController@addGVPBphancong");


    setroute.pushRoute(root_1,"GET","api/danhsachphancongTB", "qldean/AdminPhancongTieubanController@danhsachphancongTB");
    setroute.pushRoute(root_1,"GET","api/danhsachTBphancong", "qldean/AdminPhancongTieubanController@danhsachTBphancong");
    setroute.pushRoute(root_1,"GET","api/addTBphancong", "qldean/AdminPhancongTieubanController@addTBphancong");

    
    
    

    setroute.pushRoute(root_1,"GET","api/danhsachtatcadoan", "qldean/TeacherController@danhsachtatcadoan");
    setroute.pushRoute(root_1,"GET","api/danhsachdoanhuongdan", "qldean/TeacherController@danhsachdoanhuongdan");

    return setroute.getRoute();
}