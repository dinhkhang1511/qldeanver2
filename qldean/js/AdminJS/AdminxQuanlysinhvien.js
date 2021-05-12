$(".left-bar").load("/qldean/Admin/SlideBar.html",function () {
    $( "#act-sinhvien" ).addClass( "active" )
});


const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
      for (let x = 0; x < array.length - 1 - i; x++) {
        if (array[x] > array[x + 1]) {
          [array[x], array[x + 1]] = [array[x + 1], array[x]];
        }
      }
    }
    return array;
}


var MaAdmin = 'ADMIN';

var listinfoitem;
var currentlist = 0;
var textsearch = '';

var page_num = 1;
var tol_page = 0;
var currentrowtable = -1;

var maSV;
var EmailSV;

var khoacurrent = 0;
var nghanhcurrent = '';
var chuyennghanhcurrent = '';
var lopcurrent = '';

var listnghanh = [];
    var listmanganh = [];
    var listtennghanh = [];

var listkhoa = [];
var listkhoatemp = [];
var listniemkhoa = [];

var listchuyenganh = [];
    var listmachuyennganh = [];
    var listtenchuyennganh = [];


var listlop = []


var tieudeBangSinhvien = ['Mã' , 'Tên' , 'Ngày sinh' , 'Lớp' , 'Email' , 'GPA'] 
var tennutBangSinhvien = ['Sửa','Xóa'];
var idnutBangSinhvien = [ 'suax' , 'xoax'];

var nutThemSinhvien =  ['Thêm','Thoát'];
var maunutThemSinhvien = ['tomato', 'green'];
var idnutThemSinhvien = ['them', 'thoat'];

var nutSuaSinhvien =  ['Sửa','Thoát'];
var matnutSuaSinhvien = ['tomato', 'green'];
var idnutSuaSinhvien = ['sua', 'thoat'];


var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachsinhvien')){
                    var data = JSON.parse(this.responseText);
                    console.log(data)

                    listnghanh = data[0];
                    listmanganh = [];
                    for(let i = 0; i< listnghanh.length; i++){
                        listmanganh.push(listnghanh[i].MaNganh)
                    }
                    listtennghanh = [];
                    for(let i = 0; i < listnghanh.length; i++){
                        listtennghanh.push(listnghanh[i].TenNganh)
                    }

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

                    tol_page =  1; 
                    listinfoitem = [];

                    LoadListSinhvien(listinfoitem);
                }
                if(String(this.responseURL).includes('api/dieukienthemsv')){
                    var data = JSON.parse(this.responseText)
                    console.log(data)

                    maSV = data[0];
                    EmailSV = data[1];

                    listchuyenganh = data[2];
                    listmachuyennganh = [];
                    for(let i = 0; i< listchuyenganh.length; i++){
                        listmachuyennganh.push(listchuyenganh[i].MaCN)
                    }
                    listtenchuyennganh = [];
                    for(let i = 0; i < listchuyenganh.length; i++){
                        listtenchuyennganh.push(listchuyenganh[i].TenCN)
                    }

                    console.log(listmachuyennganh,listtenchuyennganh)
                    LoadAddFormSinhvien()
                    // maSV =  data.Id[0]['Auto_IDSV('+Number(data.khoa)+')'];
                    // EmailSV = data.Email[0]["Auto_EmailSV('"+maSV+"')"]
                    // LoadAddFormSinhvien(EmailSV, maSV)
                }


                if(String(this.responseURL).includes('api/themsv')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else
                        loadListSinhvien();
                }

                if(String(this.responseURL).includes('api/suasv')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else loadListSinhvien();
                }
                if(String(this.responseURL).includes('api/xoasv')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else loadListSinhvien();
                }
                if(String(this.responseURL).includes('/api/themkhoasv')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Fail')
                    else{
                        khoacurrent = Number(document.getElementById('input-khoa').value);
                        listkhoa.push(Number(document.getElementById('input-khoa').value))
                        listkhoa = bubbleSort(listkhoa);
            
                        console.log(listkhoa)
            
                        $('#head-bar').empty();
                        $('#head-bar').append(returnFormKhoa(listkhoa,khoacur));
            
                        $('#xacnhan-them-khoa').hide();
                        $('#dskhoa').hide();
                        $('#themkhoa').show();
                        $('#input-khoa').hide();
                        $('#select-khoa').show();

                        loadListSinhvien();
                    } 
                }
        }
    };

///LOAD----------------------------------------------------
function loadListSinhvien(){
    xhttp.open("GET", "/api/danhsachsinhvien?page="+page_num+"&Khoa="+khoacurrent+"&MaNghanh="+String(nghanhcurrent)+"&MaAdmin="+MaAdmin, false);
    xhttp.send();
}

function loadAddListSinhvien() {
    var e = document.getElementsByClassName("select-combox-headbar").item(0);
    nghanhcurrent = String(e.options[e.selectedIndex].value);
    e = document.getElementsByClassName("select-combox-headbar").item(1);
    khoacurrent = e.options[e.selectedIndex].value;
    console.log("mới tạo "+nghanhcurrent,khoacurrent)

    xhttp.open("GET", "/api/dieukienthemsv?Khoa="+khoacurrent+"&MaNghanh="+nghanhcurrent, false);
    xhttp.send();
}

function addSinhvien() {
    var tensv = document.getElementsByClassName('input-new-row-long').item(0).value;
    var GPA = document.getElementsByClassName('input-new-row-short').item(0).value;

    var e = document.getElementsByClassName('combo-box-add-long').item(0);
    var lop = e.options[e.selectedIndex].text;

    var thoigiantieuban = document.getElementsByClassName('thoigianform').item(0).value;
    thoigiantieuban = String(thoigiantieuban).split('T')
    var ngay = thoigiantieuban[0];

    console.log(lop)
    xhttp.open("GET", "/api/themsv?MaSV="+maSV+"&TenSV="+tensv+"&NgaySinh="+ngay+"&Lop="+lop+"&GPA="+GPA+"&Email="+EmailSV, false);
    xhttp.send();

}

function updateListSinhvien() {
    var MaSV = document.getElementsByClassName('label-item-add').item(0).innerHTML;
    var TenSV = document.getElementsByClassName('input-new-row-long').item(0).value;
    var NgaySinh = document.getElementsByClassName('thoigianform').item(0).value;
    NgaySinh = String(NgaySinh).split('T')
    NgaySinh = NgaySinh[0];
    // var EmailSV = document.getElementsByClassName('label-item-add').item(1).innerHTML;
    var e = document.getElementsByClassName('combo-box-add-long').item(0);
    var Lop = e.options[e.selectedIndex].text;
    var GPA = document.getElementsByClassName('input-new-row-short').item(0).value;

    // console.log(masv,tensv,ngaysinh,emailsv,lop,GPA)

    xhttp.open("GET", "/api/suasv?MaSV="+MaSV+"&TenSV="+TenSV+"&NgaySinh="+NgaySinh+"&Lop="+Lop+"&GPA="+GPA, false);
    xhttp.send();

}

function changeKhoa(){
    var e = document.getElementById("select-khoa");
    khoacurrent = e.options[e.selectedIndex].text;
    console.log(khoacurrent)
    xhttp.open("GET", "/api/danhsachsinhvien?page="+page_num+"&khoa="+khoacurrent, false);
    xhttp.send();
}


//ELEMENT-----------------------------------------------------
function LoadListSinhvien(data) {
    
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

    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý sinh viên')  +  returnAddBtn());
    $('#head-bar').append(returnFormComboxHeadBar('Nghành',listmanganh, listtennghanh, nghanhcurrent, 'changeKhoaandNghanh',250,0));
    $('#head-bar').append(returnFormComboxHeadBar('Niêm khóa',listkhoa , listniemkhoa, khoacurrent, 'changeKhoaandNghanh',120,20));
    $('.chose-bar').append(returnSearchForm('Tìm mã sinh viên','Làm mới') );

    $('#table_data').append(returnTable(tieudeBangSinhvien,data));
    $('.btn-follow-row').append(returnButtonTable(tennutBangSinhvien,idnutBangSinhvien));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}

function LoadAddFormSinhvien() {

    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý sinh viên') + returnNameIndex('Thêm mới') +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabel('Thêm mới sinh viên'));
    $('.Add-New-Row').append(returnFormLabelInfo('Mã sinh viên',maSV));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên','' ));
    $('.Add-New-Row').append(returnFormInputTime('Ngày sinh',2,''));

    $('.Add-New-Row').append(returnFormLabelInfo('Email',EmailSV));
    $('.Add-New-Row').append(returnFormInputSelect('Chuyên nghành', ['Hệ thống thông tin','Mạng máy tính','Công nghệ phần mềm'], 'Hệ thống thông ,tin'));
    $('.Add-New-Row').append(returnFormInputSelectHaveBtn('Lớp', ['D18CCN012','D18CCN012','D18CCN012','D18CCN012'], 'D18CCN012','themlopbtn','Thêm mới'));

    $('.Add-New-Row').append(returnFormInputText('GPA', ''));
    $('.Add-New-Row').append(returnFormBtn(nutThemSinhvien,maunutThemSinhvien,idnutThemSinhvien));
}


function LoadSuaFormSinhvien(listData) {
    console.log(listData)
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();
    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý sinh viên') + returnNameIndex('Sửa') +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabel('Sửa sinh viên'));

    $('.Add-New-Row').append(returnFormLabelInfo('Mã sinh viên',listData.MaSV));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên',listData.TenSV ));
    $('.Add-New-Row').append(returnFormInputTime('Ngày sinh',2,listData.NgaySinh.replace('T17:00:00.000Z','')));
    // $('.Add-New-Row').append(returnFormInputText('Lớp', ''));
    $('.Add-New-Row').append(returnFormLabelInfo('Email',listData.Email));
    $('.Add-New-Row').append(returnFormInputSelect('Lớp', ['CNTT','ATTT','Marketing','KeToan'], listData.Lop));
    // $('.Add-New-Row').append(returnFormInputTextRight('Email', '@ptithcm.edu.vn'));
    $('.Add-New-Row').append(returnFormInputText('GPA', listData.GPA));

    $('.Add-New-Row').append(returnFormBtn(['Xác nhận', 'Thoát'],['tomato', 'green'],['sua','thoat']));
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
        if(x.id == "suax"){
            console.log(currentrowtable)
            LoadSuaFormSinhvien(listinfoitem[currentrowtable])
        }
        if(x.id == 'xoax'){
            console.log(listinfoitem[currentrowtable].MaSV)
            xhttp.open("GET", "/api/xoasv?MaSV="+listinfoitem[currentrowtable].MaSV, false);
            xhttp.send();
        }

    }else if(x.id == 'them'){
        addSinhvien();
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
            loadAddListSinhvien();
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        loadListSinhvien();
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else if(x.parentNode.className == "nav-page" ){
        page_num = Number(x.innerHTML)
        loadListSinhvien();
    }else if(x.id == 'them-khoa-btn'){
        $('#select-khoa').hide();
        $('#them-khoa-btn').hide();
        $('#input-khoa').show();
        $('#ds-khoa-btn').show();
        $('#xacnhan-khoa-btn').show();
    }else if(x.id == 'ds-khoa-btn'){
        $('#select-khoa').show();
        $('#them-khoa-btn').show();
        $('#input-khoa').hide();
        $('#ds-khoa-btn').hide();
        $('#xacnhan-khoa-btn').hide();
    }else if(x.id == 'xacnhan-them-khoa'){
        console.log(Number(document.getElementById('input-khoa').value))
        if(Number(document.getElementById('input-khoa').value) !== 0)
        if(listkhoa.indexOf(Number(document.getElementById('input-khoa').value)) !== -1){
            alert("Khóa đã tồn tại!")
        } else{
            if(Number(document.getElementById('input-khoa').value) >= rangeKhoa[0] && Number(document.getElementById('input-khoa').value) <= rangeKhoa[1]){
                xhttp.open("GET", "/api/themkhoasv?khoa="+Number(document.getElementById('input-khoa').value), false);
                xhttp.send();
            }else{
                alert("Vượt quá năm quy định!")
            }

        }
    }else if(x.id == 'sua'){
        updateListSinhvien();
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }
}

//FIRST---------------------------------------------------------
loadListSinhvien() ;