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

    if (index === 'danhsachphancongHD'){
        let khoa = Number(head_params.get('khoa'));
        let GPA = Number(head_params.get('GPA'));
        let GPAtemp = -1;
        console.log(khoa, GPA + 'FIRST')
        if(khoa == 0){
                let listkhoa = [];
                lineReader = readline.createInterface({
                    input: fs.createReadStream('controller/qldean/Text/khoa.txt')
                });
                lineReader.on('line', function (line) {
                    if(String(line).includes('currentkhoa:')) {
                        khoa = Number(String(line).replace('currentkhoa:',''));
                    }else{
                        if(khoa == 0){
                            let curbig = (line.split(','));
                            listkhoa.push(curbig);
                        }else{
                            listkhoa.push(Number(line.split(',')[0]))
                            if(khoa == Number(line.split(',')[0])){
                                GPA = Number(line.split(',')[1]);
                            }     
                        }

                    }
                });
                lineReader.on('close', async function () {

                    if(khoa == 0){
                    let tempkhoa = 0;
                    let listkhoatemp = [];
                    for(let i = 0; i < listkhoa.length; i++){
                        listkhoatemp.push(Number(listkhoa[i][0]));
                        if(tempkhoa < Number(listkhoa[i][0])){
                            tempkhoa = Number(listkhoa[i][0]);
                            GPA = Number(listkhoa[i][1]);
                        } 
                    }
                    khoa = tempkhoa;
                    listkhoa = listkhoatemp

                    fs.readFile("controller/qldean/Text/khoa.txt", 'utf8', function (err,data) {
                        var formatted = data.replace('currentkhoa:0', 'currentkhoa:'+khoa);
                        fs.writeFile("controller/qldean/Text/khoa.txt", formatted, 'utf8', function (err) {
                            if (err) return console.log(err);
                            });
                        });

                    }

                    let limit = 10;
                    let page = Number(head_params.get('page')) - 1;
                    let count = await Model.InleSQL('select CountList_SVDAHD('+khoa+', '+GPA+')');
                    let result = await Model.InleSQL('call ShowList_SvDAHD('+khoa+', '+GPA+','+page*limit+')');
                    let data = [];
                    data.push(result)
                    data.push(count)
                    data.push(bubbleSort(listkhoa));
                    data.push(khoa);
                    data.push(GPA);
                    
                    console.log(khoa, GPA + 'END')
              
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
                    if(Number(khoa) ==  Number(line.split(',')[0])){
                    
                        if(GPA !== -1) GPAtemp =  Number(line.split(',')[1])
                        else GPA =  Number(line.split(',')[1])
                    } 
                }
            });
            lineReader.on('close', async function () {
                fs.readFile("controller/qldean/Text/khoa.txt", 'utf8', function (err,data) {
                var formatted = data.replace(oskhoa, 'currentkhoa:'+khoa);
                fs.writeFile("controller/qldean/Text/khoa.txt", formatted, 'utf8', function (err) {
                    if (err) return console.log(err);
                    

                    if(GPAtemp !== -1){
                        fs.readFile("controller/qldean/Text/khoa.txt", 'utf8', function (err,data) {
                            console.log( khoa+','+GPAtemp, khoa+','+GPA)
                            console.log(data)
                            var formatted = String(data.replace(khoa+','+GPAtemp, khoa+','+GPA));
                            console.log(formatted)

                            fs.writeFile('controller/qldean/Text/khoa.txt', '', function(){
                                fs.appendFileSync('controller/qldean/Text/khoa.txt', formatted);
                            })
                            
                            });
                        }
                
                
                    });
                });


                let limit = 10;
                let page = Number(head_params.get('page')) - 1;
      
                console.log(khoa,GPA+"XXXXXXXXXX")

                let count = await Model.InleSQL('select CountList_SVDAHD('+khoa+', '+GPA+')');
                let result = await Model.InleSQL('call ShowList_SvDAHD('+khoa+', '+GPA+','+page*limit+')');
                console.log('call ShowList_SvDAHD('+khoa+', '+GPA+','+page*limit+')')
                let data = [];
                data.push(result)
                data.push(count)
                data.push(bubbleSort(listkhoa));
                data.push(khoa);
                data.push(GPA);
                console.log(khoa, GPA + 'END')
                callback(JSON.stringify(data), 'application/json');
            });
        }
    }


    if(index === 'danhsachGVHDphancong'){
        let MaSV = String(head_params.get('MaSV'));
        console.log(MaSV)
        let result = await Model.InleSQL("call ShowInfor_SVHD('"+MaSV+"')");
        let result1 =  await Model.InleSQL("select MaGV, TenGV from giangvien where MaTK is not null");
        let data = [];
        data.push(result)
        data.push(result1)
        console.log(data)
        callback(JSON.stringify(data), 'application/json');
    }

    if(index === 'addGVHDphancong'){
        let MaGVHD = String(head_params.get('MaGVHD'));
        let MaSV = String(head_params.get('MaSV'));
        let NgaySinh = String(head_params.get('NgaySinh'));
        console.log(MaGVHD,MaSV,NgaySinh)
        let  result1 = await Model.InleSQL('call Add_DA("'+MaSV+'","'+NgaySinh+'", "'+MaGVHD+'");');
              
            if(String(result1).includes('Duplicate entry') || String(result1).includes('fail')){
                callback(JSON.stringify("that bai"), 'application/json');
            }else{
                callback(JSON.stringify(result1), 'application/json');
            }
    }

}