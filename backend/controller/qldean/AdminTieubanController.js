const fs = require('fs');
const readline = require('readline');
let lineReader;
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

    if (index === 'danhsachtieuban'){
        let khoa = Number(head_params.get('khoa'));
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
                    console.log(khoa)
                    let count = await Model.InleSQL("select count(*) from tieuban where SUBSTRING(MaTB, 3,2)=right("+khoa+",2)");
                    let result = await Model.InleSQL("call ShowList_TB("+khoa+", "+limit*page+")");
                    let data = [];
                    data.push(result)
                    data.push(count)
                    data.push(bubbleSort(listkhoa));
                    data.push(khoa);
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
                console.log(khoa)
                let count = await Model.InleSQL("select count(*) from tieuban where SUBSTRING(MaTB, 3,2)=right("+khoa+",2)");
                let result = await Model.InleSQL("call ShowList_TB("+khoa+", "+limit*page+")");
                let data = [];
                data.push(result)
                data.push(count)
                data.push(bubbleSort(listkhoa));
                data.push(khoa);
                console.log(data)
                callback(JSON.stringify(data), 'application/json');
            });
        }
    }


    if (index === 'dieukienthemtb'){
        let khoa = Number(head_params.get('khoa'));
        console.log(khoa)
        let result = await Model.InleSQL("select AUTO_IDTB("+khoa+");");
        callback(JSON.stringify(result), 'application/json');
    }
    if (index === 'themtb'){
        let gio = head_params.get('gio');
        let ngay = head_params.get('ngay');
        let maTB = head_params.get('maTB');
        console.log(maTB)
        gio = gio + ":00"
        let  result1 = await Model.InleSQL("insert into TieuBan(maTB, ngay, gio) values('"+maTB+"', '"+ngay+"', '"+gio+"');");
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
        let khoa = head_params.get('khoa');
        let textsearch = head_params.get('textsearch');
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;

        let count = await Model.InleSQL('select CountList_FindTB("'+khoa+'", "'+textsearch+'");');
        let result = await Model.InleSQL("call ShowList_FindTB('"+khoa+"', '"+textsearch+"',"+page*limit+")");
        let data = []
        data.push(result)
        data.push(count)
        console.log(data)
        callback(JSON.stringify(data), 'application/json');
    }
    
    if(index === 'danhsachGVphancongTB'){
        let ngay = String(head_params.get('ngay')).replace('T17:00:00.000Z','');
        let gio = head_params.get('gio');
        console.log(ngay,gio)
        let  result1 = await Model.InleSQL("call ComboBox_PhanCongGVTB('"+ngay+"', '"+gio+"')");
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