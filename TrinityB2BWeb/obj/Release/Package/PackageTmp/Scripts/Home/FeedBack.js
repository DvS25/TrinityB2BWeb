var Feedbackview = {
    variable:{
        ratenum: ""
    },
    btnMasterSubmit: function () {
        $(".loadingtrinity").show();
        var data = {
            "oper": "add",
            "ISACTIVE": "1",
            "RATING": Feedbackview.variable.ratenum,
            "COMMENT": $("#inputtxtreview").val(),
        }
        Feedbackview.savedata(data);
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=FEEDBACK_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    OperationMessage("", "Your feedback is saved successfully", "success");
                    Feedbackview.variable.ratenum = "";
                    $("#inputtxtreview").val("");
                    $("#rateYo").rateYo("option", "rating", 0);
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
}
$(document).ready(function () {
    $("#rateYo").rateYo({
        normalFill: "#A0A0A0",
        ratedFill: "#F39C12 ",
        starWidth: "25px",
        numStars: 5,
        fullStar: true,
        onChange: function (rating, rateYoInstance) {
            Feedbackview.variable.ratenum = rating;
        }
    });
    $("#btnsubmitfeedback").click(function () {
        Feedbackview.btnMasterSubmit();
    });
});