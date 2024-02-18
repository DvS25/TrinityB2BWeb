var Master_PartyStockView = {
    variables: {
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=DESIGN_MASTER_GET",
        BindLabourListUrl: "/Common/BindMastersDetails?ServiceName=MAKING_PRICELIST_GET",
        BinddiamonondtabListUrl: "/Common/BindMastersDetails?ServiceName=PRICELIST_GET&IsRecordAll=true",
        Masterpartyid: "",
    },

    /***Bind data Labour ****/

    initializeLabourJqgrid: function () {
        $(".loadingtrinity").show();
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "PARTYCODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });
       
        $.ajax({
            url: getDomain() + Master_PartyStockView.variables.BindLabourListUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#labourtablist").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#labourtablist").append($("#Datalabourtablist").render(JsonObject.serviceresponse.detailslist.details));
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

    /***Bind data Row Material Diamond****/

    initializediamondtabJqgrid: function () {
        $(".loadingtrinity").show();
        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "PARTYCODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });
        
        $.ajax({
            url: getDomain() + Master_PartyStockView.variables.BinddiamonondtabListUrl + "&_search=true&searchOper=eq&searchField=RM_CATEGORY&searchString=GEMS&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#diamondtablist").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#diamondtablist").append($("#Datadiamondtablist").render(JsonObject.serviceresponse.detailslist.details));
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

    /***Bind data Row Material Colorstone****/

    initializecolorstonetabJqgrid: function () {

        var myfilter = { groupOp: "AND", rules: [] };
        myfilter.rules.push({ field: "PARTYCODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });
            $(".loadingtrinity").show();
                $.ajax({
                    url: getDomain() + Master_PartyStockView.variables.BinddiamonondtabListUrl + "&_search=true&searchOper=eq&searchField=RM_CATEGORY&searchString=STONE&myfilters=" + JSON.stringify(myfilter),
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        $("#colordtablist").html("");
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            var JsonObject = xml2json.parser(data);
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                $("#colordtablist").append($("#Datacolortablist").render(JsonObject.serviceresponse.detailslist.details));
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
    Bindjobpolicy: function (myfilter, res) {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=BUSINESS_POLICY_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'GET',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var pvpolicy;
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        if (res == 'JOB WORK POLICY') {
                            $("#text_bindjobwork").html("");
                            $("#text_bindjobwork").append($("#Bindjobworkdata").render(JsonObject.serviceresponse.detailslist.details));
                            pvpolicy = $("#text_bindjobwork").html();
                            pvpolicy = pvpolicy.replace('&amp;', '&');
                            $("#text_bindjobwork").html(pvpolicy);
                        }
                        else {
                            $("#text_bindbusinessdetails").html("");
                            $("#text_bindbusinessdetails").append($("#Bindjobworkdata").render(JsonObject.serviceresponse.detailslist.details));
                            pvpolicy = $("#text_bindbusinessdetails").html();
                            pvpolicy = pvpolicy.replace('&amp;', '&');
                            $("#text_bindbusinessdetails").html(pvpolicy);
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
    clearpolicyvalue: function () {
        /***Main Tab****/
        $("#tablabour a").removeClass("active");
        $("#tabother a").removeClass("active");
        $("#tabrawmaterial").addClass("active");
        $("#tab-1").addClass("active");
        $("#tab-2").removeClass("active");
        $("#tab-3").removeClass("active");

        /***Sub Tab****/

        $("#rowcolorstone a").removeClass("active");
        $("#rowdiamondtab a").removeClass("active");
        $("#rowgoldtab a").addClass("active");
        $("#businesspolicyli a").removeClass("active");
        $("#jobpolicyli a").addClass("active");
        $("#tab-4").addClass("active");
        $("#tab-5").removeClass("active");
        $("#tab-6").removeClass("active");
        $("#tabjobwork").addClass("active");
        $("#tabbusinesspolicy").removeClass("active");
    },
    clearvaluefunction:function() {
        $("#tab-1").hide();
        $("#tab-2").hide();
        $("#tab-3").hide();
        $(".maintabbtn").removeClass("btn-policy-active");
    }
}

function Getgoldata() {
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=LATEST_GOLDRATE_GET",
        async: false,
        cache: false,
        type: 'GET',
        success: function (data) {
            var JsonObject = xml2json.parser(data);
            if ($(data).find('RESPONSECODE').text() == "0") {
                if (JsonObject.serviceresponse != undefined) {
                    $("#textgoldrate").html(JsonObject.serviceresponse.goldrate.toLocaleString(getDisplayLanguage(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " /10gm");
                    $("#policydate").html("Valid till "+JsonObject.serviceresponse.policydate);
                    
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
    /*************My Policy Modal****************/

    Getgoldata();
    Master_PartyStockView.variables.Masterpartyid = $("#hiddenpartycode").val();
    $("#tabrawmaterial").addClass("btn-policy-active");
    $("#tabrawmaterial").click(function () {
        Master_PartyStockView.clearvaluefunction();
        $("#tabrawmaterial").addClass("btn-policy-active");
        $("#tab-1").show();
    });

    $("#tablabour").click(function () {
        Master_PartyStockView.clearvaluefunction();
        $("#tab-2").show();
        $("#tablabour").addClass("btn-policy-active");
        Master_PartyStockView.initializeLabourJqgrid();
    });

    /****************Row Material Gold Tab***********************************/

    $("#rowgoldtab").click(function () {

        Getgoldata();

    });

    /****************Row Material Diamond Tab***********************************/

    $("#rowdiamondtab").click(function () {

        Master_PartyStockView.initializediamondtabJqgrid();
    });

    /****************Row Material Colourstone Tab***********************************/

    $("#rowcolorstone").click(function () {
        Master_PartyStockView.initializecolorstonetabJqgrid();
    });

    /****************Other Tab***********************************/
    $("#tabother").click(function () {
        Master_PartyStockView.clearvaluefunction();

        var temp = $("#hdn_policy").val().split(","), res = "";

        if (!temp.includes("JobWork") || !temp.includes("Business")) {
            if (!temp.includes("JobWork")) {
                $("#businesspolicyli").addClass("active");
                $("#businesspolicyli a").addClass("active");
                $("#tabbusinesspolicy").addClass("active");
                $("#tabbusinesspolicy").css("visibility", "visible");

                $("#jobpolicyli a").removeClass("active");
                $("#jobpolicyli").removeClass("active");
                $("#tabjobwork").removeClass("active");
                $("#jobpolicyli").hide();

                res = 'BUSINESS POLICY';
            }
            if (!temp.includes("Business")) {
                $("#jobpolicyli").addClass("active");
                $("#jobpolicyli a").addClass("active");
                $("#tabjobwork").addClass("active");
                $("#tabjobwork").css("visibility", "visible");

                $("#businesspolicyli a").removeClass("active");
                $("#businesspolicyli").removeClass("active");
                $("#tabbusinesspolicy").removeClass("active");
                $("#businesspolicyli").hide();

                res = 'JOB WORK POLICY'
            }
            if (!temp.includes("JobWork") && !temp.includes("Business")) {
                $("#jobpolicyli").hide();
                $("#businesspolicyli").hide();
                $("#tabjobwork").hide();
                $("#tabbusinesspolicy").hide();

                res = "";
            }
        }
        else {
            $("#businesspolicyli a").removeClass("active");
            $("#businesspolicyli").removeClass("active");
            $("#jobpolicyli a").addClass("active");
            $("#jobpolicyli").addClass("active");
            $("#tabjobwork").addClass("active");
            $("#tabjobwork").css("visibility", "visible");
            $("#tabbusinesspolicy").removeClass("active");

            res = 'JOB WORK POLICY';
        }
        
        $("#tabother").addClass("btn-policy-active");
        $("#tab-3").show();

        if (res) {
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "POLICY_GRUP", op: "eq", data: res });
            myfilter.rules.push({ field: "PARTY_CODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });

            Master_PartyStockView.Bindjobpolicy(myfilter, res);
        }
        
    });
    $("#jobpolicyli").click(function () {
        var res = 'JOB WORK POLICY'
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "POLICY_GRUP", op: "eq", data: res });
        myfilter.rules.push({ field: "PARTY_CODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });

        Master_PartyStockView.Bindjobpolicy(myfilter, res);
    });
    $("#businesspolicyli").click(function () {
        $("#tabjobwork").css("visibility", "hidden");
        var res = 'BUSINESS POLICY'
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "POLICY_GRUP", op: "eq", data: res });
        myfilter.rules.push({ field: "PARTY_CODE", op: "eq", data: Master_PartyStockView.variables.Masterpartyid });

        Master_PartyStockView.Bindjobpolicy(myfilter, res);

        //Master_PartyStockView.Bindbusinesspolicypolicy();
    });
    $("#backmypolicy").click(function () {
        Master_PartyStockView.clearpolicyvalue();
        $("#policypartial").hide();
        $(".mainprofile").show();
    });
});