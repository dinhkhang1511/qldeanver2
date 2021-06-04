$(".left-bar").load("/qldean/Teacher/SlideBar.html",function () {
    $( "#act-danhsachdoan" ).addClass( "active" )
});


var listTacaTitle = ['Đồ án' , 'Chuyên ngành' , 'Người tạo','Ngày tạo','Lần cuối cập nhật','Trạng thái'] 
var listCanhanTitle = ['Mã đồ án','Tên đồ án', 'Ngày tạo', 'Trạng thái' ];
var listTailieuTitle = ['Tệp','Giảng viên', 'Thời gian cập nhật', 'Đã phân công']

var listButtonpk = ['Sửa','Xóa'];
var listIdBtnTable = [ 'suax' , 'xoax'];
var listBtnpk =  ['Thêm','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['them', 'thoa'];



var listinfoitem;
var page_num = 1;
var tol_page = 1;

var tieudeBangTacadoan =  ['Đồ án' , 'Chuyên ngành' , 'Người tạo','Ngày tạo','Lần cuối cập nhật','Trạng thái'] 
var tennutBangTacadoan = ['Tài liệu'];
var idnutBangTacadoan = ['tailieu'];

var tieudeBangCanhandoan =  ['Mã đồ án','Tên đồ án', 'Ngày tạo', 'Trạng thái' ];
var tennutBangCanhandoan = [ 'Sửa', 'Xóa' ,'Tài liệu'];
var idnutBangCanhandoan = ['sua','xoa','tailieu'];

var nutThemDoan = ['Xác nhận', 'Thoát']
var maunutThemDoan = ['tomato','green'];
var idnutThemDoan = ['them','thoat'];

var nutSuaDoan = ['Xác nhận', 'Thoát']
var maunutSuaDoan = ['tomato','green'];
var idnutSuaDoan = ['suax','thoat'];

var danhsachcheckMota = ['Tệp văn bản','Tệp trình chiếu','Tệp chương trình'];

var listchuyenganh = [];
    var listmachuyennganh = [];
    var listtenchuyennganh = [];

var MaGV = "GVCN006";
var MaChuyennganh = "";
var MaDoan = '';
var TenDoan = '';

var contentfile1;
var contentfile2;
var file1 = false;
var file2 = false;
var filename1;
var filename2;


var pageStatus = 1;  /// MANY PAGE
var pagelist = 0; ///SWITCH
let checkfileupdate = false; ///FILE IS UPDATED ?


var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

                if(String(this.responseURL).includes('api/danhsachdoan-data')){
                    var data = JSON.parse(this.responseText);
                    console.log(data)
                    listchuyenganh = data[0];
                    listmachuyennganh = [];
                    for(let i = 0; i< listchuyenganh.length; i++){
                        listmachuyennganh.push(listchuyenganh[i].MaCN)
                    }
                    listtenchuyennganh = [];
                    for(let i = 0; i < listchuyenganh.length; i++){
                        listtenchuyennganh.push(listchuyenganh[i].TenCN)
                    }
                    MaChuyennganh = data[1];
                    tol_page =  Math.ceil(data[2][0]['Number'] / 10); 
                    listinfoitem = data[3][0]
                    LoadListDoan(chuyendoiBangdoancanhan(listinfoitem))
                    pagelist = 1;
                }
                if(String(this.responseURL).includes('api/danhsachdoan-tatca')){
                    var data = JSON.parse(this.responseText);
                    console.log(data)
                    tol_page =  Math.ceil(data[0][0]['Number'] / 10); 
                    listinfoitem = data[1][0];
                    LoadListDoanTatca(chuyendoiBangdoantatca(listinfoitem))
                    pagelist = 2;
                }
                if(String(this.responseURL).includes('api/danhsachdoan-canhan')){
                    var data = JSON.parse(this.responseText);
                    console.log(data)
                    tol_page =  Math.ceil(data[0][0]['Number'] / 10); 
                    listinfoitem = data[1][0];
                    LoadListDoanCanhan(chuyendoiBangdoancanhan(listinfoitem))
                    pagelist = 1;
                }
                if(String(this.responseURL).includes('api/danhsachtailieu')){
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    tol_page =  Math.ceil(data[0][0]['Number'] / 10); 
                    listinfoitem = data[1][0];
                    LoadTailieu(listinfoitem);
                }

                if(String(this.responseURL).includes('api/dieukienthemdoan')){
                    var data = JSON.parse(this.responseText);
                    listchuyenganh = data[0][0];
                    listmachuyennganh = [];
                    for(let i = 0; i< listchuyenganh.length; i++){
                        listmachuyennganh.push(listchuyenganh[i].MaCN)
                    }
                    listtenchuyennganh = [];
                    for(let i = 0; i < listchuyenganh.length; i++){
                        listtenchuyennganh.push(listchuyenganh[i].TenCN)
                    }
                    MaDoan = data[1][0]['MaDoan'];
                    LoadAddDoan();
                }
                if(String(this.responseURL).includes('api/themdoan')){
                    if(String(this.responseText) == '"that bai"')alert('Fail')
                    else {
                        LoadHeadPage1();
                        if(pagelist == 1) loadListDoanCanhan();
                        else if((pagelist == 2)) loadListDoanTatca();
                    };
                }

    
                if(String(this.responseURL).includes('api/dieukiensuadoan')){
                    var data = JSON.parse(this.responseText);
                    LoadSuaDoan(data[0][0]);
                }
                if(String(this.responseURL).includes('api/suadoan')){
                    if(String(this.responseText) == '"that bai"')alert('Fail')
                    else {
                        LoadHeadPage1();
                        if(pagelist == 1) loadListDoanCanhan();
                        else if((pagelist == 2)) loadListDoanTatca();
                    };
                }

                
        }
    };


function changeChuyennganh(){
    var e = document.getElementsByClassName("select-combox-headbar").item(0);
    MaChuyennganh = String(e.options[e.selectedIndex].value);
    if(pagelist == 1) loadListDoanCanhan();
    else if((pagelist == 2)) loadListDoanTatca();
}

function chuyendoiBangdoantatca(data){
    var listdoantatca = [];
    var status = '';
    for(let i = 0; i < data.length; i++){
        if(Number(data[i].totalPCInCurYear) == 0)  status = 'Chưa phân công';
        else  status = 'Đã phân công';
        listdoantatca.push({Doan: String(data[i].MaDA+data[i].TenDA) , CN: String(data[i].MaCN+data[i].tenCN), Nguoitao: String(data[i].MaGV+data[i].TenGV) , Ngaytao: String(data[i].minThoiGian), Capnhatcuoi: String(data[i].maxThoiGian) , Trangthai: status  })
    }
    return listdoantatca;
}

function chuyendoiBangdoancanhan(data){
    let bangcanhan = [];
    let status;
    for(let i = 0;i < data.length; i++){
        if(data[i].totalPCinCurYear == 0) status = 'Chưa phân công';
        else status = 'Đã phân công';
        bangcanhan.push({madoan: data[i].MaDA, Tendoan: data[i].TenDA, ngaytao:data[i].ThoiGian, trangthai: status})
    }
    return bangcanhan;
}
   
function loadListDoan(){
    xhttp.open("GET", "/api/danhsachdoan-data?MaGV="+MaGV+"&MaChuyennganh="+MaChuyennganh+"&page="+page_num, false);
    xhttp.send();
}

function loadListDoanTatca(){
    xhttp.open("GET", "/api/danhsachdoan-tatca?MaGV="+MaGV+"&MaChuyennganh="+MaChuyennganh+"&page="+page_num, false);
    xhttp.send();
}

function loadListDoanCanhan(){
    xhttp.open("GET", "/api/danhsachdoan-canhan?MaGV="+MaGV+"&MaChuyennganh="+MaChuyennganh+"&page="+page_num, false);
    xhttp.send();
}

function loadListTailieu(){
    xhttp.open("GET", "/api/danhsachtailieu?MaGV="+MaGV+"&MaDoan="+MaDoan+"&page="+page_num, false);
    xhttp.send();
}

function dieukienthemdoan(){
    xhttp.open("GET", "/api/dieukienthemdoan?MaNghanh=CN", false);
    xhttp.send();
}

function dieukiensuadoan(){
    xhttp.open("GET", "/api/dieukiensuadoan?MaDoan="+MaDoan+"&MaGV="+MaGV, false);
    xhttp.send();
}

//ELEMENT-----------------------------------------------------
function LoadListDoan(data){
    pageStatus = 1;

    $('#button-bar').show();
    $('.chose-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('.switch-bar').show();
    $('#head-bar').show();

    $('.label-bar').hide();
    $('#detail-bar').hide()
    $('.Add-New-Row').hide();
    $('.Detail-project').hide();

    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();
    $('#head-bar').empty();
  
    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án')  +  returnAddBtn());
    $('#head-bar').append(returnFormComboxHeadBar('Chuyên nghành',listmachuyennganh, listtenchuyennganh, MaChuyennganh, 'changeChuyennganh',300,0));
    $('.chose-bar').append(returnSearchForm('Nhập mã đồ án','Tìm kiếm'));
    if(pagelist == 0) $('.switch-bar').append( returnSwitchTable('Cá nhân', 'Tất cả'))
    $('#table_data').append(returnTable(tieudeBangCanhandoan,data));
    $('.btn-follow-row').append(returnButtonTable(tennutBangCanhandoan,idnutBangCanhandoan));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}

function LoadHeadPage1(){
    $('#button-bar').show();
    $('.chose-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('.switch-bar').show();
    $('#head-bar').show();

    $('#detail-bar').hide()
    $('.Add-New-Row').hide();
    $('.Detail-project').hide();

    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();
    $('#head-bar').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án')  +  returnAddBtn());
    $('#head-bar').append(returnFormComboxHeadBar('Chuyên nghành',listmachuyennganh, listtenchuyennganh, MaChuyennganh, 'changeChuyennganh',300,0));
    $('.chose-bar').append(returnSearchForm('Nhập mã đồ án','Tìm kiếm'));
}

function LoadListDoanCanhan(data){
    pageStatus = 1;

    $('.switch-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('#detail-bar').hide();
    $('.label-bar').hide();

    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#table_data').append(returnTable(tieudeBangCanhandoan,data));
    $('.btn-follow-row').append(returnButtonTable(tennutBangCanhandoan,idnutBangCanhandoan));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}

function LoadListDoanTatca(data){
    pageStatus = 1;

    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('.switch-bar').show();
    $('#detail-bar').hide();
    $('.label-bar').hide();

    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#table_data').append(returnTable(listTacaTitle,data));
    $('.btn-follow-row').append(returnButtonTable(tennutBangTacadoan,idnutBangTacadoan));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}

function LoadAddDoan(){
    $('#button-bar').show();
    $('.Add-New-Row').show();

    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();
    $('.Detail-project').hide();
    $('#head-bar').hide();
    $('.switch-bar').hide();

    $('.Add-New-Row').empty();
    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án') + returnNameIndex('Thêm mới')   +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabelInfo('Mã đồ án',MaDoan));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên đồ án','' ));
    $('.Add-New-Row').append(returnFormInputSelect('Chuyên nghành', 'changeChuyennghanh' , listmachuyennganh,listtenchuyennganh, MaChuyennganh));
    $('.Add-New-Row').append('<div><span>Thêm tệp: </span> <span class="uploadfile-tag">  <button onclick="getFile()"; class="add-file-add-row">Thêm tệp</button>   </span></div>');
    $('.Add-New-Row').append(returnCheckBoxHaveMore('Mô tả',danhsachcheckMota));
    $(".display-checkbox").hide();
    $('.Add-New-Row').append(returnFormLabelInfo('Ngày thêm',getCurrentTime()));
    $('.Add-New-Row').append(returnFormBtn(nutThemDoan,maunutThemDoan,idnutThemDoan));

    
    $("#check-khac").change(function() {
        if(this.checked) {
            $(".input-more-checkbox").show()
        }else{
            $(".input-more-checkbox").hide();
        }
    });
    $(".input-more-checkbox").hide();

    document.getElementById('selectedFile').onchange = function() {
        ResetCheckbox();
        var fullPath = document.getElementById('selectedFile').value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            let countfile = 0;
            if(file1 == false){ countfile = 1; contentfile1 = document.getElementById("selectedFile").files[0]; file1 = true, filename1 = filename}
            // if(countfile == 0)if(file2 == false){ countfile = 2; contentfile2 = document.getElementById("selectedFile").files[0]; file2 = true , filename2 = filename}

            $('.uploadfile-tag').append('<span id="contentfile-'+countfile+'" class="item-add-file-upload"><span>'+filename+'</span>   <span>   <svg height="20px"    viewBox="0 0 512.171 512.171" width="20px"> <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/> </svg>  </span> </span>   ')
            console.log(filename);
            // if(file1 == true && file2 == true){
            //     $('.add-file-add-row').hide();
            // }
            if(file1 == true){
                $(".display-checkbox").show()
                $('.add-file-add-row').hide();
            }
        }
    };
}






////////////////////////////


function LoadPhancong(){
    pageStatus = 3;

    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();
    $('.switch-bar').hide();

    $('#detail-bar').show()

    $('#head-bar').hide();

    $('.Add-New-Row').hide();
    $('.Detail-project').hide();

    $('.label-bar').hide();


    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();
    $('.label-bar').empty();
    $('#head-bar').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án') + returnNameIndex('Tài liệu')  + returnNameIndex('Phân công')  + returnReturnBtn());
}


function LoadTailieu(data){

    pageStatus = 2;

    var listtailieu = [];
    var trangthai;
    for(var i = 0; i < data.length; i++){
        if(Number(data[i].TrangThai) == 0) trangthai = 'Rồi';
        else trangthai = 'Đã';
        listtailieu.push({tep:data[i].Tep_Goc,giangvien: data[i].MaGV + '-' + data[i].TenNV,thoigian: data[i].ThoiGian, trangthai:trangthai });
    }

    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('.switch-bar').hide();

    $('#head-bar').hide();

    $('.Add-New-Row').hide();
    $('.Detail-project').hide();
    $('#detail-bar').hide()

    $('.label-bar').show();

    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();
    $('.label-bar').empty();
    $('#head-bar').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án') + returnNameIndex('Tài liệu')  +  returnReturnBtn());
    $('.label-bar').append( '<div id="label-table"> Đồ án: '+MaDoan+'-'+TenDoan+'</div>' )

    $('#table_data').append(returnTable(listTailieuTitle,listtailieu));
    $('.btn-follow-row').append(returnButtonTable(['Phân công'],['phancong']));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));

    console.log(data);
}













function loadAddDoan(){
    var MaDoan = document.getElementsByClassName('label-item-add').item(0).innerHTML;
    var TenDoan = document.getElementsByClassName('input-new-row-long form-control').item(0).value;
    var e = document.getElementsByClassName('combo-box-add-long').item(0);
    var chuyennganh = e.options[e.selectedIndex].value;

    console.log(MaDoan,TenDoan,chuyennganh)
    console.log(filename1,filename2)

    var filedoc = '';
    if(file1 == true) filedoc = filedoc + filename1 + ',';
    if(file2 == true) filedoc = filedoc + filename2 + ',';
    
    var checkedValue = []; 
    var inputElements = document.getElementsByClassName('form-check-input');
    for(var i=0; inputElements[i]; ++i){
          if(inputElements[i].checked){
               checkedValue.push(inputElements[i].value);
          }
    }
    if(checkedValue.includes('khac')){
        checkedValue.push(document.getElementsByClassName('input-more-checkbox').item(0).value)
    }
    var infotep = '';
    for(var i = 0; i < checkedValue.length; i++){
        if(String(checkedValue[i]) !== 'khac')
        infotep = infotep + checkedValue[i] + ',';
    }
    console.log(infotep)

    xhttp.open("GET", "/api/themdoan?MaDoan="+MaDoan+"&TenDoan="+TenDoan+"&chuyennganh="+chuyennganh+"&ngay="+getCurrentTime()+"&MaGV="+MaGV+"&filedoc="+filedoc+"&infotep="+infotep, false);
    xhttp.send();
}

function ResetCheckbox(){
    for(var i = 0; i < danhsachcheckMota.length; i++){
        document.getElementsByClassName("form-check-input").item(i).checked = false;
    }
    $(".input-more-checkbox").hide();
}




function loadSuaDoan(){
    var MaDoan = document.getElementsByClassName('label-item-add').item(0).innerHTML;
    var TenDoan = document.getElementsByClassName('input-new-row-long form-control').item(0).value;
    var e = document.getElementsByClassName('combo-box-add-long').item(0);
    var chuyennganh = e.options[e.selectedIndex].value;

    console.log(MaDoan,TenDoan,chuyennganh)
    console.log(filename1,filename2)

    var filedoc = '';
    var ischangefile = 'x';
    if(checkfileupdate === true){
        filedoc = filename1;
        ischangefile = 's';
        
    }
    
    var checkedValue = []; 
    var inputElements = document.getElementsByClassName('form-check-input');
    for(var i=0; inputElements[i]; ++i){
          if(inputElements[i].checked){
               checkedValue.push(inputElements[i].value);
          }
    }
    if(checkedValue.includes('khac')){
        checkedValue.push(document.getElementsByClassName('input-more-checkbox').item(0).value)
    }
    var infotep = '';
    for(var i = 0; i < checkedValue.length; i++){
        if(String(checkedValue[i]) !== 'khac')
        infotep = infotep + checkedValue[i] + ',';
    }
    console.log(infotep)
    console.log(getCurrentTime())

    xhttp.open("GET", "/api/suadoan?MaDoan="+MaDoan+"&TenDoan="+TenDoan+"&chuyennganh="+chuyennganh+"&ngay="+getCurrentTime()+"&MaGV="+MaGV+"&filedoc="+filedoc+"&infotep="+infotep+"&NUMBERFILE="+NUMBERFILE+"&ischangefile="+ischangefile, false);
    xhttp.send();
}


function LoadSuaDoan(data){

    checkfileupdate = false;

    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();
    

    $('.Add-New-Row').show();
    $('.Detail-project').hide();

    $('#head-bar').hide();
    $('.switch-bar').hide();

    $('.Add-New-Row').empty();
    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án') + returnNameIndex('Sửa')   +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabelInfo('Mã đồ án',MaDoan));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên đồ án',data.TenDA ));
    $('.Add-New-Row').append(returnFormInputSelect('Chuyên nghành', 'changeChuyennghanh' , listmachuyennganh,listtenchuyennganh, data.MaCN));

    $('.Add-New-Row').append('<div><span>Thêm tệp: </span> <span class="uploadfile-tag">  <button onclick="getFile()"; class="add-file-add-row">Thêm tệp</button>   </span></div>');


    file1 = true;
    $('.uploadfile-tag').append('<span id="contentfile-'+1+'" class="item-add-file-upload"><span>'+data.Tep_Goc+'</span>   <span>   <svg height="20px"    viewBox="0 0 512.171 512.171" width="20px"> <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/> </svg>  </span> </span>   ')
    $(".display-checkbox").show();
    $('.add-file-add-row').hide();

    $('.Add-New-Row').append(returnCheckBoxHaveMore('Mô tả',danhsachcheckMota));
    for(var i = 0; i < danhsachcheckMota.length ; i++){
        if(String(data.MoTa).includes(danhsachcheckMota[i])){
            document.getElementsByClassName("form-check-input").item(i).checked = true;
        }
    }
    if(String(data.MoTa) !== ''){
    var Motacuoi = String(data.MoTa).split(',')
    Motacuoi = Motacuoi[Motacuoi.length - 2];
    console.log(Motacuoi)
    if(!danhsachcheckMota.includes(Motacuoi)){
        if(String(Motacuoi) != ''){
            document.getElementsByClassName("form-check-input").item(danhsachcheckMota.length).checked = true;
            $(".input-more-checkbox").show();
            document.getElementsByClassName('input-more-checkbox').item(0).value = Motacuoi;
        }else{
            $(".input-more-checkbox").hide();
            document.getElementsByClassName("form-check-input").item(danhsachcheckMota.length).checked = false;
        }
    }else{
        $(".input-more-checkbox").hide()
        document.getElementsByClassName("form-check-input").item(danhsachcheckMota.length).checked = false;
    }
    }else{
        $(".input-more-checkbox").hide()
        document.getElementsByClassName("form-check-input").item(danhsachcheckMota.length).checked = false;
    }
    $('.Add-New-Row').append(returnFormBtn(nutSuaDoan,maunutSuaDoan,idnutSuaDoan));

    $("#check-khac").change(function() {
        if(this.checked) {
            $(".input-more-checkbox").show();
        }else{
            $(".input-more-checkbox").hide();
        }
    });
    document.getElementById('selectedFile').onchange = function() {
        ResetCheckbox()
        var fullPath = document.getElementById('selectedFile').value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            let countfile = 0;
            if(file1 == false){ countfile = 1; contentfile1 = document.getElementById("selectedFile").files[0]; file1 = true, filename1 = filename}
            // if(countfile == 0)if(file2 == false){ countfile = 2; contentfile2 = document.getElementById("selectedFile").files[0]; file2 = true , filename2 = filename}
            $('.uploadfile-tag').append('<span id="contentfile-'+countfile+'" class="item-add-file-upload"><span>'+filename+'</span>   <span>   <svg height="20px"    viewBox="0 0 512.171 512.171" width="20px"> <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/> </svg>  </span> </span>   ')
            console.log(filename);
            // if(file1 == true && file2 == true){
            //     $('.add-file-add-row').hide();
            // }
            if(file1 == true){
                $(".display-checkbox").show()
                $('.add-file-add-row').hide();
            }
        }
    };
    console.log(data)
    NUMBERFILE = data.MACT;
}


function getFile(){
    document.getElementById('selectedFile').click();
}

//CLICK-----------------------------------------------
async function EventTeacherClick(event) {
    var x = event.target;
    if( x.parentNode.className == "no-color-lum-table"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#no-color-btn-follow-row').attr("id", "yes-color-btn-follow-row");
        x.parentNode.className = 'yes-color-lum-table';
        currentrowtable = Number(x.parentNode.id.replace('collumtalbe-',''));

        if(listinfoitem[currentrowtable].pbFileKhac == 1 || listinfoitem[currentrowtable].totalPC == 1){
            document.querySelector('#yes-color-btn-follow-row div:first-child').style.background = "rgba(70, 100, 145, 0.233)";
            document.querySelector('#yes-color-btn-follow-row div:nth-child(2)').style.background = "rgba(202, 107, 72, 0.26)";
        }

    }else if(x.parentNode.className == 'btn-follow-row'){
        if(x.id == "tailieu"){
            console.log(listinfoitem[currentrowtable].MaDA)
            MaDoan = listinfoitem[currentrowtable].MaDA;
            TenDoan = listinfoitem[currentrowtable].TenDA;
            loadListTailieu()
        }
        if(x.id == "phancong"){
            LoadPhancong();
            console.log("Xxxx")
        }
        if(x.id == 'sua'){
            if(listinfoitem[currentrowtable].pbFileKhac == 0 && listinfoitem[currentrowtable].totalPC == 0){
                MaDoan = listinfoitem[currentrowtable].MaDA;
                dieukiensuadoan();
            }
        }
    }else if(x.parentNode.parentNode.className == 'item-add-file-upload'){
        x.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode);
        checkfileupdate = true;
        console.log('delete');
        $(".display-checkbox").hide();
        console.log(Number(String(x.parentNode.parentNode.id).replace('contentfile-','')))
        if(Number(String(x.parentNode.parentNode.id).replace('contentfile-','')) == 1){ contentfile1 = '' ; file1 = false};
        if(Number(String(x.parentNode.parentNode.id).replace('contentfile-','')) == 2){ contentfile2 = '' ; file2 = false};
        if(file1 == false || file2 == false){
            $('.add-file-add-row').show();
        }
    }else if(x.parentNode.parentNode.parentNode.className == 'item-add-file-upload'){
        x.parentNode.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode.parentNode);
        checkfileupdate = true;
        console.log('deletxe')
        $(".display-checkbox").hide();
        console.log(Number(String(x.parentNode.parentNode.parentNode.id).replace('contentfile-','')))
        if(Number(String(x.parentNode.parentNode.parentNode.id).replace('contentfile-','')) == 1) { contentfile1 = '' ; file1 = false};
        if(Number(String(x.parentNode.parentNode.parentNode.id).replace('contentfile-','')) == 2) { contentfile2 = '' ; file2 = false};
        if(file1 == false || file2 == false){
            $('.add-file-add-row').show();
        }
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        dieukienthemdoan();
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        if(pageStatus <= 2){
        LoadHeadPage1();
        if(pagelist == 1) loadListDoanCanhan();
        else if((pagelist == 2)) loadListDoanTatca();
        }else if(pageStatus == 3){
            loadListTailieu()
        }
    }else if(x.id == "them" ){
        loadAddDoan();
        if(file1 == true){
            console.log('thuc hien 1')
            var formData = new FormData();
            formData.append("file", contentfile1);                                
            xhttp.open("POST", '/api/upfile_doan');
            xhttp.send(formData);
        }
        if(file2 == true){
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log('thuc hien 2')
            var formData = new FormData();
            formData.append("file", contentfile2);                                
            xhttp.open("POST", '/api/upfile_doan');
            xhttp.send(formData);
        }

    }else if(x.id == "suax" ){
        loadSuaDoan();
        if(checkfileupdate == true){
        if(file1 == true){
            console.log('thuc hien 1')
            var formData = new FormData();
            formData.append("file", contentfile1);                                
            xhttp.open("POST", '/api/upfile_doan');
            xhttp.send(formData);
        }
        }
    }else if(x.className == "loadswitch1"){
        $('#activeswitchbar').removeAttr('id');
        x.id = 'activeswitchbar';
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        page_num = 1;
        loadListDoanCanhan();
    }else if(x.className == "loadswitch2"){
        $('#activeswitchbar').removeAttr('id');
        x.id = 'activeswitchbar';
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        page_num = 1;
        loadListDoanTatca();
    }else if(x.parentNode.className == "nav-page" ){
        if(pageStatus == 1){
            page_num = Number(x.innerHTML);
            LoadHeadPage1();
            if(pagelist == 1) loadListDoanCanhan();
            else if((pagelist == 2)) loadListDoanTatca();
        }
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }
}
//FIRST---------------------------------------------------------
loadListDoan();