module.exports = (setroute = require("./Setroute")) => {
    let root_1 = "qldean.com";

    setroute.pushRoute(root_1,"GET","", "qldean/Home.html");
    setroute.pushRoute(root_1,"GET","login", "qldean/Login.html");
    setroute.pushRoute(root_1,"GET","panel", "qldean/Panel.html");
    setroute.pushRoute(root_1,"GET","panel1", "qldean/Panel1.html");

    setroute.pushRoute(root_1,"GET","admin/quanlytieuban", "qldean/Admin/AdminxQuanlytieuban.html");
    setroute.pushRoute(root_1,"GET","admin/quanlysinhvien", "qldean/Admin/AdminxQuanlysinhvien.html");
    setroute.pushRoute(root_1,"GET","admin/quanlygiangvien", "qldean/Admin/AdminxQuanlygiangvien.html");
    setroute.pushRoute(root_1,"GET","admin/phancongphutrach", "qldean/Admin/AdminxPhancongphutrach.html");
    setroute.pushRoute(root_1,"GET","admin/phancongphanbien", "qldean/Admin/AdminxPhancongphanbien.html");
    setroute.pushRoute(root_1,"GET","admin/phanconghuongdan", "qldean/Admin/AdminxPhanconghuongdan.html");
    setroute.pushRoute(root_1,"GET","admin/phancongtieuban", "qldean/Admin/AdminxPhancongtieuban.html");
    setroute.pushRoute(root_1,"GET","admin/taikhoan", "qldean/Admin/AdminxTaikhoan.html");

    setroute.pushRoute(root_1,"GET","giangvien/phancong", "qldean/Teacher/TeacherxPhancong.html");
    setroute.pushRoute(root_1,"GET","giangvien/taikhoan", "qldean/Teacher/TeacherxTaikhoan.html");

    return setroute.getRoute();
}