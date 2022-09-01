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
                            <h2>Gowns Issued</h2>
                        </div>

                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="demo" >
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-responsive m-t-10">
                                            <table id="gownissued" class="table table-bordered table-striped">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>FullName</th>
                                                    <th>Admission No</th>
                                                    <th>Department</th>
                                                    <th>Program</th>
                                                    <th>Year of Admission</th>
                                                    <th>Date Issued</th>
                                                    <th>Date Due</th>
                                                    <th>Action</th>



                                                </tr>
                                                </thead>
                                                <tbody>
                                                <?php
                                                $n =1;
                                                foreach ($requests as $row) {
                                                $timestamp=strtotime($row->date_collected);
                                                $date_due=date('Y-m-d', strtotime($row->date_collected . ' + 14 days'));




                                                ?>
                                                <tr>
                                                    <td><?php echo $n; ?></td>
                                                    <td><?php echo get_admissionnames($row->adm_no); ?></td>
                                                    <td><?php echo $row->adm_no; ?></td>
                                                    <td><?php echo get_admissiondepartment($row->adm_no); ?></td>
                                                    <td><?php echo get_admissionprogram($row->adm_no); ?></td>
                                                    <td><?php  echo get_admissionyear($row->adm_no); ?></td>
                                                    <td><?php echo  date("d-m-Y", $timestamp); ?></td>
                                                    <td style="color: red"><?php  echo  date('d-m-Y' ,strtotime($date_due)); ?></td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <button class="btn-sm btn-success dropdown-toggle" type="button" data-toggle="dropdown" style="color: white;background-color: #00529B">Action
                                                                <span class="caret"></span></button>
                                                            <ul class="dropdown-menu">

                                                                <a class="dropdown-item" data-toggle="modal" data-target="#moreModal<?php echo $row->id ?>" id="#moreModal"<?php echo  $row->id; ?> >
                                                                    <span class="glyphicon glyphicon-eye-open"></span>Return Gown</a>
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
                                                                <h3 class="modal-title" id="exampleModalLabel">Details of <?php echo  get_admissionnames($row->adm_no);?> </h3>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="row">
                                                                    <div class="col-sm-12">
                                                                        <form action="<?php echo base_url('student/returngown/'.$row->id) ;?>" method="post" id="enqry_form"><?php ?>
                                                                            <div class="row">
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">

                                                                                    <input type="hidden" class="form-control" id="did" name="service_id" value="<?php echo $row->id;?>" required ">
                                                                                    <div class="form-group">
                                                                                        <label for="training">
                                                                                            FullName
                                                                                        </label>
                                                                                        <input type="text" class="form-control" value="<?php echo  get_admissionnames($row->adm_no);?>" name="service_name" readonly autocomplete="off">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <input type="hidden" class="form-control" id="did" name="did" ">
                                                                                    <div class="form-group">
                                                                                        <label>
                                                                                            Admission No
                                                                                        </label>
                                                                                        <input type="text" class="form-control" readonly value="<?php echo $row->adm_no;?>" name="adm_no" required autocomplete="off">
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
                                                                                        <input type="text" name="booking_from" readonly value="<?php echo get_admissiondepartment($row->adm_no);?>" id="booking_from" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Program
                                                                                        </label>
                                                                                        <input type="text" name="booking_to" readonly id="booking_to" value="<?php echo get_admissionprogram($row->adm_no);?>" class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>



                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Email
                                                                                        </label>
                                                                                        <input type="text" name="unavailable_from"  readonly value="<?php echo get_admissionemail($row->adm_no)  ;?>"  class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                            Date Returned
                                                                                        </label>
                                                                                        <input type="text" name="date_returned"  readonly value="<?php echo date('d-m-Y')  ;?>"  class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-6" style="border-right: solid 1px lightgrey">
                                                                                    <div class="form-group">
                                                                                        <label for="date_to">
                                                                                           Received  By
                                                                                            <?php
                                                                                            $user=get_current_user_logged_in();
                                                                                            $id=get_user_id($user);
                                                                                            ?>
                                                                                        </label>
                                                                                        <input type="text" name="unavailable_from"  readonly value="<?php echo get_user_fullname($id)  ;?>"  class="form-control" autocomplete="off" required >
                                                                                    </div>
                                                                                </div>


                                                                            </div>





                                                                    </div>

                                                                    <div class="row">
                                                                        <div class="col-sm-12">

                                                                            <div class="text-center">
                                                                                <div class="form-group">
                                                                                    <div class="text-center">
                                                                                        <button style="margin-left: 30px" class="btn btn-success pull-right" type="submit">
                                                                                            Return Gown
                                                                                        </button>

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
                                            <th>Year of Admission</th>
                                            <th>Date Issued</th>
                                            <th>Date Due</th>
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
<!--<script src="https://cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>-->

<script>
    /*date from should not be more than today*/
    let today = new Date().toISOString().split('T')[0];

    document.getElementsByName("booking_from")[0].setAttribute('min', today);

    /*date validation: date from should not be more than date to*/
    $('#booking_from, #booking_to').on('change', function(){
        $('#booking_to').attr('min', $('#booking_from').val());
    });
</script>



