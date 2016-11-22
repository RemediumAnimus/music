var cookie_prefix="gsr_blind_";
function createCookie(name, value, expires) {
    if (!expires){
        var days=356;
        var expires = new Date();
        expires.setDate(expires.getDate() + days);
    }
    document.cookie = name+"="+value+"; expires="+expires.toGMTString()+";path=/";
}
function setCookie(name, value, expires, path, domain, secure) {
    if (!name || !value) return false;
    var str = name + '=' + encodeURIComponent(value);

    if (expires) str += '; expires=' + expires.toGMTString();
    if (path)    str += '; path=' + path;
    if (domain)  str += '; domain=' + domain;
    if (secure)  str += '; secure';

    document.cookie = str;
    return true;
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name,"",new Date(0));
}
$(document).ready(function() {

    $("input:radio[name|='font_size[]']").each(function(){
        $(this).bind('change', function() {
            var classes="normal-fs large-fs";
            $("body").removeClass(classes);
            var cookie_name = cookie_prefix + "fs";
            eraseCookie(cookie_name);
            if(this.id != "normal"){
                $("body").addClass(this.id+"-fs");
                createCookie(cookie_name, this.id+"-fs");
            }
        });
    });

    $('.n-sidebar__vision').click(function(e){
        e.preventDefault();
        var cookie_name = cookie_prefix + "fs";
        if (!$(this).hasClass('normal-vision')) {
            $(this).addClass('hide');
            $('.normal-vision').removeClass('hide');
            $("body").addClass("large-fs kern_large");
            createCookie(cookie_name, "large-fs");
            return;
        }

        $(this).addClass('hide');
        $('.large-vision').removeClass('hide');
        $("body").removeClass("large-fs kern_large");
        eraseCookie(cookie_name);
    });
});

