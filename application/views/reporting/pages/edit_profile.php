<div class="container-fluid">
    <?php $this->load->view('reporting/pages/head_info') ;?>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card">
                    <div class="card-body p-b-0">
                        <ul class="nav nav-tabs customtab" role="tablist">
                            <li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#profile" role="tab"><span class="hidden-sm-up">Update</span> <span class="hidden-xs-down">View Profile</span></a> </li>

                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="profile" role="tabpanel">
                                <br>
                                <h4>
                                    My Details
                                </h4>
                                <hr>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card" style="border: solid 1px lightgrey;">
                                            <div class="card-body">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered table-hover table-striped" style="border: 1px solid #dee2e6 !important;">
                                                        <tr>
                                                            <th>
                                                                Name
                                                            </th>
                                                            <td>
                                                                <?php echo $details->first_name . " " . $details->middle_name. " " . $details->surname; ?>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Email Address
                                                            </th>
                                                            <td>
                                                                <?php echo $details->email;?>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Phone Number
                                                            </th>
                                                            <td>
                                                                <?php echo $details->phone_number; ?>
                                                            </td>
                                                        </tr>
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

    </div>
</div>


