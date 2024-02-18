var Masterproductlistview = {
    variables: {
        Applyfilter: 0,
        designno: "",
        goldpurity: "",
        goldcolor: "",
        diamondshape: "",
        diamondselectsize: "",
        diamondselectcharni: "",
        totalsize: "",
        totalcharni: "",
        diamondminweight: "0.01",
        diamondmaxweight: "5.00",
        goldminweight: "0.51",
        goldmaxweight: "30.00",
        pricemin: "0",
        pricemax: "100000",
    },
    Bindproductlist: function (sortorder, sortcolumn) {

        var totalrecords, shownrecords, remainingorders;
        $(".loadingtrinity").show();
        var myfilter, url;
        myfilter = { rules: [] };
        if (Masterproductlistview.variables.Applyfilter == 1) {
            if (Masterproductlistview.variables.diamondminweight != "0.01" || Masterproductlistview.variables.diamondmaxweight != "5.00") {
                myfilter.rules.push({ field: "DMINWEIGHT", op: "eq", data: Masterproductlistview.variables.diamondminweight });
                myfilter.rules.push({ field: "DMAXWEIGHT", op: "eq", data: Masterproductlistview.variables.diamondmaxweight });
            }
            if (Masterproductlistview.variables.goldminweight != "0.51" || Masterproductlistview.variables.goldmaxweight != "30.00") {
                myfilter.rules.push({ field: "GMAXWEIGHT", op: "eq", data: Masterproductlistview.variables.goldmaxweight });
                myfilter.rules.push({ field: "GMINWEIGHT", op: "eq", data: Masterproductlistview.variables.goldminweight });
            }
            if (Masterproductlistview.variables.pricemin != "0" || Masterproductlistview.variables.pricemax != "100000") {
                myfilter.rules.push({ field: "MAXPRICE", op: "eq", data: Masterproductlistview.variables.pricemax });
                myfilter.rules.push({ field: "MINPRICE", op: "eq", data: Masterproductlistview.variables.pricemin });
            }

            myfilter.rules.push({ field: "SHAP", op: "eq", data: $("#hidenshapename").val() });
            myfilter.rules.push({ field: "SIZERANGE", op: "eq", data: Masterproductlistview.variables.diamondselectsize });
            myfilter.rules.push({ field: "CHARNIRANGE", op: "eq", data: Masterproductlistview.variables.diamondselectcharni });
            myfilter.rules.push({ field: "GPURITY", op: "eq", data: Masterproductlistview.variables.goldpurity });
            myfilter.rules.push({ field: "GCOLOR", op: "eq", data: Masterproductlistview.variables.goldcolor });
            myfilter.rules.push({ field: "DESIGNNORANGE", op: "eq", data: Masterproductlistview.variables.designno });
        }
        if ($("#typeofcategory").val() == "category") {
            myfilter.rules.push({ field: "CATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "search") {
            myfilter.rules.push({ field: "KEYWORD", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "collection") {
            myfilter.rules.push({ field: "COLLECTIONKEYWORD", op: "eq", data: $("#hiddencollectionkeyword").val() });
            myfilter.rules.push({ field: "DESIGNNORANGE", op: "eq", data: $("#hiddencollectiondesignno").val() });
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        else {
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        myfilter.rules.push({ field: "STOCKTYPE", op: "eq", data: $("input[name='vpradio']:checked").val() });

        url = "/Common/BindMastersDetails?ServiceName=APP_CATEGORY_DESIGN_MASTER_GET&page=1&rows=32&ColumnRequested=DESIGNNO,IMAGEPATH,PRICE,GPURITY,ISWISH,G_WEIGHT,DIAMONDWEIGHT,RATESTAR&sord=" + sortorder + "&sidx=" + sortcolumn + "&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: getDomain() + url,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $("#productlistdata").html("");
                    $("#productlistdata").css("margin-top", "0px");
                    if (JsonObject.serviceresponse.totalrecords > 0) {
                        $("#recordcount").show();
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#productlistdata").html("");
                            $("#productlistdata").append($("#Dataproductlist").render(JsonObject.serviceresponse.detailslist.details));
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
                                    starWidth: "17px",
                                    spacing: "2px",
                                    normalFill: "#A0A0A0",
                                    ratedFill: "#F39C12 ",
                                    halfStar: false
                                });
                            });
                            $(".indianprice").each(function () {
                                var id = $(this).attr('id');
                                var Rowid = id.split("indianprice");
                                var totalp = $("#ipr" + Rowid[1]).val();
                                var convertint = parseFloat(totalp).toLocaleString(getDisplayLanguage(), {
                                    style: 'currency', currency: getCurrencyCode(),
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                $("#" + id).html(convertint);
                            });
                            $("#design_row_no").val("2");
                            totalrecords = parseFloat(JsonObject.serviceresponse.totalrecords);
                            shownrecords = parseFloat($("#productlistdata .orderrow").length);
                            $("#recordcount").html(shownrecords + " of " + totalrecords + " Designs");
                            if (totalrecords > 32) {
                                $("#viewmordesign").show();
                            }
                            else {
                                $("#viewmordesign").hide();
                            }
                           
                        }
                    }
                    else {
                        $("#productlistdata").html("There are no designs you are looking for..");
                        $("#productlistdata").css("text-align", "center");
                        $("#productlistdata").css("margin-top", "30px");
                        $("#recordcount").hide();
                        $("#viewmordesign").hide();
                    }
                    $(".loadingtrinity").hide();
                }
                else {
                    $(".loadingtrinity").hide();
                    InvalidResponseCode(data);
                }
            },
            error: OnError,
            complete: function (xhr, errorType) {
                $(".loadingtrinity").hide();
            }
        });
    },
    LoadMore: function (sortorder, sortcolumn) {
        var totalrecords, shownrecords, remainingorders;
        $(".loadingtrinity").show();
        var val = $("#design_row_no").val();
        var myfilter, url;
        myfilter = { rules: [] };
        if ($("#typeofcategory").val() == "category") {
            myfilter.rules.push({ field: "CATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "search") {
            myfilter.rules.push({ field: "KEYWORD", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "collection") {
            myfilter.rules.push({ field: "COLLECTIONKEYWORD", op: "eq", data: $("#hiddencollectionkeyword").val() });
            myfilter.rules.push({ field: "DESIGNNORANGE", op: "eq", data: $("#hiddencollectiondesignno").val() });
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        else {
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        myfilter.rules.push({ field: "STOCKTYPE", op: "eq", data: $("input[name='vpradio']:checked").val() });
        url = "/Common/BindMastersDetails?ServiceName=APP_CATEGORY_DESIGN_MASTER_GET&page=" + val + "&rows=32&ColumnRequested=DESIGNNO,IMAGEPATH,PRICE,GPURITY,ISWISH,G_WEIGHT,DIAMONDWEIGHT,RATESTAR&sord=" + sortorder + "&sidx=" + sortcolumn + "&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: getDomain() + url,
            data: "",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.totalrecords > 0) {
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            var windowscroll = $(document).scrollTop();
                            $("#productlistdata").append($("#Dataproductlist").render(JsonObject.serviceresponse.detailslist.details));
                            $(document).scrollTop(windowscroll);
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
                                    starWidth: "17px",
                                    spacing: "2px",
                                    normalFill: "#A0A0A0",
                                    ratedFill: "#F39C12 ",
                                    halfStar: false
                                });
                            });
                            $(".indianprice").each(function () {
                                var id = $(this).attr('id');
                                var Rowid = id.split("indianprice");
                                var totalp = $("#ipr" + Rowid[1]).val();
                                var convertint = parseFloat(totalp).toLocaleString(getDisplayLanguage(), {
                                    style: 'currency', currency: getCurrencyCode(),
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                $("#" + id).html(convertint);
                            });
                            $("#design_row_no").val(Number(val) + 1);
                            totalrecords = parseFloat(JsonObject.serviceresponse.totalrecords);
                            shownrecords = parseFloat($("#productlistdata .orderrow").length);
                            $("#recordcount").html(shownrecords + " of " + totalrecords + " Designs");
                            remainingorders = totalrecords - shownrecords;
                            if (remainingorders == 0) {
                                $("#viewmordesign").hide();
                            }
                        }
                    }
                    $(".loadingtrinity").hide();
                }
                else {
                    $(".loadingtrinity").hide();
                    InvalidResponseCode(data);
                }

            },
        });
    },
    Diamonshap: function () {
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "SIZESHAPECHARNI", op: "eq", data: 'SHAPE' });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=CHARNI_MASTER_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#diamondallshape").html("");
                        $("#diamondallshape").append($("#Datadiamondallshape").render(JsonObject.serviceresponse.detailslist.details));
                        if (Masterproductlistview.variables.Applyfilter == 1) {
                            var id = $("#hidenshapename").val();
                            if (id != "") {
                                $(".dvshape").removeClass('shapeactive');
                                $("#" + id).addClass('shapeactive');
                                $('.dsizeclass').children().removeClass("disabled");
                                $('.dcharniclass').children().removeClass("disabled");
                            }

                        }
                        else {
                            Shapeclick("RBC");
                        }
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BindGolddata: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_CUSTOMIZE_MASTER_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#txtgoldpurity").html("");
                $("#txtgoldcolor").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.goldlist != undefined) {
                        $("#txtgoldpurity").append($("#Datagoldpurity").render(JsonObject.serviceresponse.goldlist.gold));
                        if (Masterproductlistview.variables.goldpurity != "") {
                            $('.goldp').not(this).prop('checked', false);
                            $('#' + Masterproductlistview.variables.goldpurity).prop('checked', true);
                        }
                    }
                    if (JsonObject.serviceresponse.goldcolorlist != undefined) {
                        $("#txtgoldcolor").append($("#Datagoldcolor").render(JsonObject.serviceresponse.goldcolorlist.goldcolor));
                        if (Masterproductlistview.variables.goldcolor != null) {
                            $('.goldc').not(this).prop('checked', false);
                            $('#' + Masterproductlistview.variables.goldcolor).prop('checked', true);
                        }
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BindDiamondSize: function (id) {
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "SIZESHAPECHARNI", op: "eq", data: 'SIZE' });
        myfilter.rules.push({ field: "SHAP", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=CHARNI_MASTER_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#txtdiamondsize").html('');
                $("#txtdiamondcharni").html('');
                $('.dsizeclass').children().addClass("disabled");
                $('.dcharniclass').children().addClass("disabled");
                $("#txtdiamondsize").html("<option value='' selected disabled hidden >Select Size</option>");
                Masterproductlistview.variables.totalsize = 0;
                Masterproductlistview.variables.totalcharni = 0;
                $("#txtdiamondsize").hide();
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    Masterproductlistview.variables.totalsize = JsonObject.serviceresponse.totalrecords;
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $('.dsizeclass').children().removeClass("disabled");
                        $("#txtdiamondsize").append($("#DataDiamondsize").render(JsonObject.serviceresponse.detailslist.details));
                    } else {
                        $("#txtdiamondsize").hide();
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BindDiamondCharni: function (id, sizevalue) {
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "SIZESHAPECHARNI", op: "eq", data: 'CHARNI' });
        myfilter.rules.push({ field: "SIZE", op: "eq", data: sizevalue });
        myfilter.rules.push({ field: "SHAP", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=CHARNI_MASTER_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#txtdiamondcharni").html('');
                Masterproductlistview.variables.totalcharni = 0;
                $('.dcharniclass').children().addClass("disabled");
                $("#txtdiamondcharni").hide();
                $('#txtdiamondcharni').dropdown("clear");
                $("#txtdiamondcharni").html("<option value='' selected disabled hidden >Select charni</option>");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    Masterproductlistview.variables.totalcharni = JsonObject.serviceresponse.totalrecords;
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $('.dcharniclass').children().removeClass("disabled");
                        $("#txtdiamondcharni").html($("#Datadiamondcharni").render(JsonObject.serviceresponse.detailslist.details));
                    }
                    if (JsonObject.serviceresponse.scharnilist != undefined) {
                        if (JsonObject.serviceresponse.scharnilist.length != undefined) {
                            $('.dcharniclass').children().removeClass("disabled");
                            var ServiceType = [];
                            strVale = JsonObject.serviceresponse.scharnilist;
                            var strings = strVale.split(",");
                            $("#txtdiamondcharni").dropdown('set selected', strings);
                        }
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    Bindwishlist: function (design) {
        if ($("input[name='vpradio']:checked").val() == "Virtual") {
            var stock = "0";
        }
        else {
            stock = "1";
        }
        var data = {
            "oper": "add",
            "ISPHYSICALSTOCK": stock,
            "DATAFROM": "WishList",
            "DESIGNCODE": design,
            "ISCUSTOMIZE": "0",
            "QUANTITY": "1"
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SHOPPINGCART_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    if ($("#heart" + design).hasClass('fa fa-heart-o')) {
                        $("#heart" + design).removeClass('fa fa-heart-o');
                        $("#heart" + design).addClass('fa fa-heart');
                        OperationMessage("", "Product is added to wishlist", "success");
                    }
                    else {
                        $("#heart" + design).removeClass('fa fa-heart');
                        $("#heart" + design).addClass('fa fa-heart-o');
                        OperationMessage("", "Product is removed to wishlist", "success");
                    }
                    CartWishlistCount();
                }
            },
            error: OnError,
        });
    },
    Bindcartlist: function (design) {
        if ($("input[name='vpradio']:checked").val() == "Virtual") {
            var stock = "0";
        }
        else {
            stock = "1";
        }
        var data = {
            "oper": "add",
            "ISPHYSICALSTOCK": stock,
            "DATAFROM": "cart",
            "DESIGNCODE": design,
            "ISCUSTOMIZE": "0",
            "QUANTITY": "1"
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SHOPPINGCART_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#cart" + design).addClass('cartcolor');
                    OperationMessage("", "Product is added to cart", "success");
                }
                CartWishlistCount();
            },
            error: OnError,
        });
    },
    diamonslider: function () {
        var minSliderValue = $("#txtMin").val();
        var maxSliderValue = $("#txtMax").val();
        $('#diamondslider').slider('destroy');
        $('#diamondslider').slider({
            min: 0.01,
            max: 5.00,
            value: [parseFloat(minSliderValue), parseFloat(maxSliderValue)]
        });
        $('.slider').css({ "width": "100%" });

        $("#diamondslider").on("slide", function (slideEvt) {
            $('#txtMin').val(slideEvt.value[0].toFixed(2));
            $('#txtMax').val(slideEvt.value[1].toFixed(2));
        })
    },
    goldslider: function () {
        var mingoldSliderValue = $("#txtgoldweightMin").val();
        var maxgoldSliderValue = $("#txtgoldweightMax").val();
        $('#goldweightslider').slider('destroy');
        $('#goldweightslider').slider({
            min: 0.51,
            max: 30.00,
            value: [parseFloat(mingoldSliderValue), parseFloat(maxgoldSliderValue)]
        });
        $('.slider').css({ "width": "100%" });

        $("#goldweightslider").on("slide", function (slideEvt) {
            $('#txtgoldweightMin').val(slideEvt.value[0].toFixed(2));
            $('#txtgoldweightMax').val(slideEvt.value[1].toFixed(2));
        })
    },
    priceslider: function () {
        var minpriceSliderValue = $("#txtminprice").val();
        var maxpriceSliderValue = $("#txtmaxprice").val();
        $('#priceslider').slider('destroy');
        $('#priceslider').slider({
            min: 0,
            max: 100000,
            value: [parseInt(minpriceSliderValue), parseInt(maxpriceSliderValue)]
        });
        $('.slider').css({ "width": "100%" });

        $("#priceslider").on("slide", function (slideEvt) {
            $('#txtminprice').val(slideEvt.value[0].toFixed(0));
            $('#txtmaxprice').val(slideEvt.value[1].toFixed(0));
        })
    },
    clerrfilter: function () {
        $("#designnumber").val("");
        $("#hidenshapename").val("");
        Masterproductlistview.variables.designno = "";
        Masterproductlistview.variables.goldpurity = "";
        Masterproductlistview.variables.goldcolor = "";
        Masterproductlistview.variables.diamondselectsize = "";
        Masterproductlistview.variables.diamondselectcharni = "";
        Masterproductlistview.variables.totalsize = 0;
        Masterproductlistview.variables.totalcharni = 0;
        Masterproductlistview.variables.diamondminweight = "0.01";
        Masterproductlistview.variables.diamondmaxweight = "5.00";
        Masterproductlistview.variables.goldminweight = "0.51";
        Masterproductlistview.variables.goldmaxweight = "30.00";
        Masterproductlistview.variables.pricemax = "100000";
        Masterproductlistview.variables.pricemin = "0";
        Masterproductlistview.variables.Applyfilter = 0;
        $("#txtMin").val("0.01");
        $("#txtMax").val("5.00");
        $("#txtgoldweightMin").val("0.51");
        $("#txtgoldweightMax").val("30.00");
        $("#txtmaxprice").val("100000");
        $("#txtminprice").val("0");
        $("#txtdiamondsize").html('');
        $("#txtdiamondcharni").html('');
        $('#txtdiamondsize').dropdown("clear");
        $('#txtdiamondcharni').dropdown("clear");
        $('.dsizeclass').children().addClass("disabled");
        $('.dcharniclass').children().addClass("disabled");
        $('.goldp').prop('checked', false);
        $('.goldc').prop('checked', false);
        $('.diamsize').prop('checked', false);
        $('.diamcharni').prop('checked', false);
        $(".dvshape").removeClass('shapeactive');
        Masterproductlistview.diamonslider();
        Masterproductlistview.goldslider();
        Masterproductlistview.priceslider();
    },
    multipledesign: function (dno) {
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESINGCODE", op: "eq", data: dno });
        myfilter.rules.push({ field: "FILETYPE", op: "eq", data: "IMG" });
        myfilter.rules.push({ field: "GCOLOR", op: "eq", data: "ROSE" });
        if ($('#slideritem' + dno).html() == null || $('#slideritem' + dno).html() == '' || $('#slideritem' + dno).html() == undefined) {
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_DESIGN_FILES_GET&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            
                            $("#slideritem" + dno).html($("#binddimage").render(JsonObject.serviceresponse.detailslist.details));
                            if (JsonObject.serviceresponse.detailslist.details.length > 1) {
                                $('#slideritem' + dno).owlCarousel({
                                    items: 1,
                                    autoPlay: 1000,
                                    singleItem: true,
                                    navigation: false,
                                    navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
                                    pagination: false,
                                    responsiveClass: true,
                                    transitionStyle: "fade"
                                });
                            }
                        }
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
        }

    },
}
function Bindmultipledesign(dno) {
    //$("#slideritem" + dno).css("visibility", "visible");
    $("#mainimg" + dno).hide();
    $("#slideritem" + dno).show();

    Masterproductlistview.multipledesign(dno);

}
function Removemultipledesign(dno) {
    $("#slideritem" + dno).hide();
    $("#mainimg" + dno).show();

    // $("#slideritem" + dno).html("");
}
function addtowishlist(design) {
    Masterproductlistview.Bindwishlist(design);
    //Masterproductlistview.BindTotalcartcount();
}
function addtocartlist(design) {
    Masterproductlistview.Bindcartlist(design);
    //Masterproductlistview.BindTotalcartcount();
}
function productlisturl(id) {
    var stock = $("#txtstock" + id).val();
    window.open(getDomain() + "/Product/ProductDetail?id=" + id + "&stocktype=" + stock, '_blank');
}
function onegoldcheck(checkbox) {
    Masterproductlistview.variables.goldcolor = checkbox;
    $('.goldc').not(this).prop('checked', false);
    $('#' + checkbox).prop('checked', true);
}
function onegoldpurity(checkbox) {
    Masterproductlistview.variables.goldpurity = checkbox;
    $('.goldp').not(this).prop('checked', false);
    $('#' + checkbox).prop('checked', true);
}
function Shapeclick(id) {
    $(".dvshape").removeClass('shapeactive');
    $("#" + id).addClass('shapeactive');
    $("#hidenshapename").val($("#shapename" + id).html());
    $("#txtdiamondsize").dropdown('clear');
    $("#txtdiamondcharni").dropdown('clear');
    if ($("#shapename" + id).html() == 'RBC' || $("#shapename" + id).html() == 'ASSCHER' || $("#shapename" + id).html() == 'PRINCESS' || $("#shapename" + id).html() == 'CHOKI' || $("#shapename" + id).html() == 'PEAR' || $("#shapename" + id).html() == 'PIE') {
        var sizevalue = "";
        Masterproductlistview.BindDiamondSize(id);
        Masterproductlistview.BindDiamondCharni(id, sizevalue);
    }
    else {
        Masterproductlistview.BindDiamondSize(id);
    }
}
$(document).ready(function () {
    //------------Bind Main Product List Data------------------------
    var sortorder, sortcolumn;
    sortorder = 'desc';
    sortcolumn = 'DESIGNNO';
    Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
    $("#txtdiamondsize").html("<option value='' selected disabled hidden >Select size</option>");
    $("#txtdiamondcharni").html("<option value='' selected disabled hidden >Select charni</option>");
    $("#hidendiamonddetails").show();
    $('#txtdiamondsize').dropdown({
        allowAdditions: true,
        onChange: function () {
            var checkshap, id;
            id = $("#hidenshapename").val();
            if (id != 'RBC' || id != 'ASSCHER' || id != 'PRINCESS' || id != 'CHOKI' || id != 'PEAR' || id != 'PIE') {
                if ($("#txtdiamondsize").val() != null) {
                    checkshap = $("#txtdiamondsize").val().toString();
                    checkshap = checkshap.replace(/\+/g, '%2B');
                    Masterproductlistview.variables.diamondselectsize = checkshap;
                }
                else {
                    checkshap = "";
                }
                Masterproductlistview.BindDiamondCharni(id, checkshap);
            }
        }
    });
    $("#txtdiamondcharni").dropdown({
        allowAdditions: true
    });
    $(".ui.fluid.dropdown").css("background", "white");
    /*-------------------Enter Key Event Start----------------*/

    $('#txtMin').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            Masterproductlistview.diamonslider();
        }
    });
    $('#txtMax').keypress(function (e) {
        var key1 = e.which;
        if (key1 == 13)  // the enter key code
        {
            Masterproductlistview.diamonslider();
        }
    });
    $('#txtgoldweightMin').keypress(function (e) {
        var key2 = e.which;
        if (key2 == 13)  // the enter key code
        {
            Masterproductlistview.goldslider();
        }
    });
    $('#txtgoldweightMax').keypress(function (e) {
        var key3 = e.which;
        if (key3 == 13)  // the enter key code
        {
            Masterproductlistview.goldslider();
        }
    });
    $('#txtminprice').keypress(function (e) {
        var key4 = e.which;
        if (key4 == 13)  // the enter key code
        {
            Masterproductlistview.priceslider();
        }
    });
    $('#txtmaxprice').keypress(function (e) {
        var key5 = e.which;
        if (key5 == 13)  // the enter key code
        {
            Masterproductlistview.priceslider();
        }
    });
    /*-------------------Enter Key Event End----------------*/
    //-------------Diamond Weight-------------------------
    $('#diamondslider').slider();
    $('.slider').css({ "width": "100%" });
    $("#diamondslider").on("slide", function (slideEvt) {
        $('#txtMin').val(slideEvt.value[0].toFixed(2));
        $('#txtMax').val(slideEvt.value[1].toFixed(2));
    });
    $("#diamondslider").on("change", function (slideEvt) {
        $('#txtMin').val(slideEvt.value.newValue[0]);
        $('#txtMax').val(slideEvt.value.newValue[1]);
    })
    $('#txtMin').on("blur", function () {
        Masterproductlistview.diamonslider();
    });
    $('#txtMax').on("blur", function () {
        Masterproductlistview.diamonslider();
    });

    //-------------Gold Weight---------------

    $('#goldweightslider').slider();
    $('.slider').css({ "width": "100%" });
    $("#goldweightslider").on("slide", function (slideEvt) {
        $('#txtgoldweightMin').val(slideEvt.value[0].toFixed(2));
        $('#txtgoldweightMax').val(slideEvt.value[1].toFixed(2));
    });
    $("#goldweightslider").on("change", function (slideEvt) {
        $('#txtgoldweightMin').val(slideEvt.value.newValue[0]);
        $('#txtgoldweightMax').val(slideEvt.value.newValue[1]);
    });
    $('#txtgoldweightMin').on("blur", function () {
        Masterproductlistview.goldslider();

    });
    $('#txtgoldweightMax').on("blur", function () {
        Masterproductlistview.goldslider();
    });
    //------------------Price--------------------------

    $('#priceslider').slider();
    $('.slider').css({ "width": "100%" });
    $("#priceslider").on("slide", function (slideEvt) {
        $('#txtminprice').val(slideEvt.value[0].toFixed(0));
        $('#txtmaxprice').val(slideEvt.value[1].toFixed(0));
    });
    $("#priceslider").on("change", function (slideEvt) {
        $('#txtminprice').val(slideEvt.value.newValue[0]);
        $('#txtmaxprice').val(slideEvt.value.newValue[1]);
    });
    $('#txtminprice').on("blur", function () {
        Masterproductlistview.priceslider();
    });
    $('#txtmaxprice').on("blur", function () {
        Masterproductlistview.priceslider();
    });
    $("#filter_button").click(function () {
        $("#column-left").toggle();
    });
    $('#banner0').owlCarousel({
        items: 10,
        autoPlay: 3000,
        singleItem: true,
        navigation: true,
        pagination: false
    });
    $('input[type=radio][name=vpradio]').change(function () {
        if ($('#radiophy').is(':checked')) {
            $(".goldalldata").show();
            $("#hidendiamonddetails").hide();
            Masterproductlistview.BindGolddata();
        }
        else {
            $(".goldalldata").hide();
            $("#hidendiamonddetails").show();
        }
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
        Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
    });
    $("#viewmordesign").click(function () {
        if ($("#dropdownfilter option:selected").val() == 'Default') {
            sortorder = 'desc';
            sortcolumn = 'DESIGNNO';
        }
        else if ($("#dropdownfilter option:selected").val() == 'designno') {
            sortorder = 'desc';
            sortcolumn = 'DESIGNNO';
        }
        else if ($("#dropdownfilter option:selected").val() == 'whatisnew') {
            sortorder = 'desc';
            sortcolumn = 'WHATISNEW';
        }
        else if ($("#dropdownfilter option:selected").val() == 'popular') {
            sortorder = 'desc';
            sortcolumn = 'RATESTAR';
        }
        else if ($("#dropdownfilter option:selected").val() == 'pricelowtohigh') {
            sortorder = 'asc';
            sortcolumn = 'PRICE';
        }
        else if ($("#dropdownfilter option:selected").val() == 'ratehightolow') {
            sortorder = 'desc';
            sortcolumn = 'PRICE';
        }
        Masterproductlistview.LoadMore(sortorder, sortcolumn);
    });
    $("#dropdownfilter").on('change', function () {
        if ($("#dropdownfilter option:selected").val() == 'Default') {
            sortorder = 'desc';
            sortcolumn = 'DESIGNNO';
        }
        else if ($("#dropdownfilter option:selected").val() == 'designno') {
            sortorder = 'desc';
            sortcolumn = 'DESIGNNO';
        }
        else if ($("#dropdownfilter option:selected").val() == 'whatisnew') {
            sortorder = 'desc';
            sortcolumn = 'WHATISNEW';
        }
        else if ($("#dropdownfilter option:selected").val() == 'popular') {
            sortorder = 'desc';
            sortcolumn = 'RATESTAR';
        }
        else if ($("#dropdownfilter option:selected").val() == 'pricelowtohigh') {
            sortorder = 'asc';
            sortcolumn = 'PRICE';
        }
        else if ($("#dropdownfilter option:selected").val() == 'ratehightolow') {
            sortorder = 'desc';
            sortcolumn = 'PRICE';
        }
        Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
    });
    /*------------Apply Button-----------*/
    $("#btnapplyfilter").click(function () {
        Masterproductlistview.variables.Applyfilter = 1;
        var txtcharni;
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
        if ($("#designnumber").val() != "") {
            Masterproductlistview.variables.designno = $("#designnumber").val();
        }
        else {

            if ($("#txtdiamondcharni").val() != null) {
                txtcharni = $("#txtdiamondcharni").val().toString();
                txtcharni = txtcharni.replace(/\+/g, '%2B');
            }
            Masterproductlistview.variables.diamondminweight = $("#txtMin").val();
            Masterproductlistview.variables.diamondmaxweight = $("#txtMax").val();
            Masterproductlistview.variables.goldmaxweight = $("#txtgoldweightMax").val();
            Masterproductlistview.variables.goldminweight = $("#txtgoldweightMin").val();
            Masterproductlistview.variables.pricemax = $("#txtmaxprice").val();
            Masterproductlistview.variables.pricemin = $("#txtminprice").val();
            Masterproductlistview.variables.diamondselectcharni = txtcharni
        }
        $("#FilterProductlistModal").modal('hide');
        Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        $(".addscaleclass").removeClass('productscale');
        $(".header_outer").css("z-index", "999");
    });
    $("#btnresetfilter").click(function () {
        Masterproductlistview.clerrfilter();
        $(".addscaleclass").removeClass('productscale');
        $("#FilterProductlistModal").modal('hide');
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
        Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
    });
    /*---------------btnfilter modal---------------------*/
    $("#btnmodalfilter").click(function () {
        $('.dsizeclass').children().addClass("disabled");
        $('.dcharniclass').children().addClass("disabled");
        $(".addscaleclass").addClass('productscale');
        $(".header_outer").css("z-index", "9999");
        Masterproductlistview.Diamonshap();
    });
    $("#closefiltermodal").click(function () {
        if (Masterproductlistview.variables.Applyfilter != 1) {
            Masterproductlistview.clerrfilter();

        }
        $(".addscaleclass").removeClass('productscale');
        $(".header_outer").css("z-index", "999");
    });
});