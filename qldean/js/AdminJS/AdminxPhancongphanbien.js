var listinfoitem;
var page_num = 1;
var tol_page = 0;

var listLabelpk = ['Mã sinh viên','Tên sinh viên','Lớp','Mã đồ án','GPA','Mã GVPB','Điểm GVPB'];
// var data = [{MaSV:'SV02', Ten:'Thanh Tam', Lop:'CNTT', Ma:'023', GPA:'3.4', GVHD:'GV01'},{MaSV:'SV02', Ten:'Thanh Tam', Lop:'CNTT', Ma:'023', GPA:'3.4', GVHD:'GV01'}]
var listButtonpk = ['Phân công','Chi tiết'];
var listIdBtnTable = ['phancongx', 'chitietx'];
var listInfoPhanbien1 = ['Mã sinh viên: SV21','Tên sinh viên: Le Tấn']
var listInfoPhanbien2 = ['Mã đồ án: DA21' ,'Tên đồ án: 21']

var listBtnpk =  ['Phân công ','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['phancong', 'thoa'];

let MaGVtemp;
let MaDAtemp;
let MaSVtemp;
// let GPAtemp = 0;



var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachphancongPB')){
                    var data = JSON.parse(this.responseText);
                    tol_page =  Math.ceil(data[1][0]['count(*)'] / 10); 

                    console.log(data)
                    // console.log(tol_page)
                    listinfoitem = data[0];
                    LoadListPhanbien(data[0]);
                }

                if(String(this.responseURL).includes('api/danhsachGVPBphancong')){
                    var data = JSON.parse(this.responseText)
                    // console.log(data,listinfoitem[currentrowtable])
                    console.log('xxxx')
                    LoadPhancongPhanbien(data);
                    // LoadPhancongHuongdan(data);
                    // LoadAddFormGiangvien(data[0]['AUTO_IDGV()']);
                }
                if(String(this.responseURL).includes('api/addGVPBphancong')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Trùng mã sinh viên, Email hoặc field rỗng')
                    else
                        loadListPhanbien()
                }


        }
    };



function loadListPhanbien(){
    xhttp.open("GET", "/api/danhsachphancongPB?page="+page_num, false);
    xhttp.send();
}

function loadPhancongPhanbien(MaSV,MaDA){
    xhttp.open("GET", "/api/danhsachGVPBphancong?MaSV="+MaSV+"&MaDA="+MaDA, false);
    xhttp.send();
}

function loadAddPhancongPhanbien(){
    var e = document.getElementsByClassName("slide-select-lorm").item(0);
    var strUser = String(e.value).split(' - ');
    console.log(strUser[0],MaDAtemp)
    xhttp.open("GET", "/api/addGVPBphancong?MaDA="+MaDAtemp+"&MaGVPB="+strUser[0], false);
    xhttp.send();
}

function LoadListPhanbien(data) {
  
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();

    $('.Add-New-Row').hide();


    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Phản biện') );
    // $('.chose-bar').append(returnSearchForm('Nhập GPA tối thiểu','Lọc') );
    $('#table_data').append(returnTable(listLabelpk,data));
    $('.btn-follow-row').append(returnButtonTable(listButtonpk,listIdBtnTable));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}


function LoadPhancongPhanbien(data) {

    
    var InfoSV = data[0][0];
    var listgvpb = data[1];

    console.log(InfoSV,listgvpb)

    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();



    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Phản biện') + returnNameIndex('Phân công')  + returnReturnBtn());
    $('.Add-New-Row').append(returnLormInfo( ['Mã sinh viên: '+InfoSV.MaSV,'Tên sinh viên: '+InfoSV.TenSV]));

    if(String(InfoSV.TenDA) != 'null')
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: '+InfoSV.TenDA]));
    else
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: Chưa đặt tên']));

    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: ' +InfoSV.MaGVHD));



    MaDAtemp = InfoSV.MaDA;

    let listGVPB = [];
    let choseGV;

    for(let i = 0; i < listgvpb.length; i++){
        if(String(listgvpb[i].MaGV) ===  String(MaGVtemp)) choseGV = listgvpb[i].MaGV+' - '+listgvpb[i].TenGV
        listGVPB.push( listgvpb[i].MaGV+' - '+listgvpb[i].TenGV)
    }

    if(String(MaGVtemp) == 'null')
    $('.Add-New-Row').append(returnLormInputSelect('Phân công giáo viên phản biện: ',listGVPB ,listgvpb[0].MaGV+' - '+listgvpb[0].TenGV));
    else
    $('.Add-New-Row').append(returnLormInputSelect('Phân công giáo viên phản biện: ',listGVPB ,choseGV));
    $('.Add-New-Row').append(returnLormBtn(listBtnpk,listColorpk,listIdBtn));

    // $('.Add-New-Row').append(returnLormInfo(listInfoPhanbien1));
    // $('.Add-New-Row').append(returnLormInfo(listInfoPhanbien2));
    // $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    // $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB02'));

    // $('.Add-New-Row').append(returnLormInputSelect('Phân công giáo viên phản biện: ',['GV92 - Nguyen thanh tung', 'GV92 - Vo thanh huy'] , ''));
    // $('.Add-New-Row').append(returnLormBtn(listBtnpk,listColorpk,listIdBtn));

}


function LoadChitietPhanbien() {
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Phản biện') + returnNameIndex('Chi tiết')  +  returnReturnBtn());

    $('.Add-New-Row').append(returnLormInfo(listInfoPhanbien1));
    $('.Add-New-Row').append(returnLormInfo(listInfoPhanbien2));
    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB02'));

    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên phản biện: GV02 - Trần Minh Chiến'));
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
            MaGVtemp = listinfoitem[currentrowtable].MaGVPB;
            MaDAtemp =  listinfoitem[currentrowtable].MaDA;
            loadPhancongPhanbien(listinfoitem[currentrowtable].MaSV,  listinfoitem[currentrowtable].MaDA);
        }else if(x.id == "chitietx"){
            LoadChitietPhanbien();
        }
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        LoadAddFormPhanbien();
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        LoadListPhanbien();
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else if(x.id == 'phancong'){
        loadAddPhancongPhanbien();
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }

}

//FIRST------------------------------------------

loadListPhanbien();