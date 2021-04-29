var listinfoitem;
var page_num = 1;
var tol_page = 0;

var listSVTitle = ['Mã' , 'Tên' , 'Ngày sinh' , 'Lớp' , 'Email' , 'GPA'] 
var listSVdata = [{Ma:'SV021', Ten:'le tuan', Ngaysinh: '21/12/2222', Lop:'12', Email:'LEtan@prox.com', GPA:'3'},{Ma:'SV021', Ten:'le tuan', Ngaysinh: '21/12/2222', Lop:'12', Email:'LEtan@prox.com', GPA:'3'}]
var listButtonpk = ['Sửa','Xóa'];
var listIdBtnTable = [ 'suax' , 'xoax'];

var listBtnpk =  ['Thêm','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['them', 'thoa'];

var maSV;
var EmailSV;


var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachsinhvien')){
                    var data = JSON.parse(this.responseText);
                    tol_page =  Math.ceil(data[1][0]['count( maSV)'] / 10); 
                    // tol_page =   Math.ceil( Number(data[1]) / 2 );
                    // LoadListSinhvien(data[0]);
                    // LoadNavPage();
                    console.log(data)
                    console.log(tol_page)
                    listinfoitem = data[0];
                    LoadListSinhvien(data[0]);
                }

                if(String(this.responseURL).includes('api/dieukienthemsv')){
                    var data = JSON.parse(this.responseText)
                    maSV =  data.Id[0]['Auto_IDSV('+Number(data.khoa)+')'];
                    EmailSV = data.Email[0]["Auto_EmailSV('"+maSV+"')"]
                    LoadAddFormSinhvien(EmailSV, maSV)
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


        }
    };

///LOAD----------------------------------------------------
function loadListSinhvien(){
    xhttp.open("GET", "/api/danhsachsinhvien?page="+page_num, false);
    xhttp.send();
}

function loadAddListSinhvien() {
    console.log(String(document.getElementById('input-text-title').value))
    xhttp.open("GET", "/api/dieukienthemsv?khoa="+String(document.getElementById('input-text-title').value), false);
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
    var masv = document.getElementsByClassName('label-item-add').item(0).innerHTML;
    var tensv = document.getElementById('tensv').value;
    var emailsv = document.getElementById('emailsv').value;
    var matk = document.getElementById('matk').value;
    var makhoa = document.getElementById('makhoa').value;
    var mksv = document.getElementById('mksv').value;
    if(isNumeric(masv)){
        xhttp.open("GET", "/api/suasv?masv="+masv+"&tensv="+tensv+"&emailsv="+emailsv+"&matk="+matk+"&makhoa="+makhoa+"&mksv="+mksv, false);
        xhttp.send();
    }else{
        alert("Mã sinh viên phải là số")
    }
}

///ELEMENT-----------------------------------------------------

//ELEMENT-----------------------------------------------------
function LoadListSinhvien(data) {
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

    $('#button-bar').append(returnIconHome() + returnNameIndex('Quản lý sinh viên') + returnInputTextTitle("Nhập khóa") +  returnAddBtn());
    $('.chose-bar').append(returnSearchForm('Nhập mã sinh viên','Tìm kiếm') );
    $('#table_data').append(returnTable(listSVTitle,data));
    $('.btn-follow-row').append(returnButtonTable(listButtonpk,listIdBtnTable));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}

function LoadAddFormSinhvien(Email,Id) {

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
    $('.Add-New-Row').append(returnFormLabelInfo('Mã sinh viên',Id));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên','' ));
    $('.Add-New-Row').append(returnFormInputTime('Ngày sinh',2,''));
    // $('.Add-New-Row').append(returnFormInputText('Lớp', ''));
    $('.Add-New-Row').append(returnFormLabelInfo('Email',Email));
    $('.Add-New-Row').append(returnFormInputSelect('Lớp', ['CNTT','ATTT','Marketing','KeToan'], 'CNTT'));
    // $('.Add-New-Row').append(returnFormInputTextRight('Email', '@ptithcm.edu.vn'));
    $('.Add-New-Row').append(returnFormInputText('GPA', ''));
    $('.Add-New-Row').append(returnFormBtn(listBtnpk,listColorpk,listIdBtn));
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
    // $('.Add-New-Row').append(returnFormLabelInfo('Mã sinh viên','TB12'));
    // $('.Add-New-Row').append(returnFormInputTextLength('Tên','LeTuan' ));
    // $('.Add-New-Row').append(returnFormInputTime('Ngày sinh',2,'2012-23-12'));
    // $('.Add-New-Row').append(returnFormInputText('Lớp', 'CNTT'));
    // $('.Add-New-Row').append(returnFormInputSelect('Khóa', [2018,2019,2020,2021], 2019));
    // // $('.Add-New-Row').append(returnFormInputTextLength('Email', 'letan@ptithcm.edu.vn'));
    // $('.Add-New-Row').append(returnFormInputText('GPA', '3'));


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
    }else if(x.id == 'them'){
        addSinhvien();
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        // LoadAddFormSinhvien()
        
        if(String(document.getElementById('input-text-title').value) !== ''){
            loadAddListSinhvien();
        }
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        loadListSinhvien();
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }if(x.parentNode.className == "nav-page" ){
        page_num = Number(x.innerHTML)
        loadListSinhvien();
    }
    
    // if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn"  ||  x.parentNode.parentNode.parentNode.className == "return_btn" || x.className == "exit-btn"){
    //     loadListSinhvien();
    // }
    // if(x.parentNode.className == "nav-page" ){
    //     page_num = Number(x.innerHTML)
    //     loadListSinhvien();
    // }   

    // if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
    //     loadAddListSinhvien();
    // }
    // if(x.className == "add_row_sv_btn"){
    //     addSinhvien();
    // }

    // if(x.className == "edit-co-btn" ){
    //     $.getJSON("/api/dieukienthemsv", function (data) {
    //         LoadUpdateListSinhvien(data[0] , data[1] , listinfoitem[Number(String(x.id).replace('row-', ''))] )
    //     });
    // }
    // if(x.className == "update_row_sv_btn"){
    //     updateListSinhvien();
    // }

    // if(x.className == "delete-co-btn"){
    //     xhttp.open("GET", "/api/xoasv?masv="+listinfoitem[Number(String(x.id).replace('row_', ''))].maSV, false);
    //     xhttp.send();
    // }

    // if(x.id == "search-index"){
    //     xhttp.open("GET", "/api/timmasv?masv="+document.getElementById("input-search").value , false);
    //     xhttp.send();
    // }
    // if(x.id == "refresh-index"){
    //     page_num = 1;
    //     loadListSinhvien();
    // }
}

//FIRST---------------------------------------------------------
loadListSinhvien() ;