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
                            <h3>Gowns Returned</h3>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="demo" >
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-responsive m-t-10">
                                            <table id="returnedgowns" class="table table-bordered table-striped">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>FullName</th>
                                                    <th>Admission No</th>
                                                    <th>Department</th>
                                                    <th>Program</th>
                                                    <th>Year of Admission</th>
                                                    <th>Date Issued</th>
                                                    <th>Collected By</th>
                                                    <th>Date Returned</th>




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
                                                    <td><?php echo $row->collected_by; ?></td>
                                                    <td style="color: red"><?php  echo  date('d-m-Y' ,strtotime($row->date_returned)); ?></td>



                                                </tr>

                                                <?php
                                                $n++;


                                                ?>


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
                                            <th>Date Issued</th>
                                            <th>Collected By</th>
                                            <th>Date Returned</th>



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



