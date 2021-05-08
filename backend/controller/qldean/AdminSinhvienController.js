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
        let khoa = Number(head_params.get('khoa'));
        fs.appendFileSync('controller/qldean/Text/khoa.txt', '\n'+khoa+',0');
        let oskhoa;

        lineReader = readline.createInterface({
          input: fs.createReadStream('controller/qldean/Text/khoa.txt')
      });
      lineReader.on('line', function (line) {
          if(String(line).includes('currentkhoa:')) {
            oskhoa = String(line);
          }
      });
      lineReader.on('close', async function () {
        fs.readFile("controller/qldean/Text/khoa.txt", 'utf8', function (err,data) {
          var formatted = data.replace(oskhoa, 'currentkhoa:'+khoa);
          fs.writeFile("controller/qldean/Text/khoa.txt", formatted, 'utf8', function (err) {
              if (err) return console.log(err);
              });
          });
          callback(JSON.stringify('done'), 'application/json');
      });

        
    }

    if (index === 'dieukienthemsv'){
      let khoa = head_params.get('khoa');  
      console.log(khoa)
      let Id = await Model.InleSQL("select Auto_IDSV("+khoa+")");
      let Email = await Model.InleSQL("select Auto_EmailSV('"+Id[0]['Auto_IDSV('+khoa+')']+"')");
      console.log({Email,Id,khoa})
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


    if (index === 'danhsachsinhvien'){
      let khoa = Number(head_params.get('khoa'));
      console.log(khoa)
      if(khoa == 0){ 
              let listkhoa = [];
              lineReader = readline.createInterface({
                  input: fs.createReadStream('controller/qldean/Text/khoa.txt')
              });
              lineReader.on('line', function (line) {
                  if(String(line).includes('currentkhoa:')) {
                      khoa = Number(String(line).replace('currentkhoa:',''));
                  }else{
                      let curbig = Number(line.split(',')[0]);
                      listkhoa.push(curbig);
                  }
              });
              lineReader.on('close', async function () {
                let limit = 10;
                let page = Number(head_params.get('page')) - 1;
                if(khoa == 0) khoa = listkhoa[0];
                let count = await Model.InleSQL("select count( maSV) from SinhVien where SUBSTRING(MaSV, 2,2)=right("+khoa+", 2);");
                let result = await Model.InleSQL("call ShowList_SV("+khoa+","+page*limit+")");
                let data = [];
                data.push(result)
                data.push(count)
                data.push(khoa)
                data.push(bubbleSort(listkhoa))
                console.log(data)
                  callback(JSON.stringify(data), 'application/json');
              });

      }else{
          let oskhoa;
          let listkhoa = [];
          lineReader = readline.createInterface({
              input: fs.createReadStream('controller/qldean/Text/khoa.txt')
          });
          lineReader.on('line', function (line) {
              if(String(line).includes('currentkhoa:')) {
                  oskhoa = String(line);
              }else{
                  let curbig = Number(line.split(',')[0]);
                  listkhoa.push(curbig);
              }
          });
          lineReader.on('close', async function () {
              fs.readFile("controller/qldean/Text/khoa.txt", 'utf8', function (err,data) {
              var formatted = data.replace(oskhoa, 'currentkhoa:'+khoa);
              fs.writeFile("controller/qldean/Text/khoa.txt", formatted, 'utf8', function (err) {
                  if (err) return console.log(err);
                  });
              });

              let limit = 10;
              let page = Number(head_params.get('page')) - 1;
              let count = await Model.InleSQL("select count( maSV) from SinhVien where SUBSTRING(MaSV, 2,2)=right("+khoa+", 2);");
              let result = await Model.InleSQL("call ShowList_SV("+khoa+","+page*limit+")");
              let data = [];
              data.push(result)
              data.push(count)
              data.push(khoa)
              data.push(bubbleSort(listkhoa))
              console.log(data)
              callback(JSON.stringify(data), 'application/json');
          });
      }
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