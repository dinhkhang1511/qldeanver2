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

    if (index === 'themkhoasv'){
    //     let khoa = Number(head_params.get('khoa'));
    //     fs.appendFileSync('controller/qldean/Text/khoa.txt', '\n'+khoa+',0');
    //     let oskhoa;

    //     lineReader = readline.createInterface({
    //       input: fs.createReadStream('controller/qldean/Text/khoa.txt')
    //   });
    //   lineReader.on('line', function (line) {
    //       if(String(line).includes('currentkhoa:')) {
    //         oskhoa = String(line);
    //       }
    //   });
    //   lineReader.on('close', async function () {
    //     fs.readFile("controller/qldean/Text/khoa.txt", 'utf8', function (err,data) {
    //       var formatted = data.replace(oskhoa, 'currentkhoa:'+khoa);
    //       fs.writeFile("controller/qldean/Text/khoa.txt", formatted, 'utf8', function (err) {
    //           if (err) return console.log(err);
    //           });
    //       });
    //       callback(JSON.stringify('done'), 'application/json');
    //   });
    }

    if (index === 'dieukienthemsv'){
        let MaNghanh = head_params.get('MaNghanh');
        let Khoa = head_params.get('Khoa');
        let MaSV = await Model.InleSQL("select AUTO_IDSV('"+Khoa+"','"+MaNghanh+"') as MaSV"); MaSV = MaSV[0]['MaSV']
        let EmailSV = MaSV + '@student.ptithcm.edu.vn';
        let listchuyenganh = await Model.InleSQL("call ComboBox_CN('"+MaNghanh+"')");listchuyenganh = listchuyenganh[0];
        let listlop;
        let Lop;
        if(listchuyenganh.length > 0){
            listlop = await Model.InleSQL("call ComboBox_Lop('"+Khoa+"','"+listchuyenganh[0].MaCN+"')"); listlop = listlop[0]
            Lop = await Model.InleSQL("SELECT Auto_IDLop('"+Khoa+"','"+listchuyenganh[0].MaCN+"') AS Lop"); Lop = Lop[0]['Lop'];
        }else{
            listlop = [];
            Lop = '';
        }
        let data = [];
        data.push(MaSV);
        data.push(EmailSV)
        data.push(listchuyenganh)
        data.push(listlop);
        data.push(Lop);
        callback(JSON.stringify(data), 'application/json');
    }

    if(index === 'danhsach-theo-nghanh'){
        let MaNghanh = head_params.get('MaNghanh');
        let listchuyenganh = await Model.InleSQL("call ComboBox_CN('"+MaNghanh+"')");
        let data = [];
        data.push(listchuyenganh[0]);
        callback(JSON.stringify(data), 'application/json');
    }
    if(index === 'danhsach-theo-nganhvakhoa'){
        let Khoa = head_params.get('Khoa');
        let MaNghanh = head_params.get('MaNghanh');
        let MaSV = await Model.InleSQL("select AUTO_IDSV('"+Khoa+"','"+MaNghanh+"') as MaSV");
        MaSV = MaSV[0]['MaSV']
        let EmailSV = MaSV + '@student.ptithcm.edu.vn';
        let data = [];
        data.push({MaSV:MaSV,EmailSV:EmailSV});
        callback(JSON.stringify(data), 'application/json');
    }
    if(index === 'danhsach-theo-chuyennganhvakhoa'){
        let Khoa = head_params.get('Khoa');
        let MaChuyenNghanh = head_params.get('MaChuyenNghanh');
        let data = [];
        let listlop = await Model.InleSQL("call ComboBox_Lop('"+Khoa+"','"+MaChuyenNghanh+"')");
        console.log(listlop)
        data.push(listlop[0]);
        callback(JSON.stringify(data), 'application/json');
    }
    if(index === 'taomoilop'){
        let Khoa = head_params.get('Khoa');
        let MaChuyenNghanh = head_params.get('MaChuyenNghanh');
        let data = [];
        let Lop = await Model.InleSQL("SELECT Auto_IDLop('"+Khoa+"','"+MaChuyenNghanh+"') AS Lop");
        data.push(Lop[0]['Lop']);
        callback(JSON.stringify(data), 'application/json');
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

    if (index === 'danhsachsinhvien'){
        
    }

    if (index === 'suasv'){
      let MaSV = head_params.get('MaSV');
      let TenSV = head_params.get('TenSV');
      let NgaySinh = head_params.get('NgaySinh');
      let Lop = head_params.get('Lop');
      let GPA = head_params.get('GPA');
      // let Email = head_params.get('Email');
      console.log(MaSV,TenSV,NgaySinh,Lop,GPA)
      let result1 = await Model.InleSQL("UPDATE `SinhVien` SET `TenSV` = '"+TenSV+"' ,  `NgaySinh` = '"+NgaySinh+"', `Lop` = '"+Lop+"' , `GPA` = '"+GPA+"'  WHERE `MaSV` = '"+MaSV+"'");
      // console.log("UPDATE `SinhVien` SET `TenSV` = '"+TenSV+"' ,  `NgaySinh` = '"+NgaySinh+"', `Lop` = '"+Lop+"' , `GPA` = '"+GPA+"'  WHERE `MaSV` = "+MaSV)
          if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
              callback(JSON.stringify("that bai"), 'application/json');
          }else{
              callback(JSON.stringify(result1), 'application/json');
          }
    }

    if (index === 'xoasv'){
      let MaSV = head_params.get('MaSV');
      let  result1 = await Model.InleSQL("DELETE FROM `SinhVien` WHERE `MaSV` = '" + MaSV + "'");
          if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
              callback(JSON.stringify("that bai"), 'application/json');
          }else{
              callback(JSON.stringify(result1), 'application/json');
          }
    }


}