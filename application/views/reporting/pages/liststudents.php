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
                            <h3>List of Names</h3>
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
                                                    <th>#</th>
                                                    <th>FullName</th>
                                                    <th>Admission No</th>
                                                    <th>Department</th>
                                                    <th>Program</th>
                                                    <th>Status</th>
                                                    <th>Date Created</th>
                                                    <th>Action</th>


                                                </tr>
                                                </thead>
                                                <tbody>
                                                <?php
                                                $n =1;
                                                foreach ($requests as $row) {
                                                $timestamp=strtotime($row->date_created);

                                                ?>
                                                <tr>
                                                    <td><?php echo $n; ?></td>
                                                    <td><?php echo $row->fullname; ?></td>
                                                    <td><?php echo $row->admission_no; ?></td>
                                                    <td><?php echo $row->department; ?></td>
                                                    <td><?php echo $row->program; ?></td>
                                                    <td><?php  echo get_status_name($row->status); ?></td>
                                                    <td><?php echo  date("d-m-Y", $timestamp); ?></td>

                                                    <td>
                                                        <div class="dropdown">
                                                            <button class="btn-sm btn-success dropdown-toggle" type="button" data-toggle="dropdown" style="color: white;background-color: #00529B">Action
                                                                <span class="caret"></span></button>
                                                            <ul class="dropdown-menu">

                                                                <a class="dropdown-item" data-toggle="modal" data-target="#moreModal<?php echo $row->id ?>" id="#moreModal"<?php echo  $row->id; ?> >
                                                                    <span class="glyphicon glyphicon-eye-open"></span>View Details</a>
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
                                                                <h3 class="modal-title" id="exampleModalLabel">Details of <?php echo $row->fullname;?> </h3>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                        <form action="<?php echo base_url('student/hod_approval/'.$row->id) ;?>" method="post" id="enqry_form"><?php ?>
                                                                            <div class="row">
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">

                                                                                    <input type="hidden" class="form-control" id="did" name="service_id" value="<?php echo $row->id;?>" required ">
                                                                                    <div class="form-group">
                                                                                        <label for="training">
                                                                                            FullName
                                                                                        </label>
                                                                                        <input type="text" class="form-control" value="<?php echo $row->fullname;?>" name="service_name" readonly autocomplete="off">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <input type="hidden" class="form-control" id="did" name="did" ">
                                                                                    <div class="form-group">
                                                                                        <label>
                                                                                            Admission No
                                                                                        </label>
                                                                                        <input type="text" class="form-control" readonly value="<?php echo $row->admission_no;?>" name="venue" required autocomplete="off">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Year of Admission
                                                                                        </label>
                                                                                        <input type="text" name="available_from" readonly value="<?php echo $row->year_of_admission;?>" id="available_from" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Department
                                                                                        </label>
                                                                                        <input type="text" name="booking_from" readonly value="<?php echo $row->department;?>" id="booking_from" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Program
                                                                                        </label>
                                                                                        <input type="text" name="booking_to" readonly id="booking_to" value="<?php echo $row->program;?>" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Phone Number
                                                                                        </label>
                                                                                        <input type="text" name="unavailable_from"  readonly value="<?php echo $row->phone_no;?>"  class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Guardian Phone Number
                                                                                        </label>
                                                                                        <input type="text" name="unavailable_from"  readonly value="<?php echo $row->guardian_phoneno ;?>"  class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Email
                                                                                        </label>
                                                                                        <input type="text" name="unavailable_from"  readonly value="<?php echo $row->email  ;?>"  class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            ID Number
                                                                                        </label>
                                                                                        <input type="text" name="unavailable_from"  readonly value="<?php echo $row->id_number  ;?>"  class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Status
                                                                                        </label>
                                                                                        <input type="text" name="unavailable_from"  readonly value="<?php echo get_status_name($row->status);  ;?>"  class="form-control" autocomplete="off" required >
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
                                                                                                        &nbsp;Approve
                                                                                                    </button>
                                                                                                <?php }?>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </form>
                                                                        <?php
                                                                        ?>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <?php } ?>
                                                </tbody>

                                                <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>FullName</th>
                                                    <th>Admission No</th>
                                                    <th>Department</th>
                                                    <th>Program</th>
                                                    <th>Status</th>
                                                    <th>Date Created</th>
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



