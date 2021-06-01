var listinfoitem;
var page_num = 1;
var tol_page = 1;

var MaGV = "Gv/n-003";

var listTacaTitle = ['Mã đồ án' , 'Tên đồ án' , 'GVHD'] 
var listTacadata = [{Ma:'DA42', Ten:'Lam web', GVHD: 'GV - Nguyen thi thu ngan'},{Ma:'DA42', Ten:'Lam web', GVHD: 'GV - Nguyen thi thu ngan'},{Ma:'DA42', Ten:'Lam web', GVHD: 'GV - Nguyen thi thu ngan'}]

var listPhutrachTitle = ['Mã sinh viên','Tên sinh viên', 'Lớp', 'Email','Mã đồ án' , 'Tên đồ án' ]
var listPhutrachdata = [{MaSV:'SV02', Ten:'Ngoc minh', Lop: 'ATTT', Email:'ngocminh@gmail.com',MaDA: 'DA44', TenDA:'Hack Wifi'}]

var listButtonpk = ['Sửa','Xóa'];
var listIdBtnTable = [ 'suax' , 'xoax'];

var listBtnpk =  ['Thêm','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['them', 'thoa'];


var nutThemDoan = ['Xác nhận', 'Thoát']
var maunutThemDoan = ['tomato','green'];
var idnutThemDoan = ['them','thoat'];

var contentfile1;
var contentfile2;
var countfile = 0;


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
        }
    };



function loadListTatcadoan(){
    xhttp.open("GET", "/api/danhsachtatcadoan?page="+page_num, false);
    xhttp.send();
}


//ELEMENT-----------------------------------------------------
function LoadListDoan(){
    $('#button-bar').show();
    $('.chose-bar').show();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();

    $('.Add-New-Row').hide();
    $('.Detail-project').hide();

    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();
  
    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án')  +  returnAddBtn());
    $('.chose-bar').append(returnSearchForm('Nhập mã đồ án','Tìm kiếm'));
    $('#table_data').append(returnTable(listTacaTitle,[{MaDA:'D019',Ten:'Làm web',GVHD:'GV02'},{MaDA:'D013',Ten:'Làm app',GVHD:'GV02'}]));
    $('.btn-follow-row').append(returnButtonTable(['Xem chi tiết'],['chitiet']));
    $('.nav-page').append(returNavForm(tol_page+1, 1));
}


function  LoadAddDoan(){
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();
    $('.Detail-project').hide();

    $('.Add-New-Row').empty();
    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Đồ án') + returnNameIndex('Thêm mới')   +  returnReturnBtn());
    $('.Add-New-Row').append(returnFormLabelInfo('Mã tiểu ban','DA17011'));
    $('.Add-New-Row').append(returnFormInputTextLength('Tên đồ án','' ));

    $('.Add-New-Row').append(returnFormInputSelect('Chuyên nghành', 'changeChuyennghanh' , ['is'], ['Khoa học máy tính'], 'is'));

    $('.Add-New-Row').append('<div><span>Thêm tệp: </span> <span class="uploadfile-tag">  <button onclick="getFile()"; class="add-file-add-row">Thêm tệp</button>   </span>');
    
    $('.Add-New-Row').append(returnFormLabelInfo('Ngày thêm',getCurrentDay()));

    $('.Add-New-Row').append(returnFormBtn(nutThemDoan,maunutThemDoan,idnutThemDoan));


    document.getElementById('selectedFile').onchange = function() {
        var fullPath = document.getElementById('selectedFile').value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            $('.uploadfile-tag').append('<span class="item-add-file-upload"><span>'+filename+'</span>   <span>   <svg height="20px"    viewBox="0 0 512.171 512.171" width="20px"> <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/> </svg>  </span> </span>   ')
            console.log(filename);


            countfile = countfile + 1;

            if(countfile == 1){
                contentfile1 = document.getElementById("selectedFile").files[0]; 
            }
            if(countfile == 2){
                contentfile2 = document.getElementById("selectedFile").files[0]; 
            }
            if(countfile == 2){
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
function EventTeacherClick(event) {
    var x = event.target;
    if( x.parentNode.className == "no-color-lum-table"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#no-color-btn-follow-row').attr("id", "yes-color-btn-follow-row");
        x.parentNode.className = 'yes-color-lum-table';
    }else if(x.parentNode.className == 'btn-follow-row'){
        if(x.id == "chitiet"){
            LoadXemchitiet();
        }


        
    }else if(x.parentNode.parentNode.className == 'item-add-file-upload'){
        console.log('delete')
        x.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode);
        countfile = countfile - 1;
        if(countfile < 2){
            $('.add-file-add-row').show();
        }
    }else if(x.parentNode.parentNode.parentNode.className == 'item-add-file-upload'){
        x.parentNode.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode.parentNode);
        console.log('deletxe')
        if(countfile == 2){
            contentfile2 = '';
        }
        if(countfile == 1){
            contentfile1 = '';
        }
        countfile = countfile - 1;
        if(countfile < 2){
            $('.add-file-add-row').show();
        }
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        LoadAddDoan();
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        LoadListTatcadoan();
    }else if(x.id == "them" ){
        console.log(contentfile1)
        // console.log(contentfile2)

        var formData = new FormData();
        formData.append("file", contentfile1);                                
        xhttp.open("POST", '/api/upfiledoan');
        xhttp.send(formData);

    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }

}

//FIRST---------------------------------------------------------
// LoadListPhancong() 
LoadListDoan()