$(document).ready(function () {
    /*------Home Slider start----------*/
    $("#Gallerycompany").owlCarousel({
        slideSpeed: 500,
        items: 4,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [992, 3],
        itemsMobile: [767, 2],
        itemsMobileSmall: [480, 1],
        autoWidth: true,
        loop: true,
        pagination: false,
        navigation: true,
        navigationText: [
            "<i class='fa fa-caret-left'></i>",
            "<i class='fa fa-caret-right'></i>"
        ],
        stopOnHover: true
    });
    /*--------Home Slider End-------*/
    $(".js-zoom-gallery").length > 0 && $(".js-zoom-gallery").each(function () {
        $(this).magnificPopup({
            delegate: ".js-zoom-gallery__item",
            type: "image",
            gallery: {
                enabled: !0
            },
            mainClass: "mfp-with-zoom",
            zoom: {
                enabled: !0,
                duration: 300,
                easing: "ease-in-out",
                opener: function (e) {
                    return e.is("img") ? e : e.find("img")
                }
            }
        })
    }),
    $(".js-zoom-images").length > 0 && $(".js-zoom-images").magnificPopup({
        type: "image",
        mainClass: "mfp-with-zoom",
        zoom: {
            enabled: !0,
            duration: 300,
            easing: "ease-in-out",
            opener: function (e) {
                return e.is("img") ? e : e.find("img")
            }
        }
    })
    var token = '2200891241.cceb4d3.77c978b6b7bd443ba87b87ccf463e20c',
        userid = 2200891241,
        num_photos = 9;
    $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent',
        dataType: 'jsonp',
        type: 'GET',
        data: {
            access_token: token,
            count: num_photos
        },
        success: function (data) {
            console.log(data);
            for (x in data.data) {
                $('#instgramdiv').append('<div class="widget-gallery__item"><a class="widget-gallery__img js-zoom-gallery__item" href="' + data.data[x].images.standard_resolution.url + '"><img src="' + data.data[x].images.thumbnail.url + '"></a></li>');
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=1139932366163992';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});
function numbersOnly(Sender, evt, isFloat, isNegative) {
    if (Sender.readOnly) return false;

    var key = evt.which || !window.event ? evt.which : event.keyCode;
    var value = Sender.value;

    if ((key == 46 || key == 44) && isFloat) {
        var selected = document.selection ? document.selection.createRange().text : "";
        if (selected.length == 0 && value.indexOf(".") == -1 && value.length > 0) Sender.value += ".";
        return false;
    }
    if (key == 45) { // minus sign '-'
        if (!isNegative) return false;
        if (value.indexOf('-') == -1) Sender.value = '-' + value; else Sender.value = value.substring(1);
        if (Sender.onchange != null) {
            if (Sender.fireEvent) {
                Sender.fireEvent('onchange');
            } else {
                var e = document.createEvent('HTMLEvents');
                e.initEvent('change', false, false);
                Sender.dispatchEvent(e);
            }
        }
        var begin = Sender.value.indexOf('-') > -1 ? 1 : 0;
        if (Sender.setSelectionRange) {
            Sender.setSelectionRange(begin, Sender.value.length);
        } else {
            var range = Sender.createTextRange();
            range.moveStart('character', begin);
            range.select();
        }

        return false;
    }
    if (key > 31 && (key < 48 || key > 57)) return false;
}
function BindDropdown(ddl, optionList, url, selectText) {
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {

                if (selectText != '')
                    $("#" + ddl).html("<option value='' selected disabled hidden >" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detaillist != undefined) {
                    $("#" + ddl).append($("#" + optionList).render(JsonObject.serviceresponse.detaillist.detail));
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function OperationMessage(title, message, type) {
    var timeout = 3000;
    if (type == 'warning') {
        timeout = 4000;
    }
    else if (type == 'info') {
        timeout = 10000;
    }
    var positionClass = "toast-top-center";
    if (message.length > 50)
        positionClass = "toast-top-full-width";
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": positionClass,
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": timeout,
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[type](message, title);
}
/*=============================================================================
     Sweet Alert message Function for Success, Warning, and Info Added By Nirupa
==============================================================================*/

function notificationsweetMessage(title, message, type) {
    swal({
        title: title,
        text: message,
        type: type,
        showCancelButton: false,
        html: true,
    });
}
//function TosterMessage(title, message, type) {

//    toastify.on = {
//        "padding": "12px 20px",
//        "color": "#ffffff",
//        "display": "inline-block",
//        "box-shadow": "0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3)",
//        "background": "-webkit-linear-gradient(315deg, #73a5ff, #5477f5)",
//        "background": "linear-gradient(135deg, #73a5ff, #5477f5)",
//        "position": "fixed",
//        "top": "-150px",
//        "right": "15px",
//        "opacity": "0",
//        "transition": "al 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)",
//        "border-radius": "2px",
//        "cursor": "pointer"
//    }
//    Toastify(message, title);

//}
// To display messages in different types like success, error, info, warning



//function notificationMessageToster(message, type) {
//    $("body").overhang({
//        type: type,    //success,error,warn,info,prompt,confirm
//        message: message,  
//    });
//}
var xmlvars = {};
Object.defineProperty(xmlvars, 'common_colmap', {
    get: function () {
        return 'DETAILSLIST>DETAILS>';
    },
});
Object.defineProperty(xmlvars, 'common_root', {
    get: function () {
        return 'DETAILSLIST';
    },
});
Object.defineProperty(xmlvars, 'common_row', {
    get: function () {
        return 'DETAILS';
    },
});
Object.defineProperty(xmlvars, 'common_response', {
    get: function () {
        return 'SERVICERESPONSE>';
    },
});
function InvalidResponseCode(data) {
    var code = $(data).find('RESPONSECODE').text();
    var msg = '';

    if (code == "-405") {
        window.location.href = getDomain() + "/Login/LogOut?code=-405";
    }
    else if (code == "-406") {
        window.location.href = getDomain() + "/Login/LogOut";
    }
    else if (code != "0") {
        msg = "<div><b>Response Code:</b> " + code + "</div>";
        msg += "<div><br /><b>Response Message:</b> " + $(data).find('RESPONSEMESSAGE').text() + "</div>";

        OperationMessage('VALIDATION RESPONSECODE', msg, 'error');
        //notificationMessageToster('VALIDATION RESPONSECODE', msg, "error");
    }
}
function OnError(xhr, errorType, exception) {
    var responseText;
    var ErrorDetail = "";

    try {
        responseText = jQuery.parseJSON(xhr.responseText);

        ErrorDetail = "<div><b>" + errorType + " " + exception + "</b></div>";
        ErrorDetail += "<div><b>Exception</b>: " + responseText.ExceptionType + "</div>";
        ErrorDetail += "<div><b>StackTrace</b>: " + responseText.StackTrace + "</div>";
        ErrorDetail += "<div><b>Message</b>: " + responseText.Message + "</div>";
    } catch (e) {
        ErrorDetail = "<div><b>Error Message</b>: " + xhr.responseText + "</div>";
    }

    if (ErrorDetail.indexOf('-405') > 0) {
        //window.location.href = getDomain() + "/Login/LogOut?code=-405";
    }
    else {
        //notificationMessage 
        OperationMessage('AJAX ERROR RESPONSE', ErrorDetail, 'error');
        //notificationMessageToster('AJAX ERROR RESPONSE',ErrorDetail, "error");
    }
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

// To decode HTML text format tag to actual tag. like &lt; to <
function htmlDecode(value) {
    return $('<div/>').html(value).text();
}
