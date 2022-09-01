
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
                        <div class="col-sm-10">
                            <button class="btn btn" data-toggle="collapse" data-target="#demo" style="color: white;background-color: #00529B">
                                Add Names <i class=""></i>
                            </button>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="demo" class="collapse">
                                <form action="<?php echo base_url('Student/submitnames') ;?>" method="POST" id="education_form"  enctype="multipart/form-data">
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
                                                <?php do_departments_drop_down("department" ,"department",""); ?>
                                               <!-- <input type="text" name="department" id="department" class="form-control" autocomplete="off">-->
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





                </div>
            </div>
        </div>

    </div>
</div>
<?php }?>


<script src="<?php echo base_url() ?>assets/node_modules/jquery/jquery.min.js"></script>





