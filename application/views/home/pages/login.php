<div class="container" style="margin-bottom: 25px; margin-top: 10vh;margin-bottom: 5vh;">
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
            <div class="col-12">
                <h3 class="text-center" style="margin-top: 1vh !important; color: #00529B !important;">
                    CLEARANCE Portal Login
                </h3>
            </div>
        </div>
        <div class="col-sm-4"></div>
    </div>
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
            <div>
                <hr>
                <div class="card">
                    <div class="card-body">
                        <form class="form-horizontal" method="post" id="login_form"
                              action="<?php echo base_url('bookings/login_action') ?>">
                            <div class="form-group">
                                <div class="col-xs-12">
                                    <input type="hidden" id="capt" name="capt" value="0" required>
                                    <label for="doc_number">
                                        Email
                                    </label>
                                    <input type="text" id="doc_no_login" name="doc_no" class="form-control" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-xs-12">
                                    <label for="password">
                                        Password
                                    </label>
                                    <input type="password" id="password_login" name="password" class="form-control"
                                           required>
                                </div>
                            </div>
                            <div class="form-group text-center m-t-20">
                                <div class="col-xs-12">
                                    <button class="btn btn-md" type="submit" id="login_btn_bg"
                                            style="width: 100% !important; background:#00529B !important;">
                                        Login
                                    </button>
                                </div>
                            </div>
                            <div class="form-group m-b-0">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-4"></div>
    </div>
</div>

<script>
    $("#login_btn_bg").click(function() {
        var response = grecaptcha.getResponse();
        if(response == '0'){
            $("#capt").value('0');
        } else {
            $("#capt").value('1');
        }
    });
</script>


