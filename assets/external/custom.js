'use strict';


var base_url = 'http://localhost/ssnp/';
var css_path = base_url + "assets/node_modules/bootstrap/css/bootstrap.min.css";
var css_path2 = base_url + "assets/external/custom.css";
var css_path3 = base_url + "assets/bower_components/bootstrap/dist/css/bootstrap.min.css";
var btn_color = "#27aff0";

function goBack()
{
    window.history.back();
}

$("#print_renewal_report").click(function () {
    $("#renewal_reports_div").printMe({ "path": [css_path, css_path2]});
});

$("#print_finance_report").click(function () {
    $("#financial_reports_div").printMe({ "path": [css_path, css_path2]});
});

$("#print_members_report").click(function () {
    $("#members_reports_div").printMe({ "path": [css_path, css_path2]});
});

$("#print_tickets").click(function () {
    $("#myTickets").printMe({ "path": [css_path2, css_path3]});
});

$("#print_member_card").click(function () {
    $("#member_card").printMe({ "path": [css_path2, css_path3]});
});

$('.timerange').on('click', function(e) {
    e.stopPropagation();
    var input = $(this).find('input');

    var now = new Date();
    var hours = now.getHours();
    var period = "PM";
    if (hours < 12) {
        period = "AM";
    } else {
        hours = hours - 11;
    }
    var minutes = now.getMinutes();

    var range = {
        from: {
            hour: hours,
            minute: minutes,
            period: period
        },
        to: {
            hour: hours,
            minute: minutes,
            period: period
        }
    };

    if (input.val() !== "") {
        var timerange = input.val();
        var matches = timerange.match(/([0-9]{2}):([0-9]{2}) (\bAM\b|\bPM\b)-([0-9]{2}):([0-9]{2}) (\bAM\b|\bPM\b)/);
        if( matches.length === 7) {
            range = {
                from: {
                    hour: matches[1],
                    minute: matches[2],
                    period: matches[3]
                },
                to: {
                    hour: matches[4],
                    minute: matches[5],
                    period: matches[6]
                }
            }
        }
    };
    console.log(range);

    var html = '<div class="timerangepicker-container">'+
        '<div class="timerangepicker-from">'+
        '<label class="timerangepicker-label">From:</label>' +
        '<div class="timerangepicker-display hour">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value">'+('0' + range.from.hour).substr(-2)+'</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        ':' +
        '<div class="timerangepicker-display minute">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value">'+('0' + range.from.minute).substr(-2)+'</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        ':' +
        '<div class="timerangepicker-display period">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value">PM</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        '</div>' +
        '<div class="timerangepicker-to">' +
        '<label class="timerangepicker-label">To:</label>' +
        '<div class="timerangepicker-display hour">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value">'+('0' + range.to.hour).substr(-2)+'</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        ':' +
        '<div class="timerangepicker-display minute">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value">'+('0' + range.to.minute).substr(-2)+'</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        ':' +
        '<div class="timerangepicker-display period">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value">PM</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        '</div>' +
        '</div>';

    $(html).insertAfter(this);
    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.hour .increment',
        function(){
            var value = $(this).siblings('.value');
            value.text(
                increment(value.text(), 12, 1, 2)
            );
        }
    );

    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.hour .decrement',
        function(){
            var value = $(this).siblings('.value');
            value.text(
                decrement(value.text(), 12, 1, 2)
            );
        }
    );

    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.minute .increment',
        function(){
            var value = $(this).siblings('.value');
            value.text(
                increment(value.text(), 59, 0 , 2)
            );
        }
    );

    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.minute .decrement',
        function(){
            var value = $(this).siblings('.value');
            value.text(
                decrement(value.text(), 12, 1, 2)
            );
        }
    );

    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.period .increment, .timerangepicker-display.period .decrement',
        function(){
            var value = $(this).siblings('.value');
            var next = value.text() == "PM" ? "AM" : "PM";
            value.text(next);
        }
    );

});

$(document).on('click', e => {

    if(!$(e.target).closest('.timerangepicker-container').length) {
    if($('.timerangepicker-container').is(":visible")) {
        var timerangeContainer = $('.timerangepicker-container');
        if(timerangeContainer.length > 0) {
            var timeRange = {
                from: {
                    hour: timerangeContainer.find('.value')[0].innerText,
                    minute: timerangeContainer.find('.value')[1].innerText,
                    period: timerangeContainer.find('.value')[2].innerText
                },
                to: {
                    hour: timerangeContainer.find('.value')[3].innerText,
                    minute: timerangeContainer.find('.value')[4].innerText,
                    period: timerangeContainer.find('.value')[5].innerText
                },
            };

            timerangeContainer.parent().find('input').val(
                timeRange.from.hour+":"+
                timeRange.from.minute+" "+
                timeRange.from.period+"-"+
                timeRange.to.hour+":"+
                timeRange.to.minute+" "+
                timeRange.to.period
            );
            timerangeContainer.remove();
        }
    }
}

});

function increment(value, max, min, size) {
    var intValue = parseInt(value);
    if (intValue == max) {
        return ('0' + min).substr(-size);
    } else {
        var next = intValue + 1;
        return ('0' + next).substr(-size);
    }
}

function decrement(value, max, min, size) {
    var intValue = parseInt(value);
    if (intValue == min) {
        return ('0' + max).substr(-size);
    } else {
        var next = intValue - 1;
        return ('0' + next).substr(-size);
    }
}




$( function() {
    $( "#range_date_from" ).datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        yearRange: '-10:' + new Date().getFullYear(),
        buttonImageOnly: true,
        inline: true
    });

    $( "#range_date_to" ).datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        yearRange: '-10:' + new Date().getFullYear(),
        buttonImageOnly: true,
        inline: true
    });

    $( "#event_date_from" ).datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: false,
        changeYear: false,
        buttonImageOnly: true,
        inline: true
    });

    $( "#event_date_to" ).datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: false,
        changeYear: false,
        buttonImageOnly: true,
        inline: true
    });
});

$(function () {

    $('#range_date_from').datepicker('setDate', new Date(new Date().setFullYear(new Date().getFullYear())));
    $('#range_date_to').datepicker('setDate', new Date(new Date().setFullYear(new Date().getFullYear())));
});

$( function() {
    $( "#visitor_date" ).datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:-18',
        buttonImageOnly: true,
        inline: true
    });
});

$(function () {

    $('#visitor_date').datepicker('setDate', new Date(new Date().setFullYear(new Date().getFullYear() - 18)));

});

function compose_attendants_email()
{
    var subject = $("#email_sub_att").val();
    var msg = $("#email_body_att").val();

    if(subject === '' || msg === '')
    {
        swal({
            title: "Warning",
            text: "Fill all fields to continue",
            type: "warning",
            showConfirmButton: true,
            showCancelButton: false
        });
    }

    else
    {
        $.ajax({
            type: "POST",
            url: base_url + "events/send_att_email",
            data: $("#comm_attendants").serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending Email ...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#emailModalAtt").modal('hide');
                $("#comm_attendants")[0].reset();

                swal({
                    title: "Success",
                    text: "Emails Sent Successfully",
                    type: "success",
                    showConfirmButton: true,
                });

            }
        });
    }
}

function compose_attendants_sms()
{
    var msg = $("#sms_body_att").val();

    if(msg === '')
    {
        swal({
            title: "Warning",
            text: "Write a message",
            type: "warning",
            showConfirmButton: true,
            showCancelButton: false
        });
    }

    else
    {
        $.ajax({
            type: "POST",
            url: base_url + "events/send_att_sms",
            data: $("#comm_attendants").serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending SMS ...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#smsModalAtt").modal('hide');
                $("#comm_attendants")[0].reset();

                swal({
                    title: "Success",
                    text: "SMS Sent Successfully",
                    type: "success",
                    showConfirmButton: true,
                });

            }
        });
    }
}



//get constituencies

function get_constituencies()
{
    var county = document.getElementById("county").value;

    $.ajax({
        type: "POST",
        url: base_url + "auth/get_constituencies/" + county,
        success: function (res)
        {
            $("#constituency").html(res);
        }
    });
}

function get_constituencies_assign()
{
    var county = document.getElementById("c_assign").value;

    $.ajax({
        type: "POST",
        url: base_url + "auth/get_constituencies/" + county,
        success: function (res)
        {
            $("#sub_assign").html(res);
        }
    });
}

//get wards

function get_wards()
{
    var constituency = document.getElementById("constituency").value;

    $.ajax({
        type: "POST",
        url: base_url + "auth/get_wards/" + constituency,
        success: function (res)
        {
            $("#wards").html(res);
        }
    });
}

function get_wards_assign()
{
    var constituency = document.getElementById("sub_assign").value;

    $.ajax({
        type: "POST",
        url: base_url + "auth/get_wards/" + constituency,
        success: function (res)
        {
            $("#w_assign").html(res);
        }
    });
}

//get polling stations

function get_polling_stations()
{
    var polling = document.getElementById("wards").value;


    $.ajax({
        type: "POST",
        url: base_url + "auth/get_polling_stations/" + polling,
        success: function (res)
        {
            $("#polling").html(res);
        }
    });
}

function check_fname()
{
    var fname = document.getElementById('fname_reg').value;

    if(!fname.match(/^[a-zA-Z ]*$/))
    {
        $("#fname_reg").css({"border": "solid 1px red"});
        $("#fname_error").show();

    }

    else
    {
        $("#fname_reg").css({"border": ""});
        $("#fname_error").hide();
    }

}

function get_sub_cat(val) {
    var base_url = 'https://www.futuristicdevbsd.com/ppra/';
    $.ajax({
        type: "POST",
        url: base_url+"reporting/getPE/"+val,
        data:'cat_id='+val,
        success: function(data){
            $("#pe").html(data);
            // getCity();
        }
    });
}
function get_visit_as(val) {
    if (val == "2") {
        $("#demo").show();
    } else {
        $("#demo").hide();
    }
}



function get_sub_cat2(val) {
    var base_url = 'https://www.futuristicdevbsd.com/ppra/';
    $.ajax({
        type: "POST",
        url: base_url+"reporting/getPE/"+val,
        data:'cat_id='+val,
        success: function(data){
            $("#pe2").html(data);
            // getCity();
        }
    });
}

function check_other_names()
{
    var other_names = document.getElementById('other_names_reg').value;

    if(!other_names.match(/^[a-zA-Z ]*$/))
    {
        $("#other_names_reg").css({"border": "solid 1px red"});
        $("#other_names_error").show();

    }

    else
    {
        $("#other_names_reg").css({"border": ""});
        $("#other_names_error").hide();
    }

}

function check_phone()
{
    var phone = document.getElementById('phone_reg').value;

    if(phone.length !== 10)
    {
        $("#phone_reg").css({"border": "solid 1px red"});
        $("#phone_error").show();
    }

    else
    {
        $("#phone_reg").css({"border": ""});
        $("#phone_error").hide();
    }


}
function check_phone2()
{
    var phone = document.getElementById('phone_walk_in').value;

    if(phone.length !== 10)
    {
        $("#phone_walk_in").css({"border": "solid 1px red"});
        $("#phone_error").show();
    }

    else
    {
        $("#phone_walk_in").css({"border": ""});
        $("#phone_error").hide();
    }


}
function check_email()
{
    var email = document.getElementById('email_reg').value;

    if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
    {
        $("#email_reg").css({"border": "solid 1px red"});
        $("#email_error").show();

    }

    else
    {
        $("#email_reg").css({"border": ""});
        $("#email_error").hide();
    }
}
function check_email2()
{
    var email = document.getElementById('email_walk_in').value;

    if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
    {
        $("#email_walk_in").css({"border": "solid 1px red"});
        $("#email_error").show();

    }

    else
    {
        $("#email_walk_in").css({"border": ""});
        $("#email_error").hide();
    }
}
function check_pass1()
{
    var pass1 = document.getElementById('pass1_reg').value;

    if(pass1.length < 8)
    {
        $("#pass1_reg").css({"border": "solid 1px red"});
        $("#pass1_error").show();
    }

    else
    {
        $("#pass1_reg").css({"border": ""});
        $("#pass1_error").hide();
    }
}

function check_pass2()
{
    var pass1 = document.getElementById('pass1_reg').value;
    var pass2 = document.getElementById('pass2_reg').value;

    if(pass1 !== pass2)
    {
        $("#pass2_reg").css({"border": "solid 1px red"});
        $("#pass_mismatch").show();
    }

    else
    {
        $("#pass2_reg").css({"border": ""});
        $("#pass_mismatch").hide();
    }
}

//<registrat>ion form

$(document).ready(function () {
    $("#registration_form").submit(function (e)
    {
        e.preventDefault();

        var pass1 = document.getElementById('pass1_reg').value;
        var pass2 = document.getElementById('pass2_reg').value;
        var fname = document.getElementById('fname_reg').value;
        var other_names = document.getElementById('other_names_reg').value;
        var email = document.getElementById('email_reg').value;
        var phone = document.getElementById('phone_reg').value;

        if(pass1 !== pass2)
        {
            $("#pass2_reg").css({"border": "solid 1px red"});
            $("#pass_mismatch").show();

            return false;
        }

        else if(!fname.match(/^[a-zA-Z ]*$/))
        {
            $("#fname_reg").css({"border": "solid 1px red"});
            $("#fname_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#other_names_reg").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#other_names_reg").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        else if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
        {
            $("#email_reg").css({"border": "solid 1px red"});
            $("#email_error").show();

            return false;
        }

        else if(phone.length !== 10)
        {
            $("#phone_reg").css({"border": "solid 1px red"});
            $("#phone_error").show();

            return false;
        }

        else if(pass1.length < 8)
        {
            $("#pass1_reg").css({"border": "solid 1px red"});
            $("#pass1_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Processing registration details...",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "ID or passport number provided exists.",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Registration successful... A verification code has been sent to your phone number",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Proceed to verification",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.href = base_url +"auth/verification/" + res + "/" + Math.random().toString(36).substr(2, 20);
                        });
                    }
                }
            });
        }

    });
});

//Update Profile


//registration form

/*$(document).ready(function () {
    $("#registration_form_2").submit(function (e)
    {
        e.preventDefault();

        var pass1 = document.getElementById('pass1_reg').value;
        var pass2 = document.getElementById('pass2_reg').value;
        var fname = document.getElementById('fname_reg').value;
        var other_names = document.getElementById('other_names_reg').value;
        var email = document.getElementById('email_reg').value;
        var phone = document.getElementById('phone_reg').value;

        if(pass1 !== pass2)
        {
            $("#pass2_reg").css({"border": "solid 1px red"});
            $("#pass_mismatch").show();

            return false;
        }

        else if(!fname.match(/^[a-zA-Z ]*$/))
        {
            $("#fname_reg").css({"border": "solid 1px red"});
            $("#fname_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#other_names_reg").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#other_names_reg").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

       /!* else if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
        {
            $("#email_reg").css({"border": "solid 1px red"});
            $("#email_error").show();

            return false;
        }*!/

        else if(phone.length !== 10)
        {
            $("#phone_reg").css({"border": "solid 1px red"});
            $("#phone_error").show();

            return false;
        }

        else if(pass1.length < 8)
        {
            $("#pass1_reg").css({"border": "solid 1px red"});
            $("#pass1_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: new FormData(this),
                processData: false,
                contentType: false,
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Processing registration details...",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "ID or passport number provided exists.",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Registration successful...Login credentials have been sent to user's phone number",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.href = res;
                        });
                    }
                }
            });
        }

    });
});*/


$(document).ready(function () {
    $("#registration_form_2").submit(function (e)
    {
        e.preventDefault();

        var pass1 = document.getElementById('pass1_reg').value;
        var pass2 = document.getElementById('pass2_reg').value;
        var fname = document.getElementById('first_name').value;
        var other_names = document.getElementById('middle_name').value;
        var email = document.getElementById('email_reg').value;
        var phone = document.getElementById('phone').value;

        if(pass1 !== pass2)
        {
            $("#pass2_reg").css({"border": "solid 1px red"});
            $("#pass_mismatch").show();

            return false;
        }

        else if(!fname.match(/^[a-zA-Z ]*$/))
        {
            $("#first_name").css({"border": "solid 1px red"});
            $("#fname_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#midlle_name").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#midlle_name").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        /* else if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
         {
             $("#email_reg").css({"border": "solid 1px red"});
             $("#email_error").show();

             return false;
         }*/

        else if(phone.length !== 10)
        {
            $("#phone_reg").css({"border": "solid 1px red"});
            $("#phone_error").show();

            return false;
        }

        else if(pass1.length < 8)
        {
            $("#pass1_reg").css({"border": "solid 1px red"});
            $("#pass1_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: new FormData(this),
                processData: false,
                contentType: false,
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Processing registration details...",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "Username or Email provided exists.",
                            type: "warning",
                            showConfirmButton: false,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: true
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Registration successful...Login credentials have been sent to user's phone number",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.href = res;
                        });
                    }
                }
            });
        }

    });
});

//update profile form

$(document).ready(function () {
    $("#profile_form").submit(function (e)
    {
        e.preventDefault();

        var fname = document.getElementById('fname_reg').value;
        var other_names = document.getElementById('other_names_reg').value;
        var email = document.getElementById('email_reg').value;
        var phone = document.getElementById('phone_reg').value;

        if(!fname.match(/^[a-zA-Z ]*$/))
        {
            $("#fname_reg").css({"border": "solid 1px red"});
            $("#fname_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#other_names_reg").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#other_names_reg").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        else if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
        {
            $("#email_reg").css({"border": "solid 1px red"});
            $("#email_error").show();

            return false;
        }

        else if(phone.length !== 10)
        {
            $("#phone_reg").css({"border": "solid 1px red"});
            $("#phone_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Updating profile information",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "Server error occurred",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.reload();
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Profile information updated successfully",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.reload();
                        });
                    }
                }
            });
        }

    });
});


//Updating_status
$(document).ready(function () {
    $("a.update_status").click(function (e)
    {
        e.preventDefault();
            $.ajax({
                type: "POST",
                url: $(this).attr("href"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Updating user status",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "Server error occurred",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.reload();
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "User profile status updated successfully",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.reload();
                        });
                    }
                }
            });

    });
});
/*

$(document).ready(function () {
    $("#updating_father").click(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("href"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Updating Father Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Father details updated successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });

    });
});
*/

//updating_PE category
$(document).ready(function () {
    $("#category_form").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding PE Category",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "PE Category Added successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#response_form").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding Quick response",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Quick response added successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#category_form2").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Updating PE Category Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "PE Category details updated successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});
$(document).ready(function () {
    $("#response_form2").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Updating Quick response details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Quick response details updated successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#pe_form2").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Updating PE Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "PE details updated successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});
$(document).ready(function () {
    $("#pe_form").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding PE",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "PE Added successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});
$(document).ready(function () {
    $("#notification_type_form2").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Updating Notification Type details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Notification Type details updated successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});
$(document).ready(function () {
    $("#notification_type_form").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding Notification Type...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Notification Type Added successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});


$(document).ready(function () {
    $("#sysadmin_registration_form").submit(function (e)
    {
        e.preventDefault();

        var fname = document.getElementById('first_name').value;
        var other_names = document.getElementById('surname').value;
        var email = document.getElementById('email_reg').value;
        var phone = document.getElementById('phone_reg').value;


        if(!fname.match(/^[a-zA-Z ]*$/))
        {
            $("#first_name").css({"border": "solid 1px red"});
            $("#fname_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#midlle_name").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#midlle_name").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        /* else if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
         {
             $("#email_reg").css({"border": "solid 1px red"});
             $("#email_error").show();

             return false;
         }*/

        else if(phone.length !== 10)
        {
            $("#phone_reg").css({"border": "solid 1px red"});
            $("#phone_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: new FormData(this),
                processData: false,
                contentType: false,
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Processing registration details...",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "Username or Email provided exists.",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Registration successful...Login credentials have been sent to user's Email",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.href = res;
                        });
                    }
                }
            });
        }

    });
});

$(document).ready(function () {
    $("#endorsing_it").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Endorsing Staff",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Staff endorsed successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});
$(document).ready(function () {
    $("#modifying_staff").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Updating Staff Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "selfservice/staff_management";
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Staff's Details Updated Successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "selfservice/staff_management";
                    });
                }
            }
        });

    });
});

/*
function deactivating_staff(id, name)
{
    $.ajax({
        type: "POST",
        url: base_url + "selfservice/deactivate_staff/"+ id,
        data: {id: id},
        beforeSend: function () {

            swal({
                title: "Confirm"
                text: "Are you sure you want to deactivate '"+name+"' ? Process is irreversible" ,
                type: "info",
                showConfirmButton: true,
                confirmButtonClass: "btn-primary",
                confirmButtonText: "Deactivate",
                closeOnConfirm: false,
                showCancelButton: true
            });

        },
        success: function (res)
        {
            if(res === '1')
            {
                swal({
                    title: "Error",
                    text: "Unable to Deactivate.",
                    type: "error",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });

                return false;
            }

            else
            {
                swal({
                    title: "Success",
                    text: " '"+name+"' Deactivated successfully.",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "OK.",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                }).then((value) => {
                    window.location.href = base_url + "selfservice/staff_management/";
                });
            }
        }
    });
}
*/

$(document).ready(function () {
    $("#not_using_now").submit(function (e)
    {
        var base_url ='http://localhost/ssnp/';
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Assigning payment mode",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "selfservice/assigning_payment_mode";
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Assigned Payment Mode successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "selfservice/assigning_payment_mode";
                    });
                }
            }
        });

    });
});
/*function get_citizenship_as(val) {
    if (val === "2")
    {
        $("#kenyan").show();
        $("#foreigner").hide();
    }
}else if (val === "3")
{
    $("#foreigner").show();
    $("#kenyan").hide();

} else {
    $("#foreigner").hide();
    $("#kenyan").hide();
}*/

$(document).ready(function () {
    $("#adding_staff").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Submiting Staff Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "selfservice/staff_management";
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Staff added successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "selfservice/staff_management/";
                        location.reload();
                    });
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#replace_id").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Submiting Staff ID Replacement Request Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "ID Replacement Request Submitted successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "selfservice/messages";
                    });
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#complaint_form2").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Submiting Complaint Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Complaint Details Submitted successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });
});

$(document).ready(function(){
    $("#anon_notify_2").click(function(){
        var token = document.getElementById('anon_token').value;
        $("#anon_pending").hide();
        $.ajax({
            type: "POST",
            url: base_url + "anonymous/update_notication_status",
            data: {"token": token}
        });

    });
});


$(document).ready(function(){
    $("#anon_notify").click(function(){
        var token = document.getElementById('anon_token').value;
        $("#anon_pending").hide();
        $.ajax({
            type: "POST",
            url: base_url + "anonymous/update_notication_status2",
            data: {"token": token}
        });
    });
});
$(document).ready(function(){
    $(".change_status").click(function(){
        $("#anon_pending").hide();
    });
});


$(document).ready(function () {
    $("#reply_form").submit(function (e) {
        e.preventDefault();
        var editorContent = tinyMCE.get('myTextarea').getContent();
        if (editorContent == '')
        {
            $("#myTextarea_error").show();
            $(".tox-tinymce").css({"border": "1px solid #fb0000"});

            return false;
        }
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    type: "info",
                    text: "Replying...",
                    showConfirmButton: false
                });
            },
            success: function (res) {
                swal({
                    title: "Successful",
                    type: "success",
                    text: "Replied successfully.",
                    showConfirmButton: true,
                    confirmButtonColor: btn_color
                }, function () {
                    window.location.reload();
                });

            }
        });
    });
});

$(document).ready(function () {
    $("#enquiry_form").submit(function (e) {
        e.preventDefault();
        var editorContent = tinyMCE.get('myTextarea').getContent();
        if (editorContent == '')
        {
            $("#myTextarea_error").show();
            $(".tox-tinymce").css({"border": "1px solid #fb0000"});

            return false;
        }
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    type: "info",
                    text: "Sending Enquiry...",
                    showConfirmButton: false
                });
            },
            success: function (res) {
                swal({
                    title: "Successful",
                    type: "success",
                    text: "Equiry sent successfully.",
                    showConfirmButton: true,
                    confirmButtonColor: btn_color
                }, function () {
                    window.location.reload();
                });

            }
        });
    });
});

$(document).ready(function(){
    $("a.enquiry_notify").click(function(){
        var id = document.getElementById('enquiry_id').value;
        $("#enquiry_pending").hide();
        $.ajax({
            type: "POST",
            url: base_url + "reporting/update_enquiry_status",
            data: {"id": id}
        });

    });
});

$(document).ready(function(){
    $("a.anon_enquiry_notify").click(function(){
        var id = document.getElementById('enquiry_id').value;
        $("#enquiry_pending").hide();
        $.ajax({
            type: "POST",
            url: base_url + "anonymous/update_enquiry_status",
            data: {"id": id}
        });

    });
});

$(document).ready(function(){
    $("a.anon_notify-reply").click(function(){
        var id = document.getElementById('enquiry_id').value;
        $("#enquiry_pending").hide();
        $.ajax({
            type: "POST",
            url: base_url + "anonymous/update_notify_status",
            data: {"id": id}
        });

    });
});

$(document).ready(function(){
    $("a.web_notify-reply").click(function(){
        var id = document.getElementById('enquiry_id').value;
        $("#enquiry_pending").hide();
        $.ajax({
            type: "POST",
            url: base_url + "reporting/update_notify_status",
            data: {"id": id}
        });

    });
});

$(document).ready(function(){
    $("a.enquiry_notify2").click(function(){
        var id = document.getElementById('enquiry_id').value;
        $("#enquiry_pending").hide();
        $.ajax({
            type: "POST",
            url: base_url + "ragent/update_enquiry_status",
            data: {"id": id}
        });

    });
});

$(document).ready(function(){
    $("a.enquiry_notify3").click(function(){
        var id = document.getElementById('enquiry_id').value;
        $("#enquiry_pending").hide();
        $.ajax({
            type: "POST",
            url: base_url + "investigation/update_enquiry_status",
            data: {"id": id}
        });

    });
});

$(document).ready(function () {
    $("#anon_form").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Submiting Complaint Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    var obj = JSON.parse(res);
                    swal({
                        title: "Successful",
                        text: "Complaint Submitted successfully. \n "+obj.res_content,
                        type: "success",
                        html: true,
                        showConfirmButton: true,
                        confirmButtonText: "Save PDF",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.open(base_url + "anonymous/print_complaint/"+obj.token);
                        window.location.href = base_url + "anonymous/manage_complaints/";
                    });
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#anon_complaint").click(function (e)
    {
        e.preventDefault();
        swal({
                title: "Anonymous Complaint Tracking",
                text: "<b>Please input your complaint ID</b>",
                type: "input",
                html: true,
                showCancelButton: true,
                closeOnConfirm: false,
                inputPlaceholder: "Write something",
            },
            function(inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }
                else{
                    $.ajax({
                    type: "POST",
                    url: base_url + "anonymous/check_token",
                    data: {"token": inputValue},
                    success: function (res) {
                        if (res === '0') {
                            swal.showInputError("Invalid complaint ID!");
                            return false
                        } else {
                            swal({
                                title: "Success",
                                text: "Loading complaint details of ID: " + inputValue,
                                type: "success",
                                showConfirmButton: true,
                                confirmButtonText: "Ok",
                                confirmButtonColor: btn_color,
                                showCancelButton: false
                            },function () {
                                window.location.href = base_url + "anonymous/complaint_details/" + inputValue;
                            });
                        }
                    }
                });
                }
            });
        });

    });

$(document).ready(function () {
    $("a.anon_enquiry").click(function (e)
    {
        e.preventDefault();
        swal({
                title: "Anonymous Enquiry Tracking",
                text: "<b>Please input your Enquiry ID</b>",
                type: "input",
                html: true,
                showCancelButton: true,
                closeOnConfirm: false,
                inputPlaceholder: "Write something",
            },
            function(inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }
                else{
                    $.ajax({
                        type: "POST",
                        url: base_url + "anonymous/check_enquiry_token",
                        data: {"token": inputValue},
                        success: function (res) {
                            if (res === '0') {
                                swal.showInputError("Invalid enquiry ID!");
                                return false
                            } else {
                                swal({
                                    title: "Success",
                                    text: "Loading Enquiry details of ID: " + inputValue,
                                    type: "success",
                                    showConfirmButton: true,
                                    confirmButtonText: "Ok",
                                    confirmButtonColor: btn_color,
                                    showCancelButton: false
                                },function () {
                                    window.location.href = base_url + "anonymous/general_enquiries/" + inputValue;
                                });
                            }
                        }
                    });
                }
            });
    });

});

$(document).ready(function () {
    $("a.anon_complaint").click(function (e)
    {
        e.preventDefault();
        swal({
                title: "Anonymous Complaint Tracking",
                text: "<b>Please input your complaint ID</b>",
                type: "input",
                html: true,
                showCancelButton: true,
                closeOnConfirm: false,
                inputPlaceholder: "Write something",
            },
            function(inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }
                else{
                    $.ajax({
                        type: "POST",
                        url: base_url + "anonymous/check_token",
                        data: {"token": inputValue},
                        success: function (res) {
                            if (res === '0') {
                                swal.showInputError("Invalid complaint token!");
                                return false
                            } else {
                                swal({
                                    title: "Success",
                                    text: "Loading complaint details of token: " + inputValue,
                                    type: "success",
                                    showConfirmButton: true,
                                    confirmButtonText: "Ok",
                                    confirmButtonColor: btn_color,
                                    showCancelButton: false
                                },function () {
                                    window.location.href = base_url + "anonymous/complaint_details/" + inputValue;
                                });
                            }
                        }
                    });
                }
            });
    });

});

$(document).ready(function () {
    $("a.anon_complaint").click(function (e)
    {
        e.preventDefault();
        swal({
                title: "Anonymous Complaint Tracking",
                text: "<b>Please input your complaint token</b>",
                type: "input",
                html: true,
                showCancelButton: true,
                closeOnConfirm: false,
                inputPlaceholder: "Write something",
            },
            function(inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }
                else{
                    $.ajax({
                        type: "POST",
                        url: base_url + "anonymous/check_token",
                        data: {"token": inputValue},
                        success: function (res) {
                            if (res === '0') {
                                swal.showInputError("Invalid complaint token!");
                                return false
                            } else {
                                swal({
                                    title: "Success",
                                    text: "Loading complaint details of token: " + inputValue,
                                    type: "success",
                                    showConfirmButton: true,
                                    confirmButtonText: "Ok",
                                    confirmButtonColor: btn_color,
                                    showCancelButton: false
                                },function () {
                                    window.location.href = base_url + "anonymous/complaint_details/" + inputValue;
                                });
                            }
                        }
                    });
                }
            });
    });

});

$(document).ready(function () {
    $("#anon_send_enquiry").submit(function (e)
    {
        e.preventDefault();
        var editorContent = tinyMCE.get('the_content').getContent();
        if (editorContent == '')
        {
            $("#the_content_error").show();
            $(".tox-tinymce").css({"border": "1px solid #fb0000"});

            return false;
        }
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending Enquiry",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Enquiry Sent successfully. \n "+res,
                        type: "success",
                        html: true,
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "anonymous/enquiries/";
                    });
                }
            }
        });

    });
});

$(document).ready(function(){
    $('.add_more').click(function(e){
        e.preventDefault();
        $(this).before("<div class='row' style=''>\n" +
            "    <div class='col-sm-6' style=''>\n" +
            "        <div class='form-group'>\n" +
            "            <label>\n" +
            "                Attachment Description\n" +
            "            </label>\n" +
            "            <input type='text' class='form-control' id='attach_desc' name='attach_desc[]'>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "    <div class='col-sm-6' style=''>\n" +
            "        <div class='form-group'>\n" +
            "            <label>\n" +
            "                Upload a file(s) (image/pdf)\n" +
            "            </label><br>\n" +
            "            <input type='file' class='btn btn-success btn-sm' name='file[]' accept='image/*,application/pdf'><br><br>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>");
    });
});


$(document).ready(function () {
    $("#add_organization").submit(function (e) {
        e.preventDefault();

        var name = document.getElementById('name').value;
        var phone_number = document.getElementById('phone_number').value;
        var postal_address = document.getElementById('postal_address').value;
        var postal_code = document.getElementById('postal_code').value;

        if (name == "") {
            $("#name").css({"border": "solid 1px red"});
            $("#name_error").show();

            return false;
        } else if (postal_address == "") {
            $("#postal_address").css({"border": "solid 1px red"});
            $("#postal_address_error").show();

            return false;
        } else if (postal_code == "") {
            $("#postal_code").css({"border": "solid 1px red"});
            $("#postal_code_error").show();

            return false;
        } else {
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding Oragnization Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res) {
                if (res === '1') {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.href = res;
                    });

                    return false;
                } else {
                    swal({
                        title: "Successful",
                        text: "Oragnization Details Added successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.href = res;
                    });
                }
            }
        });
    }
    });
});


$(document).ready(function () {
    $("#upload_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Uploading file",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Please Select a File to upload",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "File Uploaded successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#details_form12").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Saving Personal Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    var obj = JSON.parse(res);
                    swal({
                        title: "Successful",
                        text: "Personal Saved Succefully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });

    });
});
$(document).ready(function () {
    $("#debarment_form").submit(function (e)
    {
        e.preventDefault();
        var selected = [];
        $('#checkboxes input:checked').each(function() {
            selected.push($(this).attr('id'));
        });
        if (selected.length === 0) {
            $("#reasonsError").show();
            $('#reasonsss').hide();
            return false;
        }
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding Debarment Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    var obj = JSON.parse(res);
                    swal({
                        title: "Successful",
                        text: "Debarment Added successfully. Kindly print the document(Appendix A), sign, scan and upload.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.open(obj.link_2);
                        window.location.href = obj.link_1;
                    });
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#appendix_upload_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Uploading Appendix A file...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Please Select a File to upload",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Appendix A uploaded successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#addstaff").submit(function (e)
    {
        e.preventDefault();
        var selected = [];
        $('#checkboxes input:checked').each(function() {
            selected.push($(this).attr('id'));
        });
        if (selected.length === 0) {
            $("#reasonsError").show();
            $('#reasonsss').hide();
            return false;
        }
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding Staff Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });

                    return false;
                }

                else
                {
                    var obj = JSON.parse(res);
                    swal({
                        title: "Successful",
                        text: "Staff Added Succesfully.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.open(obj.link_2);
                        window.location.href = obj.link_1;
                    });
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#debarment_update").submit(function (e)
    {
        e.preventDefault();
        var selected = [];
        $('#checkboxes input:checked').each(function() {
            selected.push($(this).attr('id'));
        });
        if (selected.length === 0) {
            $("#reasonsError").show();
            $('#reasonsss').hide();
            return false;
        }
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Updating Debarment Details",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Server error occurred",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Debarment Details Updated successfully. Kindly print the document(Appendix A), sign, scan and upload",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.open(res);
                        window.location.reload();
                    });
                }
            }
        });

    });
});

//Updating user profile
$(document).ready(function () {
    $("#update_form").submit(function (e)
    {
        e.preventDefault();
        var fname = document.getElementById('first_name').value;
        var other_names = document.getElementById('middle_name').value;
        var other_names = document.getElementById('surname').value;
        var email = document.getElementById('email_reg').value;
        var phone = document.getElementById('phone_reg').value;

        if(!fname.match(/^[a-zA-Z ]*$/))
        {
            $("#fname_reg").css({"border": "solid 1px red"});
            $("#fname_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#other_names_reg").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        else if(!other_names.match(/^[a-zA-Z ]*$/))
        {
            $("#other_names_reg").css({"border": "solid 1px red"});
            $("#other_names_error").show();

            return false;
        }

        else if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
        {
            $("#email_reg").css({"border": "solid 1px red"});
            $("#email_error").show();

            return false;
        }

        else if(phone.length !== 10)
        {
            $("#phone_reg").css({"border": "solid 1px red"});
            $("#phone_error").show();

            return false;
        }
        else {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Updating user details",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res) {
                    if (res === '1') {
                        swal({
                            title: "Warning",
                            text: "Server error occurred",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        }, function () {
                            window.location.reload();
                        });

                        return false;
                    } else {
                        swal({
                            title: "Successful",
                            text: "User profile details updated successfully",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        }, function () {
                            window.location.reload();
                        });
                    }
                }
            });
        }
    });
});


//update password form

$(document).ready(function () {
    $("#password_form").submit(function (e)
    {
        e.preventDefault();

        var pass1 = document.getElementById('pass1_reg').value;
        var pass2 = document.getElementById('pass2_reg').value;

        if(pass1 !== pass2)
        {
            $("#pass2_reg").css({"border": "solid 1px red"});
            $("#pass_mismatch").show();

            return false;
        }

        else if(pass1.length < 8)
        {
            $("#pass1_reg").css({"border": "solid 1px red"});
            $("#pass1_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Updating password",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "Existing password entered is incorrect",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Password updated successfully",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.reload();
                        });
                    }
                }
            });
        }

    });
});

//reset password form

$(document).ready(function () {
    $("#reset_pass_form").submit(function (e)
    {
        e.preventDefault();

        var pass1 = document.getElementById('pass1_reg').value;
        var pass2 = document.getElementById('pass2_reg').value;

        if(pass1 !== pass2)
        {
            $("#pass2_reg").css({"border": "solid 1px red"});
            $("#pass_mismatch").show();

            return false;
        }

        else if(pass1.length < 8)
        {
            $("#pass1_reg").css({"border": "solid 1px red"});
            $("#pass1_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Updating password",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "Cannot identify user",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Password updated successfully.. Please login",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Login",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.href = res;
                        });
                    }
                }
            });
        }

    });
});


//forgot password form

$(document).ready(function () {
    $("#forgot_pass_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Updating password",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Member with such credentials does not exists",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Password recovery link has been sent to your email",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});


//update photo

$(document).ready(function () {
    $("#photo_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Updating photo",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Member with such credentials does not exists",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Photo updated successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});


//verification form

$(document).ready(function () {
    $("#verification_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Verifying code...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Code entered is incorrect",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Re-Enter Code",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    $("#verification_form").hide();
                    $("#after_verify_btn").show();
                    swal({
                        title: "Successful",
                        text: "Code verification successful.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }
            }
        });

    });
});

//Login form

$(document).ready(function () {
    $("#login_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Verifying credentials...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Incorrect credentials provided",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else if(res === '2')
                {
                    swal({
                        title: "Warning",
                        text: "Incorrect security code",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else if(res === '3')
                {
                    swal({
                        title: "Warning",
                        text: "Your account has been terminated. Please contact WDM Party",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else if(res === '4')
                {
                    swal({
                        title: "Warning",
                        text: "Your account has not been verified. Please verify your account",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.href = base_url + "auth/verify";
                    });

                    return false;
                }

                else
                {
                    window.location.href = res;
                }
            }
        });

    });
});


//Login form Admin

$(document).ready(function () {
    $("#login_form_admin").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Verifying credentials...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Incorrect credentials provided",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "verification successful... Redirecting ...",
                        type: "success",
                        showConfirmButton: false,
                        showCancelButton: false
                    });

                    window.location.href = res;
                }
            }
        });

    });
});

//send security code

$("#send_sec_code").click(function ()
{
    var doc_type = $("#auth_doc_login").val();
    var doc_no = $("#doc_no_login").val();
    var password = $("#password_login").val();

    var data = {doc_type: doc_type, doc_no: doc_no, password: password};

    console.log(data);

    if(doc_type !== '' && doc_no !== '' && password !== '')
    {
        $.ajax({
            type: "POST",
            url: base_url + "auth/send_sec_code",
            data: data,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Checking credentials...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Incorrect credentials provided",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }

                else if(res === '2')
                {
                    swal({
                        title: "Warning",
                        text: "Your account has not been verified.",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Verify",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "auth/verify"
                    });
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "A security code has been sent your phone number",
                        type: "success",
                        showConfirmButton: true,
                        cancelButtonText: "Ok",
                        cancelButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }
            }
        });
    }

    else
    {
        swal({
            title: "Warning",
            text: "Please provide your credentials",
            type: "warning",
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: "Cancel",
            confirmButtonColor: btn_color
        });
    }
});

// verify account

$(document).ready(function () {

    $("#verify_account").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Verifying credentials credentials...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Incorrect credentials provided",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Sign Up",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.href = base_url + "auth/signup";
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Account verified successfully. Please reset your password",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Reset Password",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.href = res;
                    });
                }
            }
        });

    });

});


$("#print_card").click(function () {
    $("#member_card").printMe({ "path": [css_path, css_path2]});
});


// top up wallet

$(document).ready(function () {
    $("#top_up_wallet_form").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Processing M-Pesa payment request...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },

            success: function (res) {

                if(res === '0')
                {
                    swal({
                        title: "Process Payment",
                        text: "Please check your phone and enter M-Pesa PIN requested. Click Ok when done.",
                        type: "info",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        showCancelButton: false
                    }, function () {
                        window.location.reload();
                    });
                }

                else
                {
                    swal({
                        title: "Processing Error",
                        text: "Payment Request Failed. Try again after some time or refresh this page.",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }
            }
        });
    });
});

// make donation

$(document).ready(function () {
    $("#donation_form").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Checking wallet amount...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },

            success: function (res) {

                if(res === '0')
                {
                    swal({
                        title: "Successful",
                        text: "Your donation has been received successfully. Thank you",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.reload();
                    });
                }

                else
                {
                    swal({
                        title: "Warning",
                        text: "You have insufficient balance in your account. Please to up your wallet then try again",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

//renew membership

$(document).ready(function () {
    $("#renew_membership").click(function () {
        $.ajax({
            type: "POST",
            url:  base_url + "member/renew_membership",
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Checking wallet amount...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res.trim() === '2')
                {
                    swal({
                        title: "Info",
                        text: "You subscription is currently active.",
                        type: "info",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }

               if(res.trim() === '1')
                {
                    swal({
                        title: "Warning",
                        text: "You have insufficient balance in your account. Please to up your wallet then try again",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }

                if(res.trim() === '0')
                {
                    swal({
                        title: "Successful",
                        text: "You have successfully renewed your subscription",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});


//search membership

$(document).ready(function () {
    $("#search_hc_member").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url:  $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function ()
            {
                $('#resTable').DataTable().destroy();

                swal({
                    title: "Info",
                    text: "Searching Account",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#hc_members").html(res);

                swal({
                    title: "Finished Searching",
                    text: "Check results found",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });

                $('#resTable').DataTable({
                    "order": [
                        [1, 'desc']
                    ]
                });
            }
        });
    });
});

//upgrade membership
function check_fname()
{
    var fname = document.getElementById('first_name').value;

    if(!fname.match(/^[a-zA-Z ]*$/))
    {
        $("#fname_reg").css({"border": "solid 1px red"});
        $("#fname_error").show();

    }

    else
    {
        $("#fname_reg").css({"border": ""});
        $("#fname_error").hide();
    }

}

function check_other_names()
{
    var other_names = document.getElementById('middle_name').value;

    if(!other_names.match(/^[a-zA-Z ]*$/))
    {
        $("#other_names_reg").css({"border": "solid 1px red"});
        $("#other_names_error").show();

    }

    else
    {
        $("#other_names_reg").css({"border": ""});
        $("#other_names_error").hide();
    }

}function check_surname()
{
    var other_names = document.getElementById('surname').value;

    if(!other_names.match(/^[a-zA-Z ]*$/))
    {
        $("#other_names_reg").css({"border": "solid 1px red"});
        $("#surname_error").show();

    }

    else
    {
        $("#other_names_reg").css({"border": ""});
        $("#surname_error").hide();
    }

}
function upgrade_membership(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "member/upgrade_membership/" + id,
        success: function (res)
        {
           if(res === '1')
            {
                swal({
                    title: "Warning",
                    text: "You have insufficient balance in your account. Please to up your wallet then try again",
                    type: "warning",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }

            else
            {
                swal({
                    title: "Successful",
                    text: "You have successfully upgraded your membership",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                }, function () {
                    window.location.reload();
                });
            }
        }
    });
}

//renew other

function renew_other(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "member/renew_membership_other/" + id,
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Checking wallet amount...",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            if(res.trim() === '2')
            {
                swal({
                    title: "Info",
                    text: "This account's subscription is currently active.",
                    type: "info",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }

            if(res.trim() === '1')
            {
                swal({
                    title: "Warning",
                    text: "You have insufficient balance in your account. Please to up your wallet then try again",
                    type: "warning",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }

            if(res.trim() === '0')
            {
                swal({
                    title: "Successful",
                    text: "You have successfully renewed another account's membership",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                }, function () {
                    window.location.reload();
                });
            }
        }
    });
}

//pay reg fee

$(document).ready(function () {
    $("#pay_reg_fee").click(function ()
    {
        swal({
            title: "Confirm",
            text: "Confirm registration fee payment",
            type: "info",
            showConfirmButton: true,
            confirmButtonText: "Pay",
            confirmButtonColor: btn_color,
            showCancelButton: true,
            cancelButtonText: "Cancel"
        },function () {

            $.ajax({

                type: "POST",
                url: base_url + "member/pay_reg_fee",
                beforeSend: function ()
                {
                    swal({
                        title: "Please Wait",
                        text: "Processing payment",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "You have insufficient balance in your account. Please to up your wallet then try again",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.href = base_url + "member/wallet";
                        });
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "You have successfully paid your registration fees",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        }, function () {
                            window.location.reload();
                        });
                    }
                }
            });


        });
    });
});

function pay_fee2()
{
    swal({
        title: "Confirm",
        text: "Confirm registration fee payment",
        type: "info",
        showConfirmButton: true,
        confirmButtonText: "Pay",
        confirmButtonColor: btn_color,
        showCancelButton: true,
        cancelButtonText: "Cancel"
    },function () {

        $.ajax({

            type: "POST",
            url: base_url + "member/pay_reg_fee",
            beforeSend: function ()
            {
                swal({
                    title: "Please Wait",
                    text: "Processing payment",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "You have insufficient balance in your account. Please to up your wallet then try again",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "member/wallet";
                    });
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "You have successfully paid your registration fees",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
}

//subscribe sms

$(document).ready(function () {
    $("#sms_subscribe").click(function ()
    {
        $.ajax({

            type: "POST",
            url: base_url + "member/subscribe_sms",
            beforeSend: function ()
            {
                swal({
                    title: "Please Wait",
                    text: "Processing request..",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                swal({
                    title: "Successful",
                    text: "You have successfully subscribed to WDM SMS alerts",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                }, function () {
                    window.location.reload();
                });
            }
        });
    });
});


//unsubscribe sms

$(document).ready(function () {
    $("#sms_unsubscribe").click(function ()
    {
        $.ajax({

            type: "POST",
            url: base_url + "member/unsubscribe_sms",
            beforeSend: function ()
            {
                swal({
                    title: "Please Wait",
                    text: "Processing request..",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                swal({
                    title: "Successful",
                    text: "You have successfully unsubscribed from WDM SMS alerts",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                }, function () {
                    window.location.reload();
                });
            }
        });
    });
});


//send member emails

$(document).ready(function () {
    $("#emails_form").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending Email",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },

            success: function (res) {

                if(res === '0')
                {
                    $("#emails_form")[0].reset();
                    $("#emailModal").modal('hide');

                    swal({
                        title: "Successful",
                        text: "Email sent successfully.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }

                else
                {
                    swal({
                        title: "Warning",
                        text: "Unable to send emails. Please try again later",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }
            }
        });
    });
});

//send member sms

$(document).ready(function () {
    $("#sms_form").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending SMS",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },

            success: function (res) {

                if(res === '0')
                {
                    swal({
                        title: "Successful",
                        text: "SMS sent successfully.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }

                else
                {
                    swal({
                        title: "Warning",
                        text: "Unable to send SMS. Please try again later",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }
            }
        });
    });
});

$('.carousel').carousel();

$(".select2").select2();
$('.selectpicker').selectpicker();

function terminate_user(id, check)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/terminate_user/" + id,
        data: $(this).serializeArray(),
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Processing",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },

        success: function (res) {

            if(res === '0')
            {
                $("#check_two" + check).show();

                swal({
                    title: "Successful",
                    text: "Member terminated successfully and will not be able to access the system",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }

            else
            {
                swal({
                    title: "Warning",
                    text: "Error. Please try again later",
                    type: "warning",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }
        }
    });
}

function activate_user(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/activate_user/" + id,
        data: $(this).serializeArray(),
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Processing",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },

        success: function (res) {

            if(res === '0')
            {
                swal({
                    title: "Successful",
                    text: "Member activated successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }

            else
            {
                swal({
                    title: "Warning",
                    text: "Error. Please try again later",
                    type: "warning",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }
        }
    });
}

//create Role

$(document).ready(function () {
    $("#role_form").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Creating role",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },

            success: function (res) {

                if(res === '0')
                {
                    swal({
                        title: "Successful",
                        text: "Role created successfully.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.reload();
                    });
                }

                else
                {
                    swal({
                        title: "Warning",
                        text: "Such role exists. Try a new role",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }
            }
        });
    });
});

function delete_role(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/delete_role/" + id,
        data: $(this).serializeArray(),
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Deleting role",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },

        success: function (res) {

            if(res === '0')
            {
                swal({
                    title: "Successful",
                    text: "Role deleted successfully.",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                }, function () {
                    window.location.reload();
                });
            }

            else
            {
                swal({
                    title: "Warning",
                    text: "This Role has members assigned to it. Change their roles before deleting.",
                    type: "info",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }
        }
    });
}

function assign_role(id, user_id, check)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/assign_user_role/" + id + "/" + user_id,
        data: $(this).serializeArray(),
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Assigning role",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },

        success: function (res) {

            if(res !== '1')
            {
                $("#check_one" + check).show();
                $("#user_role" + check).html(res);

                swal({
                    title: "Successful",
                    text: "Member assigned role successfully.",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }

            else
            {
                swal({
                    title: "Warning",
                    text: "Unable to assign due to server error",
                    type: "info",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }
        }
    });
}

function deny_role(user_id, check)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/deny_user_role/" + user_id,
        data: $(this).serializeArray(),
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Revoking role",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },

        success: function (res) {

            if(res === '0')
            {
                $("#check_one" + check).hide();
                $("#user_role" + check).html("<b><b>None</b></b>");

                swal({
                    title: "Successful",
                    text: "Member role revoked successfully.",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }

            else
            {
                swal({
                    title: "Warning",
                    text: "Unable to revoke role due to server error",
                    type: "info",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }
        }
    });
}

//Add event

$(document).ready(function () {
    $("#event_form").submit(function (e)
    {
        e.preventDefault();

        var email = document.getElementById('c_email').value;
        var phone = document.getElementById('c_phone').value;
        var date_from = document.getElementById('event_date_from').value;
        var date_to = document.getElementById('event_date_to').value;


        if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
        {
            $("#email_reg").css({"border": "solid 1px red"});
            $("#email_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: new FormData(this),
                contentType: false,
                processData: false,
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Processing event details...",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "The banner uploaded is not an image.",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    }

                    else if(res === '2')
                    {
                        swal({
                            title: "Successful",
                            text: "Event details updated successfully",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        }, function () {
                            window.location.reload();
                        });
                    }

                    else if(res === '3')
                    {
                        swal({
                            title: "Warning",
                            text: "Start date cannot be less than today",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });
                    }

                    else if(res === '4')
                    {
                        swal({
                            title: "Warning",
                            text: "End date cannot be less than today",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });
                    }

                    else if(res === '5')
                    {
                        swal({
                            title: "Warning",
                            text: "Start date cannot be greater than end date",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Event details added successfully",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Add tickets",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.href = base_url +"admin/tickets/" + res + "/" + Math.random().toString(36);
                        });
                    }
                }
            });
        }

    });
});

//add event tickets

$(document).ready(function ()
{
    $("#add_event_tickets").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding ticket",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '0')
                {
                    swal({
                        title: "Successful",
                        text: "Ticket added successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }

                if(res === '1')
                {
                    swal({
                        title: "Successful",
                        text: "Ticket edited successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

$(document).ready(function ()
{
    $("#add_event_tickets_comp").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding ticket",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '0')
                {
                    swal({
                        title: "Successful",
                        text: "Ticket added successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }

                if(res === '1')
                {
                    swal({
                        title: "Successful",
                        text: "Ticket edited successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

//delete ticket

function delete_ticket(event_id, ticket_id)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/delete_ticket",
        data: {event_id: event_id, ticket_id: ticket_id},
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Deleting ticket",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            swal({
                title: "Successful",
                text: "Ticket deleted successfully",
                type: "success",
                showConfirmButton: true,
                confirmButtonText: "ok",
                confirmButtonColor: btn_color,
                showCancelButton: false
            },function () {
                window.location.reload();
            });
        }
    });

}

//delete ticket complimentary

function delete_ticket_comp(event_id, ticket_id)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/delete_ticket_comp",
        data: {event_id: event_id, ticket_id: ticket_id},
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Deleting ticket",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            swal({
                title: "Successful",
                text: "Ticket deleted successfully",
                type: "success",
                showConfirmButton: true,
                confirmButtonText: "ok",
                confirmButtonColor: btn_color,
                showCancelButton: false
            },function () {
                window.location.reload();
            });
        }
    });

}

//finish adding event

function finish_adding_event(event_id)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/check_event_tickets",
        data: {event_id: event_id},
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Checking tickets",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            if(res === '1')
            {
                swal({
                    title: "Warning",
                    text: "Event has no tickets. Add at least one ticket type.",
                    type: "warning",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }

            else
            {
                swal({
                    title: "Successful",
                    text: "Event tickets are set",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = base_url + "admin/events";
                });
            }

        }
    });

}

//buy tickets mpesa web

function buy_ticket_mpesa_web(event_id, phone, total, entry_id)
{
    $.ajax({
        type: "POST",
        url: base_url + "payment/buy_ticket_web",
        data: {phone: phone, total: total},
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Processing M-Pesa payment request...",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },

        success: function (res) {

            if(res === '0')
            {
                swal({
                    title: "Process Payment",
                    text: "Please check your phone and enter M-Pesa PIN requested. Click Ok when done.",
                    type: "info",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    showCancelButton: false
                }, function () {
                    window.location.href = base_url + "web/event/" + event_id + "/" + entry_id + "/?paid=true";
                });
            }

            else
            {
                console.log(res);

                swal({
                    title: "Processing Error",
                    text: "Payment Request Failed. Try again after some time.",
                    type: "warning",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            }
        }
    });

}


//add event tickets

$(document).ready(function ()
{
    $("#search_event_manager").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Searching member ...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Error",
                        text: "Member does not exist",
                        type: "error",
                        showConfirmButton: true,
                    });
                }
                else
                {
                    swal({
                        title: "Success",
                        text: "Member found",
                        type: "success",
                        showConfirmButton: true,
                    });

                    $("#event_manager_info").html(res);
                }
            }
        });
    });
});

// search ticket status

$(document).ready(function ()
{
    $("#search_ticket_status").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Checking ticket ...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Ticket has been used.",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }

                else if(res === '2')
                {
                    swal({
                        title: "Error",
                        text: "Ticket does not exist.",
                        type: "error",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Ticket unused. Please proceed",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Proceed",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });
    });
});

//generte gate pass

$(document).ready(function ()
{
    $("#generate_gate_pass").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Processing ...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Error",
                        text: "Unable to process request. Try again after some time please.",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Check in successful. Print gate pass",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Print Gate Pass",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

function assign_agent(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "member/assign_agent",
        data: {id: id},
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Assigning rights ...",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            if(res === '0')
            {
                swal({
                    title: "Successful",
                    text: "Rights assigned successfully...",
                    type: "success",
                    showConfirmButton: true,
                    showCancelButton: false
                }, function () {
                    window.location.reload();
                });
            }

        }
    });
}

function approve_member_document(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/approve_member_verification/" + id,
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Approving member verification ...",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            if(res === '0')
            {
                swal({
                    title: "Successful",
                    text: "Member verification approved successfully...",
                    type: "success",
                    showConfirmButton: true,
                    showCancelButton: false
                }, function () {
                    window.location.reload();
                });
            }

        }
    });
}

function reject_member_document(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/reject_member_verification/" + id,
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Rejscring member verification ...",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            if(res === '0')
            {
                swal({
                    title: "Successful",
                    text: "Member verification rejected successfully...",
                    type: "success",
                    showConfirmButton: true,
                    showCancelButton: false
                }, function () {
                    window.location.reload();
                });
            }

        }
    });
}

//store sms form

$(document).ready(function () {
    $("#store_sms_select").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending SMS",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Please select at least one member",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "SMS has been queued for sending.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

//store sms all form

$(document).ready(function () {
    $("#store_sms_select_all").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending SMS",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Please select at least one member",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "SMS has been queued for sending.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});


//store sms form non

$(document).ready(function () {
    $("#store_sms_select_n").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending SMS",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Please select at least one member",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "SMS has been queued for sending.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

//store sms all form non

$(document).ready(function () {
    $("#store_sms_select_all_n").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending SMS",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Please select at least one member",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "SMS has been queued for sending.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

/*//send user emails

(function send_emails()
{
    $.ajax({
        type: "POST",
        url: base_url + "auth/send_user_emails",
        success: function () {

        },
        complete: function () {
            setTimeout(send_emails, 1000);
        }
    });

})();

//send user email alerts

(function send_emails_alerts()
{
    $.ajax({
        type: "POST",
        url: base_url + "auth/send_user_email_alerts",
        success: function () {

        },
        complete: function () {
            setTimeout(send_emails_alerts, 1000);
        }
    });

})();

//send user sms alerts

(function send_sms_alerts()
{
    $.ajax({
        type: "POST",
        url: base_url + "auth/send_user_sms_alerts",
        success: function () {

        },
        complete: function () {
            setTimeout(send_sms_alerts, 1000);
        }
    });

})();

//generate members renewal growth

(function members_renewals_growth()
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/generate_members_renewals_growth",
        success: function () {

        },
        complete: function () {
            setTimeout(members_renewals_growth, 3600);
        }
    });

})();

//generate renewal fees growth

(function fees_renewals_growth()
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/generate_fees_renewals_growth",
        success: function () {

        },
        complete: function () {
            setTimeout(fees_renewals_growth, 3600);
        }
    });

})();

//generate finance collections

(function finance_collection()
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/generate_finance_graph",
        success: function () {

        },
        complete: function () {
            setTimeout(finance_collection, 3600);
        }
    });

})();

//generate donations graph

(function donations_graph()
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/generate_donations_graph",
        success: function () {

        },
        complete: function () {
            setTimeout(donations_graph, 3600);
        }
    });

})();

//generate reg fees graph

(function reg_fees_graph()
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/generate_reg_fees_graph",
        success: function () {

        },
        complete: function () {
            setTimeout(reg_fees_graph, 3600);
        }
    });

})();


//get gender ditribution

(function gender_chart()
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/generate_members_gender_chart",
        success: function () {

        },
        complete: function () {
            setTimeout(gender_chart, 3600);
        }
    });

})();

//get members growth

(function get_members_growth()
{
    $.ajax({
        type: "POST",
        url: base_url + "admin/get_members_growth",
        success: function () {

        },
        complete: function () {
            setTimeout(get_members_growth, 3600);
        }
    });

})();

//send members no query sms

(function send_query_no_sms()
{
    $.ajax({
        type: "POST",
        url: base_url + "web/check_no_queries",
        success: function () {

        },
        complete: function () {
            setTimeout(send_query_no_sms, 1000);
        }
    });

})();*/


//ruth
$(document).ready(function () {
    $("#classification_form").submit(function (e)
    {
        e.preventDefault();

        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Updating Nature of Complaint",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "Nature of complaint is similar to that provided by the complainant",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Nature of comlaint updated successfully",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.reload();
                        });
                    }
                }
            });
        }

    });
});

$(document).ready(function ()
{
    $("#acknowledge_complaint").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Processing request",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal2").modal('hide');
                $("#acknowledge_complaint")[0].reset();

                swal({
                    title: "Successful",
                    text: "Request successful",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = base_url + "ragent/pending_complaints";
                });

            }
        });
    });
});
$(document).ready(function ()
{
    $("#acknowledge_debarment").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Processing request",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal2").modal('hide');
                $("#acknowledge_debarment")[0].reset();

                swal({
                    title: "Successful",
                    text: "Request successful",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.reload();
                });
            }
        });
    });
});
function acknowledge_debarment(id,debarment_id)
{
    $.ajax({
        type: "POST",
        url: base_url + "ragent/acknowledge_debarment/"+id+"/"+debarment_id,
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Acknowledging Debarment ...",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            if(res === '0')
            {
                swal({
                    title: "Successful",
                    text: "Debarment has been acknowledged successfully...",
                    type: "success",
                    showConfirmButton: true,
                    showCancelButton: false
                }, function () {
                    window.location.reload();
                });
            }

        }
    });
}
$(document).ready(function ()
{
    $("#submit_notify2").submit(function (e)
    {
        e.preventDefault();
        var anonTextarea = document.getElementById('anonTextarea').value;
        var editorContent = tinyMCE.get('anonTextarea').getContent();
        if (editorContent == '')
        {
            $("#anonTextarea_error").show();
            $(".tox-tinymce").css({"border": "1px solid #fb0000"});

            return false;
        }

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            // data: $(this).serializeArray(),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending Message...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal").modal('hide');
                $("#submit_notify2")[0].reset();

                swal({
                    title: "Successful",
                    text: "Notification sent successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.reload();
                });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#submit_notifying2").submit(function (e)
    {
        e.preventDefault();
        var anonTextarea = document.getElementById('anonTextarea').value;
        var editorContent = tinyMCE.get('anonTextarea').getContent();
        if (editorContent == '')
        {
            $("#anonTextarea_error").show();
            $(".tox-tinymce").css({"border": "1px solid #fb0000"});

            return false;
        }

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            // data: $(this).serializeArray(),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending Message...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal").modal('hide');
                $("#submit_notifying2")[0].reset();

                swal({
                    title: "Successful",
                    text: "Notification sent successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.reload();
                });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#send_enquiry").submit(function (e)
    {
        e.preventDefault();
        var anonTextarea = document.getElementById('anonTextarea').value;
        var editorContent = tinyMCE.get('anonTextarea').getContent();
        if (editorContent == '')
        {
            $("#anonTextarea_error").show();
            $(".tox-tinymce").css({"border": "1px solid #fb0000"});

            return false;
        }

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            // data: $(this).serializeArray(),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending Complaint enquiry...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal").modal('hide');
                $("#send_enquiry")[0].reset();

                swal({
                    title: "Successful",
                    text: "Complaint enquiry sent successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.reload();
                });

            }
        });
    });
});


$(document).ready(function ()
{
    $("#send_notification").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            // data: $(this).serializeArray(),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending notification",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal").modal('hide');
                $("#send_notification")[0].reset();

                    swal({
                        title: "Successful",
                        text: "Notification sent successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#send_web_notification").submit(function (e)
    {
        e.preventDefault();
        var anonTextarea = document.getElementById('anonTextarea').value;
        var editorContent = tinyMCE.get('anonTextarea').getContent();
        if (editorContent == '')
        {
            $("#anonTextarea_error").show();
            $(".tox-tinymce").css({"border": "1px solid #fb0000"});

            return false;
        }

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            // data: $(this).serializeArray(),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending notification",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal").modal('hide');
                $("#send_web_notification")[0].reset();

                swal({
                    title: "Successful",
                    text: "Notification sent successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.reload();
                });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#propose_inve").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Proposing complaint for investigation",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal").modal('hide');
                $("#propose_inve")[0].reset();

                swal({
                    title: "Successful",
                    text: "Complaint proposed for investigation successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = base_url + "ragent/acknowledged_complaints";
                });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#propose_inve2").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Proposing Complaint for investigation",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal2").modal('hide');
                $("#propose_inve2")[0].reset();

                swal({
                    title: "Successful",
                    text: "Complaint proposed for investigation successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = base_url + "ragent/acknowledged_complaints";
                });

            }
        });
    });
});
$(document).ready(function ()
{
    $("#initiate_closure_form").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Initiating complaint closure",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal3").modal('hide');
                $("#initiate_closure_form")[0].reset();

                swal({
                    title: "Successful",
                    text: "Complaint closure initiated successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = base_url + "ragent/acknowledged_complaints";
                });

            }
        });
    });
});
$(document).ready(function ()
{
    $("#approve_for_inve").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Submitting Request",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#approveModal").modal('hide');
                $("#approve_for_inve")[0].reset();

                swal({
                    title: "Successful",
                    text: "Complaint updated successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = res;
                });

            }
        });
    });
});
$(document).ready(function ()
{
    $("#assign_officer").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Assigning Complaint",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#approveModal").modal('hide');
                $("#assign_officer")[0].reset();

                swal({
                    title: "Successful",
                    text: "Complaint assigned successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = base_url + "ragent/pending_investigations";
                });

            }
        });
    });
});

//investigation sign in
$(document).ready(function () {
    $("#login_form_inve").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Verifying credentials...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Incorrect credentials provided",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }


                else if(res === '3')
                {
                    swal({
                        title: "Warning",
                        text: "Your account has been terminated. Please contact System Admin",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else if(res === '4')
                {
                    swal({
                        title: "Warning",
                        text: "You do not have permission to access this portal.",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }, function () {
                        window.location.href = base_url + "auth/verify";
                    });

                    return false;
                }

                else
                {
                    window.location.href = res;
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#profile_form2").submit(function (e)
    {

        e.preventDefault();

        var first_name = document.getElementById('first_name').value;
        var middle_name = document.getElementById('middle_name').value;
        var surname = document.getElementById('surname').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;

        if(!first_name.match(/^[a-zA-Z ]*$/))
        {
            $("#first_name").css({"border": "solid 1px red"});
            $("#fname_error").show();

            return false;
        }

        else if(!middle_name.match(/^[a-zA-Z ]*$/))
        {
            $("#middle_name").css({"border": "solid 1px red"});
            $("#middle_name_error").show();

            return false;
        }

        else if(!surname.match(/^[a-zA-Z ]*$/))
        {
            $("#surname").css({"border": "solid 1px red"});
            $("#surname_error").show();

            return false;
        }

        else if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
        {
            $("#email").css({"border": "solid 1px red"});
            $("#email_error").show();

            return false;
        }

        else if(phone.length !== 10)
        {
            $("#phone").css({"border": "solid 1px red"});
            $("#phone_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Updating profile information",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "Server error occurred",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.reload();
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Profile information updated successfully",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.reload();
                        });
                    }
                }
            });
        }

    });
});

$(document).ready(function () {
    $("#add_email_complaint").click(function (e) {

        e.preventDefault();

        var email = document.getElementById('email_id').value;
        var email_id = document.getElementById('emails_id').value;
        $.ajax({
            type: "POST",
            url: base_url+"ragent/check_email_user",
            data: {"email": email},
            success: function(res){
                if(res === '0')
                {
                    $('#approveModal').modal('show');
                }
                else
                {
                    window.location.href = base_url + "ragent/add_email_complaint/" + res + "/" + email_id;
                }
            }
        });
    });
});

$(document).ready(function ()
{
    $("#add_email_complainant").submit(function (e)
    {
        e.preventDefault();

        var email_id = document.getElementById('emails_id').value;
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding complainant...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '0')
                {
                    swal({
                        title: "Failed",
                        text: "Internal Server Error",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
                else
                {
                    $("#approveModal").modal('hide');
                    $("#add_email_complainant")[0].reset();

                    swal({
                        title: "Successful",
                        text: "Complainant added successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = base_url + "ragent/email/"+email_id;
                    });
                }
            }
        });
    });
});

$(document).ready(function ()
{
    $("#quick_response").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Submitting quick response...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '0')
                {
                    swal({
                        title: "Failed",
                        text: "Internal Server Error",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
                else
                {
                    $("#responseModal").modal('hide');
                    $("#quick_response")[0].reset();

                    swal({
                        title: "Successful",
                        text: "Quick Reponse Submitted successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }
            }
        });
    });
});


$(document).ready(function () {
    $("#password_form2").submit(function (e)
    {
        e.preventDefault();

        var pass1 = document.getElementById('pass1_reg').value;
        var pass2 = document.getElementById('pass2_reg').value;

        if(pass1 !== pass2)
        {
            $("#pass2_reg").css({"border": "solid 1px red"});
            $("#pass_mismatch").show();

            return false;
        }

        else if(pass1.length < 8)
        {
            $("#pass1_reg").css({"border": "solid 1px red"});
            $("#pass1_error").show();

            return false;
        }

        else
        {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Updating password",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res)
                {
                    if(res === '1')
                    {
                        swal({
                            title: "Warning",
                            text: "Existing password entered is incorrect",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonText: "Try Again",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    }

                    else
                    {
                        swal({
                            title: "Successful",
                            text: "Password updated successfully",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        },function () {
                            window.location.reload();
                        });
                    }
                }
            });
        }

    });
});

$(document).ready(function ()
{
    $("#acknowledge_receipt").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Acknowledging receipt...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#approveModal").modal('hide');
                $("#acknowledge_receipt")[0].reset();
                if(res)
                {
                    swal({
                        title: "Successful",
                        text: "Request sent successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.href = res;
                    });
                }


            }
        });
    });
});

function acknowledge_receipt(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "investigation/acknowledge_complaint/" + id,
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Acknowledging Complaint ...",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            if(res)
            {
                swal({
                    title: "Successful",
                    text: "Complaint has been acknowledged successfully...",
                    type: "success",
                    showConfirmButton: true,
                    showCancelButton: false
                }, function () {
                    window.location.href = res;
                });
            }

        }
    });
}

function acknowledge_receipt2(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "investigation/acknowledge_complaint/" + id,
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Acknowledging Investigation ...",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            if(res === '0')
            {
                swal({
                    title: "Successful",
                    text: "Investigation has been acknowledged successfully...",
                    type: "success",
                    showConfirmButton: true,
                    showCancelButton: false
                }, function () {
                    window.location.href = base_url + "investigation/pending_investigations";
                });
            }

        }
    });
}

$(document).ready(function () {
    $("#click_debarment").click(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("href"),
            success: function (res)
            {
                if(res === '0')
                {
                    swal({
                        title: "Warning",
                        text: "First add a reporting oragnization to proceed",
                        type: "Warning",
                        showConfirmButton: true,
                        confirmButtonText: "Add Organization!",
                        showCancelButton: false
                    }, function () {
                        window.location.href = base_url + "reporting/add_organization";
                    });
                }
                else
                {
                    swal(
                        function () {
                            window.location.href = res;
                        });
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#upload_report2").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Uploading report",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Report not uploaded, please try again",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Try Again",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Report Uploaded successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

function close_complaint(id)
{
    swal({
        title: "Confirm",
        text: "Are you sure you want to initiate closure?",
        type: "info",
        showConfirmButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Yes, initiate closure!",
        closeOnConfirm: false,
        showCancelButton: true
    }, function () {
        $.ajax({
            type: "POST",
            url: base_url + "investigation/close_complaint/" + id,
            beforeSend: function () {

            },
            success: function (res)
            {
                if(res === '0')
                {
                    swal({
                        title: "Successful",
                        text: "Closure initiated successfully...",
                        type: "success",
                        showConfirmButton: true,
                        showCancelButton: false
                    }, function () {
                        window.location.reload();
                    });
                }

            }
        });
    });

}

function copyFunction() {
    var copyText = document.getElementById("my_token");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

function acknowledge_receipt_debarment(id)
{
    $.ajax({
        type: "POST",
        url: base_url + "investigation/acknowledge_debarment/" + id,
        beforeSend: function () {
            swal({
                title: "Please Wait",
                text: "Acknowledging Complaint ...",
                type: "info",
                showConfirmButton: false,
                showCancelButton: false
            });
        },
        success: function (res)
        {
            if(res === '0')
            {
                swal({
                    title: "Successful",
                    text: "Complaint has been acknowledged successfully...",
                    type: "success",
                    showConfirmButton: true,
                    showCancelButton: false
                }, function () {
                    window.location.href = base_url + "investigation/pending_debarment";
                });
            }

        }
    });
}


$(document).ready(function ()
{
    $("#reopen_complaint_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Reopening Complaint...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#reopen_complaint").modal('hide');
                $("#reopen_complaint_form")[0].reset();

                swal({
                    title: "Successful",
                    text: "Complaint reopened successfully. Complaint ready for reassignment ",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = base_url + "ragent/closed_investigations";
                });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#send_correspondence_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            // data: $(this).serializeArray(),
            data: new FormData(this),
            contentType: false,
            processData: false,
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Sending correspondence",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
              //  $("#followModal").modal('hide');
                $("#send_correspondence_form")[0].reset();

                swal({
                    title: "Successful",
                    text: "Correspondence sent successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = res;
                });

            }
        });
    });
});
$(document).ready(function ()
{
    $("#approve_report_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Submitting request...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                //   $("#reopen_complaint").modal('hide');
                $("#approve_report_form")[0].reset();

                swal({
                    title: "Successful",
                    text: "Report action performed successfully ",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.reload();
                });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#edit_complainant_details").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Editing details...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                //   $("#reopen_complaint").modal('hide');
                $("#edit_complainant_details")[0].reset();

                swal({
                    title: "Successful",
                    text: "Details updated successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.reload();
                });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#addcomplainant").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Adding complainant...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#approveModal").modal('hide');
                $("#addcomplainant")[0].reset();

                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Email/Phone Number already exists! Please try again",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Okay",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }
                else
                {
                    swal({
                        title: "Successful",
                        text: "Complainant added successfully. Account details have been sent to their email.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Proceed to add complaint!",
                        closeOnConfirm: false,
                        showCancelButton: true,
                        html: true
                    },function () {
                        window.location.href = res;
                    });
                }

            }
        });
    });
});

$(document).ready(function ()
{
    $("#assign_officer_complaint").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Assigning officer complainant...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#handle_complaint").modal('hide');
               // $("#addcomplainant")[0].reset();

                swal({
                    title: "Successful",
                    text: "Complainant assigned successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.href = base_url + 'ragent/acknowledged_complaints';
                });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#close_complaint_form").submit(function (e)
    {
        e.preventDefault();

        var inve_status = $("#inve_status").val();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Closing Complaint/Investigation...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#Reopen_complaint").modal('hide');
                $("#close_complaint_form")[0].reset();

                swal({
                    title: "Successful",
                    text: "Complainant/Investigation closed successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {

                    if(inve_status == 1)
                    {
                        window.location.href = base_url + 'ragent/ongoing_investigations';
                    }

                    else
                        {
                            window.location.href = base_url + 'ragent/ongoing_complaints';
                        }

                });

            }
        });
    });
});

$(document).ready(function ()
{
    $("#close_debarment").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Archiving debarment...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                $("#followModal3").modal('hide');
                $("#close_debarment")[0].reset();

                swal({
                    title: "Successful",
                    text: "Debarment archived successfully",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ok",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                },function () {
                    window.location.reload();
                });

            }
        });
    });
});


$(document).ready(function ()
{
    $("#search_email").submit(function (e)
    {
        e.preventDefault();

        var search_type = $('#search_type').val();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Checking if complainant exists...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '0')
                {
                    $("#followModal2").modal('hide');
                    swal({
                        title: "Complainant does not exist",
                        text: "Please add complainant details",
                        type: "info",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        if(search_type.includes("@"))
                        {
                            document.getElementById('email_details').value = search_type;
                        }
                        else
                        {
                            document.getElementById('phone_details').value = search_type;
                        }
                        $("#approveModal").modal('show');
                    });
                }
                else
                {
                    $("#followModal2").modal('hide');
                    $("#search_email")[0].reset();
                    var obj = JSON.parse(res);
                    swal({
                        title: "Confirm",
                        text: "Complainant exists, <br> do you want to proceed adding complaint for <br><br><h4>"
                            + obj.first_name+" "+obj.middle_name+" "+obj.surname+"</h4><br><h5>Phone Number : 0"+obj.phone_number+" </h5><br><h5>Email :"+obj.email+"</h5>",
                        type: "info",
                        showConfirmButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Yes, Add complaint!",
                        closeOnConfirm: false,
                        showCancelButton: true,
                        html: true
                    }, function () {
                        window.location.href =  base_url + "ragent/add_complaint/" + obj.id;
                    });
                }
            }
        });
    });
});

function fetch_emails()
{
        $.ajax({
            type: "POST",
            url: base_url + "ragent/get_emails",
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Fetching emails ...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                swal({
                    title: "Success",
                    text: "Emails Fetched Successfully",
                    type: "success",
                    showConfirmButton: true,
                }, function () {
                    window.location.reload();
                });
            }
        });
}

$(document).ready(function ()
{
    $("#re_assign_officer_complaint").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Re-assigning complaint ...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res)
                {
                    $("#reassign_comp").modal('hide');
                    $("#re_assign_officer_complaint")[0].reset();

                    swal({
                        title: "Successful",
                        text: "Complaint re-assigned successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});

$(document).ready(function ()
{
    $("#re_assign_officer_investigation").submit(function (e)
    {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Re-assigning investigation ...",
                    type: "info",
                    showConfirmButton: false,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res)
                {
                    $("#reassingn_inve").modal('hide');
                    $("#re_assign_officer_investigation")[0].reset();

                    swal({
                        title: "Successful",
                        text: "Investigation re-assigned successfully",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    },function () {
                        window.location.reload();
                    });
                }
            }
        });
    });
});


