<?php
class  Student extends CI_Controller{
    public function addorderofnames(){
        $session=$this->check_session();


        $data = array
        (
            'title' => "Order of Names",
            's_id' => $session,
            'page_info' => "Order of Names",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/add_orderofnames', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);
    }
    public function submitnames(){

        $session=$this->check_session();
        $fname=$this->input->post("full_name");
        $admno=$this->input->post("admno");
        $year_of_adm=$this->input->post("year_of_admission");
        $program=$this->input->post("program");
        $department=$this->input->post("department");
        $phoneno=$this->input->post("phone_no");
        $guardphonno=$this->input->post("guardian_phoneno");
        $email=$this->input->post("email");
        $idnumber=$this->input->post("id_number");
        //print_r($session);

      //  print_r(12);
        $data=array(
            'fullname'=>$fname,
            'admission_no'=>$admno,
            'year_of_admission'=>$year_of_adm,
            'program'=>$program,
            'department'=>$department,
            'phone_no'=>$phoneno,
            'guardian_phoneno'=>$guardphonno,
            'email'=>$email,
            'id_number'=>$idnumber,
           'user_id'=>$session
        );
        $this->db->insert('order_of_names' ,$data);

        $hod_notification=array(
            'user_id'=>$session,
            'notification'=>'Order of Names',
            'message'=>'Order of Names has successfully been submitted by'.$fname. 'Admission No' .$admno,
            'role'=>2
        );
        $this->db->insert('notifications' ,$hod_notification);
        redirect('student/viewnames' ,'refresh');
    }
    //Add Graduation List
    public function submitgraduationlist(){

        $session=$this->check_session();
        $department=get_hoddepartment($session);
        $fname=$this->input->post("full_name");
        $admno=$this->input->post("admno");
        $year_of_adm=$this->input->post("year_of_admission");
        $program=$this->input->post("program");
        //$department=$this->input->post("department");
        $phoneno=$this->input->post("phone_no");
        $guardphonno=$this->input->post("guardian_phoneno");
        $email=$this->input->post("email");
        $idnumber=$this->input->post("id_number");
        //print_r($session);

        //  print_r(12);
        $data=array(
            'fullname'=>$fname,
            'admission_no'=>$admno,
            'year_of_admission'=>$year_of_adm,
            'program'=>$program,
            'department'=>$department,
            'phone_no'=>$phoneno,
            'guardian_phoneno'=>$guardphonno,
            'email'=>$email,
            'id_number'=>$idnumber,
            'user_id'=>$session
        );
        $this->db->insert('graduation_list' ,$data);

        $hod_notification=array(
            'user_id'=>$session,
            'notification'=>'Order of Names',
            'message'=>'You have been successfully added to the graduation list kindly confirm
            ',
            'role'=>6
        );
        $this->db->insert('notifications' ,$hod_notification);
        redirect('student/graduationlist' ,'refresh');
    }
    public function reggraduationlist(){

            $session=$this->check_session();
            $admission_no=get_admissionno($session);

          //  $department=get_hoddepartment($session);
        $department='School of ICT & Media Enigneering';

            $requests=$this->Auth_model->getRegGraduationList();

            $data = array
            (
                'title' => "Graduation List ",
                's_id' => $session,
                'page_info' => "Graduation List",
                'page' => $this->uri->segment(2),
                'details' => $this->User_model->get_webuser_auth($session),
                'requests'=>$requests,
                'department'=>$department

            );

            $this->load->view('reporting/temps/head', $data);
            $this->load->view('reporting/temps/header', $data);
            $this->load->view('reporting/temps/sidebar', $data);
            $this->load->view('reporting/pages/reg_graduationlist', $data);
            $this->load->view('reporting/pages/footer', $data);
            $this->load->view('reporting/temps/scripts', $data);

        }
    public function researchreggraduationlist(){

        $session=$this->check_session();
        $admission_no=get_admissionno($session);

        //  $department=get_hoddepartment($session);
        $department='Research';

        $requests=$this->Auth_model->getRegGraduationList();

        $data = array
        (
            'title' => "Graduation List ",
            's_id' => $session,
            'page_info' => "Graduation List",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,
            'department'=>$department

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/reg_graduationlist', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function educationreggraduationlist(){

        $session=$this->check_session();
        $admission_no=get_admissionno($session);

        //  $department=get_hoddepartment($session);
        $department='School of Education,Arts & Social Sciences';

        $requests=$this->Auth_model->getRegGraduationList();

        $data = array
        (
            'title' => "Graduation List ",
            's_id' => $session,
            'page_info' => "Graduation List",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,
            'department'=>$department

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/reg_graduationlist', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function financereggraduationlist(){

        $session=$this->check_session();
        $admission_no=get_admissionno($session);

        //  $department=get_hoddepartment($session);
        $department='School of Business & Economics';

        $requests=$this->Auth_model->getRegGraduationList();

        $data = array
        (
            'title' => "Graduation List ",
            's_id' => $session,
            'page_info' => "Graduation List",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,
            'department'=>$department

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/reg_graduationlist', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
        public function approvereg(){
        $id=$this->uri->segment(3);
        $session=$this->check_session();
        $this->db->where('id',$id);
        $this->db->set('status',2);
        $this->db->set('approved_by' ,$session);
        $this->db->update('graduation_list');

            $hod_notification=array(
                'user_id'=>$session,
                'notification'=>'Senate Approval',
                'message'=>'You have been successfully added to the approved by senate.
                 Kindly confirm your order  of names in your portal ',
                'role'=>6
            );
            $this->db->insert('notifications' ,$hod_notification);
        redirect('student/reggraduationlist' ,'refresh');
        }

    public function decline_request(){
        $id=$this->uri->segment(3);
        $session=$this->check_session();
        $this->db->where('id',$id);
        $this->db->set('status',3);
        $this->db->set('approved_by' ,$session);
        $this->db->update('graduation_list');

        $hod_notification=array(
            'user_id'=>$session,
            'notification'=>'Senate Approval',
            'message'=>'Kindly note You have been declined by senate.
                 ',
            'role'=>6
        );
        $this->db->insert('notifications' ,$hod_notification);
        redirect('student/reggraduationlist' ,'refresh');
    }


    public function viewnames(){
        $session=$this->check_session();
        $admission_no=get_admissionuserid($session);

        $row=$this->Auth_model->get_studentdetails($admission_no);

        $data = array
        (
            'title' => "Order of Names",
            's_id' => $session,
            'page_info' => "Order of Names",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'row'=>$row,

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/viewnames', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function messages(){
        $session = $this->check_session();
        $user=get_current_user_logged_in();
        $role = get_role($user);

        $admission_no=get_admissionuserid($session);



        $data = array
        (
            'title' => "Notifications",
            's_id' => $session,
            'page_info' => "Notifications",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
          'messages' => $this->User_model->get_user_notifications($role),
        );


        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/notifications', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function liststudents(){
        $session=$this->check_session();
        $admission_no=get_admissionno($session);
        $department=get_hoddepartment($session);

        $requests=$this->Auth_model->getListStudents($department);

        $data = array
        (
            'title' => "Order of Names",
            's_id' => $session,
            'page_info' => "Order of Names",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/liststudents', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function delete_request(){
        $id=$this->uri->segment(3);
        $this->db->where('id' ,$id);
        $this->db->delete("graduation_list");

        redirect('student/graduationlist' ,'refresh');
    }
    public function graduationlist(){
        $session=$this->check_session();
        $admission_no=get_admissionno($session);
        $department=get_hoddepartment($session);

        $requests=$this->Auth_model->getGraduationListStudents($department);

        $data = array
        (
            'title' => "Order of Names",
            's_id' => $session,
            'page_info' => "Order of Names",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,
            'department'=>$department

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/add_graduationlist', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
 public function librarian_approval(){

       $id=$this->uri->segment(3);
       $adm_no=get_admissionno_lib($id);

       $session=$this->check_session();

        $this->db->where('admission_no', $adm_no);
        $this->db->set('status', 4);
        $this->db->update('order_of_names');

        //Update Library Table
     $this->db->where('admission_no', $adm_no);
     $this->db->set('status', 4);
     $this->db->set('approved_by',$session);
     $this->db->update('library');

       // $adm_no=get_admissionno_lib($id);
        $year=get_admissionyear($adm_no);

        //Add to finance
     if($id){
         $finance_data=array(
             'adm_no'=>$adm_no,
             'year_of_admission'=>$year,
             'approved_by'=>$session
         );
         $this->db->insert('finance',$finance_data);
     }

        redirect('Student/librarianliststudents','refresh');

 }
    public function librarianliststudents(){
        $session=$this->check_session();
        //$admission_no=get_admissionno($session);
        $requests=$this->Auth_model->getLibraryStud();

        $data = array
        (
            'title' => "Library",
            's_id' => $session,
            'page_info' => "Library",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/librarianlist', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function financeliststudents(){
        $session=$this->check_session();
        //$admission_no=get_admissionno($session);
        $requests=$this->Auth_model->getFinanceStud();

        $data = array
        (
            'title' => "Finance",
            's_id' => $session,
            'page_info' => "Finance",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/financelist', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function gowns(){
        $session=$this->check_session();
        $requests=$this->Auth_model->getFinanceStud();

        $data = array
        (
            'title' => "Library",
            's_id' => $session,
            'page_info' => "Library",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/gowns', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function studentrecords(){
        $session=$this->check_session();
        //$admission_no=get_admissionno($session);
        $requests=$this->Auth_model->getRecordsStud();

        $data = array
        (
            'title' => "Records",
            's_id' => $session,
            'page_info' => "Records",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/record_list', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function record_approval(){
        $id=$this->uri->segment(3);
        $adm_no=get_admissionno_record($id);
        $session=$this->check_session();
        $this->db->where('admission_no', $adm_no);
        $this->db->set('status', 10);
        $this->db->set('approved_by',$session);
        $this->db->update('order_of_names');


        //Update Record Table
        $this->db->where('id', $id);
        $this->db->set('status', 2);
        $this->db->set('approved_by',$session);
        $this->db->update('records');

        $hod_notification=array(
            'user_id'=>$session,
            'notification'=>'Order of Names',
            'message'=>'You have Collected your transcripts and certificates',
            'role'=>6
        );
        $this->db->insert('notifications' ,$hod_notification);
        redirect('Student/studentrecords','refresh');

    }
    public function reportgraduands(){
        $session=$this->check_session();
        $admission_no=get_admissionno($session);
        $department=get_hoddepartment($session);

        $requests=$this->Auth_model->GetGraduationReport();

        $data = array
        (
            'title' => "Graduands Report",
            's_id' => $session,
            'page_info' => "Graduands Report",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,
            'department'=>$department

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/reportgraduand', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function issuegown(){
        $adm_no=$this->uri->segment(3);
        $session=$this->check_session();
        $year_of_adm=get_admissionyear($adm_no);
        $gown_issued=array(
            'adm_no'=>$adm_no,
            'year_of_admission'=>$year_of_adm,
            'approved_by '=>$session
        );
        $this->db->insert('gowns',$gown_issued);

        $this->db->where('admission_no', $adm_no);
        $this->db->set('status', 8);
        $this->db->update('order_of_names');

        redirect('student/gownissued','refresh');

    }
    public function returngown(){
        $id=$this->uri->segment(3);
        $session=$this->check_session();

        $adm_no=$this->input->post('adm_no');
        $date_returned=date('d-m-Y');
        $user=get_current_user_logged_in();
        $id_user=get_user_id($user);
        $names=get_user_fullname($id_user);
        $year_of_adm=get_admissionyear($adm_no);


       $this->db->where('id',$id);
       $this->db->set('status' ,2);
       $this->db->set('collected_by',$names);
       $this->db->set('date_returned' ,$date_returned);
       $this->db->update('gowns');

        $this->db->where('admission_no', $adm_no);
        $this->db->set('status', 9);
        $this->db->update('order_of_names');

        $insert_records=array(
            'adm_no'=>$adm_no,
            'year_of_admission'=>$year_of_adm
        );
        $this->db->insert('records',$insert_records);

        redirect('Student/gownreturned','refresh');

    }
    public function gownreturned(){
        $session=$this->check_session();
        $requests=$this->Auth_model->getGownsReturned();

        $data = array
        (
            'title' => "GOWNS",
            's_id' => $session,
            'page_info' => "GOWNS",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/returned_gowns', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);
    }
    public function gownissued(){
        $session=$this->check_session();
        $requests=$this->Auth_model->getGownsIssued();
       // print_r($requests);


        $data = array
        (
            'title' => "GOWNS",
            's_id' => $session,
            'page_info' => "GOWNS",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/issued_gown', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function finance_approval(){
        $id=$this->uri->segment(3);
        $adm_no=get_admissionno_finance($id);
        $session=$this->check_session();
        $this->db->where('admission_no', $adm_no);
        $this->db->set('status', 6);
        $this->db->set('approved_by',$session);
        $this->db->update('order_of_names');

        //Update Library Table
        $this->db->where('id', $id);
        $this->db->set('status', 2);
        $this->db->set('approved_by',$session);
        $this->db->update('finance');

        //$adm_no=get_admissionno_lib($id);
        $year=get_admissionyear($adm_no);

        //Add to finance
        $finance_data=array(
            'adm_no'=>$adm_no,
            'year_of_admission'=>$year,
            'approved_by'=>$session
        );
        $this->db->insert('gowns',$finance_data);
       // redirect('Student/Student/librarianliststudents','refresh');
        redirect('Student/financeliststudents','refresh');
    }
    public function hod_approval(){
        $id=$this->uri->segment(3);
        $session=$this->check_session();
        $this->db->where('id', $id);
        $this->db->set('status', 2);
        $this->db->set('approved_by',$session);
        $this->db->update('order_of_names');
        $adm_no=get_admissionno($id);
        $year=get_admissionyear($adm_no);

        //Add to Library
        $library_data=array(
            'adm_no'=>$adm_no,
            'year_of_admission'=>$year,
            'approved_by'=>$session
        );
        $this->db->insert('library',$library_data);
        redirect('Student/liststudents','refresh');
    }
    public function check_session()
    {
        $session = $this->session->userdata('web_user_session');

        if($session)
        {
            return $session['sys_id'];
        }

        else
        {
            redirect('bookings/login');
        }
    }

    //import CSV
    public function csv_import(){
        $session=$this->check_session();
        $admin_details=$this->db->get_where('web_users',array('id'=>$session))->row();
        $csv = $_FILES['csv_file']['tmp_name'];

        $handle = fopen($csv,"r");

        while (($row = fgetcsv($handle, 10000, ",")) != FALSE) //get row vales
        {

            $where = array(
                'user_id'=>$row[0],
                'fullname'=>$row[1],
                'admission_no' => $row[2],
                'year_of_admission' => $row[3],
                'department ' => $row[4],
                'program' => $row[5],
                'phone_no' => $row[6],
                'guardian_phoneno' => $row[7],
                'email' => $row[8],
                'id_number' => $row[9],
                'status' => $row[10],
                'approved_by' => $row[11],

            );
            $this->db->insert("graduation_list",$where);

        }
        echo "
    <script>
    alert('Students imported successfully');
    window.location.href='http://localhost/ssnp/Student/graduationlist';
    </script>
    ";

        exit(0);
    }

}