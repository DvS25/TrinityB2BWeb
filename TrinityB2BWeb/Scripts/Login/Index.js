function Datafeedback() {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=FEEDBACK_GET&sord=desc&sidx=CREATEDDATE&searchOper=eq&searchField=ISACTIVE&searchString=1&_search=true&IsRecordAll=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#feedbackslider").append($("#datafeedbackslider").render(JsonObject.serviceresponse.detailslist.details));
                        $('#feedbackslider').owlCarousel({
                            items: 2,
                            autoPlay: 4500,
                            singleItem: false,
                            navigation: false,
                            navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
                            pagination: true,
                            transitionStyle: "fade"
                        });
                        $(".rateyo").each(function () {
                            var id = $(this).attr('id');
                            var Rowid = id.split("rating");
                            var total = $("#star" + Rowid[1]).val();
                            $("#" + id).rateYo({
                                readOnly: true,
                                rating: total,
                                numStars: 5,
                                precision: 0,
                                minValue: 1,
                                maxValue: 5,
                                starWidth: "25px",
                                spacing: "2px",
                                normalFill: "#A0A0A0",
                                ratedFill: "#F39C12 ",
                                halfStar: false
                            });
                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
      
    })
}
function SubmitNewsLetter() {
    var isValid = $("#formnews").valid();
    if (!isValid) {
        if ($("#txtnewsemail").val() == "") {
            $("#txtnewsemail-error").insertAfter($("#txtnewsemail").parent());
            $("#txtnewsemail-error").css("float", "left");
        }
        return;
    }
    var data = {
        "oper": "add",
        "NEWLETTEREMAILID": $("#txtnewsemail").val(),
        
    };
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=NEWLETTER_CRUD",
        data: data,
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                OperationMessage("", 'Your data saved successfully', 'success');
                $("#txtnewsemail").val("");
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError,
    });
}
function Logoutmsg() {
    if ($("#logouttotser").val() != "" && $("#hiddenlogsession").val() != "0")
    {
        $.ajax({
            url: getDomain() + '/Login/Login_Out',
            async: false,
            cache: false,
            success: function (data) {
                if (data = "success") {
                    OperationMessage("", $("#logouttotser").val(), 'success');
                    $("#logouttotser").val("");
                }
            }
        });
    }
}
function womanscollection() {
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_WOMAN_COLLECTION_GET&sord=desc&sidx=WOMAN_COLLECTION_ID&searchOper=eq&searchField=ISACTIVE&searchString=1&_search=true&IsRecordAll=true",
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                var JsonObject = xml2json.parser(data);

                if (JsonObject.serviceresponse.ourspeciality) {
                    $("#div_OurServices").append($("#render_OurServices").render(JsonObject.serviceresponse.ourspeciality.details));
                }

                if (JsonObject.serviceresponse.ourparties) {
                    $("#clientlogoslider").append($("#render_clientlogo").render(JsonObject.serviceresponse.ourparties.details));

                    $('#clientlogoslider').owlCarousel({
                        items: 5,
                        autoPlay: false,
                        singleItem: false,
                        navigation: true,
                        navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
                        pagination: false,
                        transitionStyle: "fade"
                    });
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}

$(document).ready(function () {
    Logoutmsg();
    $('#slideshow0').owlCarousel({
        items: 6,
        autoPlay: 4500,
        singleItem: true,
        navigation: true,
        navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
        pagination: false,
        transitionStyle: "fade"
    });
    $('#slideshow1').owlCarousel({
        items: 6,
        autoPlay: 4500,
        singleItem: true,
        navigation: true,
        navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
        pagination: false,
        transitionStyle: "fade"
    });
    womanscollection();
    Datafeedback();
    $('.featured_products_carousel_tab').owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        autoWidth: true,
        pagination: false,
        navigation: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    });

    $('.latest_products_carousel_tab').owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        autoWidth: true,
        pagination: false,
        navigation: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    });

    $('.bestseller_products_carousel_tab').owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        autoWidth: true,
        pagination: false,
        navigation: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    });

    $('.special_products_carousel_tab').owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        autoWidth: true,
        pagination: false,
        navigation: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    });


    //$('#clientlogoslider').owlCarousel({
    //    items: 5,
    //    autoPlay: false,
    //    singleItem: false,
    //    navigation: true,
    //    navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
    //    pagination: false,
    //    transitionStyle: "fade"
    //});
});