var MasterMydetails = {
    variable: {
        state: "",
        City: "",
        diamondcolor: "",
        diamondpurity: "",
    },
    BindDiamondColor: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_CUSTOMIZE_MASTER_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.diamondcolorlist != undefined) {
                        $("#binddiamondcolor").append($("#Databinddiamondcolor").render(JsonObject.serviceresponse.diamondcolorlist.diamondcolor));
                    }
                    if (JsonObject.serviceresponse.diamondqualitylist != undefined) {
                        $("#binddiamondpurity").append($("#Databinddiamondpurity").render(JsonObject.serviceresponse.diamondqualitylist.diamondquality));
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    SalesBindDiamondColor: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_CUSTOMIZE_MASTER_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.diamondcolorlist != undefined) {
                        $("#salesbinddiamondcolor").append($("#SalesDatabinddiamondcolor").render(JsonObject.serviceresponse.diamondcolorlist.diamondcolor));
                    }
                    if (JsonObject.serviceresponse.diamondqualitylist != undefined) {
                        $("#salesbinddiamondpurity").append($("#SalesDatabinddiamondpurity").render(JsonObject.serviceresponse.diamondqualitylist.diamondquality));
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    BindPartyDetails: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=SALES_WHOLESELLER_DETAILS_GET&_search=true&searchField=WSID&searchOper=eq&searchString=" + $("#hiddenloginid").val(),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        var partydetail = JsonObject.serviceresponse.detailslist.details;
                        $("#txtpartycode").html(partydetail.partycode);
                        $("#txtCompanyName").val(partydetail.company);
                        $("#txtPersonname").val(partydetail.contactpersonname);
                        $("#text_username").val(partydetail.username);
                        $("#text_Userpassword").val(partydetail.password);
                        $("#txtemailid").val(partydetail.emailid);
                        $("#txtcontactno").val(partydetail.contactno);
                        $("#txtmobileno").val(partydetail.mobile);
                        $("#txtgstno").val(partydetail.gstno);
                        $("#txtpanno").val(partydetail.panno);
                        $("#textaddress").val(partydetail.address);
                        //$("#Activetilldate").html(partydetail.logintimeduration + " " + partydetail.logintime);
                        $("#txtcontryname").val(partydetail.country);
                        MasterMydetails.variable.state = partydetail.state;
                        MasterMydetails.variable.City = partydetail.city;
                        onediamondcolorcheck(partydetail.defaultdiamondcolor);
                        onediamondpuritycheck(partydetail.defaultdiamondpurity);
                        $("#sales-designconcept").html(partydetail.defaultconcept_of);
                        $("#txtPartyConceptOf").val(partydetail.defaultconcept_of);
                    }

                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    btnMasterSubmit: function () {
        var isValid = $("#frmpartyDetails").valid();
        if (!isValid) {
            if ($("#text_Userpassword").val() == "") {
                $("#text_Userpassword-error").insertAfter($("#text_Userpassword").parent());
            }
            return;
        }
        var data = {
            "oper": "edit",
            "WSID": $("#hiddenloginid").val(),
            "CONTACTPERSONNAME": $("#txtPersonname").val(),
            "USERNAME": $("#text_username").val(),
            "PASSWORD": $("#text_Userpassword").val(),
            "COMPANY": $("#txtCompanyName").val(),
            "EMAILID": $("#txtemailid").val(),
            "CONTACTNO": $("#txtcontactno").val(),
            "MOBILE": $("#txtmobileno").val(),
            "GSTNO": $("#txtgstno").val().toUpperCase(),
            "PANNO": $("#txtpanno").val().toUpperCase(),
            "ADDRESS": $("#textaddress").val(),
            "CITY": $("#txtcityname option:selected").val(),
            "STATE": $("#txtstatename option:selected").val(),
            "COUNTRY": $("#txtcontryname option:selected").val(),
            "DEFAULTDIAMONDCOLOR": MasterMydetails.variable.diamondcolor,
            "DEFAULTDIAMONDPURITY": MasterMydetails.variable.diamondpurity
        };
        MasterMydetails.Savedata(data);
    },
    Savedata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SALES_WHOLESELLER_DETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: MasterMydetails.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            if (($("#text_username").val() != $("#hiddenusername").val()) || ($("#text_Userpassword").val() != $("#hiddenuserpassword").val())) {
                $("#reloginModal").modal("show");
            }
            else {
                OperationMessage("", 'Details are saved successfully', 'success');
                $("#detailpartial").hide();
                $("#mainprofile").show();
            }

        }
        else {
            InvalidResponseCode(data);
        }
    },
    BindSalesDetails: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=USERDETAILS_GET&_search=true&searchField=USERID&searchOper=eq&searchString=" + $("#hiddenloginid").val(),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        var salesdetail = JsonObject.serviceresponse.detailslist.details;
                        $("#sales-user-group").show();
                        $("#lable-usergrp").show();
                        $("#sales-user-group").html(salesdetail.usergroupname);
                        $("#txtEmployeename").val(salesdetail.employee_name);
                        $("#text_salesusername").val(salesdetail.uname);
                        $("#text_salesUserpassword").val(salesdetail.password);
                        $("#txtassignusergrp").html(salesdetail.usergroupname);
                        $("#txtsalesemailid").val(salesdetail.email);
                        $("#txtsalesmobileno1").val(salesdetail.mobile_no1);
                        $("#txtsalesmobileno2").val(salesdetail.mobile_no2);
                        $("#salesgender").val($("input[name=genderradio][value=" + salesdetail.gender + "]").prop('checked', true));
                        salesonediamondcolorcheck(salesdetail.defaultdiamondcolor);
                        salesonediamondpuritycheck(salesdetail.defaultdiamondpurity);
                        $("#sales-designconcept").html(salesdetail.defaultconcept_of);
                        $("#ddlSalesConceptOf").val(salesdetail.defaultconcept_of.split(",")).change();
                    }

                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    SalesbtnMasterSubmit: function () {
        var isValid = $("#frmsalesDetails").valid();
        if (!isValid) {
            if ($("#text_salesUserpassword").val() == "") {
                $("#text_salesUserpassword-error").insertAfter($("#text_salesUserpassword").parent());
            }
            return;
        }
        var data = {
            "oper": "edit",
            "USERID": $("#hiddenloginid").val(),
            "EMAIL": $("#txtsalesemailid").val(),
            "PASSWORD": $("#text_salesUserpassword").val(),
            "EMPLOYEE_NAME": $("#txtEmployeename").val(),
            "UNAME": $("#text_salesusername").val(),
            "GENDER": $('input[name=genderradio]:checked').val(),
            "MOBILE_NO1": $("#txtsalesmobileno1").val(),
            "MOBILE_NO2": $("#txtsalesmobileno2").val(),
            "DEFAULTDIAMONDCOLOR": MasterMydetails.variable.diamondcolor,
            "DEFAULTDIAMONDPURITY": MasterMydetails.variable.diamondpurity,
            "DEFAULTCONCEPTOF": $("#ddlSalesConceptOf").val().toString()
        };
        MasterMydetails.SalesSavedata(data);
    },
    SalesSavedata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=USERDETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: MasterMydetails.SalesbtnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    SalesbtnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            // OperationMessage("", 'Details are saved successfully', 'success');
            if (($("#text_salesusername").val() != $("#hiddenusername").val()) || ($("#text_salesUserpassword").val() != $("#hiddenuserpassword").val())) {
                $("#reloginModal").modal("show");
            }
            else {
                OperationMessage("", 'Details are saved successfully', 'success');
                $("#detailpartial").hide();
                $("#mainprofile").show();
            }

        }
        else {
            InvalidResponseCode(data);
        }
    },
}
function onediamondcolorcheck(checkbox) {
    $('.diamondc').not(this).prop('checked', false);
    $('#' + checkbox).prop('checked', true);
    MasterMydetails.variable.diamondcolor = $('#' + checkbox).val();

}
function onediamondpuritycheck(checkbox) {
    $('.diamondp').not(this).prop('checked', false);
    $('#' + checkbox).prop('checked', true);
    MasterMydetails.variable.diamondpurity = $('#' + checkbox).val();
}
function salesonediamondcolorcheck(checkbox) {
    $('.salesdiamondc').not(this).prop('checked', false);
    $('#' + checkbox).prop('checked', true);
    MasterMydetails.variable.diamondcolor = $('#' + checkbox).val();

}
function salesonediamondpuritycheck(checkbox) {
    $('.salesdiamondp').not(this).prop('checked', false);
    $('#' + checkbox).prop('checked', true);
    MasterMydetails.variable.diamondpurity = $('#' + checkbox).val();
}
function Changecountry() {
    if ($("#txtcontryname option:selected").text() == "India" || $("#txtcontryname option:selected").text() == "india") {
        $("#statediv").show();
        $("#citydiv").show();
        BindState();
    }
    else {
        $("#txtstatename").val("");
        $("#txtcityname").val("");
        $("#statediv").hide();
        $("#citydiv").hide();
    }
}
function ChangeState() {
    BindCity();
}
function BindState() {
    var myfilter1 = { rules: [] };
    myfilter1.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'State' });
    myfilter1.rules.push({ field: "COUNTRYID", op: "eq", data: $("#txtcontryname option:selected").val() });
    BindDropdown('txtstatename', 'DdlStateList', "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter1), 'Select State');
}
function BindCity() {
    var myfilter1 = { rules: [] };
    myfilter1.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'City' });
    myfilter1.rules.push({ field: "STATEID", op: "eq", data: $("#txtstatename option:selected").val() });
    BindDropdown('txtcityname', 'DdlcityList', "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter1), 'Select State');
}
function BindConceptOf() {
    BindDropdown('ddlSalesConceptOf', 'DdlConceptOfList', "/Common/BindMastersDetails?ServiceName=STATIC_CONCEPTOF_MAS_GET", '');
}
$(document).ready(function () {
    if ($("#hiddenusertype").val() == "Party") {
        $("#partydetaildiv").show();
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'Country' });
        BindDropdown('txtcontryname', 'DdlCountryList', "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), 'Select Country');
        MasterMydetails.BindDiamondColor();
        MasterMydetails.BindPartyDetails();
    }
    if ($("#txtcontryname option:selected").text() == "India" || $("#txtcontryname option:selected").text() == "india") {
        $("#statediv").show();
        $("#citydiv").show();
        BindState();
        $("#txtstatename").val(MasterMydetails.variable.state);

    }
    if ($("#txtstatename option:selected").text() != "") {
        BindCity();
        $("#txtcityname").val(MasterMydetails.variable.City);
    }
    $("#btnsavendnext").click(function () {
        MasterMydetails.btnMasterSubmit();
    });
    if ($("#hiddenusertype").val() == "SalesExecutive") {
        BindConceptOf();
        $('#ddlSalesConceptOf').select2();
        $("#salesdetaildiv").show();
        MasterMydetails.SalesBindDiamondColor();
        MasterMydetails.BindSalesDetails();
    }
    $("#btnsalessavendnext").click(function () {
        MasterMydetails.SalesbtnMasterSubmit();
    });
    $("#backmydetails").click(function () {
        $("#detailpartial").hide();
        $(".mainprofile").show();
    });
    $(".btncanclepartysales").click(function () {
        $("#detailpartial").hide();
        $(".mainprofile").show();
    });
    $("#btnlogoutinchangedata").click(function () {
        window.location.href = getDomain() + "/Login/LogOut";
    });
    $("#showslaespassword").click(function () {
        $("#text_salesUserpassword").attr("type", "text");
    });
    $("#showpartypassword").click(function () {
        $("#text_Userpassword").attr("type", "text");
    });
})