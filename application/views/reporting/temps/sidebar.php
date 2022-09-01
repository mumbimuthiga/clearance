<?php
/*created by Job Kimeli (Email: jobkimeli2016@gmail.com)
 * on 13/11/2021
 * Enrollment Module.
 * */

@$page = $page;

$user=get_current_user_logged_in();
$role = get_role($user);
?>

<aside class="left-sidebar">
    <div class="scroll-sidebar">
        <nav class="sidebar-nav">
            <ul id="sidebarnav">

                <!--<li class="nav-small-cap">--- DASHBOARD ---</li>-->
                <li class="<?php echo($page == 'dashboard' ? 'active' : '') ?>">
                    <a class="waves-effect waves-dark" href="<?php echo base_url('bookings/dashboard') ?>"
                       aria-expanded="false"><i class="icon-Home"></i>
                        <span class="hide-menu">
                           Dashboard <?php /*print_r($role) */?>
                        </span>
                    </a>
                </li>

                <?php


               /* switch ($role) {
                    case "10":
                        do_parent_menu("1", $page);
                        break;
                    case "6":
                        do_parent_menu("1", $page);
                        break;
                    case "2":
                        do_parent_menu("2", $page);
                        break;
                    case "7":
                        do_parent_menu("7", $page);
                        break;
                    case "8":
                        do_parent_menu("6", $page);
                        break;
                    default:
                        do_parent_menu("10", $page);
                }*/

                    if($role==6){
                        do_parent_menu("1", $page);
                    }else if($role==2){
                        do_parent_menu("2", $page);
                    }else if($role==7){
                        do_parent_menu("7", $page);
                    }else if($role==8){
                        do_parent_menu("6", $page);
                    }else if($role==10){
                        //Records
                        //do_parent_menu("3", $page);
                        ?>

                        <li class="<?php echo($page == 'submit_complaint' || $page == 'manage_complaints' || $page == 'closed_complaints' ? 'active' : '') ?>" >
                    <a class="waves-effect waves-dark" href="<?php echo base_url('Student/studentrecords') ?>"
                       aria-expanded="false">
                        <i class="fa fa-graduation-cap"></i>
                        <span class="hide-menu">
                       Records
                        </span>
                    </a>


                        </li>
                  <?php  }else if($role==11){
                        //Registrar
                        //do_parent_menu("1", $page);
                        ?>

                        <li class="<?php echo($page == 'submit_complaint' || $page == 'manage_complaints' || $page == 'closed_complaints' ? 'active' : '') ?>" >
                    <a class="waves-effect waves-dark" href="<?php echo base_url('Student/reggraduationlist') ?>"
                       aria-expanded="false">
                        <i class="fa fa-graduation-cap"></i>
                        <span class="hide-menu">
                      Graduation List
                        </span>
                    </a>
                            <ul aria-expanded="false" class="collapse">
                                <li class="<?php echo($page == 'organization' ? 'active' : '') ?>">
                                    <a class="waves-effect waves-dark" href="<?php echo base_url('Student/reggraduationlist') ?>"
                                       aria-expanded="false">
                                        <i class="fa fa-laptop"></i>
                                        <span class="hide-menu">
                          School of ICT & Media Enigneering
                        </span>
                                    </a>
                                </li>
                                <li class="<?php echo($page == 'organization' ? 'active' : '') ?>">
                                    <a class="waves-effect waves-dark" href="<?php echo base_url('Student/educationreggraduationlist') ?>"
                                       aria-expanded="false">
                                        <i class="fa fa-book"></i>
                                        <span class="hide-menu">
                        School of Education,Arts & Social Sciences
                        </span>
                                    </a>
                                </li>
                                <li class="<?php echo($page == 'organization' ? 'active' : '') ?>">
                                    <a class="waves-effect waves-dark" href="<?php echo base_url('Student/financereggraduationlist') ?>"
                                       aria-expanded="false">
                                        <i class="fa fa-briefcase"></i>
                                        <span class="hide-menu">
                       School of Business & Economics
                        </span>
                                    </a>
                                </li>
                                <li class="<?php echo($page == 'organization' ? 'active' : '') ?>">
                                    <a class="waves-effect waves-dark" href="<?php echo base_url('Student/researchreggraduationlist') ?>"
                                       aria-expanded="false">
                                        <i class="fa fa-flask"></i>
                                        <span class="hide-menu">
                                     Research
                        </span>
                                    </a>
                                </li>
                            </ul>
                </li>


                  <?php  }
                  /*  else if($role==11){
                        do_parent_menu("12", $page);
                    }*/


                ?>
            </ul>
        </nav>
    </div>

</aside>


<div class="page-wrapper">