<style>
    td,label{
        font-size: medium;
        font-weight: bold;
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
                            <h3>Bookings</h3>
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
                                                    <th>Client Name</th>
                                                    <th>Booking From</th>
                                                    <th>Booking To</th>
                                                    <th>Status</th>
                                                    <th>Action</th>


                                                </tr>
                                                </thead>
                                                <tbody>
                                                <?php
                                                $n =1;
                                                foreach ($requests as $row) {
                                                    $timestamp=strtotime($row->booking_from);
                                                    $time_to=strtotime($row->booking_to);

                                                    ?>
                                                    <tr>
                                                        <td><?php echo $n; ?></td>
                                                        <td><?php echo get_service_name($row->service_id); ?></td>
                                                        <td><?php echo get_user_fullname($row->user_id); ?></td>
                                                        <td><?php echo  date("d-m-Y", $timestamp); ?></td>
                                                        <td><?php echo  date("d-m-Y", $time_to); ?></td>
                                                        <td>
                                                            <?php
                                                            $status_name=get_status_name($row->status);
                                                            if($row->status == 1){
                                                                echo "<span class='badge badge-pill badge-warning' style='background-color: red;font-size: 10px'> $status_name </span>";
                                                            }elseif($row->status == 3){
                                                                echo "<span class='badge badge-pill badge-info' style='background-color: red;font-size: 10px;'>$status_name</span>";
                                                            } elseif($row->status== 2){
                                                                echo "<span class='badge badge-pill badge-success' style='background-color: green;font-size: 10px;'>$status_name</span>";
                                                            }
                                                            ?>
                                                        </td>

                                                        <td>
                                                            <div class="dropdown">
                                                                <button class="btn-sm btn-success dropdown-toggle" type="button" data-toggle="dropdown" style="color: white;background-color: #00529B">Action
                                                                    <span class="caret"></span></button>
                                                                <ul class="dropdown-menu">

                                                                    <a class="dropdown-item" data-toggle="modal" data-target="#moreModal<?php echo $row->id ?>" id="#moreModal"<?php echo  $row->id; ?> >
                                                                        <span class="glyphicon glyphicon-eye-open"></span>View Request</a>
                                                                   <?php if($row->status == 1){?>
                                                                    <li> <a class="dropdown-item" href="<?php echo base_url('bookings/delete_request/'.$row->id)?>">Delete </a></li>
                                                                    <?php }?>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <?php
                                                    $n++;


                                                ?>
                                                <div class="modal fade" id="moreModal<?php echo $row->id; ?>" tabindex="-1" role="dialog" aria-labelledby="#document_modal_title" aria-hidden="true">

                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLabel">More Details on <?php echo get_service_name($row->service_id);?>Training</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                        <form action="<?php echo base_url('bookings/accept_request/'.$row->id) ;?>" method="post" id="enqry_form"><?php ?>
                                                                            <div class="row">
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <!--                                    <input type="hidden" class="form-control" value="--><?php //echo $train_detail->id;?><!--" name="training_id" required ">-->
                                                                                    <input type="hidden" class="form-control" id="did" name="service_id" value="<?php echo $row->id;?>" required ">
                                                                                    <div class="form-group">
                                                                                        <label for="training">
                                                                                            Service Name
                                                                                        </label>
                                                                                        <input type="text" class="form-control" value="<?php echo get_service_name($row->service_id);?>" name="service_name" readonly autocomplete="off">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <input type="hidden" class="form-control" id="did" name="did" ">
                                                                                    <div class="form-group">
                                                                                        <label>
                                                                                            Venue
                                                                                        </label>
                                                                                        <input type="text" class="form-control" readonly value="<?php echo get_service_venue($row->service_id);?>" name="venue" required autocomplete="off">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Client Name
                                                                                        </label>
                                                                                        <input type="text" name="available_from" readonly value="<?php echo get_user_fullname($row->user_id);?>" id="available_from" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Booking Date From
                                                                                        </label>
                                                                                        <input type="text" name="booking_from"  id="booking_from"  readonly value="<?php echo $row->booking_from;?>" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Booking Date To
                                                                                        </label>
                                                                                        <input type="text" name="booking_to" id="booking_to" readonly value="<?php echo $row->booking_to;?>"  class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-sm-12" style="border-right: solid 1px lightgrey">
                                                                                    <label>
                                                                                        Description
                                                                                    </label>
                                                                                    <div class="form-group">

                                                                                        <textarea rows="10" name="description" id="desc"  style="width: 100%; max-width: 100%;"  readonly autocomplete="off"><?php echo get_service_desc($row->service_id);;?></textarea>

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
                                                                                                <?php if($row->status==1){ ?>
                                                                                                <button class="btn btn-success pull-right" type="submit">
                                                                                                    &nbsp;Accept
                                                                                                </button>
                                                                                                <?php  } ?>

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
                                                <?php }?>

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
    public function  validatedate() {
        document.getElementsByName("date_from").onchange = function () {
            var input = document.getElementsByName("date_to");
            input.setAttribute("min", this.value);
        }
    }
</script>
<script>
    /*date from should not be more than today*/
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("from")[0].setAttribute('max', today);
    document.getElementsByName("booking_from")[0].setAttribute('max', today);
    document.getElementsByName("booking_to")[0].setAttribute('max', today);
    /*date validation: date from should not be more than date to*/
    $('#date_from, #date_to').on('change', function(){
        $('#date_to').attr('min', $('#date_from').val());
    });
</script>



