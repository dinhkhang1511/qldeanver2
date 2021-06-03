var listinfoitem;
let currentrowtable;
var page_num = 1;
var tol_page = 0;

var MaAdmin = 'ADMIN';

var tieudeBangHD = ['Mã sinh viên','Tên sinh viên','Email','GPA','Mã GVHD','Điểm'];
var tennutBangHD = ['Phân công'];
var idnutBangHD = ['phancongx'];

var nutPhancongHD =  ['Phân công ','Thoát'];
var maunutPhancongHD = ['tomato', 'green'];
var idnutPhancongHD = ['phancong', 'thoat'];

let MaGVtemp;
let MaDAtemp;
let MaSVtemp;
let NgaySinhtemp;
let GPAtemp = 0;

var khoacurrent = 0;
var nghanhcurrent = '';
var listkhoa = [];
    var listniemkhoa = [];
var listnghanh = [];
    var listmanganh = [];
    var listtennghanh = [];

$(".left-bar").load("/qldean/Admin/SlideBarCollapse.html",function () {
    $( "#act-phanconghuongdan" ).addClass( "active" );
    $('#logo-title').append('<img src="/Asset 4.png" alt="" srcset="">')
});

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachphancongHD')){
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

                    GPAtemp = data[4];

                    tol_page =  Math.ceil(data[5][0]['NumberSV'] / 10); 
                    listinfoitem = data[6][0];

                    LoadListHuongdan(listinfoitem);
                }

                if(String(this.responseURL).includes('api/danhsachGVHDphancong')){
                    var data = JSON.parse(this.responseText)

                    console.log(data)
                    LoadPhancongHuongdan(data);

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
    xhttp.open("GET", "/api/danhsachphancongHD?page="+page_num+"&GPA="+GPAtemp+"&Khoa="+khoacurrent+"&MaAdmin="+MaAdmin+"&MaNghanh="+String(nghanhcurrent), false);
    xhttp.send();
}

function loadPhancongHuongdan(MaSV){
    xhttp.open("GET", "/api/danhsachGVHDphancong?MaSV="+MaSV+"&Khoa="+khoacurrent+"&MaAdmin="+MaAdmin+"&MaNghanh="+String(nghanhcurrent), false);
    xhttp.send();
}

function loadAddPhancongHuongdan(){
    var e = document.getElementsByClassName("slide-select-lorm").item(0);
    var strUser = String(e.value).split(' - ');
    console.log(strUser[0])
    if(String(MaGVtemp) !== String(strUser[0])){
    xhttp.open("GET", "/api/addGVHDphancong?MaSV="+MaSVtemp+"&MaGVHD="+strUser[0]+"&NgaySinh="+NgaySinhtemp, false);
    xhttp.send();
    }else{
        loadListHuongdan()
    }
}


function changeKhoaandNghanh(){
    var e = document.getElementsByClassName("select-combox-headbar").item(0);
    nghanhcurrent = String(e.options[e.selectedIndex].value);
    e = document.getElementsByClassName("select-combox-headbar").item(1);
    khoacurrent = e.options[e.selectedIndex].value;
    console.log("mới tạo "+nghanhcurrent,khoacurrent)
    loadListHuongdan();
}


function LoadListHuongdan(data) {
  
    listmanganh = [];
    listtennghanh = [];
    for(let i = 0;i < listnghanh.length; i++){
        listmanganh.push(listnghanh[i].MaNganh);
        listtennghanh.push(listnghanh[i].TenNganh);
    }

    $('#button-bar').show();
    $('.chose-bar').show();
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
    
    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Hướng dẫn') );
    $('.chose-bar').append(returnSearchForm('Nhập GPA tối thiểu','Lọc') );
    document.getElementById('input-search').value = GPAtemp;


    $('#table_data').append(returnTable(tieudeBangHD,data));
    $('.btn-follow-row').append(returnButtonTable(tennutBangHD,idnutBangHD));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));

}


function LoadPhancongHuongdan(data) {

    var InfoSV = data[0][0][0];
    console.log(InfoSV)
    var listgvhd = data[1][0];

    console.log(InfoSV)
    console.log(listgvhd)

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
    $('.Add-New-Row').append(returnLormInfo( ['Lớp: '+InfoSV.MaLop,'GPA: '+InfoSV.GPA]));
    $('.Add-New-Row').append(returnLormOneInfo('SDT: '+InfoSV.SDT));
    $('.Add-New-Row').append(returnLormOneInfo('Email: '+InfoSV.Email));




    if(String(InfoSV.TenDA) != '')
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: '+InfoSV.TenDA]));
    else
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: Chưa đặt tên']));
    // $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    // $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB02'));

    if(String(InfoSV.Diem) != '')
    $('.Add-New-Row').append(returnLormOneInfo('Điểm hướng dẫn: '+InfoSV.Diem));
    else
    $('.Add-New-Row').append(returnLormOneInfo('Điểm hướng dẫn: Chưa chấm'));

    MaDAtemp = InfoSV.MaDA;
    MaSVtemp = InfoSV.MaSV;
    NgaySinhtemp = InfoSV.NgaySinh;

    let listGVHD = [];
    let choseGV;

    for(let i = 0; i < listgvhd.length; i++){
        if(String(listgvhd[i].MaGV) ===  String(MaGVtemp)) choseGV = listgvhd[i].MaGV+' - '+listgvhd[i].TenGV
        listGVHD.push( listgvhd[i].MaGV+' - '+listgvhd[i].TenGV)
    }
       

    if(String(MaGVtemp) == 'null')
    $('.Add-New-Row').append(returnLormInputSelect('Phân công giáo viên hướng dẫn: ',listGVHD ,listgvhd[0].MaGV+' - '+listgvhd[0].TenGV));
    else
    $('.Add-New-Row').append(returnLormInputSelect('Phân công giáo viên hướng dẫn: ',listGVHD ,choseGV));
    $('.Add-New-Row').append(returnLormBtn(nutPhancongHD,maunutPhancongHD,idnutPhancongHD));

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
    }else if(x.id == 'refresh-index'){
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

loadListHuongdan();