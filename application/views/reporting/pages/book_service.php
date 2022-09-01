<style>
    td,label{
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
                        <div class="col-sm-4">
                          <h3>Book Service</h3>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="demo" >
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-responsive m-t-10">
                                            <table id="myTable" class="table table-bordered table-striped">
                                                <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Service Name</th>
                                                    <th>Venue</th>
                                                    <th>Status</th>
                                                    <th>Available From</th>
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
                                                        <td>
                                                            <?php

                                                            if($row->status == 1){
                                                                echo "<span class='badge badge-pill badge-warning' style='background-color: green;font-size: 10px'> Available </span>";
                                                            }elseif($row->status == 2){
                                                                echo "<span class='badge badge-pill badge-info' style='background-color: #d9534f;font-size: 10px;'>Not Available</span>";
                                                            }
                                                            ?>

                                                        </td>
                                                        <td><?php echo  date("d-m-Y", $timestamp); ?></td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button class="btn-sm btn-success dropdown-toggle" type="button" data-toggle="dropdown" style="color: white;background-color: #00529B">Action
                                                                    <span class="caret"></span></button>
                                                                <ul class="dropdown-menu">

                                                                   <a class="dropdown-item" data-toggle="modal" data-target="#moreModal<?php echo $row->id ?>" id="#moreModal"<?php echo  $row->id; ?> >
                                                                       <span class="glyphicon glyphicon-eye-open"></span>View Service</a>
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
                                                                <h3 class="modal-title" id="exampleModalLabel">More Details on <?php echo $row->service_name;?> Service</h3>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                        <form action="<?php echo base_url('bookings/bookservice_client/') ;?>" method="post" id="enqry_form"><?php ?>
                                                                            <div class="row">
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">

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
                                                                                            Location
                                                                                        </label>
                                                                                        <input type="text" class="form-control" readonly value="<?php echo $row->venue;?>" name="venue" required autocomplete="off">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Available From
                                                                                        </label>
                                                                                        <input type="text" name="available_from" readonly value="<?php echo $row->available_from;?>" id="available_from" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <?php if($row->status==1){?>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Booking Date From
                                                                                        </label>
                                                                                        <input type="date" name="booking_from"  id="booking_from" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Booking Date To
                                                                                        </label>
                                                                                        <input type="date" name="booking_to" id="booking_to" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <?php }else{?>
                                                                                    <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                   UnAvailable From
                                                                                    </label>
                                                                                        <input type="text" name="unavailable_from"  readonly value="<?php echo $row->date_disabled;?>"  class="form-control" autocomplete="off" required >
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

                                                                                        <textarea rows="6" name="description" id="desc"  style="width: 100%; max-width: 100%;"  readonly autocomplete="off"><?php echo $row->description;?></textarea>

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
                                                                                              <?php if($row->status==1){?>
                                                                                                <button class="btn btn-success pull-right" type="submit">
                                                                                                    &nbsp;Book
                                                                                                </button>
                                                                                                  <?php }?>


                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </form>
                                                                        <?php
                                                                        } ?>
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
                                                    <th>Venue</th>
                                                    <th>Status</th>
                                                    <th>Available From</th>
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
  let today = new Date().toISOString().split('T')[0];

    document.getElementsByName("booking_from")[0].setAttribute('min', today);

    /*date validation: date from should not be more than date to*/
   $('#booking_from, #booking_to').on('change', function(){
        $('#booking_to').attr('min', $('#booking_from').val());
    });
</script>



