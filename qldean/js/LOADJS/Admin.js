
var maQuanLy;
if(typeof GetUrlParameter('maQuanLy') !== "undefined"){
    maQuanLy = String(GetUrlParameter('maQuanLy'));
}


var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(String(this.responseURL).includes('api/admininf'));
                data = JSON.parse(this.responseText);
                console.log(data)
                // number_page = list_tap.number
                // list_tap = list_tap.data;
                // LoadElement();
        }
    };

function load(){
    xhttp.open("GET", "api/admininfo?maQuanLy="+maQuanLy, false);
    xhttp.send();
}

function LoadElement() {
    // if(page === 0 ) page = 1;
    // $('.content_tray_newep').empty();
    // for(var i = 0; i < list_tap.length ; i++){
    //     var elements = '<a href="/xemphim?sotap='+list_tap[i].so_tap+'"><div><div></div><div class="item_content_tray_newep"><span class="ep_item_content_tray_newep"> tập ' + list_tap[i].so_tap + '</span><div><span>'+decode_utf8(list_tap[i].ten_tap)+'</span><span> ' +list_tap[i].luot_xem+ ' lượt xem</span></div></div><img src="'+decode_utf8(list_tap[i].anh_bia)+'" alt="One Piece - tập '+list_tap[i].so_tap+' - '+decode_utf8(list_tap[i].ten_tap)+'"></div></a>'
    //     $('.content_tray_newep').append(elements);
    // } 
    // loadNumber();
}


load();



