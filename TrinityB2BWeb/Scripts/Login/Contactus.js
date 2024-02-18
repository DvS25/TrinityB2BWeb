var Contactusview = {
    btnMasterSubmit: function () {

        var isValid = $("#formcontactus").valid();
       
        if (!isValid)
            return;
      
        var data = {
            "oper": "add",
            "FULLNAME": $("#txt_name").val(),
            "EMAILID": $("#txt_email").val(),
            "MOBILENO": $("#txt_mobile").val(),
            "MESSAGE": $("#txt_message").val(),
            "ENTRYFROM":"B2BWeb"
        }

        Contactusview.savedata(data);
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=CONTACTUS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Contactusview.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
                OperationMessage("", 'Your Contact Detail Send successfully', 'success');
                Contactusview.ClearValues();
        }
        else {
            InvalidResponseCode(data);
        }
    },

    ClearValues: function () {
        $("#txt_name").val("");
        $("#txt_email").val("");
        $("#txt_mobile").val("");
        $("#txt_message").val("");
    },
}
$(document).ready(function () {
    $('#txt_mobile').keypress(function (event) {
        return numbersOnly(this, event, false, false);
    });
    $('#txt_mobile').on('copy paste cut', function (e) {
        e.preventDefault(); //disable cut,copy,paste
        return false;
    });
    $("#btnsendmail").click(function () {
        Contactusview.btnMasterSubmit();
    });
});