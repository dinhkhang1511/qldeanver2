var listinfoitem;
var page_num = 1;
var tol_page = 0;

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachtatcadetai')){
                    var data = JSON.parse(this.responseText);
                    tol_page =   Math.ceil( Number(data[1]) / 2 );
                    LoadListDetai(data[0]);
                    console.log(data)
                    LoadNavPage();
                }

        }
    };

///LOAD----------------------------------------------------
function loadListAllDetai(){
    xhttp.open("GET", "/api/danhsachtatcadetai?page="+page_num, false);
    xhttp.send();
}




///ELEMENT-----------------------------------------------------
function LoadListDetai(data) {
    listinfoitem = data;
    $('.Add-New-Row').hide();

    $('#button-bar').show();
    $('#chose-bar').show();
    $('#table_data').show();
    
    var element = '<svg height="20px"  viewBox="0 0 59.465 59.465" width="20px"><g>'+
                  '<path d="M58.862,33.886L45.045,20.069v-9.112c0-1.136-0.921-2.056-2.056-2.056c-1.137,0-2.057,0.92-2.057,2.056v5.001L31.185,6.21c-0.801-0.803-2.104-0.803-2.905,0L0.603,33.886c-0.803,0.804-0.803,2.104,0,2.907c0.802,0.803,2.104,0.803,2.907,0L29.732,10.57l26.223,26.223c0.401,0.398,0.93,0.604,1.455,0.604c0.522,0,1.051-0.201,1.452-0.604C59.665,35.988,59.665,34.689,58.862,33.886z"/>'+
                  '<path d="M52.979,36.245L31.185,14.449c-0.385-0.385-0.908-0.602-1.454-0.602c-0.545,0-1.068,0.217-1.453,0.602L6.484,36.245c-0.291,0.288-0.487,0.659-0.565,1.062c-0.061,0.314-0.091,0.633-0.091,0.942v10.638c0,2.739,2.229,4.971,4.969,4.971h10.638c1.378,0,2.707-0.582,3.645-1.599c0.854-0.923,1.324-2.12,1.324-3.373v-7.812c0-1.896,1.453-3.48,3.33-3.658c1.878,0.178,3.331,1.762,3.331,3.658v7.812c0,1.252,0.472,2.45,1.324,3.373c0.938,1.017,2.269,1.599,3.646,1.599h10.638c2.74,0,4.971-2.229,4.971-4.972V38.252c0-0.312-0.031-0.63-0.092-0.941C53.471,36.904,53.271,36.533,52.979,36.245z"/>'+
                  '</g></svg><i class="fa fa-angle-right"></i>'+
                  '<div id="name-item">Danh sách đề tài</div>'+
                  '<i class="fa fa-angle-right"></i>'+
                  '</div>';       
    $('#button-bar').empty();
    $('#button-bar').append(element);

    element = '<div class="chose-bar"><input id="input-search" type="text" src="" alt="" placeholder="Nhập mã đề tài">'+
              '<button id="search-index" style="background-color: tomato;" type="submit">Tìm kiếm</button>'+
              '<button  id="refresh-index"  style="background-color: slateblue;" type="submit">Làm mới</button>'+
              '</div>';              
    $('#chose-bar').empty();
    $('#chose-bar').append(element);

    element = '<tr><td>Mã đề tài</td><td>Tên đề tài</td><td>Sinh viên</td></tr>';
    for(var i = 0; i < data.length; i++){
        element = element + '<tr><td>'+data[i].maDeTai+'</td><td>'+data[i].tenDeTai+'</td><td>'+data[i].maSV+'</td> <td class="btn-co"><div id=row-'+i+' class="edit-co-btn">sửa</div><div id=row_'+i+' class="delete-co-btn">xóa</div></td> </tr>'
    }
    $('#table_data').empty();
    $('#table_data').append(element);
}


function LoadNavPage() {
    $('.nav-page').show();
    var element = '';
    for(var i = 1; i <= tol_page; i++){
        if(page_num == i)
        element = element + '<span id="chose-nav-item">'+i+'</span>';
        else
        element = element + '<span>'+i+'</span>';
    }
    $('.nav-page').empty();
    $('.nav-page').append(element);
}



//CLICK-----------------------------------------------
function EventTeacherClick(event) {
    var x = event.target;
    if(x.id == "detai-link" ){
        window.location.replace('/giangvien/detai');
        
    }
    if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn"  ||  x.parentNode.parentNode.parentNode.className == "return_btn" || x.className == "exit-btn"){
        loadListTieuban();
    }
    if(x.parentNode.className == "nav-page" ){
        page_num = Number(x.innerHTML)
        loadListTieuban();
    }   

}

//FIRST------------------------------------------
loadListAllDetai();