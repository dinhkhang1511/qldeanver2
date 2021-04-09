module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let Model = scanner.inleModel;
    let head_params = scanner.head_params;
    
    if (index === 'danhsachkhoa'){
        let limit = 2;
        let page = Number(head_params.get('page')) - 1;
        let count = await Model.InleSQL("SELECT COUNT(maKhoa) FROM khoa;");
        let result = await Model.InleSQL("SELECT * FROM khoa LIMIT "+limit+" OFFSET " + page*limit);
        callback(JSON.stringify([result, count[0]['COUNT(maKhoa)']]), 'application/json');
    }
    if (index === 'themkhoa'){
        let makhoa = head_params.get('makhoa');
        let tenkhoa = head_params.get('tenkhoa');

        let  result1 = await Model.InleSQL("INSERT INTO `khoa` (`maKhoa`, `tenKhoa`) "+
            "VALUES ("+makhoa+",'"+tenkhoa+"')");
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
    if (index === 'suakhoa'){
        let makhoa = head_params.get('makhoa');
        let tenkhoa = head_params.get('tenkhoa');

        let  result1 = await Model.InleSQL("UPDATE `khoa` SET `tenKhoa` = '"+tenkhoa+"' WHERE `khoa`.`maKhoa` = "+makhoa);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
    if (index === 'xoakhoa'){
        let makhoa = head_params.get('makhoa');
        let  result1 = await Model.InleSQL("DELETE FROM `khoa` WHERE `khoa`.`maKhoa` = " + makhoa);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
    if (index === 'timmakhoa'){
        let makhoa = head_params.get('makhoa');  
        let  result1 = await Model.InleSQL("SELECT * FROM `khoa` WHERE `khoa`.`maKhoa` = " + makhoa);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }



    if (index === 'danhsachsinhvien'){
        let limit = 2;
        let page = Number(head_params.get('page')) - 1;
        let count = await Model.InleSQL("SELECT COUNT(maSV) FROM sinh_vien;");
        let result = await Model.InleSQL("SELECT * FROM sinh_vien LIMIT "+limit+" OFFSET " + page*limit);
        callback(JSON.stringify([result, count[0]['COUNT(maSV)']]), 'application/json');
    }

    if (index === 'dieukienthemsv'){
        let result = await Model.InleSQL("SELECT maTaiKhoan FROM tai_khoan WHERE tai_khoan.quyen='sv' AND  NOT  EXISTS (SELECT * FROM sinh_vien WHERE sinh_vien.maTaiKhoan = tai_khoan.maTaiKhoan)");
        let result1 = await Model.InleSQL("SELECT * FROM khoa");
        let data = [];
        data.push(result);
        data.push(result1);
        callback(JSON.stringify(data), 'application/json');
    }

    if (index === 'themsv'){
        let masv = head_params.get('masv');
        let tensv = head_params.get('tensv');
        let emailsv = head_params.get('emailsv');
        let matk = head_params.get('matk');
        let makhoa = head_params.get('makhoa');
        let mksv = head_params.get('mksv');
        let  result1 = await Model.InleSQL("INSERT INTO `sinh_vien` (`maSV`, `tenSV`, `email`, `matKhau`, `trangThai`, `maKhoa`, `maTaiKhoan`) "+
            "VALUES ("+masv+",'"+tensv+"','"+emailsv+"', '"+mksv+"', 0, "+makhoa+", "+matk+")");
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




    if (index === 'danhsachtieuban'){
        let limit = 2;
        let page = Number(head_params.get('page')) - 1;
        let count = await Model.InleSQL("SELECT COUNT(maTieuBan) FROM tieu_ban");
        let result = await Model.InleSQL("SELECT * FROM tieu_ban JOIN hoi_dong ON tieu_ban.maHoiDong=hoi_dong.maHoiDong LIMIT "+limit+" OFFSET " + page*limit);
        callback(JSON.stringify([result, count[0]['COUNT(maTieuBan)']]), 'application/json');
    }
    if (index === 'dieukienthemtb'){
        let result = await Model.InleSQL("SELECT * FROM hoi_dong");
        callback(JSON.stringify(result), 'application/json');
    }
    if (index === 'themtb'){
        let matieuban = head_params.get('matieuban');
        let mahoidong = head_params.get('mahoidong');
        let gio = head_params.get('gio');
        let ngay = head_params.get('ngay');
        gio = gio + ":00"

        let  result1 = await Model.InleSQL("INSERT INTO `tieu_ban` (`maTieuBan`, `ngay`, `gio`, `maHoiDong`) "+
            "VALUES ("+matieuban+",'"+ngay+"','"+gio+"', '"+mahoidong+"')");
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
    if (index === 'suatb'){
        let matieuban = head_params.get('matieuban');
        let mahoidong = head_params.get('mahoidong');
        let gio = head_params.get('gio');
        let ngay = head_params.get('ngay');
        gio = gio + ":00";

        let result1 = await Model.InleSQL("UPDATE `tieu_ban` SET `ngay` = '"+ngay+"' ,  `gio` = '"+gio+"' , `mahoidong` = '"+mahoidong+"' WHERE `tieu_ban`.`maTieuBan` = "+matieuban);
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
    if (index === 'xoatb'){
        let matieuban = head_params.get('matieuban');
        let  result1 = await Model.InleSQL("DELETE FROM `tieu_ban` WHERE `tieu_ban`.`maTieuBan` = " + matieuban);
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