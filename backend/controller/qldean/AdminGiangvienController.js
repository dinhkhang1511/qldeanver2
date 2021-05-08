const fs = require('fs');
const readline = require('readline');
const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
      for (let x = 0; x < array.length - 1 - i; x++) {
        if (array[x] < array[x + 1]) {
          [array[x], array[x + 1]] = [array[x + 1], array[x]];
        }
      }
    }
    return array;
  }

module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let Model = scanner.inleModel;
    let head_params = scanner.head_params;

    if (index === 'danhsachgiangvien'){
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;
        console.log(page)
        let count = await Model.InleSQL("select count( maGV) from GiangVien");
        let result = await Model.InleSQL("select MaGV, TenGV, ngaysinh, email from GiangVien limit " +limit+ " offset " + page*limit);
        console.log("select MaGV, TenGV, NgaySinh, Lop, Email from GiangVien limit " +limit+ " offset " + page*limit)
        let data = [];
        data.push(result)
        data.push(count)
        console.log(data)
        callback(JSON.stringify(data), 'application/json');
    }

    if (index === 'dieukienthemgv'){
        let Id = await Model.InleSQL("select AUTO_IDGV();");
        callback(JSON.stringify(Id), 'application/json');
    }

    if (index === 'themgv'){
        let MaGV = head_params.get('MaGV');
        let TenGV = head_params.get('TenGV');
        let email = head_params.get('email');
        let ngaySinh = head_params.get('ngaySinh');

        console.log("INSERT INTO `giangvien` (`MaGV`, `TenGV`, `email`, `ngaySinh`) "+
        "VALUES ('"+MaGV+"','"+TenGV+"','"+email+"', '"+ngaySinh+"')")

        let  result1 = await Model.InleSQL("INSERT INTO `giangvien` (`MaGV`, `TenGV`, `email`, `ngaySinh`) "+
        "VALUES ('"+MaGV+"','"+TenGV+"','"+email+"', '"+ngaySinh+"')");
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{

                await Model.InleSQL("call AfterInsert_GV");
                
                callback(JSON.stringify(result1), 'application/json');
            }
    }


    if (index === 'suagv'){
        let MaGV = head_params.get('MaGV');
        let TenGV = head_params.get('TenGV');
        let email = head_params.get('email');
        let ngaySinh = head_params.get('ngaySinh');
        console.log("UPDATE `giangvien` SET `TenGV` = '"+TenGV+"' ,  `ngaySinh` = '"+ngaySinh+"' , `email` = '"+email+"' WHERE `giangvien`.`MaGV` = "+MaGV)
        let result1 = await Model.InleSQL("UPDATE `giangvien` SET `TenGV` = '"+TenGV+"' ,  `ngaySinh` = '"+ngaySinh+"' , `email` = '"+email+"' WHERE `giangvien`.`MaGV` =  '"+MaGV+"'");
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

    if (index === 'xoagv'){
        let MaGV = head_params.get('MaGV');
        let  result1 = await Model.InleSQL('delete from GiangVien where MaGV= "'+MaGV+'"');
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }


}