$(".left-bar").load("/qldean/Teacher/SlideBar.html",function () {
    $( "#act-danhsachdoan" ).addClass( "active" )
});

var tieudeBangTacadoan =  ['Đồ án' , 'Chuyên ngành' , 'Người tạo','Ngày tạo','Lần cuối cập nhật','Sinh viên thực hiện'] 
var tennutBangTacadoan = ['Tài liệu'];
var idnutBangTacadoan = ['tailieu'];

var tieudeBangCanhandoan =  ['Mã đồ án','Tên đồ án', 'Ngày tạo', 'Trạng thái' ];
var tennutBangCanhandoan = [ 'Sửa', 'Xóa' ,'Tài liệu'];
var idnutBangCanhandoan = ['sua','xoa','tailieu'];

var tieudeBangTailieu = ['Tệp','Giảng viên','Thời gian','Trạng thái']

var nutThemDoan = ['Xác nhận', 'Thoát'];
var maunutThemDoan = ['tomato','green'];
var idnutThemDoan = ['them','thoat'];

var nutSuaDoan = ['Xác nhận', 'Thoát'];
var maunutSuaDoan = ['tomato','green'];
var idnutSuaDoan = ['suax','thoat'];

var danhsachcheckMota = ['Tệp văn bản','Tệp trình chiếu','Tệp chương trình'];

var listchuyenganh = [];
    var listmachuyennganh = [];
    var listtenchuyennganh = [];

var MaGV = getCookie('userlogin');

var MaChuyennganh = "";
var MaDoan = '';
var TenDoan = '';
var MaCT = '';
var MaSV = '';
var MaCTTailieu = '';

var contentfile;
var namefilex;
var tepname;

var listinfoitem;
var page_num = 1;
var tol_page = 1;

var pageStatus = 1;  /// MANY PAGE
var pagelist = 0; ///SWITCH
let checkfileupdate = false; ///FILE IS UPDATED ?

var checkaddthemfile = false;
var NUMBERFILE;


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

                        if(pageStatus == 2){
                             $('.Form-input-file').hide();
                             $('.shadow-input-diem').hide();
                            loadListTailieu()   
                        }else{
                            LoadHeadPage1();
                            if(pagelist == 1) loadListDoanCanhan();
                            else if((pagelist == 2)) loadListDoanTatca();
                        }

                    };
                }
                if(String(this.responseURL).includes('api/xoadoan')){
                    if(String(this.responseText) == '"that bai"')alert('Fail')
                    else {
                        LoadHeadPage1();
                        if(pagelist == 1) loadListDoanCanhan();
                        else if((pagelist == 2)) loadListDoanTatca();
                    };
                }


                if(String(this.responseURL).includes('api/firstload-phancong-tailieu')){
                    var data = JSON.parse(this.responseText);
                    console.log("Thông tin đồ án")
                    console.log(data[0][0][0])
                    console.log(data[1][0])
                    LoadPhancongTailieu(data[0][0][0],data[1][0]);
                    console.log(data[1][0])  
                }
                if(String(this.responseURL).includes('api/infosv-phancong-tailieu')){
                    var data = JSON.parse(this.responseText);
                    console.log(data[0][0][0])
                    LoadInfoSvPhancongtailieu(data[0][0][0])
                }
                if(String(this.responseURL).includes('api/IsExitFileHD')){
                    var data = JSON.parse(this.responseText);
                    console.log(data[0][0]['Number'])

                    if(Number(data[0][0]['Number']) === 0){
                        NUMBERFILE = Number(data[0][0]['Number']);
                        loadAddThemFile();

                    }else{
                        if (confirm('Tài liệu hướng dẫn bạn tải lên cho đồ án này chưa được sử dụng. Bạn có muốn thay thế nó không?')) {
                            // Save it!
                            NUMBERFILE = Number(data[0][0]['Number']);
                            checkaddthemfile = true;
                            loadAddThemFile();
                            console.log('Thing was saved to the database.');
                          } else {
                            // Do nothing!
                            $('.Form-input-file').hide();
                            $('.shadow-input-diem').hide();
                            console.log('Thing was not saved to the database.');
                          }
                    }
                    // LoadInfoSvPhancongtailieu(data[0][0][0])
                }

                
                if(String(this.responseURL).includes('api/add-phancong-tailieu')){
                    if(String(this.responseText) == '"that bai"')alert('Fail')
                    else {
                        loadListTailieu()
                    };
                }  
        }
    };


function changeChuyennganh(){
    var e = document.getElementsByClassName("select-combox-headbar").item(0);
    MaChuyennganh = String(e.options[e.selectedIndex].value);
    if(pagelist == 1) loadListDoanCanhan();
    else if(pagelist == 2) loadListDoanTatca();
}

function chuyendoiBangdoantatca(data){
    var listdoantatca = [];
    var status = '';
    for(let i = 0; i < data.length; i++){
        if(Number(data[i].totalPCInCurYear) == 0)  status = 'Chưa phân công';
        else  status = 'Đã phân công';

        if(String(data[i].MaSV) === 'null')
        listdoantatca.push({Doan: String(data[i].MaDA+data[i].TenDA) , CN: String(data[i].MaCN+data[i].tenCN), Nguoitao: String(data[i].MaGV+data[i].TenGV) , Ngaytao: String(data[i].minThoiGian), Capnhatcuoi: String(data[i].maxThoiGian) , Trangthai:'' })
        else
        listdoantatca.push({Doan: String(data[i].MaDA+data[i].TenDA) , CN: String(data[i].MaCN+data[i].tenCN), Nguoitao: String(data[i].MaGV+data[i].TenGV) , Ngaytao: String(data[i].minThoiGian), Capnhatcuoi: String(data[i].maxThoiGian) , Trangthai: String(data[i].MaSV) +' - ' + String(data[i].TenSV) })

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

function loadXoaDoan(){
    xhttp.open("GET", "/api/xoadoan?MaDoan="+MaDoan, false);
    xhttp.send();
}

function loadFirstPhancongtailieu(){
    xhttp.open("GET", "/api/firstload-phancong-tailieu?MaDoan="+MaDoan+"&MaGV="+MaGV+"&MaCT="+MaCT+"&MaCN="+MaChuyennganh, false);
    xhttp.send();
}

function loadInfoSvPhancongtailieu(MaSV){
    xhttp.open("GET", "/api/infosv-phancong-tailieu?MaSV="+MaSV, false);
    xhttp.send();
}

function loadCheckFileuploadTailieu(){
    xhttp.open("GET", "/api/IsExitFileHD?MaGV="+MaGV+"&MaDA="+MaDoan, false);
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

    $('#table_data').append(returnTable(tieudeBangTacadoan,data));
    $('.btn-follow-row').append(returnButtonTable(tennutBangTacadoan,idnutBangTacadoan));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}

function ResetCheckbox(){
    for(var i = 0; i < danhsachcheckMota.length; i++){
        if(document.getElementsByClassName("form-check-input").item(i)) document.getElementsByClassName("form-check-input").item(i).checked = false;
    }
    $(".input-more-checkbox").empty();
    $(".input-more-checkbox").hide();
}

function getFile(){
    document.getElementById('selectedFile').click();
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
    $(".input-more-checkbox").hide();
    $('.Add-New-Row').append(returnFormLabelInfo('Ngày thêm',getCurrentTime()));
    $('.Add-New-Row').append(returnFormBtn(nutThemDoan,maunutThemDoan,idnutThemDoan));

    $("#check-khac").change(function() {
        if(this.checked) {
            $(".input-more-checkbox").show()
        }else{
            $(".input-more-checkbox").hide();
        }
    });
    document.getElementById('selectedFile').onchange = function() {
        ResetCheckbox();
        document.getElementsByClassName('input-more-checkbox').item(0).value = '';
        document.getElementsByClassName("form-check-input").item(danhsachcheckMota.length).checked = false;
        var fullPath = document.getElementById('selectedFile').value;
        if (fullPath) {
            contentfile = document.getElementById("selectedFile").files[0];
            $('.uploadfile-tag').append('<span id="contentfile-'+1+'" class="item-add-file-upload"><span>'+contentfile['name']+'</span>   <span>   <svg height="20px"    viewBox="0 0 512.171 512.171" width="20px"> <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/> </svg>  </span> </span>')
            $(".display-checkbox").show();
            $('.add-file-add-row').hide();
        }
    };
}

function loadAddDoan(){
    var MaDoan = document.getElementsByClassName('label-item-add').item(0).innerHTML;
    var TenDoan = document.getElementsByClassName('input-new-row-long form-control').item(0).value;
    var e = document.getElementsByClassName('combo-box-add-long').item(0);
    var chuyennganh = e.options[e.selectedIndex].value;
    var filedoc = namefilex;
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
    console.log("/api/themdoan?MaDoan="+MaDoan+"&TenDoan="+TenDoan+"&chuyennganh="+chuyennganh+"&ngay="+getCurrentTime()+"&MaGV="+MaGV+"&filedoc="+filedoc+"&infotep="+infotep)
    xhttp.open("GET", "/api/themdoan?MaDoan="+MaDoan+"&TenDoan="+TenDoan+"&chuyennganh="+chuyennganh+"&ngay="+getCurrentTime()+"&MaGV="+MaGV+"&filedoc="+filedoc+"&infotep="+infotep, false);
    xhttp.send();
}

function LoadSuaDoan(data){
    checkfileupdate = false;

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

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án') + returnNameIndex('Sửa')   +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabelInfo('Mã đồ án',MaDoan));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên đồ án',data.TenDA ));
    $('.Add-New-Row').append(returnFormInputSelect('Chuyên nghành', 'changeChuyennghanh' , listmachuyennganh,listtenchuyennganh, data.MaCN));

    $('.Add-New-Row').append('<div><span>Thêm tệp: </span> <span class="uploadfile-tag">  <button onclick="getFile()"; class="add-file-add-row">Thêm tệp</button>   </span></div>');
   
    if(String(data.Tep_Goc) !== 'null'){
        tepname = data.Tep_Goc;
        $('.uploadfile-tag').append('<span id="contentfile-'+1+'" class="item-add-file-upload"><span>'+tepname+'</span>   <span>   <svg height="20px"    viewBox="0 0 512.171 512.171" width="20px"> <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/> </svg>  </span> </span>   ')
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
            if(!danhsachcheckMota.includes(Motacuoi)){
                if(String(Motacuoi) != ''){
                    $(".input-more-checkbox").show();
                    document.getElementsByClassName("form-check-input").item(danhsachcheckMota.length).checked = true;
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
    }else{
        $(".display-checkbox").hide()
        $('.add-file-add-row').show();
    }

    $('.Add-New-Row').append(returnFormBtn(nutSuaDoan,maunutSuaDoan,idnutSuaDoan));

    //Them ham
    $("#check-khac").change(function() {
        if(this.checked){
            $(".input-more-checkbox").show();
        }else{
            $(".input-more-checkbox").hide();
        }
    });

    document.getElementById('selectedFile').onchange = function() {
        ResetCheckbox();
        document.getElementsByClassName('input-more-checkbox').item(0).value = '';
        document.getElementsByClassName("form-check-input").item(danhsachcheckMota.length).checked = false;
        checkfileupdate = true;
        var fullPath = document.getElementById('selectedFile').value;
        if (fullPath) {
            contentfile = document.getElementById("selectedFile").files[0];
            $('.uploadfile-tag').append('<span id="contentfile-'+1+'" class="item-add-file-upload"><span>'+contentfile['name']+'</span>   <span>   <svg height="20px"    viewBox="0 0 512.171 512.171" width="20px"> <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/> </svg>  </span> </span>   ')
            $(".display-checkbox").show()
            $('.add-file-add-row').hide();
        }
    };
    NUMBERFILE = data.MaCT;
}

function loadSuaDoan(){
    var MaDoan = document.getElementsByClassName('label-item-add').item(0).innerHTML;
    var TenDoan = document.getElementsByClassName('input-new-row-long form-control').item(0).value;
    var e = document.getElementsByClassName('combo-box-add-long').item(0);
    var chuyennganh = e.options[e.selectedIndex].value;
    var filedoc = '';
    var ischangefile = 'x';
    if(checkfileupdate === true){
        filedoc = namefilex;
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
    xhttp.open("GET", "/api/suadoan?MaDoan="+MaDoan+"&TenDoan="+TenDoan+"&chuyennganh="+chuyennganh+"&ngay="+getCurrentTime()+"&MaGV="+MaGV+"&filedoc="+filedoc+"&infotep="+infotep+"&NUMBERFILE="+NUMBERFILE+"&ischangefile="+ischangefile, false);
    xhttp.send();
}


////////////////////////////
function LoadTailieu(data){
    pageStatus = 2;

    var listtailieu = [];
    var trangthai;
    for(var i = 0; i < data.length; i++){
        if(Number(data[i].MaCT) == String(MaCTTailieu) && String(MaCTTailieu) != 'null') trangthai = 'Đã phân công';
        else trangthai = 'Chưa phân công';
        listtailieu.push({tep:data[i].Tep_Goc,giangvien: data[i].MaGV + '-' + data[i].TenNV,thoigian: data[i].ThoiGian, trangthai:trangthai });
    }

    $('#button-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('.label-bar').show();

    $('.chose-bar').hide();
    $('.switch-bar').hide();
    $('#head-bar').hide();
    $('.Add-New-Row').hide();
    $('.Detail-project').hide();
    $('#detail-bar').hide()

    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();
    $('.label-bar').empty();
    $('#head-bar').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án') + returnNameIndex('Tài liệu')  +  returnReturnBtn());
    if(pagelist == 2)  $('.label-bar').append( '<div id="label-table"> <span> Đồ án: '+MaDoan+'-'+TenDoan+' </span>  <button id="btn-upfile-label">Thêm tệp</button>  </div>' )
    else $('.label-bar').append( '<div id="label-table"> <span> Đồ án: '+MaDoan+'-'+TenDoan+' </span>   </div>' )

    $('#table_data').append(returnTable(tieudeBangTailieu,listtailieu));
    $('.btn-follow-row').append(returnButtonTable(['Phân công'],['phancong']));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
    console.log(data);
}


function loadAddThemFile(){

    namefilex = MaGV+MaDoan+getCurrentTimex().replace(/\D/g,'')+contentfile['name'];
    var formData = new FormData();
    formData.append("file", contentfile);        
    formData.append("namefile", namefilex);                            
    xhttp.open("POST", '/api/upfile_doan');
    xhttp.send(formData);


    var chuyennganh = MaChuyennganh;
    var filedoc = namefilex;
    var ischangefile = 'x';
    if(checkaddthemfile === true){
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
    console.log("/api/suadoan?MaDoan="+MaDoan+"&TenDoan="+TenDoan+"&chuyennganh="+chuyennganh+"&ngay="+getCurrentTime()+"&MaGV="+MaGV+"&filedoc="+filedoc+"&infotep="+infotep+"&NUMBERFILE="+NUMBERFILE+"&ischangefile="+ischangefile)
    xhttp.open("GET", "/api/suadoan?MaDoan="+MaDoan+"&TenDoan="+TenDoan+"&chuyennganh="+chuyennganh+"&ngay="+getCurrentTime()+"&MaGV="+MaGV+"&filedoc="+filedoc+"&infotep="+infotep+"&NUMBERFILE="+NUMBERFILE+"&ischangefile="+ischangefile, false);
    xhttp.send();
}

function LoadThemFile(){


    $("#tep-tai-lieu").val(null);
    ResetCheckbox();
    document.getElementsByClassName('input-more-checkbox').item(0).value = '';
    document.getElementsByClassName("form-check-input").item(danhsachcheckMota.length).checked = false;

    $("#check-khac").change(function() {
        if(this.checked){
            $(".input-more-checkbox").show();
        }else{
            $(".input-more-checkbox").hide();
        }
    });

    document.getElementById('tep-tai-lieu').onchange = function() {
        ResetCheckbox();
        document.getElementsByClassName('input-more-checkbox').item(0).value = '';
        document.getElementsByClassName("form-check-input").item(danhsachcheckMota.length).checked = false;

        var fullPath = document.getElementById('tep-tai-lieu').value;
        if (fullPath) {
            contentfile = document.getElementById("tep-tai-lieu").files[0];
        }
    };
}


function LoadPhancongTailieu(doan,listsinhvien){
    pageStatus = 3;

    $('#button-bar').show();
    $('#detail-bar').show()

    $('#head-bar').hide();
    $('.Add-New-Row').hide();
    $('.Detail-project').hide();
    $('.label-bar').hide();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();
    $('.switch-bar').hide();

    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();
    $('.label-bar').empty();
    $('#head-bar').empty();
    $('#detail-bar').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án') + returnNameIndex('Tài liệu')  + returnNameIndex('Phân công')  + returnReturnBtn());

    $('#detail-bar').append(
        '<span id="thongtin-doan">'+
            '<span id="thongtin-doan-doan">'+
                '<div>Thông tin đồ án:</div>'+
                '<div>Mã: '+doan.MaDA+'</div>'+
                '<div>Tên: '+doan.TenDA+'</div>'+
                '<div>Chuyên ngành: '+doan.tenCN+'</div>'+
                '<div>Người tạo: '+doan.MaNguoiTaoDA+' - '+doan.TenNguoiTaoDA+'</div>'+
                '<div>Ngày tạo: '+doan.NgayTao.replace('T17:00:00.000Z','')+'</div>'+
                '<div style="color: rgb(107, 144, 185);">Tài liệu hướng dẫn:</div>'+
                '<span>Người cập nhật: '+doan.MaNguoiCapNhat+' - '+doan.TenNguoiCapNhat+'</span>'+
                '<span>Ngày cập nhật: '+doan.NgayCapNhat.replace('T17:00:00.000Z','')+'</span>'+
                '<span>Tệp: <a href="http://">'+doan.Tep_Goc+'</a> </span>'+
                '<span>Mô tả: '+doan.MoTa+'</span><span></span><span></span>'+
            '</span>'+
        '</span>'
    );


    $('#detail-bar').append('<span id="thongtin-sv">'+
                                '<div>Thông tin sinh viên:</div>'+
                                '<div>Mã: DA03</div>'+
                                '<div>Tên: Lập trình AI</div>'+
                                '<div>Ngày sinh: 23.12.1212</div>'+
                                '<div>SDT: 01551551530</div>'+
                                '<div>Email: cuocsong@gmail.com</div>'+
                                '<div>Lớp: D182XCASD</div>'+
                                '<div>Ngành: Công nghệ thông tin - Công nghệ phần mềm</div>'+
                                '<div></div>'+
                            '</span>');

    var element = '<select class="select-sinh-vien browser-default custom-select">';
    for(let i = 0; i< listsinhvien.length; i++){
        if(String(listsinhvien[i].MaSV) === String(doan.MaSV))  element = element +  '<option selected  value="'+listsinhvien[i].MaSV+'">'+listsinhvien[i].MaSV+' - '+listsinhvien[i].tenSV+'</option>';
        else element = element +  '<option  value="'+listsinhvien[i].MaSV+'">'+listsinhvien[i].MaSV+' - '+listsinhvien[i].tenSV+'</option>';
    }
    element = element + '</select>';
    $('#detail-bar').append(element);

    if(String(doan.MaSV) === 'null'){
        MaSV = listsinhvien[0].MaSV;
    }else{
        MaSV = doan.MaSV;
    }
    $('.select-sinh-vien').on('change', function() {
        MaSV = this.value;
        loadInfoSvPhancongtailieu(this.value);
    });
    $('#detail-bar').append('<button class="phancong-sinhvien-doan-btn">Phân công</button>')
    loadInfoSvPhancongtailieu(MaSV);
}

function LoadInfoSvPhancongtailieu(infosv){
    $('#thongtin-sv').empty();
    $('#thongtin-sv').append(
        '<div>Thông tin sinh viên:</div>'+
        '<div>Mã: '+infosv.MaSV+'</div>'+
        '<div>Tên: '+infosv.TenSV+'</div>'+
        '<div>Ngày sinh: '+infosv.NgaySinh.replace('T17:00:00.000Z','')+'</div>'+
        '<div>SDT: '+infosv.SDT+'</div>'+
        '<div>Email: '+infosv.Email+'</div>'+
        '<div>Lớp: '+infosv.MaLop+'</div>'+
        '<div>Ngành: '+infosv.TenNganh+' - '+infosv.TenCN+'</div>'+
        '<div></div>'
    )
}


//CLICK-----------------------------------------------
async function EventTeacherClick(event) {
    var x = event.target;
    ///COLLUM TABLE
    if( x.parentNode.className == "no-color-lum-table"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#no-color-btn-follow-row').attr("id", "yes-color-btn-follow-row");
        x.parentNode.className = 'yes-color-lum-table';
        currentrowtable = Number(x.parentNode.id.replace('collumtalbe-',''));
        if(listinfoitem[currentrowtable].pbFileKhac == 1 || listinfoitem[currentrowtable].totalPC == 1){
            document.querySelector('#yes-color-btn-follow-row div:first-child').style.background = "rgba(70, 100, 145, 0.233)";
            document.querySelector('#yes-color-btn-follow-row div:nth-child(2)').style.background = "rgba(202, 107, 72, 0.26)";
        }else{
            document.querySelector('#yes-color-btn-follow-row div:first-child').style.background = "rgb(70, 100, 145)";
            document.querySelector('#yes-color-btn-follow-row div:nth-child(2)').style.background = "rgb(202, 107, 72)";
        }
    }

    ///SWITCH BTN
    else if(x.className == "loadswitch1"){
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
    }

    ///BUTTON TABLE
    else if(x.parentNode.className == 'btn-follow-row'){
        if(x.id == 'sua'){
            if(listinfoitem[currentrowtable].pbFileKhac == 0 && listinfoitem[currentrowtable].totalPC == 0){
                MaDoan = listinfoitem[currentrowtable].MaDA;
                dieukiensuadoan();
            }
        }
        if(x.id == "xoa"){
            MaDoan = listinfoitem[currentrowtable].MaDA;
            loadXoaDoan();
        }
        if(x.id == "phancong"){
            MaCT = listinfoitem[currentrowtable].MaCT;
            console.log(MaCT);
            loadFirstPhancongtailieu();
        }
        if(x.id == "tailieu"){
            MaDoan = listinfoitem[currentrowtable].MaDA;
            TenDoan = listinfoitem[currentrowtable].TenDA;
            MaCTTailieu = listinfoitem[currentrowtable].MaCT;
            loadListTailieu()
            $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
            $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        }
    }

    ///NAV-PAGE
    else if(x.parentNode.className == "nav-page" ){
        if(pageStatus == 1){
            page_num = Number(x.innerHTML);
            LoadHeadPage1();
            if(pagelist == 1) loadListDoanCanhan();
            else if((pagelist == 2)) loadListDoanTatca();
        }
    }
    
    ///DELETE ITEM FILE
    else if(x.parentNode.parentNode.className == 'item-add-file-upload'){
        checkfileupdate = true;
        x.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode);
        $(".display-checkbox").hide();
        $('.add-file-add-row').show();
        console.log('delete');
    }else if(x.parentNode.parentNode.parentNode.className == 'item-add-file-upload'){
        checkfileupdate = true;
        x.parentNode.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode.parentNode);
        $(".display-checkbox").hide();
        $('.add-file-add-row').show();
        console.log('deletxe');
    }

    ///ADD NEW BTN
    else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        dieukienthemdoan();
    }
    
    ///RETURN BTN
    else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        if(pageStatus <= 2){
        LoadHeadPage1();
        if(pagelist == 1) loadListDoanCanhan();
        else if((pagelist == 2)) loadListDoanTatca();
        }else if(pageStatus == 3){
            loadListTailieu()   
        }
    }
    
    /// THOAT BTN
    else if(x.id == "thoat" ){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        if(pageStatus <= 2){
        LoadHeadPage1();
        if(pagelist == 1) loadListDoanCanhan();
        else if((pagelist == 2)) loadListDoanTatca();
        }else if(pageStatus == 3){
            loadListTailieu()   
        }
    }
    
    ///XAC NHAN THEM BTN
    else if(x.id == "them" ){
        namefilex = MaGV+MaDoan+getCurrentTimex().replace(/\D/g,'')+contentfile['name'];
        var formData = new FormData();
        formData.append("file", contentfile);        
        formData.append("namefile", namefilex);                            
        xhttp.open("POST", '/api/upfile_doan');
        xhttp.send(formData);
        loadAddDoan();
    }
    
    ///XAC NHAN SUA BTN
    else if(x.id == "suax" ){
        if(checkfileupdate == true){
            namefilex = MaGV+MaDoan+getCurrentTimex().replace(/\D/g,'')+contentfile['name'];
            var formData = new FormData();
            formData.append("file", contentfile);        
            formData.append("namefile", namefilex);                            
            xhttp.open("POST", '/api/upfile_doan');
            xhttp.send(formData);
            loadSuaDoan();
        }else{
            loadSuaDoan();
        }
    }
    
    ///PHAN CONG TAILIEUBTN
    else if(x.className == "phancong-sinhvien-doan-btn"){
        console.log(MaDoan,MaGV,MaSV,MaCT)
        xhttp.open("GET", "/api/add-phancong-tailieu?MaDoan="+MaDoan+"&MaGV="+MaGV+"&MaSV="+MaSV+"&MaCT="+MaCT, false);
        xhttp.send();    
    }
    
    ///UPLOAD FILE BTN
    else if(x.id == "btn-upfile-label"){
        $('.Form-input-file').show();
        $('.shadow-input-diem').show();
        LoadThemFile();
    }else if(x.id == "btn-thoat-diem"){
        $('.Form-input-file').hide();
        $('.shadow-input-diem').hide();
    }else if(x.id == "btn-nhap-diem"){
        loadCheckFileuploadTailieu();

    }
    
    

    
    ///ELSE
    else{
        if(document.querySelector('#yes-color-btn-follow-row div:first-child')){
            document.querySelector('#yes-color-btn-follow-row div:first-child').style.background = "rgba(70, 100, 145, 0.233)";
            document.querySelector('#yes-color-btn-follow-row div:nth-child(2)').style.background = "rgba(202, 107, 72, 0.26)";
        }
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }
}
//FIRST---------------------------------------------------------
loadListDoan();

