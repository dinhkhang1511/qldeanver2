$( "#act-huongdan" ).addClass( "active" );

var listinfoitem;
var page_num = 1;
var tol_page = 1;

$("#name-user").empty();
$("#name-user").append('GV: ' + getCookie('GVNAME'));
var MaGV = getCookie('GV');
console.log(MaGV + ':MÃ')


var MaPC = "";
var MaCT = "";
var MaSV = "";
var MaDoan = "";
var DiemCham = "";


var tieudeBangChamdiemhuongdan = ['Mã sinh viên','Tên sinh viên', 'Lớp', 'Mã đồ án' , 'Tên đồ án'  , 'Điểm' ]

var listButtonpk = ['Sửa','Xóa'];
var listIdBtnTable = [ 'suax' , 'xoax'];

var listBtnpk =  ['Thêm','Thoát'];
var listColorpk = ['tomato', 'green'];
var listIdBtn = ['them', 'thoa'];


var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsach-chamdiem-huongdan')){
                    var data = JSON.parse(this.responseText);
                    tol_page =  Math.ceil(data[1][0]['Number'] / 10); 
                    console.log(data)
                    listinfoitem = data[0][0];
                    LoadListChamdiemHuongdan(chuyendoiBangchamdiemhuongdan(data[0][0]));
                }
                if(String(this.responseURL).includes('api/loadChamdiemhuongdan')){
                    var data = JSON.parse(this.responseText);
                    LoadChamdiemhuongdan(data[0][0][0],data[1][0][0],data[2][0][0],data[3][0][0]);
                    console.log(data)
                    

                }
                if(String(this.responseURL).includes('api/chamDiemHuongdan')){
                    if(String(this.responseText) == '"that bai"')alert('Fail')
                    else {
                        var data = JSON.parse(this.responseText);
                        // alert(data[0][0]['ThongBao'])
                        if(Number(data[0][0]['status']) == 1 ){
                            CapNhatDiem()
                        }else{
                            alert('Đã quá thời gian chấm điểm')
                        }
      
                    };
                }

                
        }
    };



function loadlistChamdiemHuongdan(){
    xhttp.open("GET", "/api/danhsach-chamdiem-huongdan?page="+page_num+"&MaGV="+MaGV, false);
    xhttp.send();
}

function loadChamdiemhuongdan(){
    xhttp.open("GET", "/api/loadChamdiemhuongdan?MaDoan="+MaDoan+"&MaGV="+MaGV+"&MaSV="+MaSV+"&MaCT="+MaCT+"&MaPC="+MaPC, false);
    xhttp.send();
}

//ELEMENT-----------------------------------------------------

function chuyendoiBangchamdiemhuongdan(data){
    var listchamdiemhuongdan = [];
    var diem;
    for(let i = 0; i < data.length; i++){
        if(String(data[i].Diem) === 'null')  diem = 'Chưa chấm';
        else  diem = data[i].Diem;
        listchamdiemhuongdan.push({MaSV: String(data[i].MaSV) , TenSV: String(data[i].TenSV), MaLop: String(data[i].MaLop) , MaDoan: String(data[i].MaDA), TenDA: String(data[i].TenDA) , Diem: diem  })
    }
    return listchamdiemhuongdan;
}

function loadChamdiem(){
    console.log(document.getElementById('input-diem').value)
    if(String(Number(document.getElementById('input-diem').value)) != 'NaN'){
        DiemCham = Number(document.getElementById('input-diem').value);
        xhttp.open("GET", "/api/chamDiemHuongdan?DiemCham="+DiemCham+"&MaGV="+MaGV+"&MaPC="+MaPC, false);
        xhttp.send();
    }
    
}

function LoadListChamdiemHuongdan(data) {

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
  
    $('#button-bar').append(returnIconHome() + returnNameIndex('Phụ trách') + returnNameIndex('Hướng dẫn'));
    $('.chose-bar').append(returnSearchForm('Nhập mã đồ án','Tìm kiếm'));
    $('#table_data').append(returnTable(tieudeBangChamdiemhuongdan,data));
    $('.btn-follow-row').append(returnButtonTable(['Chấm điểm'],['chitiet']));
    $('.nav-page').append(returNavForm(tol_page+1, 1));
}

function LoadChamdiemhuongdan(infosv,infodoan,infodiem,infobaocaofile){
    $('#button-bar').show();
    $('.chose-bar').hide();
    $('#table_data').hide();
    $('.btn-follow-row').hide();
    $('.nav-page').hide();

    $('.Add-New-Row').hide();
    $('.Detail-project').show();

    $('#button-bar').empty();
    $('.chose-bar').empty();

    $('#button-bar').append(returnIconHome() +returnNameIndex('Phụ trách') + returnNameIndex('Hướng dẫn') + returnNameIndex('Chấm điểm') +  returnReturnBtn());


    $('.Detail-project').empty();


    $('.Detail-project').append(
        '<span id="info-doan">'+
            '<div>Thông tin đồ án:</div>'+
            '<div>Mã: '+infodoan.MaDA+'</div>'+
            '<div>Tên: '+infodoan.TenDA+'</div>'+
            '<div>Chuyên ngành: '+infodoan.tenCN+'</div>'+
            '<div>Người tạo: '+infodoan.MaNguoiTaoDA+' - '+infodoan.TenNguoiTaoDA+'</div>'+
            '<div>Tài liệu hướng dẫn:   <a href="http://">'+infodoan.Tep_Goc+'</a> </div>'+
            '<div>Mô tả: '+infodoan.MoTa+'</div>'+
        '</span>'
    )


    var baocaofile;
    var mota;
    if(String(infobaocaofile.Tep_Goc) === 'null') baocaofile = 'Chưa có';
    else baocaofile = '<a href="http://">' +  infobaocaofile.Tep_Goc + '</a>';
    if(String(infobaocaofile.MoTa) === 'null') mota = 'Chưa có';
    else mota = infobaocaofile.MoTa;


    var elementInfoDiem = '<div> Trạng thái: '
    console.log(infodiem)

    if(String(infodiem.MaGVPB) === 'null' && String(infodiem.MaTB) === 'null'){
        if(Number(infodiem.DiemHD) < 4 && String(infodiem.DiemHD) !== 'null'){
            elementInfoDiem = elementInfoDiem + '<span style="color:red">F</span>';
        }else{
            elementInfoDiem = elementInfoDiem + '<span style="color:green">Đang báo cáo hướng dẫn</span>';
        }
    }else if(String(infodiem.MaGVPB) != 'null' && String(infodiem.MaTB) === 'null'){
        if(Number(infodiem.DiemPB) < 4 && String(infodiem.DiemPB) !== 'null'){
            elementInfoDiem = elementInfoDiem + '<span style="color:red">F</span>';
        }else{
            elementInfoDiem = elementInfoDiem + '<span style="color:green">Đang báo cáo phản biện</span>';
        }
    }else if(String(infodiem.MaTB) != 'null'){
        if(Number(infodiem.DiemTB) < 4 && String(infodiem.DiemTB) !== 'null'){
            elementInfoDiem = elementInfoDiem + '<span style="color:red">F</span>';
        }else{
            elementInfoDiem = elementInfoDiem + '<span style="color:green">Đang báo cáo tiểu ban</span>';
        }
    }

    elementInfoDiem = elementInfoDiem + '</div>'
    // elementInfoDiem = elementInfoDiem + 
    // if()


    $('.Detail-project').append(
        '<span id="info-sv">'+
            '<div>Thông tin sinh viên:</div>'+
            '<div>Mã: '+infosv.MaSV+'</div>'+
            '<div>Tên: '+infosv.TenSV+'</div>'+
            '<div>Ngày sinh: '+infosv.NgaySinh.replace('T17:00:00.000Z','')+'</div>'+
            '<div>SDT: '+infosv.SDT+'</div>'+
            '<div>Lớp: '+infosv.MaLop+'</div>'+
            '<div>Email: '+infosv.Email+'</div>'+
            '<div>Ngành: '+infosv.TenNganh+' - '+infosv.TenCN+'</div>'+
            '<div>GPA: '+infosv.GPA+'</div>'+
            elementInfoDiem+
            '<div>Báo cáo file: '+baocaofile+'</div>'+
            '<div>Mô tả: '+mota+'</div>'+
        '</span>'
    )





    if(String(infosv.Diem) === 'null') DiemCham = '__';
    else DiemCham = Number(infosv.Diem);
    $('.Detail-project').append(
        '<span id="diem-doan">'+
            '<div id="btn-update-diem">cập nhật</div>'+
            '<div id="info-diem-label"><span id="diem-label">Điểm: </span><span id="number-diem">'+DiemCham+'</span></div>'+
        '</span>'
    )

    
    
}


function CapNhatDiem(){
    $('#number-diem').empty();
    $('#number-diem').append(DiemCham);
}

//CLICK-----------------------------------------------
function EventTeacherClick(event) {
    var x = event.target;
    if( x.parentNode.className == "no-color-lum-table"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#no-color-btn-follow-row').attr("id", "yes-color-btn-follow-row");
        x.parentNode.className = 'yes-color-lum-table';
        currentrowtable = Number(x.parentNode.id.replace('collumtalbe-',''));
    }else if(x.parentNode.className == 'btn-follow-row'){
        if(x.id == "chitiet"){
            MaDoan = listinfoitem[currentrowtable].MaDA;
            MaGV = MaGV;
            MaSV = listinfoitem[currentrowtable].MaSV;
            MaCT = listinfoitem[currentrowtable].MaCT;
            MaPC = listinfoitem[currentrowtable].MaPhanCong;
            loadChamdiemhuongdan();
        }
    }else if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn" ||  x.parentNode.parentNode.parentNode.className == "return_btn"){
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
        loadlistChamdiemHuongdan()
    }else if(x.id == "btn-update-diem"){
        $('.Form-input-diem').show();
        $('.shadow-input-diem').show();
        if(DiemCham != '__') 
        document.getElementById('input-diem').value = DiemCham;
    }else if(x.id == "btn-thoat-diem"){
        $('.Form-input-diem').hide();
        $('.shadow-input-diem').hide();
    }else if(x.id == "btn-nhap-diem"){
        loadChamdiem()
        $('.Form-input-diem').hide();
        $('.shadow-input-diem').hide();

    }else if(x.id == "logout" ||  x.parentNode.id == "logout" || x.parentNode.parentNode.id == "logout"){
        if (confirm('Bạn có muốn đăng xuất')) {
            window.location.replace("/login");
          } else {
          }
    }else{
        $('.yes-color-lum-table').removeClass('yes-color-lum-table').addClass('no-color-lum-table');
        $('#yes-color-btn-follow-row').attr("id", "no-color-btn-follow-row");
    }

}

//FIRST---------------------------------------------------------
loadlistChamdiemHuongdan()