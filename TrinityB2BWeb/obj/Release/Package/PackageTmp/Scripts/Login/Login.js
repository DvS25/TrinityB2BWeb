var Loginview = {
    variable: {
        Usertype: '',
        Username: ''
    },
    btnMasterSubmit: function () {
        var isValid = $("#formsignup").valid();
        if ($('#temscheckbox').is(':checked') == false) {
            $("#errorchecktems").show();
            isValid = false;
        }
        if (!isValid)
            return;
        var data = {
            "COMPANY": $("#txt_companyname").val(),
            "CONTACTPERSONNAME": $("#txt_contactperson").val(),
            "USERNAME": $("#txt_username").val(),
            "PASSWORD": $("#txt_password").val(),
            "CONTACTNO": $("#txt_contactno").val(),
            "EMAILID": $("#txt_email").val(),
            "COUNTRY": $("#dropdowncountry").val(),
            "STATE": $("#dropdownstate").val(),
            "CITY": $("#dropdowncity").val(),
            "ENTRYFROM": 'B2BWeb',
        }
        Loginview.savedata(data);
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SALES_WHOLESELLER_DETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Loginview.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            OperationMessage("", 'Your Registration was successful!', 'success');
            Loginview.ClearValues();
        }
        else {
            InvalidResponseCode(data);
        }
    },
    ClearValues: function () {
        $("#errorchecktems").hide();
        $("#txt_companyname").val("");
        $("#txt_contactperson").val("");
        $("#txt_username").val("");
        $("#txt_password").val("");
        $("#txt_confrompassword").val("");
        $("#txt_contactno").val("");
        $("#txt_email").val("");
        $("#dropdowncountry").val("");
        $("#dropdownstate").val("");
        $("#dropdowncity").val("");
        $("#loginform").show();
        $("#signupform").hide();
    },
    btnforgotSubmit: function () {
        var isValid = $("#fromforgot").valid();
        if (!isValid)
            return;
        var data = {
            "USERNAME": Loginview.variable.Username,
            "USERTYPE": Loginview.variable.Usertype,
            "ACTION": "ForgetPassword"
            //"RENDOMOTP": otp
        }
        Loginview.saveforgotdata(data);
    },
    saveforgotdata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SECURITY_USER_FORGOTPASSWORD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Loginview.btnMasterforgotSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterforgotSubmitOnSuccess: function (data) {

        if ($(data).find('RESPONSECODE').text() == "0") {
            //$("#hidenmobilenootp").val($(data).find('OTP').text());
            $("#hidepartyid").val($(data).find('RESPONSEPARTYID').text());
            Loginview.variable.Usertype = $(data).find('USERTYPE').text();
            $("#forgotdivform").hide();
            $("#varifcationdiv").show();
            $("#errorforgot").hide();
            $("#resendotp").css("pointer-events", "none");
            $("#resendotp").css("color", "#000000a1");
            $("#timer").html("00:00");
            var now = new Date();
            timeup = now.setSeconds(now.getSeconds() + 120);
            counter = setInterval(timer, 1000);
            timer();
        }
        else {
            $("#errorforgot").show();
            $("#errorforgot").html($(data).find('RESPONSEMESSAGE').text());
            //InvalidResponseCode(data);
        }
    },
    btnupdatepassword: function () {
        var isValid = $("#formchangepassword").valid();
        if (!isValid)
            return;
        var data = {
            "oper": 'edit',
            "PASSWORD": $("#txt_veifypassword").val(),
            "WSID": $("#hidepartyid").val(),
            "ENTRYFROM": 'B2BWeb',
        }
        Loginview.saveupdatedata(data);
    },
    saveupdatedata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SALES_WHOLESELLER_DETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Loginview.btnMasterSubmitupdateOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitupdateOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            OperationMessage("", 'Your Password change successfully', 'success');
            $("#addnewpassword").hide();
            $("#hidepartyid").val("");
            Loginview.variable.Username = "",
            Loginview.variable.Usertype = "",
            $("#hidenmobilenootp").val("");
            $("#logindivform").show();
        }
        else {
            InvalidResponseCode(data);
        }
    },
    btnupdatesalespassword: function () {
        var isValid = $("#formchangepassword").valid();
        if (!isValid)
            return;
        var data = {
            "oper": 'edit',
            "PASSWORD": $("#txt_veifypassword").val(),
            "USERID": $("#hidepartyid").val(),
            "ENTRYFROM": 'B2BWeb',
        }
        Loginview.saveupdatesalesdata(data);
    },
    saveupdatesalesdata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=USERDETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Loginview.btnMasterSubmitupdateOnSuccess,
            error: OnError,
        });
    },
}

var now = new Date();
var timeup = now.setSeconds(now.getSeconds() + 120);
var counter = setInterval(timer, 1000);
function timer() {
    now = new Date();
    count = Math.round((timeup - now) / 1000);
    if (now > timeup) {
        $("#resendotp").css("pointer-events", "auto");
        $("#resendotp").css("color", "#000");
        clearInterval(counter);
        $("#timer").html("00:00");
        return;
    }
    var seconds = Math.floor((count % 60));
    if (seconds == "0") {
        var sec = seconds + "0";
    }
    else {
        var sec = seconds;
    }
    var minutes = Math.floor((count / 60) % 60);
    $("#timer").html("0" + minutes + ":" + sec);
}
function numbersOnlytype(Sender, evt, isFloat, isNegative) {
    if (Sender.readOnly) return false;

    var key = evt.which || !window.event ? evt.which : event.keyCode;
    var value = Sender.value;

    if ((key == 46 || key == 44) && isFloat) {
        var selected = document.selection ? document.selection.createRange().text : "";
        if (selected.length == 0 && value.indexOf(".") == -1 && value.length > 0) Sender.value += ".";
        return false;
    }
    if (key == 45) { // minus sign '-'
        if (!isNegative) return false;
        if (value.indexOf('-') == -1) Sender.value = '-' + value; else Sender.value = value.substring(1);
        if (Sender.onchange != null) {
            if (Sender.fireEvent) {
                Sender.fireEvent('onchange');
            } else {
                var e = document.createEvent('HTMLEvents');
                e.initEvent('change', false, false);
                Sender.dispatchEvent(e);
            }
        }
        var begin = Sender.value.indexOf('-') > -1 ? 1 : 0;
        if (Sender.setSelectionRange) {
            Sender.setSelectionRange(begin, Sender.value.length);
        } else {
            var range = Sender.createTextRange();
            range.moveStart('character', begin);
            range.select();
        }

        return false;
    }
    if (key > 31 && (key < 48 || key > 57)) return false;
}
$(document).ready(function () {
    $(".login-Paaword").attr("type", "password");
    $("#errorchecktems").hide();
    $('#temscheckbox').change(function () {
        if ($(this).is(":checked")) {
            $("#errorchecktems").hide();
        }
        else {
            $("#errorchecktems").show();
        }
    });
    $("#resendotp").click(function () {
        //var otp = Math.floor(100000 + Math.random() * 900000);
        //otp = String(otp);
        //otp = otp.substring(0, 4);
        var data = {
            "USERNAME": Loginview.variable.Username,
            "USERTYPE": Loginview.variable.Usertype,
            "ACTION": "ForgetPassword"
            //"RENDOMOTP": otp
        }
        Loginview.saveforgotdata(data);
    });
    $("#lableforgot").click(function () {
        $("#forgotdivform").show();
        $("#logindivform").hide();
    });
    $("#lableregister").click(function () {
        $("#loginform").hide();
        $("#signupform").show();
        BindDropdown('dropdowncountry', 'DDLCountryList', "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&Contrydropdown=Country", 'Select Country');
    });
    $("#btnsignup").click(function () {
        Loginview.btnMasterSubmit();
    });
    $("#dropdowncountry").change(function () {
        if ($("#dropdowncountry option:selected").text() == "India" || $("#dropdowncountry option:selected").text() == "india") {
            var selectedcountry, myfilter;
            selectedcountry = $("#dropdowncountry option:selected").val();
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "COUNTRYID", op: "eq", data: selectedcountry });
            BindDropdown('dropdownstate', 'DDLStateList', "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&Contrydropdown=State&myfilters=" + JSON.stringify(myfilter), 'Select State');
            $("#dropstatediv").show();
            $("#dropcitydiv").show();
        }
        else {
            $("#dropstatediv").hide();
            $("#dropcitydiv").hide();
        }
    });
    $("#dropdownstate").change(function () {
        var selectedstate, myfilter;
        var selectedstate = $("#dropdownstate option:selected").val();
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "STATEID", op: "eq", data: selectedstate });
        BindDropdown('dropdowncity', 'DDLCityList', "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&Contrydropdown=City&myfilters=" + JSON.stringify(myfilter), 'Select City');
    });
    $("#forgot_send").click(function () {
        //var otp = Math.floor(100000 + Math.random() * 900000);
        //otp = String(otp);
        //otp = otp.substring(0, 4);
        Loginview.variable.Username = $("#txt_forgotuser").val(),
        // Loginview.variable.Usertype = $('input[name=radiousetype]:checked').val(),
        //Loginview.btnforgotSubmit(otp);
        Loginview.btnforgotSubmit();
    });
    $("#btnverifyotp").click(function () {
        //if ($("#partitioned").val() == $("#hidenmobilenootp").val())
        //{
        //    $("#errorotpnotmatch").hide();
        //    $("#varifcationdiv").hide();
        //    $("#addnewpassword").show();
        //}
        //else {
        //    $("#errorotpnotmatch").show();
        //}

        if (!$("#partitioned").val()) {
            OperationMessage("Validation", 'Please enter OTP.', 'warning');
            return false;
        }

        var data = {
            "USERNAME": Loginview.variable.Username,
            "USERTYPE": Loginview.variable.Usertype,
            "ACTION": "VerifyToken",
            "RENDOMOTP": $("#partitioned").val()
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SECURITY_USER_FORGOTPASSWORD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#errorotpnotmatch").hide();
                    $("#varifcationdiv").hide();
                    $("#addnewpassword").show();
                }
                else {
                    InvalidResponseCode(data);
                    //$("#errorotpnotmatch").show();
                }
            },
            error: OnError,
        });
    });
    $("#btnclicktologin").click(function () {
        if (Loginview.variable.Usertype == 'Party') {
            Loginview.btnupdatepassword();
        }
        else if (Loginview.variable.Usertype == 'SalesExecutive') {
            Loginview.btnupdatesalespassword();
        }

    });
    $('#partitioned').keypress(function (event) {
        return numbersOnlytype(this, event, false, false);
    });
});