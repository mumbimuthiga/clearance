



<header class="topbar">
   
    <nav class="navbar top-navbar navbar-expand-md navbar-light" style="background: #00529B !important;">
        <div class="navbar-header"style="background: #00529B">
            <a class="navbar-brand" href="<?php echo base_url('bookings/dashboard') ?>" style="margin-top: 5px;">
                <b>
                    <img src="<?php echo base_url('zetech.jpeg'); ?>zetech.jpeg" alt=" "
                         class="img-responsive dark-logo" style="margin-left: 20px; height: 65px;"/>
                </b>
            </a>

        </div>

        <div class="navbar-collapse" style="margin-top: 25px;">
            <ul class="navbar-nav mr-auto">
               
                <li class="nav-item"><a class="nav-link nav-toggler hidden-md-up waves-effect waves-dark"
                                        href="javascript:void(0)"><i class="sl-icon-menu"></i></a></li>
                <li class="nav-item"><a class="nav-link sidebartoggler hidden-sm-down waves-effect waves-dark"
                                        href="javascript:void(0)"><i class="sl-icon-menu"></i></a></li>
                <li class="nav-item">
                    <a class="" href="javascript:void(0)">
                        <h3 style="margin-top: 17px;color: White;">
                            <b style="font-size:26px;" class="idms-sys">
                                ZETECH UNIVERSITY CLEARANCE SYSTEM
                            </b>
                        </h3>
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav my-lg-0">
                
                <li class="nav-item dropdown u-pro">

                    <a class="nav-link dropdown-toggle waves-effect waves-dark profile-pic" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">

                        <img src="<?php echo base_url() ?>assets/images/profile.png" alt="user" class=""/>
                        <span class="hidden-md-down">
                           <?php echo $details->first_name . " " . $details->surname; ?> &nbsp;<i class="fa fa-angle-down"></i>
                        </span>
                    </a>

                    <div class="dropdown-menu dropdown-menu-right">
                        <ul class="dropdown-user">
                            <li>
                                <div class="dw-user-box">
                                    <div class="u-text">
                                        <h4> <?php echo $details->email; ?></h4>
                                    </div>
                                </div>
                            </li>

                            <li role="separator" class="divider"></li>
                            <li>
                                <a href="<?php echo base_url('bookings/user_profile/' . $details->id) ?>">
                                    <i class="fa fa-user"></i>
                                    &nbsp;
                                    My Profile
                                </a>
                            </li>
                            <li role="separator" class="divider"></li>
                            <li><a href="<?php echo base_url() ?>bookings/logout"><i class="fa fa-power-off"></i>
                                    Logout</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</header>
<br/>

