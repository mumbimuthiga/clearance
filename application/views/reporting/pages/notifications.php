<style>
    td{
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
                        <div class="col-sm-12">
                            <h3>
                               My Notifications&nbsp;
                            </h3>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive m-t-10">
                                <table id="myTable" class="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Sender</th>
                                        <th>Date Sent</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php foreach ($messages as $dep) { ?>
                                        <tr>
                                            <td>
                                                <?php echo $dep->id; ?>
                                            </td>
                                            <td>
                                                <?php echo $dep->notification; ?>
                                            </td>
                                            <td>
                                                <?php echo $dep->message; ?>
                                            </td>
                                            <td>
                                                <?php if($dep->role=='6'){echo 'Student';}
                                                else if($dep->role=='2'){ echo 'Hod';}
                                                else if($dep->role=='7'){ echo 'Finance';}
                                                else if($dep->role=='8'){ echo 'Library';}
                                                else if($dep->role=='10'){ echo 'Records';}
                                                    else if($dep->role=='11'){ echo 'Registrar';
                                                }
                                                ; ?>
                                            </td>

                                            <td>
                                                <?php echo date('d-m-Y' ,strtotime($dep->date_created)); ?>
                                            </td>

                                        </tr>
                                    <?php } ?>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Sender</th>
                                        <th>Date Sent</th>

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

<script src="<?php echo base_url() ?>assets/node_modules/jquery/jquery.min.js"></script>


