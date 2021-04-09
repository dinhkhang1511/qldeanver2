var listinfoitem;
var page_num = 1;
var tol_page = 0;

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/danhsachtieuban')){
                    var data = JSON.parse(this.responseText);
                    tol_page =   Math.ceil( Number(data[1]) / 2 );
                    LoadListTieuban(data[0]);
                    LoadNavPage();
                }
                if(String(this.responseURL).includes('api/dieukienthemtb')){
                    var data = JSON.parse(this.responseText);
                    LoadAddListTieuban(data)
                    console.log(data)
                }
                if(String(this.responseURL).includes('api/themtb')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Trùng mã sinh viên, Email hoặc field rỗng')
                    else
                        loadAddListTieuban();
                }

                if(String(this.responseURL).includes('api/suatb')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Email hoặc field rỗng')
                    else loadListTieuban();
                }

                if(String(this.responseURL).includes('api/xoatb')){
                    if(String(this.responseText) == '"that bai"')
                        alert('Email hoặc field rỗng')
                    else loadListTieuban();
                }

                if(String(this.responseURL).includes('/api/timmatb')){
                    if(String(this.responseText) == '"that bai"'){
                        alert('rỗng')
                    }else{
                        LoadListTieuban(JSON.parse(this.responseText));
                        $('.nav-page').hide();
                    }
                }
        }
    };

///LOAD----------------------------------------------------
function loadListTieuban(){
    xhttp.open("GET", "/api/danhsachtieuban?page="+page_num, false);
    xhttp.send();
}

function loadAddListTieuban() {
    xhttp.open("GET", "/api/dieukienthemtb", false);
    xhttp.send();
}


function addTieuban() {
    var matieuban = document.getElementById('matieuban').value;
    var mahoidong = document.getElementById('mahoidong').value;
    var thoigiantieuban = document.getElementById('thoigiantieuban').value;
    
    thoigiantieuban = String(thoigiantieuban).split('T')

    var ngay = thoigiantieuban[0];
    var gio = thoigiantieuban[1];


    if(isNumeric(matieuban)){
        xhttp.open("GET", "/api/themtb?matieuban="+matieuban+"&mahoidong="+mahoidong+"&ngay="+ngay+"&gio="+gio, false);
        xhttp.send();
    }else{
        alert("Mã tiểu ban phải là số")
    }
}


function updateListTieuban() {
    var matieuban =  document.getElementsByClassName('label-item-add').item(0).innerHTML;
    var mahoidong = document.getElementById('mahoidong').value;
    var thoigiantieuban = document.getElementById('thoigiantieuban').value;
    
    thoigiantieuban = String(thoigiantieuban).split('T')

    var ngay = thoigiantieuban[0];
    var gio = thoigiantieuban[1];

    if(isNumeric(matieuban)){
        xhttp.open("GET", "/api/suatb?matieuban="+matieuban+"&mahoidong="+mahoidong+"&ngay="+ngay+"&gio="+gio, false);
        xhttp.send();
    }else{
        alert("Mã tiểu ban phải là số");
    }
}

///ELEMENT-----------------------------------------------------
function LoadListTieuban(data) {
    listinfoitem = data;
    $('.Add-New-Row').hide();

    $('#button-bar').show();
    $('#chose-bar').show();
    $('#table_data').show();
    
    var element = '<svg height="20px"  viewBox="0 0 59.465 59.465" width="20px"><g>'+
                  '<path d="M58.862,33.886L45.045,20.069v-9.112c0-1.136-0.921-2.056-2.056-2.056c-1.137,0-2.057,0.92-2.057,2.056v5.001L31.185,6.21c-0.801-0.803-2.104-0.803-2.905,0L0.603,33.886c-0.803,0.804-0.803,2.104,0,2.907c0.802,0.803,2.104,0.803,2.907,0L29.732,10.57l26.223,26.223c0.401,0.398,0.93,0.604,1.455,0.604c0.522,0,1.051-0.201,1.452-0.604C59.665,35.988,59.665,34.689,58.862,33.886z"/>'+
                  '<path d="M52.979,36.245L31.185,14.449c-0.385-0.385-0.908-0.602-1.454-0.602c-0.545,0-1.068,0.217-1.453,0.602L6.484,36.245c-0.291,0.288-0.487,0.659-0.565,1.062c-0.061,0.314-0.091,0.633-0.091,0.942v10.638c0,2.739,2.229,4.971,4.969,4.971h10.638c1.378,0,2.707-0.582,3.645-1.599c0.854-0.923,1.324-2.12,1.324-3.373v-7.812c0-1.896,1.453-3.48,3.33-3.658c1.878,0.178,3.331,1.762,3.331,3.658v7.812c0,1.252,0.472,2.45,1.324,3.373c0.938,1.017,2.269,1.599,3.646,1.599h10.638c2.74,0,4.971-2.229,4.971-4.972V38.252c0-0.312-0.031-0.63-0.092-0.941C53.471,36.904,53.271,36.533,52.979,36.245z"/>'+
                  '</g></svg><i class="fa fa-angle-right"></i>'+
                  '<div id="name-item">Quản lý Tiểu ban</div>'+
                  '<i class="fa fa-angle-right"></i>'+
                  '<div class="add_new_btn" id="button-item">'+
                  '<svg height="15px" viewBox="0 0 349.03 349.031" width="15px"><g><path d="M349.03,141.226v66.579c0,5.012-4.061,9.079-9.079,9.079H216.884v123.067c0,5.019-4.067,9.079-9.079,9.079h-66.579c-5.009,0-9.079-4.061-9.079-9.079V216.884H9.079c-5.016,0-9.079-4.067-9.079-9.079v-66.579c0-5.013,4.063-9.079,9.079-9.079h123.068V9.079c0-5.018,4.069-9.079,9.079-9.079h66.579c5.012,0,9.079,4.061,9.079,9.079v123.068h123.067C344.97,132.147,349.03,136.213,349.03,141.226z"/></g></svg>'+
                  '<span>Thêm mới</span>'+
                  '</div>';       
    $('#button-bar').empty();
    $('#button-bar').append(element);

    element = '<div class="chose-bar"><input id="input-search" type="text" src="" alt="" placeholder="Nhập mã tiểu ban">'+
              '<button id="search-index" style="background-color: tomato;" type="submit">Tìm kiếm</button>'+
              '<button  id="refresh-index"  style="background-color: slateblue;" type="submit">Làm mới</button>'+
              '</div>';              
    $('#chose-bar').empty();
    $('#chose-bar').append(element);

    element = '<tr><td>Mã</td><td>Ngày</td><td>Giờ</td><td>Hội đồng</td></tr>';
    for(var i = 0; i < data.length; i++){
        element = element + '<tr><td>'+data[i].maTieuBan+'</td><td>'+data[i].ngay.replace('T17:00:00.000Z','')+'</td><td>'+data[i].gio+'</td><td>'+data[i].maHoiDong+' - '+data[i].tenHoiDong+'</td>  <td class="btn-co"><div id=row-'+i+' class="edit-co-btn">sửa</div><div id=row_'+i+' class="delete-co-btn">xóa</div></td> </tr>'
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


function LoadAddListTieuban(data ) {
    
    $('#chose-bar').hide();
    $('#table_data').hide();
    $('.nav-page').hide();

    $('#button-bar').show();
    $('.Add-New-Row').show();
    
    var element = '<svg height="20px"  viewBox="0 0 59.465 59.465" width="20px"><g>'+
                  '<path d="M58.862,33.886L45.045,20.069v-9.112c0-1.136-0.921-2.056-2.056-2.056c-1.137,0-2.057,0.92-2.057,2.056v5.001L31.185,6.21c-0.801-0.803-2.104-0.803-2.905,0L0.603,33.886c-0.803,0.804-0.803,2.104,0,2.907c0.802,0.803,2.104,0.803,2.907,0L29.732,10.57l26.223,26.223c0.401,0.398,0.93,0.604,1.455,0.604c0.522,0,1.051-0.201,1.452-0.604C59.665,35.988,59.665,34.689,58.862,33.886z"/>'+
                  '<path d="M52.979,36.245L31.185,14.449c-0.385-0.385-0.908-0.602-1.454-0.602c-0.545,0-1.068,0.217-1.453,0.602L6.484,36.245c-0.291,0.288-0.487,0.659-0.565,1.062c-0.061,0.314-0.091,0.633-0.091,0.942v10.638c0,2.739,2.229,4.971,4.969,4.971h10.638c1.378,0,2.707-0.582,3.645-1.599c0.854-0.923,1.324-2.12,1.324-3.373v-7.812c0-1.896,1.453-3.48,3.33-3.658c1.878,0.178,3.331,1.762,3.331,3.658v7.812c0,1.252,0.472,2.45,1.324,3.373c0.938,1.017,2.269,1.599,3.646,1.599h10.638c2.74,0,4.971-2.229,4.971-4.972V38.252c0-0.312-0.031-0.63-0.092-0.941C53.471,36.904,53.271,36.533,52.979,36.245z"/>'+
                  '</g></svg><i class="fa fa-angle-right"></i>'+
                  '<div id="name-item">Quản lý Tiểu ban</div>'+
                  '<i class="fa fa-angle-right"></i>'+
                  '<div id="name-item">Thêm mới</div><i class="fa fa-angle-right"></i>'+
                  '<div id="leave-btn" class="return_btn">'+
                  '<svg  height="15px" viewBox="0 0 489.394 489.394" width="15px">	<g><path d="M375.789,92.867H166.864l17.507-42.795c3.724-9.132,1-19.574-6.691-25.744c-7.701-6.166-18.538-6.508-26.639-0.879L9.574,121.71c-6.197,4.304-9.795,11.457-9.563,18.995c0.231,7.533,4.261,14.446,10.71,18.359l147.925,89.823c8.417,5.108,19.18,4.093,26.481-2.499c7.312-6.591,9.427-17.312,5.219-26.202l-19.443-41.132h204.886c15.119,0,27.418,12.536,27.418,27.654v149.852c0,15.118-12.299,27.19-27.418,27.19h-226.74c-20.226,0-36.623,16.396-36.623,36.622v12.942c0,20.228,16.397,36.624,36.623,36.624h226.74c62.642,0,113.604-50.732,113.604-113.379V206.709C489.395,144.062,438.431,92.867,375.789,92.867z"/></g></svg><span >Trở lại</span></div>';
    $('#button-bar').empty();
    $('#button-bar').append(element);



    var listhoidong = '<select id="mahoidong" class="combo-box-add">';
    for(let i =0; i < data.length;i++){
        listhoidong = listhoidong + '<option value="'+data[i].maHoiDong+'">'+data[i].maHoiDong+'</option>'
    }
    listhoidong = listhoidong + '</select>'
    var element =
    '<div id="label-Add-New">Thêm mới tiểu ban</div>'+
    '<div><span>Mã tiểu ban: </span><span><input id="matieuban" class="input-new-row-short" type="text" ></span></div>'+
    '<div><span>Mã hội đồng: </span><span>'+listhoidong+'</span></div>'+ 
    '<div><span>Thời gian: </span><span>  <input type="datetime-local" class="thoigianform" id="thoigiantieuban" >  </span></div>'+
    '<div><button class="add_row_tb_btn" type="submit">Thêm</button><button  class="exit-btn" type="submit">Thoát</button></div>';
    $('.Add-New-Row').empty();
    $('.Add-New-Row').append(element);
}



function LoadUpdateListTieuban(data,data1) {
    $('#chose-bar').hide();
    $('#table_data').hide();
    $('.nav-page').hide();

    $('#button-bar').show();
    $('.Add-New-Row').show();


    var element = '<svg height="20px"  viewBox="0 0 59.465 59.465" width="20px"><g>'+
    '<path d="M58.862,33.886L45.045,20.069v-9.112c0-1.136-0.921-2.056-2.056-2.056c-1.137,0-2.057,0.92-2.057,2.056v5.001L31.185,6.21c-0.801-0.803-2.104-0.803-2.905,0L0.603,33.886c-0.803,0.804-0.803,2.104,0,2.907c0.802,0.803,2.104,0.803,2.907,0L29.732,10.57l26.223,26.223c0.401,0.398,0.93,0.604,1.455,0.604c0.522,0,1.051-0.201,1.452-0.604C59.665,35.988,59.665,34.689,58.862,33.886z"/>'+
    '<path d="M52.979,36.245L31.185,14.449c-0.385-0.385-0.908-0.602-1.454-0.602c-0.545,0-1.068,0.217-1.453,0.602L6.484,36.245c-0.291,0.288-0.487,0.659-0.565,1.062c-0.061,0.314-0.091,0.633-0.091,0.942v10.638c0,2.739,2.229,4.971,4.969,4.971h10.638c1.378,0,2.707-0.582,3.645-1.599c0.854-0.923,1.324-2.12,1.324-3.373v-7.812c0-1.896,1.453-3.48,3.33-3.658c1.878,0.178,3.331,1.762,3.331,3.658v7.812c0,1.252,0.472,2.45,1.324,3.373c0.938,1.017,2.269,1.599,3.646,1.599h10.638c2.74,0,4.971-2.229,4.971-4.972V38.252c0-0.312-0.031-0.63-0.092-0.941C53.471,36.904,53.271,36.533,52.979,36.245z"/>'+
    '</g></svg><i class="fa fa-angle-right"></i>'+
    '<div id="name-item">Quản lý Sinh viên</div>'+
    '<i class="fa fa-angle-right"></i>'+
    '<div id="name-item">Sửa</div><i class="fa fa-angle-right"></i>'+
    '<div id="leave-btn" class="return_btn">'+
    '<svg  height="15px" viewBox="0 0 489.394 489.394" width="15px">	<g><path d="M375.789,92.867H166.864l17.507-42.795c3.724-9.132,1-19.574-6.691-25.744c-7.701-6.166-18.538-6.508-26.639-0.879L9.574,121.71c-6.197,4.304-9.795,11.457-9.563,18.995c0.231,7.533,4.261,14.446,10.71,18.359l147.925,89.823c8.417,5.108,19.18,4.093,26.481-2.499c7.312-6.591,9.427-17.312,5.219-26.202l-19.443-41.132h204.886c15.119,0,27.418,12.536,27.418,27.654v149.852c0,15.118-12.299,27.19-27.418,27.19h-226.74c-20.226,0-36.623,16.396-36.623,36.622v12.942c0,20.228,16.397,36.624,36.623,36.624h226.74c62.642,0,113.604-50.732,113.604-113.379V206.709C489.395,144.062,438.431,92.867,375.789,92.867z"/></g></svg><span >Trở lại</span></div>';
    $('#button-bar').empty();
    $('#button-bar').append(element);

    console.log(data , data1)

    var gio = data1.gio.split(':');
    gio = gio[0] + ':' + gio[1];
    var ngay = data1.ngay.replace('T17:00:00.000Z','')



    var listhoidong = '<select id="mahoidong" class="combo-box-add">';
    for(let i =0; i < data.length;i++){
        listhoidong = listhoidong + '<option value="'+data[i].maHoiDong+'">'+data[i].maHoiDong+'</option>'
    }
    listhoidong = listhoidong + '</select>'
    var element =
    '<div id="label-Add-New">Thêm mới tiểu ban</div>'+
    '<div><span>Mã tiểu ban: </span><span><span class="label-item-add">'+data1.maTieuBan+'</span></span></div>'+
    '<div><span>Mã hội đồng: </span><span>'+listhoidong+'</span></div>'+ 
    '<div><span>Thời gian: </span><span>  <input type="datetime-local" class="thoigianform" id="thoigiantieuban" value="'+ngay+'T'+gio+'">  </span></div>'+
    '<div><button class="update_row_tb_btn" type="submit">Sửa</button><button class="exit-btn" type="submit">Thoát</button></div>';

    $('.Add-New-Row').empty();
    $('.Add-New-Row').append(element);

}



//CLICK-----------------------------------------------
function EventAdminClick(event) {
    var x = event.target;
    if(x.className == "return_btn" || x.parentNode.className == "return_btn" || x.parentNode.parentNode.className == "return_btn"  ||  x.parentNode.parentNode.parentNode.className == "return_btn" || x.className == "exit-btn"){
        loadListTieuban();
    }
    if(x.parentNode.className == "nav-page" ){
        page_num = Number(x.innerHTML)
        loadListTieuban();
    }   

    if(x.className == "add_new_btn" || x.parentNode.className == "add_new_btn" || x.parentNode.parentNode.className == "add_new_btn" ||  x.parentNode.parentNode.parentNode.className == "add_new_btn"){
        loadAddListTieuban();
    }
    if(x.className == "add_row_tb_btn"){
        addTieuban();
    }


    if(x.className == "edit-co-btn" ){
        $.getJSON("/api/dieukienthemtb", function (data) {
            LoadUpdateListTieuban(data, listinfoitem[Number(String(x.id).replace('row-', ''))] )
        });
    }
    if(x.className == "update_row_tb_btn"){
        updateListTieuban();
    }

    if(x.className == "delete-co-btn"){
        xhttp.open("GET", "/api/xoatb?matieuban="+listinfoitem[Number(String(x.id).replace('row_', ''))].maTieuBan, false);
        xhttp.send();
    }

    if(x.id == "search-index"){
        xhttp.open("GET", "/api/timmatb?matieuban="+document.getElementById("input-search").value , false);
        xhttp.send();
    }
    if(x.id == "refresh-index"){
        page_num = 1;
        loadListTieuban();
    }
}

//FIRST------------------------------------------
loadListTieuban()