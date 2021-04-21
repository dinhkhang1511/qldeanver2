module.exports = (setroute = require("./Setroute")) => {
    let root_1 = "qldean.com";

    setroute.pushRoute(root_1,"GET","", "qldean/Home.html");
    setroute.pushRoute(root_1,"GET","login", "qldean/Login.html");
    setroute.pushRoute(root_1,"GET","panel", "qldean/Panel.html");
    setroute.pushRoute(root_1,"GET","panel1", "qldean/Panel1.html");

    setroute.pushRoute(root_1,"GET","admin/quanlykhoa", "qldean/AdminxQuanlykhoa.html");
    setroute.pushRoute(root_1,"GET","admin/quanlytieuban", "qldean/AdminxQuanlytieuban.html");
    setroute.pushRoute(root_1,"GET","admin/quanlysinhvien", "qldean/AdminxQuanlysinhvien.html");
    setroute.pushRoute(root_1,"GET","admin/quanlygiangvien", "qldean/AdminxQuanlygiangvien.html");
    setroute.pushRoute(root_1,"GET","admin/phancongphutrach", "qldean/AdminxPhancongphutrach.html");
    setroute.pushRoute(root_1,"GET","admin/phancongphanbien", "qldean/AdminxPhancongphanbien.html");
    setroute.pushRoute(root_1,"GET","admin/phanconghuongdan", "qldean/AdminxPhanconghuongdan.html");
    setroute.pushRoute(root_1,"GET","admin/phancongtieuban", "qldean/AdminxPhancongtieuban.html");
    setroute.pushRoute(root_1,"GET","admin/taikhoan", "qldean/AdminxTaikhoan.html");

    setroute.pushRoute(root_1,"GET","giangvien/detai", "qldean/TeacherxDanhsachtatcadetai.html");

    return setroute.getRoute();
}