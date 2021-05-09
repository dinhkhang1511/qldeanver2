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

    if (index === 'danhsachphancongTB'){
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
                    let count = 0;
                    let result = []
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
                let count = 0;
                let result = [];
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


}