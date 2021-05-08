var listinfoitem;
var page_num = 1;
var tol_page = 0;

var listLabelpk = ['Mã sinh viên','Tên sinh viên','Lớp','Mã đồ án','Điểm GVPB','TB'];
// var data = [{MaSV:'SV02', Ten:'Thanh Tu', Lop:'CNTT', Ma:'023', GPA:'3.4', GVHD:'GV01'},{MaSV:'SV54', Ten:'Le Tam', Lop:'CNTT', Ma:'023', GPA:'3.4', GVHD:'GV01'},{MaSV:'SV02', Ten:'Nguyen Tam', Lop:'CNTT', Ma:'023', GPA:'3.4', GVHD:'GV01'}]
var listButtonpk = ['Phân công','Chi tiết'];
var listIdBtnTable = ['phancongx', 'chitietx'];
var listInfoTieuban1 = ['Mã sinh viên: SV21','Tên sinh viên: Le Tấn']
var listInfoTieuban2 = ['Mã đồ án: DA21' ,'Tên đồ án: 21']

var listBtnpk =  ['Phân công ','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['phancong', 'thoat'];


var TBtemp;
var MaDAtemp;


$(".left-bar").load("/qldean/Admin/SlideBarCollapse.html",function () {
    $( "#act-phancongtieuban" ).addClass( "active" );
});

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachphancongTB')){
                    var data = JSON.parse(this.responseText);
                    listinfoitem = data[0][0];
                    tol_page =  Math.ceil(data[1][0]['FOUND_ROWS()'] / 10); 
                    console.log(data[0][0])
                    LoadListTieuban(data[0][0]);
                }

                if(String(this.responseURL).includes('api/danhsachTBphancong')){
                    var data = JSON.parse(this.responseText);
                    LoadPhancongTieuban(data);
                }
                if(String(this.responseURL).includes('api/addTBphancong')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Trùng mã sinh viên, Email hoặc field rỗng')
                    else
                    loadListTieuban()
                }
        }
    };


function loadListTieuban(){
    xhttp.open("GET", "/api/danhsachphancongTB?page="+page_num, false);
    xhttp.send();
}


function loadPhancongTieuban(MaSV){
    xhttp.open("GET", "/api/danhsachTBphancong?MaSV="+MaSV, false);
    xhttp.send();
}

function loadAddPhancongTieuban(){
    var e = document.getElementsByClassName("slide-select-lorm").item(0);
    var strUser = String(e.value).split(' - ');
    console.log(strUser[0],MaDAtemp)
    xhttp.open("GET", "/api/addTBphancong?MaDA="+MaDAtemp+"&MaTB="+strUser[0], false);
    xhttp.send();
}


function LoadListTieuban(data) {
    console.log(data)
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').show();
    $('.btn-follow-row').show();
    $('.nav-page').show();

    $('.Add-New-Row').hide();


    $('#button-bar').empty();
    $('.chose-bar').empty();
    $('#table_data').empty();
    $('.btn-follow-row').empty();
    $('.nav-page').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Tiểu ban') );
    // $('.chose-bar').append(returnSearchForm('Nhập GPA tối thiểu','Lọc') );
    $('#table_data').append(returnTable(listLabelpk,data));
    $('.btn-follow-row').append(returnButtonTable(listButtonpk,listIdBtnTable));
    $('.nav-page').append(returNavForm(tol_page+1, page_num));
}


function LoadPhancongTieuban(data) {
    console.log(data)
    data1 = data[0];
    data2 = data[1];

    var InfoSV = data[0][0];
    var listtb = data[1];

    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Tiểu ban') + returnNameIndex('Phân công')  + returnReturnBtn());

    


    $('.Add-New-Row').append(returnLormInfo( ['Mã sinh viên: '+InfoSV.MaSV,'Tên sinh viên: '+InfoSV.TenSV]));

    if(String(InfoSV.TenDA) != 'null')
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: '+InfoSV.TenDA]));
    else
    $('.Add-New-Row').append(returnLormInfo(['Mã đồ án: '+InfoSV.MaDA ,'Tên đồ án: Chưa đặt tên']));

    // $('.Add-New-Row').append(returnLormInfo(listInfoTieuban1));
    // $('.Add-New-Row').append(returnLormInfo(listInfoTieuban2));
    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: '+InfoSV.MaGVHD));
    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên phản biện: '+InfoSV.MaGVPB));
    // $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB02'));

    let listTB = [];
    let choseTB;

    for(let i = 0; i < listtb.length; i++){
        if(String(listtb[i].MaTB) ===  String(TBtemp)) choseTB = listtb[i].MaTB
        listTB.push( listtb[i].MaTB)
    }

    if(String(TBtemp) == '' )
    $('.Add-New-Row').append(returnLormInputSelect('Phân công tiểu ban: ',listTB ,listTB[0].MaTB));
    else
    $('.Add-New-Row').append(returnLormInputSelect('Phân công tiểu ban: ',listTB ,choseTB));

    $('.Add-New-Row').append(returnLormBtn(listBtnpk,listColorpk,listIdBtn));

}


function LoadChitietTieuban() {
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').show();

    $('#button-bar').empty();
    $('.Add-New-Row').empty();

    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách')  + returnNameIndex('Tiểu ban') + returnNameIndex('Chi tiết')  +  returnReturnBtn());

    $('.Add-New-Row').append(returnLormInfo(listInfoTieuban1));
    $('.Add-New-Row').append(returnLormInfo(listInfoTieuban2));
    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên hướng dẫn: GV02 - Trần Minh Chiến'));
    $('.Add-New-Row').append(returnLormOneInfo('Giảng viên phản biện: GV02 - Trần Minh Chiến'));

    // $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB02'));

    $('.Add-New-Row').append(returnLormOneInfo('Tiểu ban: TB023'));
    $('.Add-New-Row').append(returnLormBtn(['Thoát'],['tomato'],['thoat']));

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
        if(x.id == "phancongx" ){
            MaDAtemp = listinfoitem[currentrowtable].MaDA;
            TBtemp = listinfoitem[currentrowtable].MaTB;
            loadPhancongTieuban(listinfoitem[currentrowtable].MaSV)
            // LoadPhancongTieuban();
        }else if(x.id == "chitietx"){
            LoadChitietTieuban();
        }
    }else if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        LoadAddFormTieuban();
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        loadListTieuban();
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }else if(x.id == 'phancong'){
        loadAddPhancongTieuban()
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }

}

//FIRST------------------------------------------

loadListTieuban();