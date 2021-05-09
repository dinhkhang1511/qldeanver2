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

    if (index === 'danhsachphancongPB'){
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
                    console.log(khoa)
                    let count = await Model.InleSQL('select CountList_SVDAPB('+khoa+')');
                    let result = await Model.InleSQL('call ShowList_SvDAPB('+khoa+','+page*limit+')');
                    console.log('call ShowList_SvDAPB('+khoa+','+page*limit+')')
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
                let count = await Model.InleSQL('select CountList_SVDAPB('+khoa+')');
                let result = await Model.InleSQL('call ShowList_SvDAPB('+khoa+','+page*limit+')');
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


    if(index === 'danhsachGVPBphancong'){
        let MaSV = String(head_params.get('MaSV'));
        let MaDA = String(head_params.get('MaDA'));
        console.log("Xxx");
        // console.log(MaSV,MaDA);
        let result = await Model.InleSQL("call ShowInfor_SVPB('"+MaSV+"')");
        let result1 = await Model.InleSQL("select MaGV, TenGV from giangvien where MaGV <> (select MaGVHD from doan where MaDA='"+MaDA+"') and MaTK is not null");
        console.log("select MaGV, TenGV from giangvien where MaGV <> (select MaGVHD from doan where MaDA='"+MaDA+"') and MaTK is not null")
        let data = [];
        data.push(result)
        data.push(result1)
        console.log(data)
        callback(JSON.stringify(data), 'application/json');
    }


    if(index === 'addGVPBphancong'){
        let MaGVPB = String(head_params.get('MaGVPB'));
        let MaDA = String(head_params.get('MaDA'));

        console.log(MaGVPB , MaDA)

        let  result1 = await Model.InleSQL('call PhanCong_GVPB("'+MaDA+'","'+MaGVPB+'")');

        let count = await Model.InleSQL('select count(*)  from `chamdiemhd-pb` where MaDA="'+MaDA+'"')
        console.log(count[0]['count(*)'])

        let temp = await Model.InleSQL('select MaGVPB from doan where MaDA="'+MaDA+'";')
        console.log(temp[0]['MaGVPB']);

        let result;
        if(count == 2){
            result =  await Model.InleSQL('UPDATE `chamdiemhd-pb` SET MaGV="'+MaGVPB+'", diem=null where MaDA="'+MaDA+'" and MaGV="'+temp+'";')
        }else{
            result = await Model.InleSQL('insert into `chamdiemhd-pb`(MaDA, MaGV) values ("'+MaDA+'", "'+MaGVPB+'");')
        }
        console.log(result)
        result = await Model.InleSQL('UPDATE doan SET MaGVPB="'+MaGVPB+'" where MaDA="'+MaDA+'";')
        console.log(result)

        // console.log('call PhanCong_GVPB("'+MaDA+'","'+MaGVPB+'")')
            if(String(result).includes('Duplicate entry') || String(result).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }


}