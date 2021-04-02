$("body").click(function(e) {
    var url_string = window.location.href;
    
    if(url_string.includes('/admin')) EventAdminClick(e);
});