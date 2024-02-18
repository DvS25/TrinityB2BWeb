function Bindjobpolicy(myfilter, res) {
    $(".loadingtrinity").show();
    var res = 'BUSINESS POLICY'
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "POLICY_GRUP", op: "eq", data: res });
    myfilter.rules.push({ field: "APPPOLICY", op: "eq", data: "DefaultPolicy" });
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=BUSINESS_POLICY_GET&myfilters=" + JSON.stringify(myfilter),
        async: false,
        cache: false,
        type: 'GET',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                var JsonObject = xml2json.parser(data);
                var pvpolicy;
                if (JsonObject.serviceresponse.businesslist != undefined) {
                    $("#text_bindbusinessdetails").html("");
                    $("#text_bindbusinessdetails").append($("#Bindjobworkdata").render(JsonObject.serviceresponse.businesslist.businessdetails));
                    pvpolicy = $("#text_bindbusinessdetails").html();
                    pvpolicy = pvpolicy.replace('&amp;', '&');
                    $("#text_bindbusinessdetails").html(pvpolicy);
                    $(".loadingtrinity").hide();
                }

            }
            else {
                $(".loadingtrinity").hide();
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
$(document).ready(function () {
    Bindjobpolicy();
});