const readline = require('readline');
const fs = require('fs');

module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let Model = scanner.inleModel;
    let head_params = scanner.head_params;
    
    if (index === 'danhsachtatcadoan'){
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;
        let result = await Model.InleSQL(" select MaDA, TenDA, MaGVHD, TenGV from doan da, giangvien gv where da.MaGVHD=gv.MaGV limit "+limit+" OFFSET " + page*limit);
        let count = await Model.InleSQL(" SELECT FOUND_ROWS() ;");
        callback(JSON.stringify([result, count]), 'application/json');
    }
    if (index === 'danhsachdoanhuongdan'){
        let MaGV = head_params.get('MaGV');
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;
        let result = await Model.InleSQL("select sv.MaSV, TenSV, Lop, Email, MaDA, TenDA from SinhVien sv, DoAn da where sv.MaSV=da.MaSV and da.MaGVHD='"+MaGV+"' LIMIT "+limit+" OFFSET " + page*limit);
        let count = await Model.InleSQL(" SELECT FOUND_ROWS() ;");
        callback(JSON.stringify([result, count]), 'application/json');
    }

    if (index === 'dieukienthemdoan'){
        let MaNghanh = head_params.get('MaNghanh');
        let list = await Model.InleSQL("call ComboBox_CN('"+MaNghanh+"')");
        let MaDoan = await Model.InleSQL("select auto_IDDA() AS MaDoan");
        let data = [];
        data.push(list);
        data.push(MaDoan)
        callback(JSON.stringify(data), 'application/json');
    }

    if (index === 'themdoan'){
        let MaDoan = head_params.get('MaDoan');
        let TenDoan = head_params.get('TenDoan');
        let chuyennganh = head_params.get('chuyennganh');
        let ngay = head_params.get('ngay');
        let MaGV = head_params.get('MaGV');
        let filedoc = head_params.get('filedoc');
        let infotep = head_params.get('infotep');
        
        console.log("call Add_DA('"+MaDoan+"', '"+TenDoan+"', '"+chuyennganh+"','"+MaGV+"','"+ngay+"','"+filedoc+"','"+infotep+"')")
  
        let  result1 = await Model.InleSQL("call Add_DA('"+MaDoan+"', '"+TenDoan+"', '"+chuyennganh+"','"+MaGV+"','"+ngay+"','"+filedoc+"','"+infotep+"')");
        if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
            console.log(result1)
            callback(JSON.stringify("that bai"), 'application/json');
        }else{
            callback(JSON.stringify(result1), 'application/json');
        }
    }

    if (index === 'dieukiensuadoan'){
        let MaDoan = head_params.get('MaDoan');
        let MaGV = head_params.get('MaGV');

        console.log("call shonInfor_DA_Update('"+MaDoan+"', '"+MaGV+"');")
        let  data = await Model.InleSQL("call shonInfor_DA_Update('"+MaDoan+"', '"+MaGV+"');");
        callback(JSON.stringify(data), 'application/json');
    }

    if (index === 'suadoan'){
        let MaDoan = head_params.get('MaDoan');
        let TenDoan = head_params.get('TenDoan');
        let chuyennganh = head_params.get('chuyennganh');
        let ngay = head_params.get('ngay') ;
        let MaGV = head_params.get('MaGV');
        let filedoc = head_params.get('filedoc');
        let infotep = head_params.get('infotep');
        let NUMBERFILE = head_params.get('NUMBERFILE');
        let ischangefile = head_params.get('ischangefile');

        if(String(ischangefile) !== 'x'){ 
            await Model.InleSQL("call DELETE_FileHD("+NUMBERFILE+")");
            console.log("call DELETE_FileHD("+NUMBERFILE+")")
        }
        console.log("call Update_DAFull('"+MaDoan+"', '"+TenDoan+"', '"+chuyennganh+"','"+MaGV+"','"+ngay+"','"+infotep+"','"+filedoc+"')")
        let  result1 = await Model.InleSQL("call Update_DAFull('"+MaDoan+"', '"+TenDoan+"', '"+chuyennganh+"','"+MaGV+"','"+ngay+"','"+infotep+"','"+filedoc+"')");
        if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
            console.log(result1)
            callback(JSON.stringify("that bai"), 'application/json');
        }else{
            callback(JSON.stringify(result1), 'application/json');
        }
    }

    if (index === 'xoadoan'){
        let MaDoan = head_params.get('MaDoan');

        let  result1 = await Model.InleSQL("call Delete_DA('"+MaDoan+"')");
        if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
            callback(JSON.stringify("that bai"), 'application/json');
        }else{
            callback(JSON.stringify(result1), 'application/json');
        }
        
    }

    if (index === 'danhsachdoan-data'){

        let MaGV = String(head_params.get('MaGV')).trim();
        let MaChuyennganh = String(head_params.get('MaChuyennganh')).trim();
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;

        let listChuyennganh;
        let MaChuyennganhtemp;

        listChuyennganh = await Model.InleSQL("call ComboBox_CN(substring('"+MaGV+"',3,2))");
        listChuyennganh = listChuyennganh[0];

    if(MaChuyennganh === '' || String(MaChuyennganh) === 'null'){

        lineReader = readline.createInterface({
            input: fs.createReadStream('controller/qldean/Text/TeacherStatus.txt')
        });
        lineReader.on('line', function (line) {
            if(String(line).includes(MaGV)) {
                MaChuyennganhtemp = String(line.split(',')[1]);
            }
        });
        lineReader.on('close', async function () {
            console.log(MaChuyennganhtemp);
            if(MaChuyennganhtemp === '#'){
                MaChuyennganh = listChuyennganh[0].MaCN;

                fs.readFile("controller/qldean/Text/TeacherStatus.txt", 'utf8', function (err,data) {
                    let formatted = data.replace( String(MaGV+','+MaChuyennganhtemp),String(MaGV+','+MaChuyennganh));
                    fs.writeFile("controller/qldean/Text/TeacherStatus.txt", '', 'utf8', function (err) {
                        if (err) return console.log(err);
                        fs.writeFile("controller/qldean/Text/TeacherStatus.txt", formatted, 'utf8', function (err) {
                            if (err) return console.log(err);
                        });
                    });
                });

            }else{
                MaChuyennganh = MaChuyennganhtemp;
            }


            let count = await Model.InleSQL("SELECT CountList_DAofGV('"+MaGV+"','"+MaChuyennganh+"') AS Number;");
            let select = await Model.InleSQL("call ShowList_DAofGV('"+MaGV+"','"+MaChuyennganh+"',"+limit*page+");");

            console.log("call ShowList_DAofGV('"+MaGV+"','"+MaChuyennganh+"',"+limit*page+");")

            let data = [];
            data.push(listChuyennganh);
            data.push(MaChuyennganh);
            data.push(count)
            data.push(select)
            callback(JSON.stringify(data), 'application/json');
        });

    }else{
        lineReader = readline.createInterface({
            input: fs.createReadStream('controller/qldean/Text/TeacherStatus.txt')
        });
        lineReader.on('line', function (line) {
            if(String(line).includes(MaGV)) {
                MaChuyennganhtemp = String(line.split(',')[1]).trim();
            }
        });
        
        lineReader.on('close', async function () {

            fs.readFile("controller/qldean/Text/TeacherStatus.txt", 'utf8', function (err,data) {
                let formatted = data.replace(  String(MaGV+','+MaChuyennganhtemp),String(MaGV+','+MaChuyennganh));
                fs.writeFile("controller/qldean/Text/TeacherStatus.txt", '', 'utf8', function (err) {
                    if (err) return console.log(err);
                    fs.writeFile("controller/qldean/Text/TeacherStatus.txt", formatted, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                });
            });

            console.log("SELECT CountList_DAofGV('"+MaGV+"','"+MaChuyennganh+"') AS Number;")
            let count = await Model.InleSQL("SELECT CountList_DAofGV('"+MaGV+"','"+MaChuyennganh+"') AS Number;");
            let select = await Model.InleSQL("call ShowList_DAofGV('"+MaGV+"','"+MaChuyennganh+"',"+limit*page+");");

            let data = [];
            data.push(listChuyennganh);
            data.push(MaChuyennganh);
            data.push(count);
            data.push(select);

            callback(JSON.stringify(data), 'application/json');
        });
    }
    }


    if (index === 'danhsachdoan-canhan'){

        let MaGV = String(head_params.get('MaGV')).trim();
        let MaChuyennganh = String(head_params.get('MaChuyennganh')).trim();
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;

        let count = await Model.InleSQL("SELECT CountList_DAofGV('"+MaGV+"','"+MaChuyennganh+"') AS Number;");
        let select = await Model.InleSQL("call ShowList_DAofGV('"+MaGV+"','"+MaChuyennganh+"',"+limit*page+");");

        let data = [];
        data.push(count);
        data.push(select);

        callback(JSON.stringify(data), 'application/json');
    }

    if (index === 'danhsachdoan-tatca'){

        let MaChuyennganh = String(head_params.get('MaChuyennganh')).trim();
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;

        let count = await Model.InleSQL("select CountList_DA('"+MaChuyennganh+"') AS Number;");
        let select = await Model.InleSQL("call ShowList_DA('"+MaChuyennganh+"',"+limit*page+");");

        let data = [];
        data.push(count);
        data.push(select);

        callback(JSON.stringify(data), 'application/json');
    }

    if(index === 'danhsachtailieu'){
        let MaGV = String(head_params.get('MaGV')).trim();
        let MaDoan = String(head_params.get('MaDoan')).trim();
        let limit = 10;
        let page = Number(head_params.get('page')) - 1;

        let count = await Model.InleSQL("select CountList_Files('"+MaDoan+"', '"+MaGV+"') AS Number;");
        let select = await Model.InleSQL("call ShowList_Files('"+MaDoan+"', '"+MaGV+"',"+limit*page+")");

        let data = [];
        data.push(count);
        data.push(select);

        callback(JSON.stringify(data), 'application/json');

    }



}