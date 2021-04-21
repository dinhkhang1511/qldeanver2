var listinfoitem;
var page_num = 1;
var tol_page = 0;

var listLabelpk = ['Mã sinh viên','Tên sinh viên','Lớp','Mã đồ án','GPA','GVHD'];
var data = [{MaSV:'SV02', Ten:'Minh Chien', Lop:'CNTT', Ma:'023', GPA:'3.4', GVHD:'GV02'}]
var listButtonpk = ['Phân công','Chi tiết'];
var listIdBtnTable = ['phancongx', 'chitietx'];
var listInfoHuongdan1 = ['Mã sinh viên: SV21','Tên sinh viên: Le Tấn']
var listInfoHuongdan2 = ['Mã đồ án: DA21' ,'Tên đồ án: 21']

var listBtnpk =  ['Phân công ','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['phancong', 'thoa'];

function LoadListHuongdan() {
  
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
    $('#table_data').append(returnTable(listLabelpk,data));
    $('.btn-follow-row').append(returnButtonTable(listButtonpk,listIdBtnTable));
    $('.nav-page').append(returNavForm(4, 2));
}


function LoadPhancongHuongdan() {
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Hướng dẫn') +  returnReturnBtn());

    $('.Add-New-Row').append(returnLormInfo(listInfoHuongdan1));
    $('.Add-New-Row').append(returnLormInfo(listInfoHuongdan2));
    // $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB02'));

    $('.Add-New-Row').append(returnLormInputSelect('Phân công giáo viên hướng dẫn: ',['GV92 - Nguyen thanh tung', 'GV92 - Vo thanh huy'] , ''));
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

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Hướng dẫn') +  returnReturnBtn());

    $('.Add-New-Row').append(returnLormInfo(listInfoHuongdan1));
    $('.Add-New-Row').append(returnLormInfo(listInfoHuongdan2));
    // $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB02'));

    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    $('.Add-New-Row').append(returnLormBtn(listBtnpk,listColorpk,listIdBtn));

}


//CLICK-----------------------------------------------
function EventAdminClick(event) {
    var x = event.target;
    if( x.parentNode.className == "no-color-lum-table"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#no-color-btn-follow-row').attr("id", "yes-color-btn-follow-row");
        x.parentNode.className = 'yes-color-lum-table';
    }else if(x.parentNode.className == 'btn-follow-row'){
        if(x.id == "phancongx" ){
            LoadPhancongHuongdan();
        }else if(x.id == "chitietx"){
            LoadChitietHuongdan();
        }
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        LoadAddFormHuongdan();
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        LoadListHuongdan();
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }

}

//FIRST------------------------------------------

LoadListHuongdan();