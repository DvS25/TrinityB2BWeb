function BindTotalorder() {
    $(".loadingtrinity").show();
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_USERPROFILE_GET",
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            //$("#Totalorderlist").html("");
            if ($(data).find('RESPONSECODE').text() == "0") {
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $("#Totalorderlist").append($("#DataTotalorderlist").render(JsonObject.serviceresponse.detailslist.details));
                    $("#total_grand_amount").html(parseFloat($("#total_grand_amount").html()).toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                    var str = $('#total_grand_amount').html();
                    var regex = /-/;
                    if (regex.test(str) == true) {
                        $("#total_grand_amount").css("color", "#d60909");
                    }
                    else {
                        $("#total_grand_amount").css("color", "green");
                    }
                    $("#myprofile_datadiv").show();
                    $(".loadingtrinity").hide();
                }
                else {
                    $(".loadingtrinity").hide();
                }
                
            }
            else {
                $(".loadingtrinity").hide();
                InvalidResponseCode(data);
            }
        },
        error: OnError,
    });
}
function Showmydetails() {
    Clearvalue();
    $("#detailpartial").show();
}
function Showmypolicy() {
    Clearvalue();
    $("#policypartial").show();
}
function Showquotationhistory() {
    Clearvalue();
    $("#quotationhistorypartial").show();
}
function Clearvalue() {
    $("#detailpartial").hide();
    $("#policypartial").hide();
    $("#quotationhistorypartial").hide();
    $(".mainprofile").hide();
}
$(document).ready(function () {
    $(".loadingtrinity").show();
    BindTotalorder();
})