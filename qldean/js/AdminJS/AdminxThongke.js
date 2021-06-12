$( "#act-thongke" ).addClass( "active" )

$("#name-user").empty();
$("#name-user").append('Admin: ' + getCookie('QLNAME'));
var MaAdmin = getCookie('QL');

function LoadBieudonam() {
    $('#button-bar').show();
    $('#head-bar').show();


    $('#head-bar').empty();
    $('#button-bar').empty();


    $('#button-bar').append(returnIconHome() + returnNameIndex('Thống kê')  + returnSwitchBtn('Năm gần đây', '5 Năm'));
    $('#head-bar').append(returnFormComboxHeadBar('Khóa',[2017,2018,2019], [2017,2018,2019], 2018, 'changeKhoaandNghanh',200,0));
    $('#head-bar').append(returnFormComboxHeadBar('Nghành',['CNTT','ATT'], ['Công nghệ thông tin'], 'CNTT', 'changeKhoaandNghanh',200,20));
    $('#head-bar').append(returnFormComboxHeadBar('Chuyên Nghành',['CNTT','ATT'], ['Công nghệ phần mềm','Bảo mật hệ thống'], 'CNTT', 'changeKhoaandNghanh',200,20));

}


LoadBieudonam();