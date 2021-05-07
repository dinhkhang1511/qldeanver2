var listinfoitem;
let currentrowtable;
var page_num = 1;
var tol_page = 0;

var listLabelpk = ['Mã sinh viên','Tên sinh viên','Ngày sinh','Lớp','Tên đồ án','Mã GVHD','GPA'];
// var data = [{MaSV:'SV02', Ten:'Minh Chien', Lop:'CNTT', Ma:'023', GPA:'3.4', GVHD:'GV02'}]
var listButtonpk = ['Phân công','Chi tiết'];
var listIdBtnTable = ['phancongx', 'chitietx'];
var listInfoHuongdan1 = ['Mã sinh viên: SV21','Tên sinh viên: Le Tấn']
var listInfoHuongdan2 = ['Mã đồ án: DA21' ,'Tên đồ án: 21']

var listBtnpk =  ['Phân công ','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['phancong', 'thoat'];

let MaGVtemp;
let MaDAtemp;
let GPAtemp = 0;


var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachphancongHD')){
                    var data = JSON.parse(this.responseText);
                    tol_page =  Math.ceil(data[1][0]['count(*)'] / 10); 

                    console.log(data)
                    // console.log(tol_page)
                    listinfoitem = data[0];
                    LoadListHuongdan(data[0]);
                }

                if(String(this.responseURL).includes('api/danhsachGVHDphancong')){
                    var data = JSON.parse(this.responseText)
                    // console.log(data,listinfoitem[currentrowtable])
                    
                    LoadPhancongHuongdan(data);
                    // LoadAddFormGiangvien(data[0]['AUTO_IDGV()']);
                }
                if(String(this.responseURL).includes('api/addGVHDphancong')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Trùng mã sinh viên, Email hoặc field rỗng')
                    else
                        loadListHuongdan()
                }

        }
    };


function loadListHuongdan(){
    xhttp.open("GET", "/api/danhsachphancongHD?page="+page_num+"&GPA="+GPAtemp, false);
    xhttp.send();
}

function loadPhancongHuongdan(MaSV){
    xhttp.open("GET", "/api/danhsachGVHDphancong?MaSV="+MaSV, false);
    xhttp.send();
}

function loadAddPhancongHuongdan(){
    var e = document.getElementsByClassName("slide-select-lorm").item(0);
    var strUser = String(e.value).split(' - ');
    console.log(strUser[0])
    xhttp.open("GET", "/api/addGVHDphancong?MaDA="+MaDAtemp+"&MaGVHD="+strUser[0], false);
    xhttp.send();
}

function LoadListHuongdan(data) {
  
    $('#button-bar').show();
    $('.chose-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();

    $('.Add-New-Row').hide();


    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Hướng dẫn') );
    $('.chose-bar').append(returnSearchForm('Nhập GPA tối thiểu','Lọc') );
    if(Number(GPAtemp) !== 0) document.getElementById('input-search').value = GPAtemp;


    if(tol_page > 0){
    $('#table_data').append(returnTable(listLabelpk,data));
    $('.btn-follow-row').append(returnButtonTable(listButtonpk,listIdBtnTable));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
    }
}


function LoadPhancongHuongdan(data) {

    var InfoSV = data[0][0];
    var listgvhd = data[1];

    console.log(InfoSV)

    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Hướng dẫn') + returnNameIndex('Phân công')  + returnReturnBtn());

    $('.Add-New-Row').append(returnLormInfo( ['Mã sinh viên: '+InfoSV.MaSV,'Tên sinh viên: '+InfoSV.TenSV]));
    if(String(InfoSV.TenDA) != 'null')
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: '+InfoSV.TenDA]));
    else
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: Chưa đặt tên']));
    // $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    // $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB02'));

    MaDAtemp = InfoSV.MaDA;

    let listGVHD = [];
    let choseGV;

    for(let i = 0; i < listgvhd.length; i++){
        if(String(listgvhd[i].MaGV) ===  String(MaGVtemp)) choseGV = listgvhd[i].MaGV+' - '+listgvhd[i].TenGV
        listGVHD.push( listgvhd[i].MaGV+' - '+listgvhd[i].TenGV)
    }
       

    // console.log(listGVHD,listgvhd)
    if(String(MaGVtemp) == 'null')
    $('.Add-New-Row').append(returnLormInputSelect('Phân công giáo viên hướng dẫn: ',listGVHD ,listgvhd[0].MaGV+' - '+listgvhd[0].TenGV));
    else
    $('.Add-New-Row').append(returnLormInputSelect('Phân công giáo viên hướng dẫn: ',listGVHD ,choseGV));
    $('.Add-New-Row').append(returnLormBtn(listBtnpk,listColorpk,listIdBtn));

}


function LoadChitietHuongdan() {
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Hướng dẫn') + returnNameIndex('Chi tiết')  +  returnReturnBtn());

    $('.Add-New-Row').append(returnLormInfo(listInfoHuongdan1));
    $('.Add-New-Row').append(returnLormInfo(listInfoHuongdan2));
    // $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB02'));

    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    $('.Add-New-Row').append(returnLormBtn(['Thoát'],['tomato'],['thoat']));

}


//CLICK-----------------------------------------------
function EventAdminClick(event) {
    var x = event.target;
    if( x.parentNode.className == "no-color-lum-table"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#no-color-btn-follow-row').attr("id", "yes-color-btn-follow-row");
        x.parentNode.className = 'yes-color-lum-table';
        currentrowtable = Number(x.parentNode.id.replace('collumtalbe-',''));
    }else if(x.parentNode.className == 'btn-follow-row'){
        if(x.id == "phancongx" ){
            console.log(listinfoitem[currentrowtable].MaSV)
            MaGVtemp = listinfoitem[currentrowtable].MaGVHD;
            loadPhancongHuongdan(listinfoitem[currentrowtable].MaSV);
        }else if(x.id == "chitietx"){
            LoadChitietHuongdan();
        }
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        LoadAddFormHuongdan();
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        // LoadListHuongdan();
        loadListHuongdan();
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else if(x.id == 'search-index'){
        GPAtemp = Number(document.getElementById('input-search').value);
        loadListHuongdan();
    }else if(x.id == 'phancong'){
        loadAddPhancongHuongdan();
    }else if(x.id== 'thoat'){
        loadListHuongdan();
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }

}

//FIRST------------------------------------------

LoadListHuongdan();