
<div class="container-fluid">
    <?php $this->load->view('reporting/pages/head_info'); ?>
    <?php
    $user=get_current_user_logged_in();
    $role = get_role($user);
    $id=get_user_id($user);

    ?>


    <div class="row" >
        <div class="col-lg-6 col-md-6">
            <div class="card">
               <?php if($role==2){?>
                <a href="<?php echo base_url('Student/liststudents') ;?>">
             <?php } else{?>
                    <a href="<?php echo base_url('bookings/approve_enrollment') ;?>"><?php } ?>
                    <div class="card-body">
                        <div class="d-flex p-10 no-block">
                            <div class="align-self-center">
                                <div class="number">
                                    <h3 style="color: red">

                                       <?php  if ($role == 6) {
                                          $status=get_appstatus($id);
                                          $status_name=get_status_name($status);
                                         echo $status_name;
                                         }else if($role==2) {
                                           $applications=counthodorderofnames(1,'School of ICT & Media Enigneering');
                                            echo $applications;
                                        }else if($role==11) {
                                           $applications=countregistrarorderofnames(1,'School of ICT & Media Enigneering');
                                           echo $applications;
                                       }else{
                                           echo 0;
                                       }
                                        ?>
                                    </h3>
                                </div>
                                <h3 class="text-muted m-b-0" style="margin-top: 10px;">
                                    <?php
                                    if ($role == 6) {?>

                                        Application Stage
                                   <?php }else {?>
                                        Applications
                                   <?php }
                                    ?>

                                </h3>

                            </div>
                            <div class="align-self-center display-6 ml-auto"><i class="bluwis-color fa fa-check-square"></i>
                            </div>
                        </div>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0"
                             aria-valuemax="100" style="width:100%; height:3px;"><span
                                    class="sr-only"></span></div>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="card">
                <?php if($role==2){?>
                <a href="<?php echo base_url('bookings/mymessages') ;?>">
                    <?php } else{?>
                <a href="<?php echo base_url('bookings/messages') ;?>"><?php }?>
                    <div class="card-body">
                        <div class="d-flex p-10 no-block">
                            <div class="align-self-center">
                                <div class="number">
                                    <h3><?php
                                   echo countnotifications($role);
                                        ?>
                                    </h3>
                                </div>
                                <h3 class="text-muted m-b-0" style="margin-top: 10px;">
                                    Total Notifications
                                </h3>
                            </div>
                            <div class="align-self-center display-6 ml-auto"><i class="bluwis-color fa fa-comment-o"></i>
                            </div>
                        </div>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0"
                             aria-valuemax="100" style="width:100%; height:3px;"><span
                                    class="sr-only"></span></div>
                    </div>
                </a>
            </div>
        </div>

    </div>
    <hr>
    <div class="row" >
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12"style="text-align:center;">
                            <h5>
                                My Top Three Most Recent Notifications
                            </h5>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-12">
                               <!-- <div style="max-height: 45vh; overflow: auto;">-->
                                    <div class="table-responsive m-t-10">
                                        <table id="myTable3" class="table table-bordered table-striped">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Subject</th>
                                                <th>Date Sent</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            <?php $n=1;
                                            if(!empty($messages)){
                                                foreach ($messages as $dep) { ?>
                                                <tr>
                                                    <td>
                                                        <?php echo $n; ?>
                                                    </td>
                                                    <td>
                                                        <?php echo $dep->notification; ?>
                                                    </td>
                                                    <td>
                                                        <?php echo $dep->date_created; ?>
                                                    </td>

                                                </tr>
                                                <?php $n++;} }?>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th>Id</th>
                                                <th>Subject</th>
                                                <th>Date Sent</th>

                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                <!--</div>-->
                            </div>
                        </div>
                    </div>
                    <script src="<?php echo base_url() ?>assets/node_modules/jquery/jquery.min.js"></script>
                </div>
            </div>
        </div>

    </div>
</div>






