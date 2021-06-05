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
        let MaAdmin = String(head_params.get('MaAdmin')).trim();
        let MaNghanh = String(head_params.get('MaNghanh')).trim();
        let Khoa = Number(head_params.get('Khoa'));
        let listNganh;
        let listKhoa;

        let MaNghanhtemp;
        let Khoatemp;

        let limit = 10;
        let page = Number(head_params.get('page')) - 1;

        listNganh = await Model.InleSQL("call ComboBox_Nganh()");
        listNganh = listNganh[0];

        console.log("Start+"+MaNghanh,Khoa);

    if(MaNghanh === '' || Khoa == 0 || String(MaNghanh) === 'null'){

        lineReader = readline.createInterface({
            input: fs.createReadStream('controller/qldean/Text/AdminStatus.txt')
        });
        lineReader.on('line', function (line) {
            if(String(line).includes(MaAdmin)) {
                MaNghanhtemp = String(line.split(',')[1]);
                Khoatemp = Number(line.split(',')[2]);
                if(String(Khoatemp) == 'NaN') Khoatemp = '#';
            }
        });
        lineReader.on('close', async function () {
            console.log(MaNghanhtemp)
            if(MaNghanhtemp === '#' || Khoatemp === '#'){
                MaNghanh = listNganh[0].MaNganh;
                listKhoa = await Model.InleSQL("call ComboBox_Khoa('"+MaNghanh+"')");
                listKhoa = listKhoa[0];
                Khoa = listKhoa[0].namBD;

                fs.readFile("controller/qldean/Text/AdminStatus.txt", 'utf8', function (err,data) {
                    let formatted = data.replace( String(MaAdmin+','+MaNghanhtemp+','+Khoatemp),String(MaAdmin+','+MaNghanh+','+Khoa));
                    fs.writeFile("controller/qldean/Text/AdminStatus.txt", '', 'utf8', function (err) {
                        if (err) return console.log(err);
                        fs.writeFile("controller/qldean/Text/AdminStatus.txt", formatted, 'utf8', function (err) {
                            if (err) return console.log(err);
                        });
                    });
                });

            }else{
                MaNghanh = MaNghanhtemp;
                Khoa = Khoatemp;
                listKhoa = await Model.InleSQL("call ComboBox_Khoa('"+MaNghanh+"')");
                listKhoa = listKhoa[0];
            }
            let count = await Model.InleSQL("select CountList_TB('"+Khoa+"','"+MaNghanh+"')");
            let select = await Model.InleSQL("call ShowList_TB('"+Khoa+"','"+MaNghanh+"',"+page*limit+")");
            let niemkhoahientai = await Model.InleSQL("select nienkhoahientai('"+MaNghanh+"') AS nienkhoahientai");

            let data = [];
            data.push(listNganh);
            data.push(listKhoa);
            data.push(MaNghanh);
            data.push(Khoa);
            data.push(count)
            data.push(select);
            data.push(niemkhoahientai);

            callback(JSON.stringify(data), 'application/json');
        });

    }else{
        lineReader = readline.createInterface({
            input: fs.createReadStream('controller/qldean/Text/AdminStatus.txt')
        });
        lineReader.on('line', function (line) {
            if(String(line).includes(MaAdmin)) {
                MaNghanhtemp = String(line.split(',')[1]).trim();
                Khoatemp = Number(line.split(',')[2]);
            }
        });
        lineReader.on('close', async function () {
            console.log(String(MaAdmin+','+MaNghanh+','+Khoa), String(MaAdmin+','+MaNghanhtemp+','+Khoatemp))
            fs.readFile("controller/qldean/Text/AdminStatus.txt", 'utf8', function (err,data) {
                let formatted = data.replace( String(MaAdmin+','+MaNghanhtemp+','+Khoatemp),String(MaAdmin+','+MaNghanh+','+Khoa));
                fs.writeFile("controller/qldean/Text/AdminStatus.txt", '', 'utf8', function (err) {
                    if (err) return console.log(err);
                    fs.writeFile("controller/qldean/Text/AdminStatus.txt", formatted, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                });
            });

            listKhoa = await Model.InleSQL("call ComboBox_Khoa('"+MaNghanh+"')");
            listKhoa = listKhoa[0];

            let count = await Model.InleSQL("select CountList_TB('"+Khoa+"','"+MaNghanh+"')");
            let select = await Model.InleSQL("call ShowList_TB('"+Khoa+"','"+MaNghanh+"',"+page*limit+")");
            let niemkhoahientai = await Model.InleSQL("select nienkhoahientai('"+MaNghanh+"') AS nienkhoahientai");

            let data = [];
            data.push(listNganh);
            data.push(listKhoa);
            data.push(MaNghanh);
            data.push(Khoa);
            data.push(count);
            data.push(select);
            data.push(niemkhoahientai);

            callback(JSON.stringify(data), 'application/json');
        });
    }
    }

    if (index === 'danhsachdulieutieuban'){
        let MaNghanh = String(head_params.get('MaNghanh')).trim();
        let Khoa = Number(head_params.get('Khoa'));
        let page = Number(head_params.get('page')) - 1;

        let limit = 10;

        let count = await Model.InleSQL("select CountList_TB('"+Khoa+"','"+MaNghanh+"')");
        let select = await Model.InleSQL("call ShowList_TB('"+Khoa+"','"+MaNghanh+"',"+page*limit+")");

        let data = [];
        data.push(count)
        data.push(select)
        callback(JSON.stringify(data), 'application/json');
    }

    if (index === 'dieukienthemtb'){
        let khoa = Number(head_params.get('khoa'));
        let result = await Model.InleSQL("select AUTO_IDTB("+khoa+");");
        callback(JSON.stringify(result), 'application/json');
    }

    if (index === 'themtb'){
        let ca = head_params.get('ca');
        let ngay = head_params.get('ngay');
        let maTB = head_params.get('maTB');
        let MaNghanh = head_params.get('MaNganh');

        console.log("INSERT INTO `tieuban` (`MaTB`, `MaNganh`, `Ngay`, `Ca`) VALUES ('"+maTB+"', '"+MaNghanh+"', '"+ngay+"', '"+ca+"');");
        let result = await Model.InleSQL("INSERT INTO `tieuban` (`MaTB`, `MaNganh`, `Ngay`, `Ca`) VALUES ('"+maTB+"', '"+MaNghanh+"', '"+ngay+"', '"+ca+"');");
            if(String(result).includes('Duplicate entry') || String(result).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result), 'application/json');
            }
    }

    if (index === 'suatb'){
        let maTB = head_params.get('maTB');
        let ca = head_params.get('ca');
        let ngay = head_params.get('ngay');

        console.log("UPDATE `tieuban` SET `ngay` = '"+ngay+"' ,  `ca` = '"+ca+"' WHERE `tieuban`.`maTB` = '"+maTB+"'");
        let result1 = await Model.InleSQL("UPDATE `tieuban` SET `ngay` = '"+ngay+"' ,  `ca` = '"+ca+"' WHERE `tieuban`.`maTB` = '"+maTB+"'");
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
        // let MaAdmin = String(head_params.get('MaAdmin')).trim();
        let MaNghanh = String(head_params.get('MaNghanh')).trim();
        let Khoa = Number(head_params.get('Khoa'));
        let textsearch = head_params.get('textsearch');

        let limit = 10;
        let page = Number(head_params.get('page')) - 1;

        let count = await Model.InleSQL('select CountList_FindTB ('+Khoa+',"'+MaNghanh+'","'+textsearch+'") as dem;');
        let result = await Model.InleSQL("call ShowList_FindTB("+Khoa+",'"+MaNghanh+"','"+textsearch+"',"+page*limit+")");
        let data = []
        data.push(count)
        data.push(result)
        console.log('select CountList_FindTB ('+Khoa+',"'+MaNghanh+'","'+textsearch+'") as dem;')
        callback(JSON.stringify(data), 'application/json');
    }
    
    if(index === 'danhsachGVphancongTB'){
        let MaNghanh = head_params.get('MaNghanh');
        let ngay = String(head_params.get('ngay')).replace('T17:00:00.000Z','');
        let ca = head_params.get('ca');
        console.log("call ComboBox_PhanCongGVTB('"+MaNghanh+"', '"+ngay+"', '"+ca+"')")
        let  result1 = await Model.InleSQL("call ComboBox_PhanCongGVTB('"+MaNghanh+"', '"+ngay+"', '"+ca+"')");
        console.log(result1)    
        if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

    if(index === 'checkaddGVintoTieuban'){
        let MaTB = head_params.get('TB');
        let result = await Model.InleSQL('select count(*) from `phanconggvtb` where MaTB="'+MaTB+'";')
        callback(JSON.stringify(result), 'application/json');

    }

    if(index === 'addGVintoTieuban'){
        let TB = head_params.get('TB');
        let listGVSQL = String(head_params.get('listGVSQL'));

        console.log("call PhanCong_GVTB('"+listGVSQL+"','"+TB+"')")
        // let GV1 = head_params.get('GV1');
        // let GV2 = head_params.get('GV2');
        // let GV3 = head_params.get('GV3');
        // let GV4 = head_params.get('GV4');
        // let GV5 = head_params.get('GV5');
    
        let  result1 = await Model.InleSQL("call PhanCong_GVTB('"+listGVSQL+"','"+TB+"')");

    //    let  result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV1+"', '"+TB+"')");
    //         result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV2+"', '"+TB+"')");
    //         result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV3+"', '"+TB+"')");
    //         result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV4+"', '"+TB+"')");
    //         result1 = await Model.InleSQL("insert into phanconggvtb (MaGV, MaTB) values ('"+GV5+"', '"+TB+"')");
        console.log(result1)    
        if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }
}