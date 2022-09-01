
<?php $page = $this->uri->segment(2) ;?>
<style>
    .dropdown-toggle::after {
        display: none!important;
    }
</style>
<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light fixed-top bg-blui-color" style="border-bottom: solid 0px #363636 !important; background-color: #00529B !important;">
    <div class="container">
        <a class="navbar-brand" href="<?php echo base_url('')?>">
            <img src="<?php echo base_url('zetech.jpeg')?>" class="img-responsive" style="margin-left: 20px;background-color: #363636 !important; height: 65px;">
        </a>

        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <h3>
                        <a class="nav-link d-none d-sm-block" href="<?php echo base_url('zetech.jpeg')?>" style="color: <?php echo ($page == '' ? '#ffffff' : '#ffffff') ;?>">
                            <i class="fa fa-home"></i>
                            &nbsp;
                          ZETECH  UNIVERSITY CLEARANCE SYSTEM
                        </a>
                        <a class="nav-link d-sm-none d-block" href="<?php echo base_url('zetech.jpeg')?>" style="color: <?php echo ($page == '' ? '#ffffff' : '#ffffff') ;?>">
                            <i class="fa fa-home"></i>

                        </a>
                    </h3>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <div class="dropdown">
                    <a href="<?php echo base_url('bookings/login'); ?>" class="btn btn-sm" id="btn_bg_nav" style="background-color:#00529B !important;" id="btn_bg_nav"" type="button">LOGIN
                    <span class="glyphicon glyphicon-eye-open"></span></a>
                </div>
            </ul>
        </div>

    </div>
</nav>