var listinfoitem;
var page_num = 1;
var tol_page = 1;

var pagelist = 0;

var MaGV = "GVCN006";
var MaChuyennganh = "CP";
var MaDoan = '';

var listTacaTitle = ['Đồ án' , 'Chuyên ngành' , 'Người tạo','Ngày tạo','Lần cuối cập nhật','Trạng thái'] 

var listCanhanTitle = ['Mã sinh viên','Tên sinh viên', 'Lớp', 'Email','Mã đồ án' , 'Tên đồ án' ]

var listButtonpk = ['Sửa','Xóa'];
var listIdBtnTable = [ 'suax' , 'xoax'];

var listBtnpk =  ['Thêm','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['them', 'thoa'];

var listchuyenganh = [];
    var listmachuyennganh = [];
    var listtenchuyennganh = [];

var nutThemDoan = ['Xác nhận', 'Thoát']
var maunutThemDoan = ['tomato','green'];
var idnutThemDoan = ['them','thoat'];

var danhsachcheckMota = ['Tệp văn bản','Tệp trình chiếu','Tệp chương trình'];

var contentfile1;
var contentfile2;
var file1 = false;
var file2 = false;
var filename1;
var filename2;

var MaDoan;

$(".left-bar").load("/qldean/Teacher/SlideBar.html",function () {
    $( "#act-danhsachdoan" ).addClass( "active" )
});

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachtatcadoan')){
                    var data = JSON.parse(this.responseText);
                    tol_page =  Math.ceil(data[1][0]['FOUND_ROWS()'] / 10); 
                    console.log(data)
                    LoadTatcadoan(data[0]);
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

                    LoadListDoan(listinfoitem)
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
                    LoadListDoanCanhan(listinfoitem)
                    pagelist = 1;
                }
                
                if(String(this.responseURL).includes('api/danhsachtailieu')){
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                }
        }
    };


function changeChuyennganh(){
    var e = document.getElementsByClassName("select-combox-headbar").item(0);
    MaChuyennganh = String(e.options[e.selectedIndex].value);
    // e = document.getElementsByClassName("select-combox-headbar").item(1);
    // khoacurrent = e.options[e.selectedIndex].value;
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

//ELEMENT-----------------------------------------------------
function LoadListDoan(data){
    $('#button-bar').show();
    $('.chose-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('.switch-bar').show();

    $('#head-bar').show();

    $('.Add-New-Row').hide();
    $('.Detail-project').hide();

    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#head-bar').empty();
  
    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án')  +  returnAddBtn());
    console.log(listmachuyennganh)
    $('#head-bar').append(returnFormComboxHeadBar('Chuyên nghành',listmachuyennganh, listtenchuyennganh, MaChuyennganh, 'changeChuyennganh',300,0));

    $('.chose-bar').append(returnSearchForm('Nhập mã đồ án','Tìm kiếm'));

    if(pagelist == 0) $('.switch-bar').append( returnSwitchTable('Cá nhân', 'Tất cả'))
    
    $('#table_data').append(returnTable(listTacaTitle,data));
    $('.btn-follow-row').append(returnButtonTable(['Xem chi tiết'],['chitiet']));
    $('.nav-page').append(returNavForm(tol_page+1, 1));
}

function LoadListDoanCanhan(data){
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();

    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();


    $('#table_data').append(returnTable(listTacaTitle,data));
    $('.btn-follow-row').append(returnButtonTable(['Xem chi tiết'],['chitiet']));
    $('.nav-page').append(returNavForm(tol_page+1, 1));
}


function LoadListDoanTatca(data){
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();

    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#table_data').append(returnTable(listTacaTitle,data));
    $('.btn-follow-row').append(returnButtonTable(['Tài liệu'],['tailieu']));
    $('.nav-page').append(returNavForm(tol_page+1, 1));
}

function LoadHeadPage1(){
    $('#button-bar').show();
    $('.chose-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();
    $('.switch-bar').show();

    $('#head-bar').show();

    $('.Add-New-Row').hide();
    $('.Detail-project').hide();

    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#head-bar').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án')  +  returnAddBtn());
    console.log(listmachuyennganh)
    $('#head-bar').append(returnFormComboxHeadBar('Chuyên nghành',listmachuyennganh, listtenchuyennganh, MaChuyennganh, 'changeChuyennganh',300,0));

    $('.chose-bar').append(returnSearchForm('Nhập mã đồ án','Tìm kiếm'));
}

function dieukienthemdoan(){
    xhttp.open("GET", "/api/dieukienthemdoan?MaNghanh=CN", false);
    xhttp.send();
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


    xhttp.open("GET", "/api/themdoan?MaDoan="+MaDoan+"&TenDoan="+TenDoan+"&chuyennganh="+chuyennganh+"&ngay="+getCurrentDayx()+"&MaGV="+MaGV+"&filedoc="+filedoc+"&infotep="+infotep, false);
    xhttp.send();
}

function LoadAddDoan(){
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

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án') + returnNameIndex('Thêm mới')   +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabelInfo('Mã đồ án',MaDoan));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên đồ án','' ));

    $('.Add-New-Row').append(returnFormInputSelect('Chuyên nghành', 'changeChuyennghanh' , listmachuyennganh,listtenchuyennganh, 'is'));

    $('.Add-New-Row').append('<div><span>Thêm tệp: </span> <span class="uploadfile-tag">  <button onclick="getFile()"; class="add-file-add-row">Thêm tệp</button>   </span></div>');
    
    $('.Add-New-Row').append(returnCheckBoxHaveMore('Mô tả',danhsachcheckMota));

    

    $('.Add-New-Row').append(returnFormLabelInfo('Ngày thêm',getCurrentDay()));

    $('.Add-New-Row').append(returnFormBtn(nutThemDoan,maunutThemDoan,idnutThemDoan));


    $(".display-checkbox").hide();

    $("#check-khac").change(function() {
        if(this.checked) {
            $(".input-more-checkbox").show()
        }else{
            $(".input-more-checkbox").hide();
        }
    });
    
    $(".input-more-checkbox").hide();


    document.getElementById('selectedFile').onchange = function() {
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

function getFile(){
    document.getElementById('selectedFile').click();
}

function LoadXemchitiet(){
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').hide();
    $('.Detail-project').show();

    $('#button-bar').empty();
    $('.chose-bar').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Tất cả đồ án') + returnNameIndex('Chi tiết') +  returnReturnBtn());
}

//CLICK-----------------------------------------------
async function EventTeacherClick(event) {
    var x = event.target;
    if( x.parentNode.className == "no-color-lum-table"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#no-color-btn-follow-row').attr("id", "yes-color-btn-follow-row");
        x.parentNode.className = 'yes-color-lum-table';
        currentrowtable = Number(x.parentNode.id.replace('collumtalbe-',''));
    }else if(x.parentNode.className == 'btn-follow-row'){
        if(x.id == "tailieu"){
            console.log(listinfoitem[currentrowtable].MaDA)
            MaDoan = listinfoitem[currentrowtable].MaDA
            loadListTailieu()
        }
    }else if(x.parentNode.parentNode.className == 'item-add-file-upload'){
        x.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode);
        console.log('delete')
        $(".display-checkbox").hide();
        console.log(Number(String(x.parentNode.parentNode.id).replace('contentfile-','')))
        if(Number(String(x.parentNode.parentNode.id).replace('contentfile-','')) == 1){ contentfile1 = '' ; file1 = false};
        if(Number(String(x.parentNode.parentNode.id).replace('contentfile-','')) == 2){ contentfile2 = '' ; file2 = false};
        if(file1 == false || file2 == false){
            $('.add-file-add-row').show();
        }
    }else if(x.parentNode.parentNode.parentNode.className == 'item-add-file-upload'){
        x.parentNode.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode.parentNode);
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
        LoadHeadPage1();
        if(pagelist == 1) loadListDoanCanhan();
        else if((pagelist == 2)) loadListDoanTatca();
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


    }else if(x.className == "loadswitch1"){
        $('#activeswitchbar').removeAttr('id');
        x.id = 'activeswitchbar';
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        loadListDoanCanhan();
    }else if(x.className == "loadswitch2"){
        $('#activeswitchbar').removeAttr('id');
        x.id = 'activeswitchbar';
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        loadListDoanTatca();
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }

}

//FIRST---------------------------------------------------------
// LoadListPhancong() 
loadListDoan();


