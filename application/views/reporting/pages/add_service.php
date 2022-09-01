
<style>
   td, label{
        font-weight: bold;
        font-size: medium;
    }
</style>
<div class="container-fluid">
    <?php $this->load->view('reporting/pages/head_info'); ?>

    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">

                    </div>
                    <hr>
                    <div class="row row-margin">
                        <div class="col-sm-10">
                            <button class="btn btn" data-toggle="collapse" data-target="#demo" style="color: white;background-color: #00529B">
                                Add Service <i class=""></i>
                            </button>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="demo" class="collapse">
                                <form action="<?php echo base_url('Bookings/addservice') ;?>" method="POST" id="education_form"  enctype="multipart/form-data">
                                    <div class="row" style="background: white;">
                                        <div class="col-sm-6">
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Service Name
                                                </label>
                                                <input type="text" name="service_name" class="form-control" autocomplete="off" required>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Location
                                                </label>
                                                <input type="text" name="location" id="location"   class="form-control" autocomplete="off" required oninput="">
                                            </div>
                                        </div>
                                        <div class="col-sm-3"  id="" >
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                   Available From
                                                </label>
                                                <input type="date" name="date_from" id="available_from" class="form-control" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-12" style="border-right: solid 1px lightgrey">
                                            <label style="font-size: medium;font-weight: bold">
                                                Description
                                            </label>
                                            <div class="form-group">

                                                <textarea rows="10" name="description" id="desc" class="md-textarea form-control "  style="width: 100%; max-width: 100%;"   autocomplete="off"></textarea>

                                            </div>
                                        </div>

                                        <div class="col-sm-12">
                                            <br>
                                            <div class="form-group">

                                                <button class="btn btn pull-right" style="margin-top: 8px; color: white;background-color: #00529B;">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-sm-12">
                            <div id="demos">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-responsive m-t-10">
                                            <table id="myTable" class="table table-bordered table-striped">
                                                <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Service Name</th>
                                                    <th>Venue</th>
                                                    <th>Available From</th>
                                                    <th>Added By</th>
                                                    <th>Status</th>
                                                    <th>Action</th>


                                                </tr>
                                                </thead>
                                                <tbody>
                                                <?php
                                                $n =1;
                                                foreach ($requests as $row) {
                                                    $timestamp=strtotime($row->available_from);


                                                    ?>
                                                    <tr>
                                                        <td><?php echo $n; ?></td>
                                                        <td><?php echo $row->service_name; ?></td>
                                                        <td><?php echo $row->venue; ?></td>
                                                        <td><?php echo  date("d-m-Y", $timestamp); ?></td>
                                                        <td><?php echo get_user_fullname($row->added_by) ?></td>
                                                        <td>
                                                            <?php
                                                            $status_name=get_status_name($row->status);
                                                            if($row->status == 1){
                                                                echo "<span class='badge badge-pill badge-warning' style='background-color: green;font-size: 10px'> Available </span>";
                                                            }elseif($row->status == 2){
                                                                echo "<span class='badge badge-pill badge-info' style='background-color: #d9534f;font-size: 10px;'>Disabled</span>";
                                                            }
                                                            ?>

                                                        <td>

                                                        <td>
                                                            <div class="dropdown">
                                                                <button class="btn-sm btn-success dropdown-toggle" type="button" data-toggle="dropdown" style="color: white;background-color: #00529B">Action
                                                                    <span class="caret"></span></button>
                                                                <ul class="dropdown-menu">

                                                                    <a class="dropdown-item" data-toggle="modal" data-target="#moreModal<?php echo $row->id ?>" id="#moreModal"<?php echo  $row->id; ?> >
                                                                        <span class="glyphicon glyphicon-eye-open"></span>View Details</a>
                                                                    <?php if($row->status == 1){?>
                                                                    <li> <a class="dropdown-item" href="<?php echo base_url('bookings/disable_service/'.$row->id)?>">Disable </a></li>
                                                               <?php }else if($row->status==2){?>
                                                                        <li> <a class="dropdown-item" href="<?php echo base_url('bookings/enable_service/'.$row->id)?>">Enable </a></li>

                                                                    <?php }?>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <?php
                                                    $n++;


                                                ?>
                                                <div class="modal fade" id="moreModal<?php echo $row->id ?>" tabindex="-1" role="dialog" aria-labelledby="#document_modal_title" aria-hidden="true">

                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h4 class="modal-title" id="exampleModalLabel">Details on <?php echo $row->service_name;?>Training</h4>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                        <form action="<?php echo base_url('enrollment/bookservice_client/') ;?>" method="post" id="enqry_form"><?php ?>
                                                                            <div class="row">
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <!--                                    <input type="hidden" class="form-control" value="--><?php //echo $train_detail->id;?><!--" name="training_id" required ">-->
                                                                                    <input type="hidden" class="form-control" id="did" name="service_id" value="<?php echo $row->id;?>" required ">
                                                                                    <div class="form-group">
                                                                                        <label for="training">
                                                                                            Service Name
                                                                                        </label>
                                                                                        <input type="text" class="form-control" value="<?php echo $row->service_name;?>" name="service_name" readonly autocomplete="off">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <input type="hidden" class="form-control" id="did" name="did" ">
                                                                                    <div class="form-group">
                                                                                        <label>
                                                                                            Venue
                                                                                        </label>
                                                                                        <input type="text" class="form-control" readonly value="<?php echo $row->venue;?>" name="venue" required autocomplete="off">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Available From
                                                                                        </label>
                                                                                        <input type="text" name="available_from" readonly value="<?php echo date('d-m-Y' ,strtotime($row->available_from)); ?>" id="available_from" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                 <?php if($row->status==2){ ?>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to" >
                                                                                        Disabled on
                                                                                        </label>
                                                                                        <input type="text" name="disable_date" readonly value="<?php echo  date('d-m-Y' ,strtotime($row->date_disabled));?>"  id="disable_date" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <?php }?>

                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-sm-12" style="border-right: solid 1px lightgrey">
                                                                                    <label>
                                                                                        Description
                                                                                    </label>
                                                                                    <div class="form-group">

                                                                                        <textarea rows="10" name="description" id="desc"  style="width: 100%; max-width: 100%;"  readonly autocomplete="off"><?php echo $row->description;?></textarea>

                                                                                    </div>
                                                                                </div>



                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-sm-12">
                                                                                    <hr>
                                                                                    <div class="text-center">
                                                                                        <div class="form-group">
                                                                                            <div class="text-center">
                                                                                                <button type="button" class="btn btn-inverse" data-dismiss="modal">Close</button>

                                                                                                <?php }?>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </tbody>

                                                <tfoot>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Service Name</th>
                                                    <th>Client Name</th>
                                                    <th>Booking From</th>
                                                    <th>Booking To</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                </tfoot>

                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    </div>
</div>


<script src="<?php echo base_url() ?>assets/node_modules/jquery/jquery.min.js"></script>

<script>
    /*date from should not be more than today*/
    var today = new Date().toISOString().split('T')[0];

    document.getElementsByName("date_from")[0].setAttribute('min', today);


</script>



