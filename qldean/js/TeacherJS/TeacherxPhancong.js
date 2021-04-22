var listinfoitem;
var page_num = 1;
var tol_page = 0;


var listTacaTitle = ['Mã đồ án' , 'Tên đồ án' , 'GVHD'] 
var listTacadata = [{Ma:'DA42', Ten:'Lam web', GVHD: 'GV - Nguyen thi thu ngan'},{Ma:'DA42', Ten:'Lam web', GVHD: 'GV - Nguyen thi thu ngan'},{Ma:'DA42', Ten:'Lam web', GVHD: 'GV - Nguyen thi thu ngan'}]


var listPhutrachTitle = ['Mã sinh viên','Tên sinh viên', 'Lớp', 'Email','Mã đồ án' , 'Tên đồ án' ]
var listPhutrachdata = [{MaSV:'SV02', Ten:'Ngoc minh', Lop: 'ATTT', Email:'ngocminh@gmail.com',MaDA: 'DA44', TenDA:'Hack Wifi'}]


var listButtonpk = ['Sửa','Xóa'];
var listIdBtnTable = [ 'suax' , 'xoax'];

var listBtnpk =  ['Thêm','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['them', 'thoa'];

//ELEMENT-----------------------------------------------------
function LoadListPhancong() {
    $('#button-bar').show();
    $('.chose-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();

    $('.Add-New-Row').hide();


    $('#button-bar').empty();


    $('#button-bar').append(returnIconHome() + returnNameIndex('Phân công') +  returnSwitchBtn('Tất cả', 'Phụ trách'));
    // $('.chose-bar').append(returnSearchForm('Nhập mã sinh viên','Tìm kiếm') );
    // $('#table_data').append(returnTable(listSVTitle,listSVdata));
    // $('.btn-follow-row').append(returnButtonTable(listButtonpk,listIdBtnTable));
    // $('.nav-page').append(returNavForm(4, 2));
    LoadTatcadoan();
}

function LoadTatcadoan() {
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();
    
    $('.chose-bar').append(returnSearchForm('Nhập mã đồ án','Tìm kiếm'));
    $('#table_data').append(returnTable(listTacaTitle,listTacadata));
    $('.btn-follow-row').append(returnButtonTable(['Xem chi tiết'],['chitiet']));
    $('.nav-page').append(returNavForm(4, 2));
}

function LoadPhutrachdoan() {
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();
    
    $('.chose-bar').append(returnSearchForm('Nhập mã sinh viên','Tìm kiếm'));
    $('#table_data').append(returnTable(listPhutrachTitle,listPhutrachdata));
    $('.btn-follow-row').append(returnButtonTable(['Xem chi tiết', 'Phân công'],['chitiet', 'phancong']));
    $('.nav-page').append(returNavForm(4, 2));
}


function LoadAddFormPhancong() {

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
    $('.Add-New-Row').append(returnFormLabelInfo('Mã sinh viên','TB12'));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên','' ));
    $('.Add-New-Row').append(returnFormInputTime('Ngày sinh',2,''));
    $('.Add-New-Row').append(returnFormInputText('Lớp', ''));
    $('.Add-New-Row').append(returnFormInputSelect('Khóa', [2018,2019,2020,2021], 2021));
    // $('.Add-New-Row').append(returnFormInputTextRight('Email', '@ptithcm.edu.vn'));
    $('.Add-New-Row').append(returnFormInputText('GPA', ''));
    $('.Add-New-Row').append(returnFormBtn(listBtnpk,listColorpk,listIdBtn));
}


function LoadSuaFormPhancong() {
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
    $('.Add-New-Row').append(returnFormLabelInfo('Mã sinh viên','TB12'));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên','LeTuan' ));
    $('.Add-New-Row').append(returnFormInputTime('Ngày sinh',2,'2012-23-12'));
    $('.Add-New-Row').append(returnFormInputText('Lớp', 'CNTT'));
    $('.Add-New-Row').append(returnFormInputSelect('Khóa', [2018,2019,2020,2021], 2019));
    // $('.Add-New-Row').append(returnFormInputTextLength('Email', 'letan@ptithcm.edu.vn'));
    $('.Add-New-Row').append(returnFormInputText('GPA', '3'));
    $('.Add-New-Row').append(returnFormBtn(listBtnpk,listColorpk,listIdBtn));
}



//CLICK-----------------------------------------------
function EventTeacherClick(event) {
    var x = event.target;
    if( x.parentNode.className == "no-color-lum-table"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#no-color-btn-follow-row').attr("id", "yes-color-btn-follow-row");
        x.parentNode.className = 'yes-color-lum-table';
    }else if(x.parentNode.className == 'btn-follow-row'){
        if(x.id == "suax"){
            LoadSuaFormPhancong()
        }
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        LoadAddFormPhancong()
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        LoadListPhancong();
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else if(x.className == "loadswitch1"){
        LoadTatcadoan();
        $('#activeswitchbar').removeAttr('id');
        x.id = 'activeswitchbar';
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else if(x.className == "loadswitch2"){
        LoadPhutrachdoan();
        $('#activeswitchbar').removeAttr('id');
        x.id = 'activeswitchbar';
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }

}

//FIRST---------------------------------------------------------
LoadListPhancong() ;