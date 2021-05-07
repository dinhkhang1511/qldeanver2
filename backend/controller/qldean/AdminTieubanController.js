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
        // let matieuban = head_params.get('matieuban');  
        // let  result1 = await Model.InleSQL("SELECT * FROM `tieu_ban` JOIN hoi_dong ON tieu_ban.maHoiDong=hoi_dong.maHoiDong WHERE `tieu_ban`.`maTieuBan` = " + matieuban );
        //     if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
        //         callback(JSON.stringify("that bai"), 'application/json');
        //     }else{
        //         callback(JSON.stringify(result1), 'application/json');
        //     }
    }
    
    if(index === 'danhsachGVphancongTB'){
        let ngay = String(head_params.get('ngay')).replace('T17:00:00.000Z','');
        let gio = head_params.get('gio');
        console.log(ngay,gio)
        let  result1 = await Model.InleSQL("select MaGV, TenGv from giangvien where MaGV not in (SELECT gv.MaGV  FROM tieuban tb, giangvien gv, phanconggvtb pc where tb.MaTB = pc.MaTB and pc.MaGV= gv.MaGV and ngay='"+ngay+"' and gio = '"+gio+"');");
        console.log(result1)    
        if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

    if(index === 'addGVintoTieuban'){
        let TB = head_params.get('TB');
        let GV1 = head_params.get('GV1');
        let GV2 = head_params.get('GV2');
        let GV3 = head_params.get('GV3');
        let GV4 = head_params.get('GV4');
        let GV5 = head_params.get('GV5');

        let  result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV1+"', '"+TB+"')");
          result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV2+"', '"+TB+"')");
          result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV3+"', '"+TB+"')");
          result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV4+"', '"+TB+"')");
          result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV5+"', '"+TB+"')");
        console.log(result1)    
        if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
}