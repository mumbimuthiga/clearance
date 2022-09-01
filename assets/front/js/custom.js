'use strict';


var base_url = 'https://localhost/ssnp/';
var css_path = base_url + "assets/node_modules/bootstrap/css/bootstrap.min.css";
var css_path2 = base_url + "assets/external/custom.css";
var css_path3 = base_url + "assets/front/css/bootstrap.min.css";
var btn_color = "#27aff0";

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
    $('#event_date_from').datepicker('setDate', new Date(new Date().setFullYear(new Date().getFullYear())));
    $('#event_date_to').datepicker('setDate', new Date(new Date().setDate(new Date().getDate() + 1)));
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

//registration form

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

        /*else if((!/\S+@\S+\.\S+/.test(email.toLowerCase())))
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
                        icon: "info",
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
                            text: "Email or Phone number provided exists.",
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
                        var url_parts = res.split('/');

                        if (url_parts[4] === 'upload_id')
                        {
                            swal({
                                title: "Warning",
                                text: "Please upload your national ID for further verification",
                                type: "warning",
                                showConfirmButton: true,
                                confirmButtonText: "Proceed",
                                confirmButtonColor: btn_color,
                                showCancelButton: false
                            }).then((value) =>
                            {
                                window.location.href = res;
                        });
                        }
                        else
                        {
                            console.log(res);

                            swal({
                                title: "Successful",
                                text: "Registration successful... A verification link has been sent to your email. Kindly check your email.",
                                type: "success",
                                showConfirmButton: true,
                                confirmButtonText: "Ok",
                                confirmButtonColor: btn_color,
                                showCancelButton: false
                            }).then((value) =>
                            {
                                window.location.href = res;
                        });
                        }
                    }
                }
            });
        }

    });
});


//send contact email message

$(document).ready(function () {
    $("#messages_form").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {

                $("#msg_submit").hide();
                $("#sending_info").show();
            },

            success: function (res) {

                if(res === '0')
                {
                    $("#messages_form")[0].reset();

                    $("#sending_info").text("Message sent successfully");
                    $("#sending_info").fadeOut(5000);
                    $("#msg_submit").show(5000);
                }

                else
                {
                    $("#sending_info").text("Unable to send message. Please try again later");
                    $("#sending_info").fadeOut(5000);
                    $("#msg_submit").show(5000);
                }
            }
        });
    });
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

                $("#loading_gif_img").show();
                $("#v_btn_div").hide();
            },
            success: function (res)
            {
                if(res === '1')
                {
                    $("#loading_gif_img").hide();

                    swal({
                        title: "Warning",
                        text: "Member with these credential does not exist. Please register. ",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Sign Up",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }).then((value) => {
                        window.location.href = base_url + "web2/signup";
                    });

                    return false;
                }

                else
                {
                    $("#loading_gif_img").hide();
                    $("#res_data_div_area").html(res);
                    $("#res_data_div").show();
                }
            }
        });

    });

});

$(document).ready(function () {

    $("#check_user_v_code").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {

                swal({
                    title: "Please Wait",
                    text: "Checking verification code...",
                    type: "info",
                    showConfirmButton: false,
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });

            },
            success: function (res)
            {
                if(res === '1')
                {
                    swal({
                        title: "Error",
                        text: "Verification code is incorrect. ",
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
                        text: "Verification successful. Please reset your password.",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Reset Password",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }).then((value) => {
                        window.location.href = res;
                });
                }
            }
        });

    });

});

function send_verification_code(id, phone, old_phone)
{
    $.ajax({
        type: "POST",
        url: base_url + "web2/send_user_v_code",
        data: {id: id, phone: phone, old_phone: old_phone},
        beforeSend: function () {

            swal({
                title: "Please Wait",
                text: "Sending verification code...",
                type: "info",
                showConfirmButton: false,
                confirmButtonColor: btn_color,
                showCancelButton: false
            });

        },
        success: function (res)
        {
            if(res === '1')
            {
                swal({
                    title: "Error",
                    text: "Unable to sent code.",
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
                    text: "Verification code sent successfully.",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Verify Code.",
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                }).then((value) => {
                    window.location.href = base_url + "web2/verify/" + id + "/" + Math.random().toString(36);
            });
            }
        }
    });
}

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
                beforeSend: function ()
                {
                    swal({
                        title: "Please Wait",
                        text: "Updating password",
                        type: "info",
                        showConfirmButton: false,
                        confirmButtonColor: btn_color,
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
                        }).then((value) =>
                        {
                            window.location.href = res;
                        });
                    }
                }
            });
        }

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
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else if(res === '4')
                {
                    swal({
                        title: "Warning",
                        text: "You don't have permission to access this profile",
                        type: "warning",
                        showConfirmButton: true,
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
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else if(res === '5')
                {
                    swal({
                        title: "info",
                        text: "Your account has not been verified. A verification link has been sent to your email.",
                        type: "info",
                        showConfirmButton: true,
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }).then((value) =>
                        {
                            window.location.href = base_url;
                        });

                    return false;
                }

                // else if(res === '4')
                // {
                //     swal({
                //         title: "Warning",
                //         text: "Your account has not been verified. Please verify your account",
                //         type: "warning",
                //         showConfirmButton: true,
                //         confirmButtonColor: btn_color,
                //         showCancelButton: false
                //     }).then((value) =>
                //     {
                //         window.location.href = base_url + "web2/verify";
                //     });
                //
                //     return false;
                // }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Login successful. Redirecting ...",
                        icon: "success",
                    });

                    window.location.href = res;
                }
            }
        });

    });
});

$(document).ready(function () {
    $("#anonymous_login").submit(function (e)
    {
        e.preventDefault();

            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serializeArray(),
                beforeSend: function () {
                    swal({
                        title: "Please Wait",
                        text: "Verifying...",
                        type: "info",
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                },
                success: function (res) {
                    if (res === '1') {
                        swal({
                            title: "Warning",
                            text: "Incorrect Anonymous Username provided",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    } else if (res === '4') {
                        swal({
                            title: "Warning",
                            text: "You don't have permission to access this profile",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    } else if (res === '2') {
                        swal({
                            title: "Warning",
                            text: "Your account has been terminated. Please contact PPRA System Admin",
                            type: "warning",
                            showConfirmButton: true,
                            confirmButtonColor: btn_color,
                            showCancelButton: false
                        });

                        return false;
                    }

                    else {
                        swal({
                            title: "Successful",
                            text: "Login successful. Redirecting ...",
                            icon: "success",
                        });

                        window.location.href = res;
                    }
                }
            });


    });
});

//Login form Event

$(document).ready(function () {
    $("#login_form_event").submit(function (e)
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
                    confirmButtonColor: btn_color,
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
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });

                    return false;
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Login successful. Redirecting ...",
                        type: "success",
                        showConfirmButton: false,
                        confirmButtonColor: btn_color,
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
                    });
                }

                else if(res === '2')
                {
                    swal({
                        title: "Warning",
                        text: "Your account has not been verified.",
                        type: "warning",
                    }).then((value) =>
                    {
                        window.location.href = base_url + "web2/verify"
                    });
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "A security code has been sent your phone number",
                        type: "success",
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
        });
    }
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
                    text: "Checking credentials",
                    type: "info",
                    showConfirmButton: false,
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '0')
                {
                    swal({
                        title: "Warning",
                        text: "User with such credentials does not exists",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }).then((value) =>
                    {
                        window.location.reload()
                    });

                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Password reset link has been sent to your email",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }).then((value) =>
                    {
                        window.location.href = base_url
                    });
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#forgot_pass_form2").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serializeArray(),
            beforeSend: function () {
                swal({
                    title: "Please Wait",
                    text: "Checking credentials",
                    type: "info",
                    showConfirmButton: false,
                    confirmButtonColor: btn_color,
                    showCancelButton: false
                });
            },
            success: function (res)
            {
                if(res === '0')
                {
                    swal({
                        title: "Warning",
                        text: "User with such credentials does not exists",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }).then((value) =>
                    {
                        window.location.reload()
                    });
                }

                else
                {
                    swal({
                        title: "Successful",
                        text: "Password reset link has been sent to your email",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }).then((value) =>
                    {
                        window.location.href = base_url + "BO"
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

                else if(res === '0')
                {
                    swal({
                        title: "Warning",
                        text: "Error Verifying your credentials! Please Try again.",
                        type: "warning",
                    }).then((value) =>
                    {
                        window.location.href = base_url + "reporting/login"
                    });
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
                }).then((value) =>
                {
                    window.location.href = base_url + "web2/event/" + event_id + "/" + entry_id + "/?paid=true";
                });
            }

            else
            {
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

$(document).ready(function () {
    $("#upload_id_form").submit(function (e)
    {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: new FormData(this),
            processData: false,
            contentType: false,
            beforeSend: function ()
            {
                swal({
                    title: "Please Wait",
                    text: "Uploading national ID ...",
                    type: "info",
                });
            },

            success: function (res)
            {
                if(res === '0')
                {
                    swal({
                        title: "Upload Successful",
                        text: "National ID uploaded successfully. Please wait for a confirmation from WDM",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    }).then((value) =>
                        {
                            window.location.href = base_url;
                        });
                }

                if(res === '1')
                {
                    swal({
                        title: "Warning",
                        text: "Please upload an image or pdf format",
                        type: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        confirmButtonColor: btn_color,
                        showCancelButton: false
                    });
                }

                if(res === '2')
                {
                    swal({
                        title: "Warning",
                        text: "Unable to upload.. Sorry try again later",
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

//send members no query sms

/*(function send_query_no_sms()
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




