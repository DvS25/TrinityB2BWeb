var MasterQuotationHistory = {
    variable : {
        countrecord: "0",
        firstcount: "1",
        backbtn: 1,
    },
    BindQuotationHistrory: function () {
        $(".loadingtrinity").show();
        var myfilter, url;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "KEYWORD", op: "eq", data: $("#searchquotationlist").val() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=SALES_QUOTATION_HISTORY_GET&page=" + MasterQuotationHistory.variable.backbtn + "&rows=15&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#BindQuothistory").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.totalrecords > 0) {
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#BindQuothistory").append($("#DataQuothistory").render(JsonObject.serviceresponse.detailslist.details));
                            if ($("#hiddenusertypeid").val() != "Party") {
                                $("#displyparty").show();
                                $(".displaypartydata").show();
                            }
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
                        $("#pagedivquot").show();
                        var view1, totRecords1 = parseFloat(JsonObject.serviceresponse.totalrecords),
                        pageSize1 = 15;
                        totPages1 = parseFloat(JsonObject.serviceresponse.totalpages);
                        if (totRecords1 <= pageSize1) {
                            //$("#backwardAdjust1").attr('disabled', true);
                            //$("#forwardAdjust1").attr('disabled', true);
                            $("#backwardAdjust1").addClass('DisableElement');
                            $("#forwardAdjust1").addClass('DisableElement');
                        }
                        else if (MasterQuotationHistory.variable.backbtn == totPages1) {
                            //$("#backwardAdjust1").attr('disabled', false);
                            //$("#forwardAdjust1").attr('disabled', true);
                            $("#backwardAdjust1").removeClass('DisableElement');
                            $("#forwardAdjust1").addClass('DisableElement');
                        }
                        else if (MasterQuotationHistory.variable.backbtn > 1 && MasterQuotationHistory.variable.backbtn < totPages1) {
                            //$("#backwardAdjust1").attr('disabled', false);
                            //$("#forwardAdjust1").attr('disabled', false);
                            $("#backwardAdjust1").removeClass('DisableElement');
                            $("#forwardAdjust1").removeClass('DisableElement');
                        }
                        else {
                            //$("#backwardAdjust1").attr('disabled', true);
                            //$("#forwardAdjust1").attr('disabled', false);
                            $("#backwardAdjust1").addClass('DisableElement');
                            $("#forwardAdjust1").removeClass('DisableElement');
                        }
                        if (totRecords1 < (pageSize1 * MasterQuotationHistory.variable.backbtn))
                            view1 = (parseInt(pageSize1 * (MasterQuotationHistory.variable.backbtn - 1)) + 1) + ' - ' + totRecords1;
                        else
                            view1 = (parseInt(pageSize1 * (MasterQuotationHistory.variable.backbtn - 1)) + 1) + ' - ' + (pageSize1 * MasterQuotationHistory.variable.backbtn);

                        $("#RecordsAdjust1").html(view1);
                        $("#TotalRecordAdjust1").html(totRecords1);
                    }
                    else {
                        if ($("#hiddenusertypeid").val() != "Party") {
                            $("#BindQuothistory").html("<tr><td colspan='13' style='text-align:center;'>No Records Available..</td></tr>");
                        }
                        else {
                            $("#BindQuothistory").html("<tr><td colspan='12' style='text-align:center;'>No Records Available..</td></tr>");
                        }
                       
                        $("#pagedivquot").hide();
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
    BindDesignSteps: function (quotationno) {
        $("#BindQuothistory").html("");
        $("#Timelinedetail").html("");
        $("#txtquotlist").html("");
        $("#quodesigndetail").html("");
        $(".loadingtrinity").show();
        $("#quo_history_div").hide();
        $("#historytrackdetail").show();
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "QUOTATIONNO", op: "eq", data: quotationno });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=SALES_QUOTATION_DETAIL_GET&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.tracklist != undefined) {
                        $("#Timelinedetail").append($("#DdlTimeline").render(JsonObject.serviceresponse.tracklist.details));
                    }
                    if (JsonObject.serviceresponse.quotationdetail != undefined) {
                        $("#txtquotlist").append($("#Ddlquotlist").render(JsonObject.serviceresponse.quotationdetail));
                        $("#quototalamt").html(JsonObject.serviceresponse.quotationdetail.total_amt.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                    }
                    if (JsonObject.serviceresponse.designlist != undefined) {
                        $("#quodesigndetail").append($("#Ddlquodesigndetail").render(JsonObject.serviceresponse.designlist.designdetail));
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
                    $(".loadingtrinity").hide();
                }
                else {
                    $(".loadingtrinity").hide();
                    InvalidResponseCode(data);
                }
            },
            error: OnError,
        });
    }
}
function show_quot_history() {
    $("#quo_history_div").show();
    $("#historytrackdetail").hide();
    MasterQuotationHistory.BindQuotationHistrory();
}
function Clickonquotation(quotationno) {
    MasterQuotationHistory.BindDesignSteps(quotationno);
}
function showproductdetail(id) {
    var stock = "Virtual"
    var design = $("#design" + id).val();
    window.open(getDomain() + "/Product/ProductDetail?id=" + design + "&stocktype=" + stock, '_blank');
}
$(document).ready(function () {
    $("#quo_history_div").show();
    $("#historytrackdetail").hide();
    MasterQuotationHistory.BindQuotationHistrory();
    $("#searchquotationlist").keyup(function () {
        if ($("#searchquotationlist").val().length >= 3)
        {
            MasterQuotationHistory.BindQuotationHistrory();
        }
        if ($(this).val() == "") {
            MasterQuotationHistory.BindQuotationHistrory();
        }
       
    });
    $("#backwardAdjust1").click(function () {
        MasterQuotationHistory.variable.backbtn -= 1;
        MasterQuotationHistory.BindQuotationHistrory();
    });
    $("#forwardAdjust1").click(function () {
        MasterQuotationHistory.variable.backbtn += 1;
        MasterQuotationHistory.BindQuotationHistrory();
    });
    $("#backmyquotation").click(function () {
        $("#quotationhistorypartial").hide();
        $(".mainprofile").show();
    });
    $("#backmyquotationdetail").click(function () {
        show_quot_history();
    });
   
});