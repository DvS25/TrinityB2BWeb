var Castlistview = {
    variables:{
        party: "",
    },
    Bindcartstockdata: function (stock) {
        $(".loadingtrinity").show();
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "STOCKTYPE", op: "eq", data: stock });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=SHOPPINGCART_GET&myfilters=" + JSON.stringify(myfilter),
            data: "",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#cartlistdata").html("");
                $("#totalgoldweight").html("");
                $("#totaldiamondweight").html("");
                $("#totalprice").html("");
                $("#virtualcount").html("");
                $("#physicalcount").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.totalrecords > 0)
                    {
                        $("#alltotaldetails").show();
                        $("#cartdetails").show();
                        $("#emptycartlist").hide();
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#cartlistdata").append($("#Datacartlistbind").render(JsonObject.serviceresponse.detailslist.details));
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
                        }
                        if (JsonObject.serviceresponse.totalgoldweightlist != undefined) {
                            $("#totalgoldweight").html(JsonObject.serviceresponse.totalgoldweightlist.totalgoldweight);
                        }
                        if (JsonObject.serviceresponse.totaldiamondweightlist != undefined) {
                            $("#totaldiamondweight").html(JsonObject.serviceresponse.totaldiamondweightlist.totaldiamondweight);
                        }
                        if (JsonObject.serviceresponse.totalpricelist != undefined) {
                            $("#totalprice").html(JsonObject.serviceresponse.totalpricelist.totalprice.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        }
                        if (JsonObject.serviceresponse.totalvirtualcount != undefined) {
                            $("#virtualcount").html(" (" + JsonObject.serviceresponse.totalvirtualcount.virtualcount + ")");
                        }
                        if (JsonObject.serviceresponse.totalphysicalcount != undefined) {
                            $("#physicalcount").html(" (" + JsonObject.serviceresponse.totalphysicalcount.physicalcount + ")");
                        }
                    }
                    else {
                        if (JsonObject.serviceresponse.totalvirtualcount != undefined) {
                            $("#virtualcount").html(" (" + JsonObject.serviceresponse.totalvirtualcount.virtualcount + ")");
                        }
                        if (JsonObject.serviceresponse.totalphysicalcount != undefined) {
                            $("#physicalcount").html(" (" + JsonObject.serviceresponse.totalphysicalcount.physicalcount + ")");
                        }
                        $("#alltotaldetails").hide();
                        $("#cartdetails").hide();
                        $("#emptycartlist").show();
                    }
                    $(".loadingtrinity").hide();
                }
                else {
                    $(".loadingtrinity").hide();
                    InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },
    Deletecartaddwishlist: function (cartid) {
        var movewish = "MovetoWish";
        Castlistview.cartdltdata(cartid, movewish);
    },
    Deletecartlist: function (cartid) {
        var movewish = "";
        Castlistview.cartdltdata(cartid, movewish);
    },
    cartdltdata: function (cartid, movewish) {
        var data = {
            "oper": "delete",
            "DATAFROM": "Cart",
            "CARTID": cartid,
            "WHERE_EQ_DELETETYPE": movewish,
        }
        Castlistview.saveoperation(data, cartid);
    },
    saveoperation: function (data, cartid) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SHOPPINGCART_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#" + cartid).remove();
                    CartWishlistCount();
                    var stock;
                    if ($("#cartphysicalstock").hasClass('cartborderback')) {
                        stock = "Physical"
                    }
                    else {
                        stock = "Virtual"
                    }

                    Castlistview.Bindcartstockdata(stock);
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },
    Quantityvalue: function (id) {
        var data = {
            "oper": "Edit",
            "DATAFROM": "Cart",
            "CARTID": id,
            "QUANTITY": $("#quantitytotal" + id).html(),
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SHOPPINGCART_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var stock;
                    if ($("#cartphysicalstock").hasClass('cartborderback')) {
                        stock = "Physical"
                    }
                    else {
                        stock = "Virtual"
                    }

                    Castlistview.Bindcartstockdata(stock);
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },
    submitnewparty: function () {
        var isValid = $("#partyform").valid();
        if (!isValid)
            return;

        $("#Partydetailform").hide();
        $("#Quotationdiv").show();

    },
    Partyquotationdata: function (stock) {
        var data = {
            "QUOTATIONTYPE": $("input[name='jobworkradio']:checked").val(),
            "PROCESS_TYPE": stock,
            "REMARK": $("#remarkarea").val(),
        }
        Castlistview.SubmitQuotationdetail(data, stock);
    },
    Salesquotationdata: function (stock) {
        var data;
        if (Castlistview.variables.party == "old") {
            data = {
                "QUOTATIONTYPE": $("input[name='jobworkradio']:checked").val(),
                "PROCESS_TYPE": stock,
                "REMARK": $("#remarkarea").val(),
                "PARTYID": $("#hdnpartycode").val(),
            }
        }
        else {
            data = {
                "QUOTATIONTYPE": $("input[name='jobworkradio']:checked").val(),
                "PROCESS_TYPE": stock,
                "REMARK": $("#remarkarea").val(),
                "NEWPARTYNAME": $("#txtpartyname").val(),
                "CONTACTPERSONNAME": $("#hiddencontactpersonname").val(),
                "MOBILENO": $("#txtmobilename").val(),
                "EMAILID": $("#txtemailid").val(),
                "ADDRESS": $("#txtaddress").val(),
            }
        }
        
        Castlistview.SubmitQuotationdetail(data, stock);
    },
    SubmitQuotationdetail: function (data, stock) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SALES_QUOTATION_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    CartWishlistCount();
                    Castlistview.Bindcartstockdata(stock);
                    Castlistview.variables.party = "";
                    $("#CompletedQuotation").show();
                    $("#Quotationdiv").hide();
                    $("#thankquotno").html($(data).find('QUOTATIONNO').text());
                    $("#thankprocesstype").html($(data).find('PROCESSTYPE').text());
                    $("#thankquottype").html($(data).find('QUOTATIONTYPE').text());
                    // OperationMessage("", "Successfully generated order", "success");
                }
                else {
                  
                    InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    },
    Clearpartyvalue: function () {
        $("#txtpartyname").val("");
        $("#txtmobilename").val("");
        $("#txtemailid").val("");
        $("#txtaddress").val("");
        $("#partyinput").val("");
        $("#txtpartyname-error").hide();
        $("#txtmobilename-error").hide();
        $("#txtemailid-error").hide();
        $("#txtaddress-error").hide();
        $("#partyinput-error").hide();
        $("#CompletedQuotation").hide();
        Castlistview.variables.party = "";
    },
    Clearmodal: function () {
        $("#partyinput").val("");
        $("#txtpartyname").val("");
        $("#txtmobilename").val("");
        $("#txtemailid").val("");
        $("#txtaddress").val("");
        $("#Quotationdiv").hide();
        $("#Selectpartydiv").hide();
        $("#Partydetailform").hide();
        $("#CompletedQuotation").hide();
        $("#remarkarea").val("");
        $("#partyinput").val("");
        $("#radiojobwork").prop("checked", true);
        $("#txtpartyname-error").hide();
        $("#txtmobilename-error").hide();
        $("#txtemailid-error").hide();
        $("#txtaddress-error").hide();
        $("#partyinput-error").hide();
        Castlistview.variables.party = "";
    },
}
function showdetail(id) {
    var Gcolor, Gpurity, Dcolor, Dpurity, Dsize, Customizenotes, dc, Iscustomize, Cartid, Designno;
    var dc = $("#dcolor" + id).html().split("/");
    Gcolor = $("#gcolor" + id).html();
    Gpurity = $("#gpurity" + id).html();
    Dcolor = dc[1];
    Dpurity = dc[0];
    Dsize = $("#designsize" + id).html();
    Customizenotes = $("#Customizenotes" + id).html();
    Iscustomize = $("#iscutomize" + id).val();
    Cartid = $("#cart_id" + id).val();
    Designno = $("#design_number"+id).val(),
    $.ajax({
        url: getDomain() + "/Product/Customizedetail",
        data: {
            Gcolor: Gcolor,
            Gpurity: Gpurity,
            Dcolor: Dcolor,
            Dpurity: Dpurity,
            Dsize: Dsize,
            Customizenotes: Customizenotes,
            Iscustomize: Iscustomize,
            Cartid: Cartid,
        },
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
             var stock;
             if ($("#cartphysicalstock").hasClass('cartborderback')) {
                 stock = "Physical"
             }
             else {
                 stock = "Virtual"
             }
            if (data == "success") {
                window.location.href = getDomain() + "/Product/ProductDetail?id=" + Designno + "&stocktype=" + stock;
            }
            else {
                OperationMessage("", data, 'error');
            }
        },
        error: OnError,
    });
}

function Generatequotation() {
    var stock, data;
    if ($("#cartphysicalstock").hasClass('cartborderback')) {
        stock = "Physical"
    }
    else {
        stock = "Virtual"
    }
    if ($("#hiddenusertype").val() == "Party") {
        Castlistview.Partyquotationdata(stock);
    }
    else {
        Castlistview.Salesquotationdata(stock);
    }
}
function Canclequotation() {
    $("#quotationModal").modal("hide");
    $("#remarkarea").val("");
    $("#radiojobwork").prop("checked", true);
}
function Increasequantity(id) {
    $("#quantitytotal" + id).html(parseFloat($("#quantitytotal" + id).html()) + 1);
    Castlistview.Quantityvalue(id);
}
function Decreasequantity(id) {
    if ($("#quantitytotal" + id).html() > 1)
    {
        $("#quantitytotal" + id).html(parseFloat($("#quantitytotal" + id).html()) - 1);
        Castlistview.Quantityvalue(id);
    }
}
$(document).ready(function () {
    var stock = "Virtual"
    Castlistview.Bindcartstockdata(stock);
    $('#partyinput').autocomplete({
        source: function (request, response) {
            var url = getDomain() + '/Common/BindMastersDetails?ServiceName=SALES_WHOLESELLER_DETAILS_GET&sord=asc&ColumnRequested=WSID,PARTYCODE,CONTACTPERSONNAME,PARTYCODENAME&_search=true&searchField=PARTYCODE&searchOper=cn&searchString=' + request.term;
            $.ajax({
                url: url,
                type: "POST",
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);

                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            var List;
                            if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                List = JsonObject.serviceresponse.detailslist.details;
                            else
                                List = JsonObject.serviceresponse.detailslist;
                            response(
                                $.map(List, function (item) {
                                    if (jQuery.type(item) == "object") {

                                        return {
                                            label: item.partycodename,
                                            value: item.partycodename,
                                            headid: item.wsid
                                        }
                                    }
                                    else {
                                        return {
                                            label: item.partycodename,
                                            value: item.partycodename,
                                            headid: item.wsid
                                        }
                                    }
                                }))
                        }
                        else {
                            response([{ label: 'No Records Found', val: '' }]);
                            $("#hdnpartycode").val('');
                        }
                    }
                    else {
                        response([{ label: 'No Records Found', val: '' }]);
                        $("#hdnpartycode").val('');
                       // notificationMessage('Head Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            })
        },
        messages: {
            noResults: "No Results Found"
        },
        select: function (event, ui) {
            $("#hdnpartycode").val(ui.item.headid);
            $("#partyinput").val(ui.item.label);
        },
        change: function (event, ui) {
            if (!ui.item) {
                $("#hdnpartycode").val('');
            }
        },
        focus: function (event, ui) {
            $("#hdnpartycode").val('');
        },
        minLength: 1
    });
    $("#partyinput").click(function () {
        $("#ui-id-1").hide();
    })
    $("#virtualdiv").click(function () {
        $("#cartphysicalstock").removeClass("cartborderback");
        $("#cartvirtualstock").addClass("cartborderback");
        var stock = "Virtual";
        Castlistview.Bindcartstockdata(stock);
    });
    $("#physicaldiv").click(function () {
        $("#cartvirtualstock").removeClass("cartborderback");
        $("#cartphysicalstock").addClass("cartborderback");
        var stock = "Physical";
        Castlistview.Bindcartstockdata(stock);
    });
    $("#btngeneratequotation").click(function () {
        if ($("#hiddenusertype").val() == "Party") {
            $("#quotationModal").modal("show");
            $("#Quotationdiv").show();
        }
        else {
            $("#quotationModal").modal("show");
            $("#Quotationdiv").hide();
            $("#Partydetailform").hide();
            $("#Selectpartydiv").show();
        }
    });
    $("#btnaddnewparty").click(function () {
        $("#Partydetailform").show();
        $("#Selectpartydiv").hide();
    });
    $("#btnsubmitnewparty").click(function () {
        Castlistview.submitnewparty();
    });
    $("#btncancleparty").click(function () {
        Castlistview.Clearpartyvalue();
        $("#Partydetailform").hide();
        $("#Selectpartydiv").show();
    });
    $("#closemodalbtn").click(function () {
        Castlistview.Clearmodal();
    });
    $("#btnsubmitexistparty").click(function () {
        var isValid = $("#partyform").valid();
        if (!isValid)
            return;
        Castlistview.variables.party = "old";
        $("#Partydetailform").hide();
        $("#Selectpartydiv").hide();
        $("#Quotationdiv").show();
    });
    $("#btnclicktoshopping").click(function () {
        window.location.href = getDomain() + "/Home/Index";
    });
});