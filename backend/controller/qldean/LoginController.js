const fs = require('fs');
const readline = require('readline');
const path = require("path");

module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let Model = scanner.inleModel;
    let head_params = scanner.head_params;


    //call CheckLogin('GVCN006','GVCN006#151187')
    //call CheckLogin('QL001','QL001#010621')

    if(index === 'login'){

        let username = String(head_params.get('username'))
        let pass = String(head_params.get('pass'))


        let count = await Model.InleSQL("call CheckLogin('"+username+"','"+pass+"')");



        console.log(count[0][0]['Quyen'] + 'xxxx')


        if(String(count[0][0]['Quyen']) === 'SV'){
            scanner.res.writeHead(302, {'Location': '/thongtindoan'});
            scanner.res.end();
        }else if(String(count[0][0]['Quyen']) === 'GV'){
          scanner.res.writeHead(302, {'Location': '/giangvien/danhsachdoan'});
          scanner.res.end();
        }else if(String(count[0][0]['Quyen']) === 'QL'){
          scanner.res.writeHead(302, {'Location': '/admin/quanlytieuban'});
          scanner.res.end();
        }else{

        fs.readFile('../qldean/login-form/Login_v15/Login.html', (err, content) => {
            if (err) {
              if (err.code == "ENOENT") {
                // Page Not Found
                fs.readFile(path.join(__dirname, "404.html"),(err, content) => {
                    console.log(__dirname)
                    callback(JSON.stringify('error'), 'text/html');
                  }
                );
              }else{
                // Server Error
                callback(JSON.stringify('error'), 'text/html');
              }
            }else{
                callback(content, 'text/html');
            }
        });

        }
    }

}