
<script src="<?php echo base_url('assets/front/js/jquery.min.js')?>"></script>
<script src="<?php echo base_url('assets/front/js/bootstrap.bundle.min.js')?>"></script>
<script src="<?php echo base_url('assets/front/js/sweetalert.min.js')?>"></script>
<script src="<?php echo base_url('assets/front/js/select2.min.js')?>"></script>
<script src="<?php echo base_url('assets/external/printme.min.js'); ?>"></script>
<script src="<?php echo base_url('assets/ui-date/ui.js') ;?>"></script>
<script src="<?php echo base_url('assets/front/js/custom.js')?>"></script>

<script type="text/javascript">
    function recaptchaCallback()
    {
        $("#btn_bg").fadeIn(1000);
    }
</script>

<script type="text/javascript">
    function recaptchaCallback()
    {
        $("#login_btn_bg").fadeIn(1000);
    }
</script>

<script type="text/javascript">
    function recaptchaCallback()
    {
        $("#login_btn_bg").fadeIn(1000);
    }
</script>

<script type="text/javascript">
    function recaptchaCallbackSignup()
    {
        $("#reg_btn_bg").fadeIn(1000);
    }
</script>

<script type="text/javascript">
    function recaptchaCallbackRecover()
    {
        $("#recover_btn_bg").fadeIn(1000);
    }
</script>

<script type="text/javascript">
    function recaptchaCallbackVerify()
    {
        $("#verify_btn_bg").attr("type", "submit");
        $("#verify_btn_bg").show();
    }
</script>

<script type="text/javascript">
    $(document).ready(function() {
    $('.select2').select2();
});
</script>

</body>

</html>