var listinfoitem;
let currentrowtable;
var page_num = 1;
var tol_page = 0;

var MaAdmin = 'ADMIN';

var tieudeBangPB = ['Mã sinh viên','Tên sinh viên','Email','GPA','Mã GVHD','Điểm'];
var tennutBangPB = ['Phân công'];
var idnutBangPB = ['phancongx'];

var nutPhancongPB =  ['Phân công ','Thoát'];
var maunutPhancongPB = ['tomato', 'green'];
var idnutPhancongPB = ['phancong', 'thoat'];

let MaGVtemp;
let MaDAtemp;
let MaSVtemp;



var khoacurrent = 0;
var nghanhcurrent = 'null';
var listkhoa = [];
    var listniemkhoa = [];
var listnghanh = [];
    var listmanganh = [];
    var listtennghanh = [];

$(".left-bar").load("/qldean/Admin/SlideBarCollapse.html",function () {
    $( "#act-phancongphanbien" ).addClass( "active" );
});


var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachphancongPB')){
                    var data = JSON.parse(this.responseText);
                    console.log(data);

                    listnghanh = data[0];
                    listkhoa = [];
                    for(let i = 0; i < data[1].length; i++){
                        listkhoa.push(data[1][i].namBD);
                    }
                    listniemkhoa = [];
                    for(let i = 0; i < data[1].length; i++){
                        listniemkhoa.push(data[1][i].namBD + '-' + Math.ceil(data[1][i].namBD + data[1][i].SoNam));
                    }
                    nghanhcurrent = data[2];
                    khoacurrent = data[3];

                    tol_page =  Math.ceil(data[4][0]['NumberSV'] / 10); 
                    listinfoitem = data[5][0];

                    LoadListPhanbien(listinfoitem);
                }

                if(String(this.responseURL).includes('api/danhsachGVPBphancong')){
                    var data = JSON.parse(this.responseText)

                    console.log('xxxx')
                    LoadPhancongPhanbien(data);

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
    console.log(nghanhcurrent)
    xhttp.open("GET", "/api/danhsachphancongPB?page="+page_num+"&Khoa="+khoacurrent+"&MaAdmin="+MaAdmin+"&MaNghanh="+String(nghanhcurrent), false);
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

function changeKhoa(){
    var e = document.getElementById("select-khoa");
    khoacurrent = e.options[e.selectedIndex].text;
    console.log(khoacurrent)
    xhttp.open("GET", "/api/danhsachphancongPB?page="+page_num+"&khoa="+khoacurrent, false);
    xhttp.send();
}



function LoadListPhanbien(data) {

    listmanganh = [];
    listtennghanh = [];
    for(let i = 0;i < listnghanh.length; i++){
        listmanganh.push(listnghanh[i].MaNganh);
        listtennghanh.push(listnghanh[i].TenNganh);
    }

  
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('#head-bar').show();

    $('.Add-New-Row').hide();

    $('#head-bar').empty();
    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#head-bar').append(returnFormComboxHeadBar('Nghành',listmanganh, listtennghanh, nghanhcurrent, 'changeKhoaandNghanh',250,0));
    $('#head-bar').append(returnFormComboxHeadBar('Niêm khóa',listkhoa , listniemkhoa, khoacurrent, 'changeKhoaandNghanh',120,20));

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Phản biện') );

    $('#table_data').append(returnTable(tieudeBangPB,data));
    $('.btn-follow-row').append(returnButtonTable(tennutBangPB,idnutBangPB));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}


function LoadPhancongPhanbien(data) {

    
    var InfoSV = data[0][0][0];
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

    $('.Add-New-Row').append(returnLormInfo( ['Lớp: '+InfoSV.Lop,'GPA: '+InfoSV.GPA]));
    $('.Add-New-Row').append(returnLormOneInfo('Email: '+InfoSV.Email));

    if(String(InfoSV.TenDA) != 'null')
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: '+InfoSV.TenDA]));
    else
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: Chưa đặt tên']));

    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: ' +InfoSV.MaGVHD + ' - '+InfoSV.TenGVHD));

    if(String(InfoSV.DiemHD) != 'null')
    $('.Add-New-Row').append(returnLormOneInfo('Điểm hướng dẫn: '+InfoSV.DiemHD));
    else
    $('.Add-New-Row').append(returnLormOneInfo('Điểm hướng dẫn: Chưa chấm'));

    if(String(InfoSV.DiemPB) != '')
    $('.Add-New-Row').append(returnLormOneInfo('Điểm phản biện: '+InfoSV.DiemPB));
    else
    $('.Add-New-Row').append(returnLormOneInfo('Điểm phản biện: Chưa chấm'));

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
        loadListPhanbien();
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