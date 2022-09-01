
<style>
    td, label{
        font-weight: bold;
        font-size: medium;
    }
    label{
        text-transform: capitalize;
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
                        <?php
                        $user=get_current_user_logged_in();
                        $id_user=get_user_id($user);
                        $adm_no=get_admissionuserid($id_user);
                        $records=countorderofnames($adm_no);

                        if($records>0){
                            redirect('Student/viewnames' ,'refresh');
                        }else{



                        ?>
                        <div class="col-sm-4">
                            <button class="btn btn" data-toggle="collapse" data-target="#demo" style="color: white;background-color: #00529B">
                                Add Student <i class=""></i>
                            </button>
                        </div>
                        <div class="col-sm-4">
                            <button class="btn btn" data-toggle="collapse" data-target="#demos" style="color: white;background-color: #00529B">
                              Upload List<i class=""></i>
                            </button>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="demos" class="collapse">
                                <form action="<?php echo base_url('Student/csv_import') ;?>" method="POST" id="education_form"  enctype="multipart/form-data">
                                    <div class="row" style="background: white;">
                                        <div class="col-sm-6">
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                   Upload List
                                                </label>
                                                <input type="file" name="csv_file" class="form-control" autocomplete="off" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-4">
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
                            <div id="demo" class="collapse">
                                <form action="<?php echo base_url('Student/submitgraduationlist') ;?>" method="POST" id="education_form"  enctype="multipart/form-data">
                                    <div class="row" style="background: white;">
                                        <div class="col-sm-4">
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Full Name
                                                </label>
                                                <input type="text" name="full_name" class="form-control" autocomplete="off" required>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Admission Number
                                                </label>
                                                <input type="text" name="admno" id="admno"   class="form-control" autocomplete="off" required oninput="">
                                            </div>
                                        </div>
                                        <div class="col-sm-4"  id="" >
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Year of Admission
                                                </label>
                                                <input type="number" name="year_of_admission" id="year_of_admission" class="form-control" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-4"  id="" >
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Department
                                                </label>

                                                <input type="text" name="department" id="department"  readonly value="<?php echo $department; ?>" class="form-control" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-4"  id="" >
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Program
                                                </label>
                                                <?php do_programs_drop_down("program" ,"program",""); ?>

                                            </div>
                                        </div>
                                        <div class="col-sm-4"  id="" >
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Phone Number
                                                </label>
                                                <input type="number" name="phone_no" id="phone_no" class="form-control" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-4"  id="" >
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Guardian Phone Number
                                                </label>
                                                <input type="number" name="guardian_phoneno" id="guardian_phoneno" class="form-control" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-4"  id="" >
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    Email
                                                </label>
                                                <input type="email" name="email" id="email" class="form-control" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-4"  id="" >
                                            <br>
                                            <div class="form-group">
                                                <label style="font-size: medium;font-weight: bold">
                                                    ID Number
                                                </label>
                                                <input type="number" name="id_number" id="id_number" class="form-control" autocomplete="off">
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
                    <br>
                    <br>
                    <div class="row">
                    <div class="col-sm-12">
                        <h3 style="color: red">

                          Graduation List For <?php echo $department; ?>
                        </h3>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive m-t-10">
                            <table id="myTable2" class="table table-bordered table-striped">
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
                                        <td><?php if($row->status==1){echo "Pending Approval by Senate";}
                                            else if($row->status==2){echo "Approved by Senate";}else if($row->status==3){echo "Declined by Senate";}; ?></td>
                                        <td><?php echo  date("d-m-Y", $timestamp); ?></td>
                                        <td>

                                            <div class="dropdown">
                                                <button class="btn-sm btn-success dropdown-toggle" type="button" data-toggle="dropdown">Action
                                                    <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li> <a class="dropdown-item" href="<?php echo base_url('Applicant/editstudentdetails/'.$row->id)?>">Edit</a></li>
                                                    <!--<li> <a class="dropdown-item" href="">Delete </a></li>-->
                                                    <li><a class="dropdown-item" onclick="deactivate_staff(<?php echo $row->id; ?>,'<?php ?>');">Delete</a>


                                                </ul>
                                            </div>

                                        </td>
                                    </tr>
                                    <?php
                                    $n++;
                                }
                                ?>
                                </tbody>

                                <tfoot>
                                <th>#</th>
                                <th>FullName</th>
                                <th>Admission No</th>
                                <th>Department</th>
                                <th>Program</th>
                                <th>Status</th>
                                <th>Date Created</th>
                                <th>Action</th>
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

<?php }?>


<script src="<?php echo base_url() ?>assets/node_modules/jquery/jquery.min.js"></script>
<script>
    function deactivate_staff(id, name)
    {
        swal({
                title: "Confirm",
                text: "Are you sure you want to Delete this record '"+name+"' ? Process is irreversible" ,
                type: "info",
                showConfirmButton: true,
                confirmButtonClass: "btn-primary",
                confirmButtonText: "Yes, Send!",
                closeOnConfirm: false,
                showCancelButton: true
            },
            function () {
                $.ajax({
                    type: "POST",
                    url: "<?php echo base_url('Student/delete_request/'); ?>" + id,
                    beforeSend: function () {

                    },
                    success: function (res)
                    {
                        if(res === '1')
                        {
                            swal({
                                title: "Error",
                                text: "Unable to Send.",
                                type: "error",
                                showConfirmButton: true,
                                confirmButtonText: "Ok",
                                confirmButtonColor: btn_color,
                                showCancelButton: false
                            });

                            return false;
                        }
                        else
                        {
                            swal({
                                title: "Successful",
                                text: "The record has been deleted successfully!",
                                type: "success",
                                showConfirmButton: true,
                                showCancelButton: false
                            }, function () {
                                window.location.href=window.location.href;
                            });
                        }

                    }
                });
            });

    }
</script>





