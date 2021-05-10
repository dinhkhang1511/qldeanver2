var listinfoitem;
var currentlist = true;
var textsearch = '';
var page_num = 1;
var tol_page = 0;

var currentrowtable = -1;

var maTB;
var ngaytemp;
var giotemp;
var khoacurrent = 0;

var listkhoa = [];

$(".left-bar").load("/qldean/Admin/SlideBar.html",function () {
    $( "#act-tieuban" ).addClass( "active" )
});

var listButtonpk = ['Phân công','Sửa','Xóa'];
var listIdBtnTable = ['phancongx', 'suax' , 'xoax'];

var listBtnpk =  ['Thêm','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['them', 'thoa'];

var listSuaBtnpk =  ['Sửa','Thoát'];
var listSuaColorpk = ['tomato', 'green'];
var listSuaIdBtn = ['sua', 'thoa'];

var listphancongbtn =  ['Phân công','Thoát'];

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachtieuban')){
                    
                    var data = JSON.parse(this.responseText);
                    console.log(data)
                    tol_page =  Math.ceil(data[1][0]['count(*)'] / 10); 
                    console.log(tol_page)
                    listinfoitem = data[0][0];
                    listkhoa = data[2];
                    khoacurrent = data[3] 
                    LoadListTieuban(listinfoitem);
                }
                if(String(this.responseURL).includes('api/dieukienthemtb')){
                    var data = JSON.parse(this.responseText);
                    LoadAddFormTieuban(data[0]['AUTO_IDTB('+khoacurrent+')'])
                }
                if(String(this.responseURL).includes('api/themtb')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else
                        loadListTieuban();
                }

                if(String(this.responseURL).includes('api/suatb')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else loadListTieuban();
                }

                if(String(this.responseURL).includes('api/xoatb')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else loadListTieuban();
                }
                if(String(this.responseURL).includes('api/danhsachGVphancongTB')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else LoadPhancongTieuban(JSON.parse(this.responseText)[0])
                }
                if(String(this.responseURL).includes('api/addGVintoTieuban')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else loadListTieuban();
                }
                if(String(this.responseURL).includes('api/timmatb')){
                    var data = JSON.parse(this.responseText);
                    console.log(data)
                    // tol_page = 1;
                    tol_page =  Math.ceil(data[1][0]['CountList_FindTB("'+khoacurrent+'", "'+textsearch+'")'] / 10); 

                    console.log(tol_page)
                    listinfoitem = data[0][0];
               
                    LoadListDataTieuban(listinfoitem);
                }
        }
    };

// ///LOAD----------------------------------------------------
function loadListTieuban(){
    currentlist = true;
    textsearch = '';
    xhttp.open("GET", "/api/danhsachtieuban?page="+page_num+"&khoa="+khoacurrent, false);
    xhttp.send();
}

function loadAddListTieuban() {
    xhttp.open("GET", "/api/dieukienthemtb?khoa="+khoacurrent, false);
    xhttp.send();
}

function loadSearchTieuban(){
    xhttp.open("GET", "/api/searchtieuban", false);
    xhttp.send();
}

function addTieuban() {
    var thoigiantieuban = document.getElementsByClassName('thoigianform').item(0).value;
    thoigiantieuban = String(thoigiantieuban).split('T')
    var ngay = thoigiantieuban[0];
    var gio = thoigiantieuban[1];
    console.log(ngay)

    if(String(ngay) !== ''){
        xhttp.open("GET", "/api/themtb?ngay="+ngay+"&gio="+gio+"&maTB="+ $(".label-item-add").text(), false);
        xhttp.send();
    }else{
        alert("Nhập ngày giờ")
    }
}


function updateListTieuban() {
    var thoigiantieuban = document.getElementsByClassName('thoigianform').item(0).value;
    thoigiantieuban = String(thoigiantieuban).split('T')
    var ngay = thoigiantieuban[0];
    var gio = thoigiantieuban[1];

    if(String(ngay) !== ''){
        xhttp.open("GET", "/api/suatb?maTB="+maTB+"&ngay="+ngay+"&gio="+gio, false);
        xhttp.send();
    }else{
        alert("Nhập ngày giờ")
    }

}

function loadphancongtieuban(){
    ngaytemp = listinfoitem[currentrowtable].ngay;
    giotemp = listinfoitem[currentrowtable].gio;
    xhttp.open("GET", "/api/danhsachGVphancongTB?ngay="+listinfoitem[currentrowtable].ngay+"&gio="+listinfoitem[currentrowtable].gio, false);
    xhttp.send();
}



function addphancongtieuban(){
    let GV01 = String(document.getElementsByClassName("combo-box-add-long").item(0).value).split(' - ')[0];
    let GV02 = String(document.getElementsByClassName("combo-box-add-long").item(1).value).split(' - ')[0];
    let GV03 = String(document.getElementsByClassName("combo-box-add-long").item(2).value).split(' - ')[0];
    let GV04 = String(document.getElementsByClassName("combo-box-add-long").item(3).value).split(' - ')[0];
    let GV05 = String(document.getElementsByClassName("combo-box-add-long").item(4).value).split(' - ')[0];
    console.log(GV01,GV02,GV03,GV04,GV05,maTB)


    xhttp.open("GET", "/api/addGVintoTieuban?TB="+maTB+"&GV1="+GV01+"&GV2="+GV02+"&GV3="+GV03+"&GV4="+GV04+"&GV5="+GV05, false);
    xhttp.send();
    // xhttp.open("GET", "/api/addGVphancongTB", false);
    // xhttp.send();
}


function changeKhoa(){
    var e = document.getElementById("select-khoa");
    khoacurrent = e.options[e.selectedIndex].text;
    console.log(khoacurrent)
    xhttp.open("GET", "/api/danhsachtieuban?page="+page_num+"&khoa="+khoacurrent, false);
    xhttp.send();
}


function changesearch(s){
    currentlist = false;
    textsearch = s;
    page_num = 1;
    xhttp.open("GET", "/api/timmatb?page="+page_num+"&khoa="+khoacurrent+"&textsearch="+textsearch, true);
    xhttp.send();
}

//ELEMENT-----------------------------------------------------
function LoadListTieuban(data) {
  
    let listTB = [];
    let dk;
    for(let i = 0; i< data.length;i++){
        if(Number(data[i].sum)<5) dk = 'Đang phân công';
        else if(Number(data[i].sum)==5) dk = 'Hoàn thành';
        listTB.push({maTB: data[i].maTB, ngay: data[i].ngay, gio: data[i].gio, sum: dk})
    }

    //xác định ẩn hiện
    $('#button-bar').show();
    $('.chose-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('#head-bar').show();

    $('.Add-New-Row').hide();

    //làm rỗng các phần
    $('#head-bar').empty();
    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    //thêm chi tiết vào
    $('#head-bar').append(returnFormListKhoa(listkhoa,khoacurrent));
    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý tiểu ban') +  returnAddBtn());
    $('.chose-bar').append(returnSearchForm('Nhập mã tiểu ban','Tìm kiếm') );
    $('#table_data').append(returnTable( ['Tiểu ban','Ngày','Giờ','Trạng thái'],listTB));
    $('.btn-follow-row').append(returnButtonTable(listButtonpk,listIdBtnTable));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}


function LoadListDataTieuban(data){
    let listTB = [];
    let dk;
    for(let i = 0; i< data.length;i++){
        if(Number(data[i].sum)<5) dk = 'Đang phân công';
        else if(Number(data[i].sum)==5) dk = 'Hoàn thành';
        listTB.push({maTB: data[i].maTB, ngay: data[i].ngay, gio: data[i].gio, sum: dk})
    }

    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#table_data').append(returnTable( ['Tiểu ban','Ngày','Giờ','Trạng thái'],listTB));
    $('.btn-follow-row').append(returnButtonTable(listButtonpk,listIdBtnTable));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}


function LoadAddFormTieuban(maTB) {

    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý tiểu ban') + returnNameIndex('Thêm mới') +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabel('Thêm mới tiểu ban'));
    $('.Add-New-Row').append(returnFormLabelInfo('Mã tiểu ban',maTB));
    $('.Add-New-Row').append(returnFormInputTime('Thời gian',1,''));
    $('.Add-New-Row').append(returnFormBtn(['Xác nhận', 'Thoát'],['tomato','green'],['them','thoat']));
}


function LoadSuaTieuban(listData) {
    console.log(listData)
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý tiểu ban') + returnNameIndex('Sửa') +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabel('Sửa tiểu ban'));
    $('.Add-New-Row').append(returnFormLabelInfo('Mã tiểu ban', listData.maTB));
    maTB = listData.maTB;
    var ngaygio = listData.ngay.replace('T17:00:00.000Z', '')+'T'+listData.gio;
    console.log(ngaygio)
    $('.Add-New-Row').append(returnFormInputTime('Thời gian',1,ngaygio));
    $('.Add-New-Row').append(returnFormBtn(['Xác nhận', 'Thoát'],['tomato','green'],['sua','thoat']));
}

function LoadPhancongTieuban(data) {
    console.log(data,maTB,ngaytemp,giotemp)
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();
    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý tiểu ban') + returnNameIndex('Phân công') +  returnReturnBtn());

    let listdataGV = [];
    for(let i = 0; i < data.length; i++){
        listdataGV.push(data[i].MaGV + ' - '+ data[i].TenGV)
    }

    $('.Add-New-Row').append(returnFormLabel('Phân công tiểu ban'));
    $('.Add-New-Row').append(returnFormLabelInfo('Mã tiểu ban',maTB));
    $('.Add-New-Row').append(returnFormLabelInfo('Thời gian',ngaytemp.replace('T17:00:00.000Z','')+' '+giotemp));
    $('.Add-New-Row').append(returnFormInputSelect('Giảng viên 1',listdataGV,data[0].MaGV + ' - '+ data[0].TenGV) );
    $('.Add-New-Row').append(returnFormInputSelect('Giảng viên 2',listdataGV,data[1].MaGV + ' - '+ data[1].TenGV) );
    $('.Add-New-Row').append(returnFormInputSelect('Giảng viên 3',listdataGV,data[2].MaGV + ' - '+ data[2].TenGV) );
    $('.Add-New-Row').append(returnFormInputSelect('Giảng viên 4',listdataGV,data[3].MaGV + ' - '+ data[3].TenGV) );
    $('.Add-New-Row').append(returnFormInputSelect('Giảng viên 5',listdataGV,data[4].MaGV + ' - '+ data[4].TenGV) );

    $('.Add-New-Row').append(returnFormBtn(['Xác nhận','Thoát'],['tomato','green'],['phancong','thoat']));

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
            console.log("xxxx")
            maTB = listinfoitem[currentrowtable].maTB
            loadphancongtieuban()
            // LoadPhancongTieuban();
        }else if(x.id == "suax"){
            console.log(currentrowtable)
            LoadSuaTieuban(listinfoitem[currentrowtable])
        }else if(x.id == "xoax"){
            xhttp.open("GET", "/api/xoatb?maTB="+listinfoitem[currentrowtable].maTB, false);
            xhttp.send();
        }
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        loadAddListTieuban();
    }else if(x.id == "them"){
        addTieuban();
    }else if(x.id == "sua"){
        updateListTieuban()
    }else if(x.id == "thoat"){
        loadListTieuban();
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        loadListTieuban();
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else if(x.id == 'search-index'){

        console.log(document.getElementById('input-search').value);
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }
    if(x.id == 'phancong'){
        addphancongtieuban();
    }
    if(x.parentNode.className == "nav-page" ){
        if(currentlist == true){
            page_num = Number(x.innerHTML)
            loadListTieuban();
        }else{
            page_num = Number(x.innerHTML)
            xhttp.open("GET", "/api/timmatb?page="+page_num+"&khoa="+khoacurrent+"&textsearch="+textsearch, true);
            xhttp.send();
        }

    }
}

//FIRST------------------------------------------
//loadListTieuban()
loadListTieuban();
