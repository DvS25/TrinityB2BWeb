var QuotationView = {
    variables: {
        dx_dataGrid: "",
    },

    BindQuotationDetail: function () {

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "UNIQUEID", op: "eq", data: $("#hdnQuotationMasterId").val() });

        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=ACC_QUOTATIONMASTER_PRINT_GET" + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var jsonObject = xml2json.parser(data);
                    if (jsonObject.serviceresponse.voucherlist) {
                        var List = [];
                        if (jsonObject.serviceresponse.voucherlist.length > 0)
                            List = jsonObject.serviceresponse.voucherlist;
                        else
                            List.push(jsonObject.serviceresponse.voucherlist);

                        var string = "";
                        $("#QuotationDate").html(jsonObject.serviceresponse.voucherlist.quotation_date);
                        $("#QuotationNo").html(jsonObject.serviceresponse.voucherlist.quotation_no);
                        $("#quotationType").html(jsonObject.serviceresponse.voucherlist.type);
                        $("#QuotationBy").html(jsonObject.serviceresponse.voucherlist.salesmanname);
                        $("#DueDays").html(jsonObject.serviceresponse.voucherlist.dueday);

                        $(jsonObject.serviceresponse.voucherlist.voucherdetailsitemlist.voucheritemdetails).each(function (key2, obj2) {

                            string += '<tr>'
                                        + '<td class="tblImage" rowspan="3" style="text-align:center;"><img src="' + obj2.imgpath + '" height="200px" width="200px">' + obj2.designcode + '</td>'
                                        + '<td class="bdr1">'
                                             + '<label class="col-sm-2" style="margin-top:-1px;"><strong> Category : </strong></label>'
                                                + '<div class="col-sm-2">' + obj2.desgcate + '</div>'
                                             + '<label class="col-sm-2"><strong> Gross Weight : </strong></label>'
                                                + '<div class="col-sm-2">' + obj2.grosswgt + '</div>'
                                             + '<label class="col-sm-2"><strong> Quantity : </strong></label>'
                                                + '<div class="col-sm-1">' + obj2.qty + '</div>'
                                        + '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                        + '<td class="bdr2">'
                                             + '<label class="col-sm-2" style="margin-top:-1px;"><strong> Sub Category : </strong></label>'
                                                + '<div class="col-sm-2">' + obj2.desgsubcate + '</div>'
                                             + '<label class="col-sm-2"><strong> Net Weight : </strong></label>'
                                                + '<div class="col-sm-2">' + obj2.mwgt + '</div>'
                                             + '<label class="col-sm-2"><strong> Total Amount : </strong></label>'
                                                + '<div class="col-sm-1">' + obj2.totalamt + '</div>'
                                        + '</td>'
                                    + '</tr>'
                                    + '<tr>'
                                        + '<td>'
                                            + '<table class="table table-bordered table-striped table-responsive" id="TableQuotation_DetailsBody">'
                                            + '<thead>'
                                               + '<tr>'
                                                    + '<th>Rm Code</th>'
                                                    + '<th>Shape</th>'
                                                    + '<th>Quality</th>'
                                                    + '<th>Color</th>'
                                                    + '<th style="text-align:right;">Length</th>'
                                                    + '<th style="text-align:right;">Width</th>'
                                                    + '<th style="text-align:right;">Charni</th>'
                                                    + '<th style="text-align:right;">Pcs</th>'
                                                    + '<th style="text-align:right;">Wgt</th>'
                                                    + '<th style="text-align:right;">Rate</th>'
                                                    + '<th style="text-align:right;">Amount</th>'
                                               + '</tr>'
                                               + '</thead>'
                                               + '<tbody>';

                                    $(obj2.voucherdetailslist.voucherdetails).each(function (key1, obj1) {
                                             string += '<tr>'
                                                    + '<td>' + obj1.rmcode + '</td>'
                                                    + '<td>' + obj1.rmsubcate + '</td>'
                                                    + '<td>' + obj1.purity + '</td>'
                                                    + '<td>' + obj1.colour + '</td>'
                                                    + '<td style="text-align:right;">' + obj1.lenghtmmsize + '</td>'
                                                    + '<td style="text-align:right;">' + obj1.widthmmsize + '</td>'
                                                    + '<td style="text-align:right;">' + obj1.charni + '</td>'
                                                    + '<td style="text-align:right;">' + obj1.pieces + '</td>'
                                                    + '<td style="text-align:right;">' + obj1.weight + '</td>'
                                                    + '<td style="text-align:right;">' + obj1.rate + '</td>'
                                                    + '<td style="text-align:right;">' + obj1.amount + '</td>'
                                              + '</tr>'

                                    });

                                string += '</tbody></table></td></tr>';
                            });

                         $("#TableQuotation_ItemsBody tbody").html(string);
                    }
                }
                else {
                    "error";
                }
            },
            error: OnError
        });
    },
}

$(document).ready(function () {
    QuotationView.BindQuotationDetail();
});