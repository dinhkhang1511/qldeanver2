$(".left-bar").load("/qldean/Admin/SlideBar.html",function () {
    $( "#act-tieuban" ).addClass( "active" )
});

var MaAdmin = getCookie('userlogin');

var listinfoitem;
var currentlist = 0;
var textsearch = '';

var page_num = 1;
var tol_page = 0;
var currentrowtable = -1;
var isAddTieuban = false;

var maTB;
var ngaytemp;
var giotemp;
var catemp;
let nienkhoahientai;

var khoacurrent = 0;
var nghanhcurrent = '';
var listkhoa = [];
    var listniemkhoa = [];
var listnghanh = [];
    var listmanganh = [];
    var listtennghanh = [];

var listcheckGV = [];

var tieudeBangTieuban = ['Tiểu ban','Ngày','Ca','Trạng thái'];
var tennutBangTieuban = ['Phân công','Sửa','Xóa'];
var idnutBangTieuban = ['phancongx', 'suax' , 'xoax'];

var nutThemTieuban =  ['Thêm','Thoát'];
var maunutThemTieuban = ['tomato', 'green'];
var idnutThemTieuban = ['them', 'thoat'];

var nutSuaTieuban =  ['Sửa','Thoát'];
var matnutSuaTieuban = ['tomato', 'green'];
var idnutSuaTieuban = ['sua', 'thoat'];

var nutPhancongTieuban =  ['Phân công','Thoát'];
var maunutPhancongTieuban =  ['tomato', 'green'];
var idnutPhancongTieuban = ['phancong','thoat']

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                //Dữ liệu cho mục tiểu ban
                if(String(this.responseURL).includes('api/danhsachtieuban')){
                    var data = JSON.parse(this.responseText);
                    console.log(data)
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
                    tol_page =  Math.ceil(data[4][0]["CountList_TB('"+khoacurrent+"','"+nghanhcurrent+"')"] / 10); 
                    listinfoitem = data[5][0];

                    nienkhoahientai =  data[6][0]['nienkhoahientai'];
                    
                    LoadListTieuban(listinfoitem);
                }
                //Dữ liệu bảng tiểu ban
                if(String(this.responseURL).includes('api/danhsachdulieutieuban')){
                    var data = JSON.parse(this.responseText);
                    tol_page =  Math.ceil(data[0][0]["CountList_TB('"+khoacurrent+"','"+nghanhcurrent+"')"] / 10); 
                    listinfoitem = data[1][0];
                    LoadListDataTieuban(listinfoitem);
                }
                //Dữ liệu tìm tiểu ban
                if(String(this.responseURL).includes('api/timmatb')){
                    var data = JSON.parse(this.responseText);
                    tol_page = Math.ceil(data[0][0]["dem"] / 10);  
                    listinfoitem = data[1][0];
                    LoadListDataTieuban(listinfoitem);
                }
                //Load điều kiện thêm tiểu ban
                if(String(this.responseURL).includes('api/dieukienthemtb')){
                    var data = JSON.parse(this.responseText);
                    LoadAddFormTieuban(data[0]['AUTO_IDTB('+nienkhoahientai+')'])
                    khoacurrent = nienkhoahientai;
                }
                //Thêm tiểu ban
                if(String(this.responseURL).includes('api/themtb')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else
                        loadListTieuban();
                }
                //Sửa tiểu ban
                if(String(this.responseURL).includes('api/suatb')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else loadListTieuban();
                }
                //Xóa tiểu ban
                if(String(this.responseURL).includes('api/xoatb')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else{
                        if(currentlist === 1){

                            loadListDataTieuban();
                        }else{
                            loadListSearchTieuban();
                        }
                    } 
                }
                //Danh sách GV phân công
                if(String(this.responseURL).includes('api/danhsachGVphancongTB')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else LoadPhancongTieuban(JSON.parse(this.responseText)[0])
                }
                //Check phân công GV
                if(String(this.responseURL).includes('api/checkaddGVintoTieuban')){
                    var data = JSON.parse(this.responseText);
                    // console.log()
                    addphancongtieuban(data[0]['count(*)'])
                }
                //Phân công GV
                if(String(this.responseURL).includes('api/addGVintoTieuban')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else loadListTieuban();
                }
        }
    };

//LOAD DATA TIỂU BAN----------------------------------------------------
function loadListTieuban(){
    currentlist = 0;
    textsearch = '';
    xhttp.open("GET", "/api/danhsachtieuban?page="+page_num+"&Khoa="+khoacurrent+"&MaNghanh="+String(nghanhcurrent)+"&MaAdmin="+MaAdmin, false);
    xhttp.send();
}
function loadListDataTieuban(){
    currentlist = 1;
    textsearch = '';
    xhttp.open("GET", "/api/danhsachdulieutieuban?page="+page_num+"&Khoa="+khoacurrent+"&MaNghanh="+String(nghanhcurrent)+"&MaAdmin="+MaAdmin, false);
    xhttp.send();
}
function loadListSearchTieuban(){
    currentlist = 2;
    xhttp.open("GET", "/api/timmatb?page="+page_num+"&Khoa="+khoacurrent+"&MaNghanh="+(nghanhcurrent)+"&MaAdmin="+MaAdmin+"&textsearch="+textsearch, true);
    xhttp.send();
}

function loadAddListTieuban() {
    console.log(nienkhoahientai)
    xhttp.open("GET", "/api/dieukienthemtb?khoa="+nienkhoahientai, false);
    xhttp.send();
}
function addTieuban() {
    var thoigiantieuban = document.getElementsByClassName('thoigianform').item(0).value;
    thoigiantieuban = String(thoigiantieuban).split('T')
    var ngay = thoigiantieuban[0];

    var e = document.getElementsByClassName("combo-box-add-long ").item(0);
    ca = String(e.options[e.selectedIndex].value);


    if(String(ngay) !== ''){
        xhttp.open("GET", "/api/themtb?ngay="+ngay+"&ca="+ca+"&maTB="+ $(".label-item-add").text()+"&MaNganh="+nghanhcurrent, false);
        xhttp.send();
    }else{
        alert("Nhập ngày giờ")
    }
}
function updateListTieuban() {
    var thoigiantieuban = document.getElementsByClassName('thoigianform').item(0).value;
    thoigiantieuban = String(thoigiantieuban).split('T')
    var ngay = thoigiantieuban[0];

    var e = document.getElementsByClassName("combo-box-add-long ").item(0);
    ca = String(e.options[e.selectedIndex].value);

    if(String(ngay) !== ''){
        xhttp.open("GET", "/api/suatb?ngay="+ngay+"&ca="+ca+"&maTB="+ $(".label-item-add").text()+"&MaNganh="+nghanhcurrent, false);
        xhttp.send();
    }else{
        alert("Nhập ngày giờ")
    }
}

function loadphancongtieuban(){
    ngaytemp = String(listinfoitem[currentrowtable].ngay).split('T')
    ngaytemp = ngaytemp[0];
    catemp = listinfoitem[currentrowtable].ca;

    console.log(ngaytemp,catemp,maTB);

    xhttp.open("GET", "/api/danhsachGVphancongTB?ngay="+ngaytemp+"&ca="+catemp+"&MaNghanh="+nghanhcurrent, false);
    xhttp.send();
}

function checkphancongtieuban(){
    xhttp.open("GET", "/api/checkaddGVintoTieuban?TB="+maTB, false);
    xhttp.send();
}

function addphancongtieuban(){
    let GV01 = String(document.getElementsByClassName("combo-box-add-long").item(0).value).split(' - ')[0];
    let GV02 = String(document.getElementsByClassName("combo-box-add-long").item(1).value).split(' - ')[0];
    let GV03 = String(document.getElementsByClassName("combo-box-add-long").item(2).value).split(' - ')[0];
    let GV04 = String(document.getElementsByClassName("combo-box-add-long").item(3).value).split(' - ')[0];
    let GV05 = String(document.getElementsByClassName("combo-box-add-long").item(4).value).split(' - ')[0];
   


    if(!$('#them-item-giangvientb').is(':visible')){
        console.log(5)
        var listGVSQL = GV01+','+ GV02+','+ GV03+','+ GV04+','+ GV05+',';
        xhttp.open("GET", "/api/addGVintoTieuban?TB="+maTB+"&listGVSQL="+listGVSQL, false);
        xhttp.send();
    }else{
        console.log(3)
        var listGVSQL = GV01+','+ GV02+','+ GV03+',';
        xhttp.open("GET", "/api/addGVintoTieuban?TB="+maTB+"&listGVSQL="+listGVSQL, false);
        xhttp.send();
    }

}
function changeKhoaandNghanh(){
    var e = document.getElementsByClassName("select-combox-headbar").item(0);
    nghanhcurrent = String(e.options[e.selectedIndex].value);
    e = document.getElementsByClassName("select-combox-headbar").item(1);
    khoacurrent = e.options[e.selectedIndex].value;
    console.log("mới tạo "+nghanhcurrent,khoacurrent)
    if(isAddTieuban == false){
        loadListTieuban();
    }else{
        loadAddListTieuban()
    }
}
function changesearch(s){
    currentlist = 2;
    textsearch = s;
    page_num = 1;
    loadListSearchTieuban();
}

//LOAD ELEMENT TIỂU BAN-----------------------------------------------------
function LoadListTieuban(data) {
    isAddTieuban = false;
    currentlist = 1;
    listmanganh = [];
    listtennghanh = [];
    for(let i = 0;i < listnghanh.length; i++){
        listmanganh.push(listnghanh[i].MaNganh);
        listtennghanh.push(listnghanh[i].TenNganh);
    }
    let listTB = [];
    let dk;
    for(let i = 0; i< data.length;i++){
        if(Number(data[i].sum) != 5 && Number(data[i].sum) !=3 ) dk = 'Chưa phân công';
        else if(Number(data[i].sum)==5) dk = 'Hoàn thành';
        else if(Number(data[i].sum)==3) dk = 'Hoàn thành';
        listTB.push({maTB: data[i].MaTB, ngay: data[i].Ngay, ca: data[i].Ca, sum: dk})
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

    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý tiểu ban') +  returnAddBtn());
    $('#head-bar').append(returnFormComboxHeadBar('Nghành',listmanganh, listtennghanh, nghanhcurrent, 'changeKhoaandNghanh',250,0));
    $('#head-bar').append(returnFormComboxHeadBar('Niêm khóa',listkhoa , listniemkhoa, khoacurrent, 'changeKhoaandNghanh',120,20));
    $('.chose-bar').append(returnSearchForm('Tìm mã tiểu ban','Làm mới') + '<div style="margin-top:10px ;margin-right:5px;float: right;">Hội đồng thi Khoa Công Nghệ Thông Tin</div>' );
    $('#table_data').append(returnTable( tieudeBangTieuban ,listTB));
    $('.btn-follow-row').append(returnButtonTable(tennutBangTieuban,idnutBangTieuban));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}


function LoadListDataTieuban(data){
    currentlist = 1;
    isAddTieuban = false;
    let listTB = [];
    let dk;
    for(let i = 0; i< data.length;i++){
        if(Number(data[i].sum)<5) dk = 'Đang phân công';
        else if(Number(data[i].sum)==5) dk = 'Hoàn thành';
        listTB.push({maTB: data[i].MaTB, ngay: data[i].Ngay, ca: data[i].Ca, sum: dk})
    }

    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#table_data').append(returnTable( ['Tiểu ban','Ngày','Giờ','Trạng thái'],listTB));
    $('.btn-follow-row').append(returnButtonTable(tennutBangTieuban,idnutBangTieuban));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}


function LoadAddFormTieuban(maTB){
    isAddTieuban = true;
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('#head-bar').hide();
    $('.nav-page').hide();
    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý tiểu ban') + returnNameIndex('Thêm mới') +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabelInfo('Mã tiểu ban',maTB));
    $('.Add-New-Row').append(returnFormInputTime('Thời gian',2,''));
    $('.Add-New-Row').append(returnFormInputSelect('Chọn ca', 'chonca' , ['SA','CH'], ['ca sáng', 'ca chiều'], 'SA'));

    $('.Add-New-Row').append(returnFormBtn(nutThemTieuban,maunutThemTieuban,idnutThemTieuban));
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
    // $('.Add-New-Row').append(returnFormLabel('Sửa tiểu ban'));
    $('.Add-New-Row').append(returnFormLabelInfo('Mã tiểu ban', listData.maTB));
    maTB = listData.maTB;
    var ngay = listData.ngay.replace('T17:00:00.000Z', '');
    console.log(ngay)
    $('.Add-New-Row').append(returnFormInputTime('Thời gian',2,ngay));
    $('.Add-New-Row').append(returnFormInputSelect('Chọn ca', 'chonca' , ['SA','CH'], ['ca sáng', 'ca chiều'], listData.ca));

    $('.Add-New-Row').append(returnFormBtn(['Xác nhận', 'Thoát'],['tomato','green'],['sua','thoat']));
}

function LoadPhancongTieuban(data) {
    console.log(data,maTB,ngaytemp,catemp)
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
    let listmaGV = [];
    listcheckGV = [];
    for(let i = 0; i < data.length; i++){
        listcheckGV.push(data[i].MaGV);
        listmaGV.push(data[i].MaGV);
        listdataGV.push(data[i].MaGV + ' - '+ data[i].TenNV + ' - ' + data[i].total);
    }

    console.log(listdataGV)


    $('.Add-New-Row').append(returnFormLabelInfo('Mã tiểu ban',maTB));
    
    $('.Add-New-Row').append(returnFormLabelInfo('Hội đồng thi','Khoa Công Nghệ Thông Tin'));

    if(String(catemp) === 'SA')
    $('.Add-New-Row').append(returnFormLabelInfo('Ca','ca sáng'));
    else  $('.Add-New-Row').append(returnFormLabelInfo('Ca','ca chiều'));

        $('.Add-New-Row').append(returnFormInputSelectLong('Giảng viên 1','phanconggvtb',listmaGV,listdataGV,listmaGV[0]) );
        $('.Add-New-Row').append(returnFormInputSelectLong('Giảng viên 2','phanconggvtb',listmaGV,listdataGV,listmaGV[1]) );
        $('.Add-New-Row').append(returnFormInputSelectLong('Giảng viên 3','phanconggvtb',listmaGV,listdataGV,listmaGV[2]) );
        $('.Add-New-Row').append(returnFormInputSelectLong('Giảng viên 4','phanconggvtb',listmaGV,listdataGV,listmaGV[3]) );
        $('.Add-New-Row').append(returnFormInputSelectLong('Giảng viên 5','phanconggvtb',listmaGV,listdataGV,listmaGV[4]) );


    $('.Add-New-Row').append(returnButtonAddMore('them-item-giangvientb','bo-item-giangvientb'))


    document.getElementsByClassName("slide-bar-add-new-row").item(3).style.display = "none";
    document.getElementsByClassName("slide-bar-add-new-row").item(4).style.display = "none";

    $('#bo-item-giangvientb').hide();
    $('#them-item-giangvientb').show();

    $('.Add-New-Row').append(returnFormBtn(['Xác nhận','Thoát'],['tomato','green'],['phancong','thoat']));

}



//LOAD EVENT TIỂU BAN -----------------------------------------------
function EventAdminClick(event) {
    var x = event.target;
    if( x.parentNode.className == "no-color-lum-table"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#no-color-btn-follow-row').attr("id", "yes-color-btn-follow-row");
        x.parentNode.className = 'yes-color-lum-table';
        currentrowtable = Number(x.parentNode.id.replace('collumtalbe-',''));
    }else if(x.parentNode.className == 'btn-follow-row'){
        if(x.id == "phancongx" ){
            console.log(listinfoitem[currentrowtable].maTB)
            maTB = listinfoitem[currentrowtable].maTB
            loadphancongtieuban()
            // LoadPhancongTieuban([]);
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
    }else if(x.id == 'them-item-giangvientb'  || x.parentNode.id == 'them-item-giangvientb' || x.parentNode.parentNode.id == 'them-item-giangvientb' || x.parentNode.parentNode.parentNode.id == 'them-item-giangvientb'){
        document.getElementsByClassName("slide-bar-add-new-row").item(3).style.display = "block";
        document.getElementsByClassName("slide-bar-add-new-row").item(4).style.display = "block";
        $('#bo-item-giangvientb').show();
        $('#them-item-giangvientb').hide();
    }else if(x.id == 'bo-item-giangvientb' || x.parentNode.id == 'bo-item-giangvientb' || x.parentNode.parentNode.id == 'bo-item-giangvientb' || x.parentNode.parentNode.parentNode.id == 'bo-item-giangvientb'){
        document.getElementsByClassName("slide-bar-add-new-row").item(3).style.display = "none";
        document.getElementsByClassName("slide-bar-add-new-row").item(4).style.display = "none";
        $('#bo-item-giangvientb').hide();
        $('#them-item-giangvientb').show();
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }
    if(x.id == 'phancong'){
        // checkphancongtieuban();
        addphancongtieuban();
    }
    if(x.parentNode.className == "nav-page" ){
        if(currentlist == 1){
            console.log("loaddataa")
            page_num = Number(x.innerHTML);
            loadListDataTieuban();
        }else{
            page_num = Number(x.innerHTML);
            loadListSearchTieuban();
        }
    }
}

//FIRST------------------------------------------
loadListTieuban();