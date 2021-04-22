module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let Model = scanner.inleModel;
    let head_params = scanner.head_params;


    if (index === 'danhsachtieuban'){
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;
        let count = await Model.InleSQL("select count(*) from tieuban;");
        let result = await Model.InleSQL("select maTB, ngay, gio, sum(total) sum from ( select maTB, ngay, gio, count(maTB) as total from (SELECT tb.MaTB, tb.ngay, tb.gio FROM tieuban tb INNER JOIN phanconggvtb pc ON tb.MaTB = pc.MaTB) as ListTB group by maTB union select maTB, ngay, gio,0 from tieuban group by maTB ) tmp group by (tmp.maTB) limit "+limit+" offset "+page*limit+";");
        let data = [];
        data.push(result)
        data.push(count)

        callback(JSON.stringify(data), 'application/json');
    }
    if (index === 'dieukienthemtb'){
        let result = await Model.InleSQL("select AUTO_IDTB();");
        callback(JSON.stringify(result), 'application/json');
    }
    if (index === 'themtb'){
        let gio = head_params.get('gio');
        let ngay = head_params.get('ngay');
        gio = gio + ":00"
        let  result1 = await Model.InleSQL("insert into TieuBan(maTB, ngay, gio) values('', '"+ngay+"', '"+gio+"');");
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
    if (index === 'suatb'){
        let maTB = head_params.get('maTB');
        let gio = head_params.get('gio');
        let ngay = head_params.get('ngay');
        gio = gio + ":00";
        
        let result1 = await Model.InleSQL("UPDATE `tieuban` SET `ngay` = '"+ngay+"' ,  `gio` = '"+gio+"' WHERE `tieuban`.`maTB` = '"+maTB+"'");
        if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
    if (index === 'xoatb'){
        let maTB = head_params.get('maTB');
        console.log("delete from tieuban where MaTB='" + maTB+"'")
        let  result1 = await Model.InleSQL("delete from phanconggvtb where MaTB='" + maTB+"'");
        result1 = await Model.InleSQL("delete from tieuban where MaTB='" + maTB+"'");
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
    if (index === 'timmatb'){
        let matieuban = head_params.get('matieuban');  
        let  result1 = await Model.InleSQL("SELECT * FROM `tieu_ban` JOIN hoi_dong ON tieu_ban.maHoiDong=hoi_dong.maHoiDong WHERE `tieu_ban`.`maTieuBan` = " + matieuban );
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

    if (index === 'danhsachsinhvien'){
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;
        let count = await Model.InleSQL("select count( maSV) from sinhvien;");
        let result = await Model.InleSQL("select MaSV, TenSV, NgaySinh, Lop, Email, GPA from sinhvien limit " +limit+ " OFFSET " + page*limit);
        console.log("select MaSV, TenSV, NgaySinh, Lop, Email, GPA from sinhvien limit " +limit+ " OFFSET " + page*limit)
        let data = [];
        data.push(result)
        data.push(count)

        callback(JSON.stringify(data), 'application/json');
    }

    if (index === 'dieukienthemsv'){
        let khoa = head_params.get('khoa');  
        let Id = await Model.InleSQL("select Auto_IDSV("+khoa+")");
        let Email = await Model.InleSQL("select Auto_EmailSV('"+Id[0]['Auto_IDSV('+khoa+')']+"')");

        callback(JSON.stringify({Email,Id,khoa}), 'application/json');
    }

    if (index === 'themsv'){
        let MaSV = head_params.get('MaSV');
        let TenSV = head_params.get('TenSV');
        let NgaySinh = head_params.get('NgaySinh');
        let Lop = head_params.get('Lop');
        let GPA = head_params.get('GPA');
        let Email = head_params.get('Email');
        console.log(MaSV,TenSV,NgaySinh,Lop,GPA,Email)


        console.log("INSERT INTO `sinhvien` (`MaSV`, `TenSV`, `NgaySinh`, `Lop`, `GPA`, `Email`) "+
        "VALUES ('"+MaSV+"','"+TenSV+"','"+NgaySinh+"', '"+Lop+"', "+GPA+", '"+Email+"')")

        let  result1 = await Model.InleSQL("INSERT INTO `sinhvien` (`MaSV`, `TenSV`, `NgaySinh`, `Lop`, `GPA`, `Email`) "+
            "VALUES ('"+MaSV+"','"+TenSV+"','"+NgaySinh+"', '"+Lop+"', "+GPA+", '"+Email+"')");
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

    if (index === 'suasv'){
        let masv = head_params.get('masv');
        let tensv = head_params.get('tensv');
        let emailsv = head_params.get('emailsv');
        let matk = head_params.get('matk');
        let makhoa = head_params.get('makhoa');
        let mksv = head_params.get('mksv');
        let result1 = await Model.InleSQL("UPDATE `sinh_vien` SET `tenSV` = '"+tensv+"' ,  `email` = '"+emailsv+"' , `matKhau` = '"+mksv+"' , `maKhoa` = '"+makhoa+"' , `maTaiKhoan` = '"+matk+"'  WHERE `sinh_vien`.`maSV` = "+masv);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

    if (index === 'xoasv'){
        let masv = head_params.get('masv');
        let  result1 = await Model.InleSQL("DELETE FROM `sinh_vien` WHERE `sinh_vien`.`maSV` = " + masv);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

    if (index === 'timmasv'){
        let masv = head_params.get('masv');  
        let  result1 = await Model.InleSQL("SELECT * FROM `sinh_vien` WHERE `sinh_vien`.`maSV` = " + masv);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }









    if (index === 'danhsachgiangvien'){
        let limit = 2;
        let page = Number(head_params.get('page')) - 1;
        let count = await Model.InleSQL("SELECT COUNT(maGV) FROM giang_vien;");
        let result = await Model.InleSQL("SELECT * FROM giang_vien LIMIT "+limit+" OFFSET " + page*limit);
        callback(JSON.stringify([result, count[0]['COUNT(maGV)']]), 'application/json');
    }

    if (index === 'dieukienthemgv'){
        let result = await Model.InleSQL("SELECT maTaiKhoan FROM tai_khoan WHERE tai_khoan.quyen='gv' AND  NOT  EXISTS (SELECT * FROM giang_vien WHERE giang_vien.maTaiKhoan = tai_khoan.maTaiKhoan)");
        let result1 = await Model.InleSQL("SELECT * FROM khoa");
        let data = [];
        data.push(result);
        data.push(result1);
        callback(JSON.stringify(data), 'application/json');
    }

    if (index === 'themgv'){
        let magv = head_params.get('magv');
        let tengv = head_params.get('tengv');
        let emailgv = head_params.get('emailgv');
        let matk = head_params.get('matk');
        let makhoa = head_params.get('makhoa');
        let mkgv = head_params.get('mkgv');

        let  result1 = await Model.InleSQL("INSERT INTO `giang_vien` (`maGV`, `tenGV`, `email`, `matKhau`, `maKhoa`, `maTaiKhoan`) "+
            "VALUES ("+magv+",'"+tengv+"','"+emailgv+"', '"+mkgv+"', "+makhoa+", "+matk+")");
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

    if (index === 'suagv'){
        let magv = head_params.get('magv');
        let tengv = head_params.get('tengv');
        let emailgv = head_params.get('emailgv');
        let matk = head_params.get('matk');
        let makhoa = head_params.get('makhoa');
        let mkgv = head_params.get('mkgv');
        let result1 = await Model.InleSQL("UPDATE `giang_vien` SET `tenGV` = '"+tengv+"' ,  `email` = '"+emailgv+"' , `matKhau` = '"+mkgv+"' , `maKhoa` = '"+makhoa+"' , `maTaiKhoan` = '"+matk+"'  WHERE `giang_vien`.`maGV` = "+magv);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }



    if (index === 'xoagv'){
        let magv = head_params.get('magv');
        let  result1 = await Model.InleSQL("DELETE FROM `giang_vien` WHERE `giang_vien`.`maGV` = " + magv);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

    if (index === 'timmagv'){
        let magv = head_params.get('magv');  
        let  result1 = await Model.InleSQL("SELECT * FROM `giang_vien` WHERE `giang_vien`.`maGV` = " + magv);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }




}