var ProductDetail = {
    variables: {
        SelectDcolor: "",
        SelectDpurity: "",
        SelectGcolor: "",
        SelectGpurity: "",
        SelectDesignsize: "",
        addtocart: "0",
        IsCustomize: 0,
        setsomediamond: 0,
        Custom_Diamondprice: "",
        Custom_Goldprice: "",
        Custom_pricebreakuptotalprice: "",
        Custom_pricebreakupdiamondprice: "",
        Custom_breakupgoldprice: "",
        Notshowproce: 0,
        Gloabal_Productdata: [],
    },
    Bindproductdetaildata: function () {
        $(".loadingtrinity").show();
        var myfilter, url;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "STOCKTYPE", op: "eq", data: $("#hideStocktype").val() });
        myfilter.rules.push({ field: "DESIGNNO", op: "eq", data: $("#hidedesignno").val() });
        url = "/Common/BindMastersDetails?ServiceName=APP_CATEGORY_DESIGN_DETAIL_GET&ColumnRequested=ALL&sord=asc&sidx=DESIGNNO&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                ProductDetail.clearvalue();
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        ProductDetail.variables.SelectGcolor = JsonObject.serviceresponse.detailslist.details.gcolor;
                        $("#subcategoryname").html(JsonObject.serviceresponse.detailslist.details.category);
                        $("#productimagecontent").append($("#Dataproductdetail").render(JsonObject.serviceresponse.detailslist.details));

                        /*------------------------------- code by kt----------------------------------*/
                        //$("#productimagecontent_rose").append($("#imagelistdetails_rose").render(JsonObject.serviceresponse.detailslist.details));
                        //$("#productimagecontent_yellow").append($("#imagelistdetails_yellow").render(JsonObject.serviceresponse.detailslist.details));
                        //$("#productimagecontent_white").append($("#imagelistdetails_white").render(JsonObject.serviceresponse.detailslist.details));

                        //ProductDetail.HideShowImagesDiv(ProductDetail.variables.SelectGcolor);
                        /*------------------------------- code by kt----------------------------------*/
                        $("#topdatabind").append($("#Datatoplength").render(JsonObject.serviceresponse.detailslist.details));
                        $("#maintotalp").html(JsonObject.serviceresponse.detailslist.details.price.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $("#makincharges").append($("#Datamakincharges").render(JsonObject.serviceresponse.detailslist.details));
                        $("#pricebreakup").append($("#Datapricebreakup").render(JsonObject.serviceresponse.detailslist.details));
                        /*Price Breakup*/
                        $("#breakupgoldprice").html(parseFloat($("#breakupgoldprice").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $("#prbreakmakeingchrg").html(parseFloat($("#prbreakmakeingchrg").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $("#pricebreakupdiamondprice").html(parseFloat($("#pricebreakupdiamondprice").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $("#pricebreakuptotalprice").html(parseFloat($("#pricebreakuptotalprice").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));

                        /*Labour*/
                        $("#labour_makeing_rate").html(parseFloat($("#labour_makeing_rate").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $("#labour_makeing_charges").html(parseFloat($("#labour_makeing_charges").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));

                        //$("#wishlistcart").append($("#Datawishlistcart").render(JsonObject.serviceresponse.detailslist.details));
                        $(".rateyo").each(function () {
                            var id = $(this).attr('id');
                            var Rowid = id.split("rating");
                            var total = $("#star" + Rowid[1]).val();
                            $("#" + id).rateYo({
                                readOnly: true,
                                rating: total,
                                numStars: 5,
                                precision: 2,
                                minValue: 1,
                                maxValue: 5,
                                starWidth: "20px",
                                spacing: "3px",
                                normalFill: "#A0A0A0",
                                ratedFill: "#F39C12 ",
                                halfStar: true
                            });
                        });

                    }
                    if (JsonObject.serviceresponse.detailslist.details.golddetail != undefined) {
                        $("#golddetails").append($("#Datagolddetails").render(JsonObject.serviceresponse.detailslist.details.golddetail.golden));
                        $("#goldprice").html(parseFloat($("#goldprice").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $("#cur_gold_rate").html(parseFloat($("#cur_gold_rate").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $("#netweight").html((JsonObject.serviceresponse.detailslist.details.golddetail.golden.goldweight) + " gm");
                        $("#headergoldpurity").html((JsonObject.serviceresponse.detailslist.details.golddetail.golden.goldpurity) + " " + (JsonObject.serviceresponse.detailslist.details.golddetail.golden.metaltype))
                    }
                    if (JsonObject.serviceresponse.detailslist.details.diamonddetail != undefined) {
                        $("#diamonddetails").append($("#Datadiamonddetails").render(JsonObject.serviceresponse.detailslist.details.diamonddetail.diamond));
                        $("#diamondprice").html(parseFloat($("#diamondprice").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                    }
                    if (JsonObject.serviceresponse.detailslist.details.colorstonedetail != undefined) {
                        $("#colorstonelable").show();
                        $("#colostonedetails").append($("#Datacolostonedetails").render(JsonObject.serviceresponse.detailslist.details.colorstonedetail.colorstone));
                        $("#colostonewight").html((JsonObject.serviceresponse.detailslist.details.colorstonedetail.colorstone.stoneweight) + " cts")
                        $("#color_amount").html(parseFloat($("#color_amount").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                    }
                    if (JsonObject.serviceresponse.detailslist.details.designpairlist != undefined) {
                        $("#divrelatedproduct").show();
                        $("#related_product").append($("#Datarelated_product").render(JsonObject.serviceresponse.detailslist.details.designpairlist.designpairdetail));
                        $("#related_product").owlCarousel({
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
                        $(".relateddesignprice").each(function () {
                            var id = $(this).attr('id');
                            var Rowid = id.split("relateddesignprice");
                            var totalp = $("#iprrel" + Rowid[1]).val();
                            var convertint = parseFloat(totalp).toLocaleString(getDisplayLanguage(), {
                                style: 'currency', currency: getCurrencyCode(),
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            });
                            $("#" + id).html(convertint);
                        });
                    }
                    if ($("#hideiscutomize").val() == "1") {
                        ProductDetail.variables.IsCustomize = 1;
                        $("#customizebtn").css("border", "1px solid #50b719");
                        $("#gpvalue").html($("#hidegoldpurity").val());
                        $("#gcvalue").html($("#hidegoldcolor").val());
                        $("#goldpucovalue").html($("#hidegoldpurity").val() + " " + $("#hidegoldcolor").val());
                        $("#dpvalue").html($("#hidediamondpurity").val());
                        $("#dcvalue").html($("#hidediamondcolor").val());
                        $("#dsizevalue").html($("#hidedesignsize").val());
                        $("#productcustomizenotes").val($("#hidecutomizenotes").val());
                        ProductDetail.variables.SelectGpurity = $("#hidegoldpurity").val();
                        ProductDetail.variables.SelectGcolor = $("#hidegoldcolor").val();
                        ProductDetail.variables.SelectDcolor = $("#hidediamondcolor").val();
                        ProductDetail.variables.SelectDpurity = $("#hidediamondpurity").val();
                        ProductDetail.PriceChange();
                    }

                    $(".loadingtrinity").hide();
                }
                else {
                    $(".loadingtrinity").hide();
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    clearvalue: function () {
        ProductDetail.variables.Gloabal_Productdata = [];
        $("#productimagecontent").html("");
        //$("#productimagecontent_rose").html("");
        //$("#productimagecontent_yellow").html("");
        //$("#productimagecontent_white").html("");
        $("#topdatabind").html("");
        $("#makincharges").html("");
        $("#pricebreakup").html("");
        $("#golddetails").html("");
        $("#netweight").html("");
        $("#headergoldpurity").html("");
        $("#diamonddetails").html("");
        $("#colostonedetails").html("");
        $("#colostonewight").html("");
        $("#related_product").html("");
        $("#divrelatedproduct").hide();
    },
    clearmodal: function () {
        $(".activegoldpurity").removeClass('seleccustomize');
        $(".activegoldcolor").removeClass('seleccustomize');
        $(".activediamonquality").removeClass('seleccustomize');
        $(".activediamondcolor").removeClass('seleccustomize');
        $(".activedesignsize").removeClass('seleccustomize');
        $("#txtcustomizenotes").val("");
        $("#modalcustomize").modal("hide");
    },
    multipledesign: function () {
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESINGCODE", op: "eq", data: $("#hidedesignno").val() });
        myfilter.rules.push({ field: "GCOLOR", op: "eq", data: $("#gcvalue").html() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_DESIGN_FILES_GET&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        if ($('#additional-images').data('owl-carousel'))
                            $('#additional-images').data('owl-carousel').destroy();

                        $("#additional-images").html($("#Datadesignimage").render(JsonObject.serviceresponse.detailslist.details));

                        if (JsonObject.serviceresponse.detailslist.details.length > 1) {
                            $("#additional-images").owlCarousel({
                                navigation: true,
                                pagination: false,
                                navigationText: [
                                    "<i class='fa fa-angle-left'></i>",
                                    "<i class='fa fa-angle-right'></i>"
                                ],
                                items: 4,
                                itemsDesktop: [1199, 3],
                                itemsDesktopSmall: [979, 3],
                                itemsTablet: [992, 3],
                                itemsMobile: [767, 4],
                                itemsMobileSmall: [480, 3],
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

    },
    Bindcustomizedata: function () {
        var myfilter, url;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "CATEGORY", op: "eq", data: $("#subcategoryname").html() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_CUSTOMIZE_MASTER_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#txtdiamoncolor").html("");
                $("#txtgoldpurity").html("");
                $("#txtdiamonclarity").html("");
                $("#txtdesignsize").html("");
                $("#txtgoldcolor").html("");
                $("#cutomizesize").hide();
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.diamondcolorlist != undefined) {
                        $("#txtdiamoncolor").append($("#Datatxtdiamoncolor").render(JsonObject.serviceresponse.diamondcolorlist.diamondcolor));
                    }
                    if (JsonObject.serviceresponse.goldlist != undefined) {
                        $("#txtgoldpurity").append($("#Datagoldpurity").render(JsonObject.serviceresponse.goldlist.gold));
                    }
                    if (JsonObject.serviceresponse.diamondqualitylist != undefined) {
                        $("#txtdiamonclarity").append($("#Datatxtdiamonclarity").render(JsonObject.serviceresponse.diamondqualitylist.diamondquality));
                    }
                    if (JsonObject.serviceresponse.jsizelist != undefined) {
                        $("#cutomizesize").show();
                        $("#txtdesignsize").append($("#Datatxtdesignsize").render(JsonObject.serviceresponse.jsizelist.jsize));
                    }
                    if (JsonObject.serviceresponse.goldcolorlist != undefined) {
                        $("#txtgoldcolor").append($("#Datagoldcolor").render(JsonObject.serviceresponse.goldcolorlist.goldcolor));

                    }
                    $(".loadingtrinity").hide();
                }
                else {
                    $(".loadingtrinity").hide();
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    PriceChange: function () {
        var myfilter, url;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "STOCKTYPE", op: "eq", data: $("#hideStocktype").val() });
        myfilter.rules.push({ field: "DESIGNNO", op: "eq", data: $("#hidedesignno").val() });
        myfilter.rules.push({ field: "GOLDPURITY", op: "eq", data: ProductDetail.variables.SelectGpurity });
        myfilter.rules.push({ field: "GOLDCOLOR", op: "eq", data: ProductDetail.variables.SelectGcolor });
        myfilter.rules.push({ field: "DIAMONDCOLOR", op: "eq", data: ProductDetail.variables.SelectDcolor });
        myfilter.rules.push({ field: "DIAMONDPURITY", op: "eq", data: ProductDetail.variables.SelectDpurity });
        myfilter.rules.push({ field: "ITEMSIZE", op: "eq", data: $("#txtdesignsize").val() });
        url = "/Common/BindMastersDetails?ServiceName=APP_CATEGORY_DESIGN_DETAIL_GET&ColumnRequested=ALL&sord=asc&sidx=DESIGNNO&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        ProductDetail.variables.Notshowproce = JsonObject.serviceresponse.detailslist.details.notpriceindiamond;
                        $("#showtotalprice").html(JsonObject.serviceresponse.detailslist.details.price.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $("#metaltypevalue").val(JsonObject.serviceresponse.detailslist.details.golddetail.golden.metaltype);
                        ProductDetail.variables.Custom_Diamondprice = JsonObject.serviceresponse.detailslist.details.diamondprice.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        ProductDetail.variables.Custom_Goldprice = JsonObject.serviceresponse.detailslist.details.goldprice.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        ProductDetail.variables.Custom_pricebreakuptotalprice = JsonObject.serviceresponse.detailslist.details.price.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        ProductDetail.variables.Custom_pricebreakupdiamondprice = JsonObject.serviceresponse.detailslist.details.diamondprice.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        ProductDetail.variables.Custom_breakupgoldprice = JsonObject.serviceresponse.detailslist.details.goldprice.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        if ($("#hideiscutomize").val() == "1") {
                            $("#maintotalp").html(JsonObject.serviceresponse.detailslist.details.price.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#diamondprice").html(JsonObject.serviceresponse.detailslist.details.diamondprice.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#goldprice").html(JsonObject.serviceresponse.detailslist.details.goldprice.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#pricebreakuptotalprice").html(JsonObject.serviceresponse.detailslist.details.price.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#pricebreakupdiamondprice").html(JsonObject.serviceresponse.detailslist.details.diamondprice.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#breakupgoldprice").html(JsonObject.serviceresponse.detailslist.details.goldprice.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        }
                    }
                }
                else {
                    $(".loadingtrinity").hide();
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    Addtocart: function () {
        var data;
        if ($("#hideStocktype").val() == "Virtual") {
            var stock = "0";
        }
        else {
            stock = "1";
        }
        if ($("#hideiscutomizecartid").val() != "") {
            data = {
                "oper": "editItem",
                "ISPHYSICALSTOCK": stock,
                "DATAFROM": "Cart",
                "ISCUSTOMIZE": ProductDetail.variables.IsCustomize,
                "DESIGNCODE": $("#hidedesignno").val(),
                "QUANTITY": "1",
                "REMARK": $("#txtcustomizenotes").val(),
                "SIZE": $("#finaldesignsize").html(),
                "WHERE_EQ_GOLDPURITY": $("#finalgoldpurity").html(),
                "WHERE_EQ_GOLDCOLOR": $("#finalgoldcolor").html(),
                "WHERE_EQ_DIAMONDCOLOR": $("#finaldiamoncolor").html(),
                "WHERE_EQ_DIAMONDPURITY": $("#finaldiamonpurity").html(),
                "CARTID": $("#hideiscutomizecartid").val(),
            }
        }
        else {
            data = {
                "oper": "add",
                "ISPHYSICALSTOCK": stock,
                "DATAFROM": "Cart",
                "ISCUSTOMIZE": ProductDetail.variables.IsCustomize,
                "DESIGNCODE": $("#hidedesignno").val(),
                "QUANTITY": "1",
                "REMARK": $("#txtcustomizenotes").val(),
                "SIZE": $("#finaldesignsize").html(),
                "WHERE_EQ_GOLDPURITY": $("#finalgoldpurity").html(),
                "WHERE_EQ_GOLDCOLOR": $("#finalgoldcolor").html(),
                "WHERE_EQ_DIAMONDCOLOR": $("#finaldiamoncolor").html(),
                "WHERE_EQ_DIAMONDPURITY": $("#finaldiamonpurity").html(),
            }
        }
        ProductDetail.saveAddtocart(data);
    },
    Addcartonoutsideclick: function () {
        var data;
        if ($("#hideStocktype").val() == "Virtual") {
            var stock = "0";
        }
        else {
            stock = "1";
        }
        if ($("#hideiscutomizecartid").val() != "") {
            data = {
                "oper": "editItem",
                "ISPHYSICALSTOCK": stock,
                "DATAFROM": "Cart",
                "ISCUSTOMIZE": ProductDetail.variables.addtocart,
                "DESIGNCODE": $("#hidedesignno").val(),
                "QUANTITY": "1",
                "SIZE": $("#dsizevalue").html(),
                "WHERE_EQ_GOLDPURITY": $("#gpvalue").html(),
                "WHERE_EQ_GOLDCOLOR": $("#gcvalue").html(),
                "WHERE_EQ_DIAMONDCOLOR": $("#dcvalue").html(),
                "WHERE_EQ_DIAMONDPURITY": $("#dpvalue").html(),
                "CARTID": $("#hideiscutomizecartid").val(),
            }
        }
        else {
            data = {
                "oper": "add",
                "ISPHYSICALSTOCK": stock,
                "DATAFROM": "Cart",
                "ISCUSTOMIZE": ProductDetail.variables.addtocart,
                "DESIGNCODE": $("#hidedesignno").val(),
                "QUANTITY": "1",
                "SIZE": $("#dsizevalue").html(),
                "WHERE_EQ_GOLDPURITY": $("#gpvalue").html(),
                "WHERE_EQ_GOLDCOLOR": $("#gcvalue").html(),
                "WHERE_EQ_DIAMONDCOLOR": $("#dcvalue").html(),
                "WHERE_EQ_DIAMONDPURITY": $("#dpvalue").html(),
            }
        }
        ProductDetail.saveAddtocart(data);
    },
    saveAddtocart: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SHOPPINGCART_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#cartdesign").addClass('cartcolor');
                    OperationMessage("", "Product is added to cart", "success");
                    ProductDetail.variables.addtocart = 1;
                    CartWishlistCount();
                }
            },
            error: OnError,
        });
    },
    Bindwishlist: function () {
        if ($("#hideStocktype").val() == "Virtual") {
            var stock = "0";
        }
        else {
            stock = "1";
        }
        var data = {
            "oper": "add",
            "ISPHYSICALSTOCK": stock,
            "DATAFROM": "WishList",
            "DESIGNCODE": $("#hidedesignno").val(),
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SHOPPINGCART_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    if ($("#heartdesign").hasClass('fa fa-heart-o')) {
                        $("#heartdesign").removeClass('fa fa-heart-o');
                        $("#heartdesign").addClass('fa fa-heart');
                        OperationMessage("", "Product is added to wishlist", "success");
                    }
                    else {
                        $("#heartdesign").removeClass('fa fa-heart');
                        $("#heartdesign").addClass('fa fa-heart-o');
                        OperationMessage("", "Product is removed to wishlist", "success");
                    }
                    CartWishlistCount();
                }
            },
            error: OnError,
        });
    },

    ShareToMail: function () {
        var IsValid = $("#frm_shareEmail").valid();
        if (!IsValid)
            return false;


        //var ShareLink = encodeURIComponent($("#hdn_ShareLink").val());
        var ShareLink = $("#hdn_ShareLink").val();
        var tmp_body = $('#txt_mailBody').code().replace("{SHARE URL}", '<a href="' + ShareLink + '" target="_blank">Click here...</a>');
        //tmp_body = tmp_body.replace("{USER NAME}", $("#hdn_UserName").val())

        var data = {
            Emailids: $("#txt_toEmail").val(),
            subject: $("#txt_Subject").val(),
            body: tmp_body
        }

        $.ajax({
            url: getDomain() + "/Login/SendMail",
            async: true,
            cache: false,
            type: 'POST',
            data: data,
            beforeSend: function () {
                $(".loadingtrinity").show();
            },
            success: function (data) {
                if (data == "success") {
                    OperationMessage("", "Design is shared successfully.", "success");
                    $("#modalEmail").modal("hide");
                }
                else {
                    OperationMessage("", data, "error");
                }
            },
            complete: function () {
                $(".loadingtrinity").hide();
            },
            error: OnError
        });
    },

    ShareToSMS: function () {
        var IsValid = $("#frm_shareSMS").valid();
        if (!IsValid)
            return false;


        var ShareLink = encodeURIComponent($("#hdn_ShareLink").val());
        var tmp_body = $("#txt_SMSBody").val().replace("{SHARE URL}", ShareLink);

        var data = {
            mobileNos: $("#txt_MobileNo").val(),
            body: tmp_body
        }

        $.ajax({
            url: getDomain() + "/Login/SendSMS",
            async: true,
            cache: false,
            type: 'POST',
            data: data,
            beforeSend: function () {
                $(".loadingtrinity").show();
            },
            success: function (data) {
                if (data == "success") {
                    OperationMessage("", "Design is shared successfully.", "success");
                    $("#modalSMS").modal("hide");
                }
                else {
                    OperationMessage("", data, "error");
                }
            },
            complete: function () {
                $(".loadingtrinity").hide();
            },
            error: OnError
        });
    },

    ShareToWhatsapp: function () {
        var IsValid = $("#frm_shareWhatsapp").valid();
        if (!IsValid)
            return false;


        var ShareLink = encodeURIComponent($("#hdn_ShareLink").val());
        var msg = $("#txt_WAMessage").val().replace("{SHARE URL}", ShareLink);
        window.open('https://web.whatsapp.com/send?text=' + msg, '_blank');
    },

    //HideShowImagesDiv: function (color) {
    //    if (color == "ROSE") {
    //        $("#productimagecontent_rose").show();
    //        $("#productimagecontent_yellow").hide();
    //        $("#productimagecontent_white").hide();
    //        $("#zoom_rose").show();
    //        $("#zoom_yellow").hide();
    //        $("#zoom_white").hide();
    //    }
    //    else if (color == "WHITE") {
    //        $("#productimagecontent_rose").hide();
    //        $("#productimagecontent_yellow").hide();
    //        $("#productimagecontent_white").show();
    //        $("#zoom_rose").hide();
    //        $("#zoom_yellow").hide();
    //        $("#zoom_white").show();
    //    }
    //    else {
    //        $("#productimagecontent_rose").hide();
    //        $("#productimagecontent_yellow").show();
    //        $("#productimagecontent_white").hide();
    //        $("#zoom_rose").hide();
    //        $("#zoom_yellow").show();
    //        $("#zoom_white").hide();
    //    }
    //},
}
var z_index = 0;
function thumbnailclick() {
    //$('#div_selectedImage').magnificPopup('open', 0);
    //return false;
}
function showrelateddetail(id) {
    var stock = $("#hideStocktype").val();
    window.open(getDomain() + "/Product/ProductDetail?id=" + id + "&stocktype=" + stock, '_blank');
}
function imageadditionalouter(thiscal) {
    var smallImage = $(thiscal).attr('data-image');

    if ($(thiscal).attr("filetype") == "IMG") {
        $("#setcaroselimage").show();
        $("#trinity_design_video").hide();
        var largeImage = $(thiscal).attr('data-zoom-image');
        var ez = $('#atzoom').data('elevateZoom');
        $('.zoom-box .thumbnail').attr('data-image', largeImage);
        $(".zoom-box #atzoom").attr("src", smallImage);
        $(".zoom-box #atzoom").attr("data-zoom-image", smallImage);
        $("#atzoom").attr("data-zoom-image", largeImage);
        //$("#setcaroselimage").attr("href", largeImage);
        ez.swaptheimage(smallImage, largeImage);
        z_index = $(thiscal).index('.image_additional_outer a') + 0;
        //$('#div_selectedImage').magnificPopup('close', 1);
    }
    else {
        $("#setcaroselimage").hide();
        $("#trinity_design_video").show();
        $("#trinity_design_video").attr("src", smallImage);
    }

    return false;
}
function addtocartfunction() {
    ProductDetail.Addcartonoutsideclick();
}
function addtowishlist() {
    ProductDetail.Bindwishlist();
}
//function CartWishlistCount() {
//    $.ajax({
//        url: getDomain() + "/Common/BindMastersDetails?ServiceName=CART_ITEM_COUNT_GET",
//        async: true,
//        cache: false,
//        type: 'POST',
//        success: function (data) {
//            if ($(data).find('RESPONSECODE').text() == "0") {
//                $("#cart-total").html($(data).find('ITEMCOUNT').text());
//                $("#wishlist-total").html($(data).find('WISHLISTCOUNT').text());
//            }
//        },
//        error: OnError,
//    });
//}
function Selectgoldpurity(id) {
    $(".activegoldpurity").removeClass('seleccustomize');
    $("#" + id).addClass('seleccustomize');
    $("#finalgoldpurity").html(id);
    ProductDetail.variables.SelectGpurity = id;
    ProductDetail.PriceChange();
}
function Selectgoldcolor(id) {
    $(".activegoldcolor").removeClass('seleccustomize');
    $("#" + id).addClass('seleccustomize');
    $("#finalgoldcolor").html(id);
    ProductDetail.variables.SelectGcolor = id;
    ProductDetail.PriceChange();
}
function Selectdiamonquality(id) {
    $(".activediamonquality").removeClass('seleccustomize');
    $("#" + id).addClass('seleccustomize');
    $("#finaldiamonpurity").html(id);
    ProductDetail.variables.SelectDpurity = id;
    ProductDetail.PriceChange();
}
function SeletedDiamoncolor(id) {
    $(".activediamondcolor").removeClass('seleccustomize');
    $("#" + id).addClass('seleccustomize');
    $("#finaldiamoncolor").html(id);
    ProductDetail.variables.SelectDcolor = id;
    ProductDetail.PriceChange();
}
function SelectedDesignsie() {
    //$(".activedesignsize").removeClass('seleccustomize');
    //$("#" + id).addClass('seleccustomize');
    var id = $("#txtdesignsize option:selected").val();
    $("#finaldesignsize").html(id);
    ProductDetail.variables.SelectDesignsize = id;
}
$(document).ready(function () {
    ProductDetail.Bindproductdetaildata();
    ProductDetail.multipledesign();

    $("#atzoom").elevateZoom({
        gallery: "additional-images",
        galleryActiveClass: "active",
        zoomWindowWidth: 620,
        zoomWindowHeight: 515,
    });

    $(".zoomWindow").css("top", "-100px!important;")
    //$('#div_selectedImage').magnificPopup({
    //    delegate: 'a',
    //    type: 'image',
    //    tLoading: 'Loading image #%curr%...',
    //    mainClass: 'mfp-with-zoom',
    //    gallery: {
    //        enabled: true,
    //        navigateByImgClick: true,
    //        preload: [0, 1]
    //    },
    //    image: {
    //        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    //        titleSrc: function (item) {
    //            return item.el.attr('title');
    //        }
    //    },
    //});

    //$("#btnshowmoedetails").click(function () {
    //    if ($("#btnshowmoedetails").html() == "SHOW MORE DETAILS") {
    //        $("#btnmoredetail").show();
    //        $("#btnshowmoedetails").html("HIDE DETAILS");
    //    }
    //    else {
    //        $("#btnmoredetail").hide();
    //        $("#btnshowmoedetails").html("SHOW MORE DETAILS");
    //    }
    //});
    $("#customizebtn").click(function () {
        ProductDetail.Bindcustomizedata();
        $("#finalgoldpurity").html($("#gpvalue").html());
        $("#finalgoldcolor").html($("#gcvalue").html());
        $("#finaldiamonpurity").html($("#dpvalue").html());
        $("#finaldiamoncolor").html($("#dcvalue").html());
        $("#finaldesignsize").html($("#dsizevalue").html());
        $("#showtotalprice").html($("#maintotalp").html());
        $("#txtcustomizenotes").val($("#productcustomizenotes").val());
        $("#" + $("#gpvalue").html()).addClass('seleccustomize');
        $("#" + $("#gcvalue").html()).addClass('seleccustomize');
        $("#" + $("#dpvalue").html()).addClass('seleccustomize');
        $("#" + $("#dcvalue").html()).addClass('seleccustomize');
        $("#txtdesignsize").val($("#dsizevalue").html().replace(/\s/g, ''));
        // $("#" + $("#dsizevalue").html()).addClass('seleccustomize');
    });
    $("#btncanclecustomize").click(function () {
        ProductDetail.clearmodal();
    });
    $("#closecustomizemodal").click(function () {
        ProductDetail.clearmodal();
    });
    $("#btnaddapplycart").click(function () {
        $("#gpvalue").html($("#finalgoldpurity").html());
        $("#gcvalue").html($("#finalgoldcolor").html());
        $("#goldpucovalue").html($("#finalgoldpurity").html() + " " + $("#finalgoldcolor").html());
        $("#dpvalue").html($("#finaldiamonpurity").html());
        $("#dcvalue").html($("#finaldiamoncolor").html());
        $("#dsizevalue").html($("#finaldesignsize").html());
        $("#maintotalp").html($("#showtotalprice").html());
        $("#gmetaltype").html($("#metaltypevalue").val());
        $("#productcustomizenotes").val($("#txtcustomizenotes").val());
        $("#headergoldpurity").html($("#finalgoldpurity").html() + " " + $("#metaltypevalue").val());

        $("#diamondprice").html(ProductDetail.variables.Custom_Diamondprice);
        $("#goldprice").html(ProductDetail.variables.Custom_Goldprice);
        $("#pricebreakuptotalprice").html(ProductDetail.variables.Custom_pricebreakuptotalprice);
        $("#pricebreakupdiamondprice").html(ProductDetail.variables.Custom_pricebreakupdiamondprice);
        $("#breakupgoldprice").html(ProductDetail.variables.Custom_breakupgoldprice);
        ProductDetail.variables.IsCustomize = 1;

        if (ProductDetail.variables.Notshowproce > 0) {
            $("#showcartbtncustome").hide();
            $("#maintotalp").hide();
            $("#prineerrordiv").show();
        }
        else {
            $("#showcartbtncustome").show();
            $("#maintotalp").show();
            $("#prineerrordiv").hide();
            ProductDetail.Addtocart();
        }

        $("#modalcustomize").modal("hide");
        $("#customizebtn").css("border", "1px solid #50b719");

        ProductDetail.multipledesign();
    });

    $("#txtdesignsize").on("change", function () {
        ProductDetail.PriceChange();
    });

    $("#icon_shareToMail").on("click", function () {
        $("#modalEmail").modal("show");
    });

    $("#icon_shareToSMS").on("click", function () {
        $("#modalSMS").modal("show");
    });

    $("#icon_shareToWhatsApp").on("click", function () {
        $("#modalWhatsapp").modal("show");
    });

    $("#btn_sendEmail").on("click", function () {
        ProductDetail.ShareToMail();
    });

    $("#btn_sendSMS").on("click", function () {
        ProductDetail.ShareToSMS();
    });

    $("#btn_sendWhatsapp").on("click", function () {
        ProductDetail.ShareToWhatsapp();
    });

    $('.summernote').summernote({
        height: 150,
        minHeight: null,
        maxHeight: null,
        focus: true,
    });

    /*------------------default content to mail and sms body-----------------*/

    var content = '<p>Dear Sir,</p>' +
                '<p>Kindly click on below URL to view shared Design.</p>' +
                '<p>{SHARE URL}</p>' +
                '<p>Kind Regards,<br/>' + $("#hdn_UserName").val() + '<br/>' +
                '<img src="https://docs.google.com/uc?id=174UudfEtxLzq6mnwIHcJNySMPRy6RnYg&revid=0B23A25FsmJHbeW1VdFQ5cWNDOFgwS05yTFdrL3phaFoyUHFNPQ" width="90" /><br/>' +
                '<span style="font-size:18px;"><strong>Trinity Jewells</strong></span><br/>' +
                '405, Princess Plaza,<br/>' +
                'Near Sardar Chowk,<br/>' +
                'Mini Bazar,<br/>' +
                'Varachha Road,<br/>' +
                'Surat. (Gujarat)India<br/>' +
                '0261-4000800<br/></p>';

    $('#txt_mailBody').code(content);

    content = 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from "TrinityJewells" with you. Kindly click on below URL to view shared Design. {SHARE URL}';
    $("#txt_SMSBody").val(content);

    content = 'Dear Sir, ' + $("#hdn_UserName").val() + ' shared a design from TrinityJewells with you. Kindly click on below URL to view shared Design. {SHARE URL}';
    $("#txt_WAMessage").val(content);
    /*-----------------------------------------------------------------------*/

    $("#lbl_SizeCountry").attr("src", $("#currencyType img").attr("src"));
});