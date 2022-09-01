<?php
class Bookings extends  CI_Controller{
    public function index()
    {
        $data = array
        (
            'title' => 'Login',

        );
        $this->load->view('home/temps/head', $data);
        $this->load->view('home/temps/nav', $data);
        $this->load->view('hime/pages/login', $data);
        $this->load->view('home/temps/footers');
        $this->load->view('home/temps/script');
    }
    public function dashboard()
    {
        $session = $this->check_session();
        $id_user = get_current_user_logged_in();
        $role = get_role($id_user);


        $data = array
        (
            'title' => "ZETECH SOLUTIONS",
            'sys_id' => $session,
            'page_info' => "Dashboard",
            'page' => $this->uri->segment(2),
            'my_sesid'=>$session,
            //'my_current_role'=>$role,
            'my_user_sess'=>$session,
            'user_new_id'=>$id_user,
            'details' => $this->User_model->get_webuser_auth($session),
            'messages'=>$this->User_model->get_dash_notifications($role),

        );



        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);

        $this->load->view('reporting/pages/dashboard', $data);

        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function login()
    {
        $data = array
        (
            'title' => 'ZETECH  UNIVERSITY SOLUTIONS',

        );

        $this->load->view('home/temps/head', $data);
        $this->load->view('home/temps/nav', $data);
        $this->load->view('home/pages/login', $data);
        $this->load->view('home/temps/footers');
        $this->load->view('home/temps/script');
    }
    public function login_action()
    {
        $doc_no = $this->input->post('doc_no');
        $capt=$this->input->post('capt');
        //insert_general_data("login_doc_no", $doc_no);
        $details = $this->Auth_model->get_webuser_auth($doc_no);

        $password = sha1($this->input->post('password'));
        $is_active = $details->status;
        $is_verified = $details->login_status;
        $is_reset = $details->pass_status;


        if ($details) {


                if ($is_active == 1) {
                    if ($details->password === $password) {
                        if ($is_verified == 1) {
                            if ($is_reset == 1) {
                                $user_id = $this->random_digits(12) . $this->random_digits(12) . md5(uniqid());
                                $token = $this->random_digits(6);
                                $this->db->where('email', $details->email);
                                $this->db->set('user_id', $user_id);
                                $this->db->set('token', $token);
                                $this->db->update('web_users');

                                $link = base_url() . "bookings/password_reset/" . sha1($token) . "/" . $user_id;

                                echo $link;

                                exit(0);
                            } else {
                                $sess_data = array
                                (
                                    'sys_id' => $details->id,
                                    "id_user" => $details->id_user
                                );


                                $activity = array
                                (
                                    'user_id' => $details->id,
                                    'message' => "Logged in to portal"
                                );

                                $this->db->insert('activities', $activity);
                                $sess_name = 'web_user_session';
                                $this->session->set_userdata($sess_name, $sess_data);
                                $ip_address='192.168.0.1';

                                $activity = array
                                (
                                    'user_id' => $details->id,
                                    'message' => "Logged in to portal"
                                );

                                $this->db->insert('activities', $activity);
                                $log_in= array
                                (
                                    'user_id' => $details->id,
                                    'ip_address' => $ip_address
                                );

                                $this->db->insert('access_logs', $log_in);

                                $next_url = base_url() . "bookings/dashboard/$sess_name/" . md5(uniqid());

                                echo $next_url;

                                exit(0);
                            }
                        }
                        else {
                            $user_id = sha1($this->random_digits(4)) . $this->random_digits(8) . $this->random_digits(6) . md5(uniqid());
                            $token = $this->random_digits(6);

                            $this->db->where('id', $details->id);
                            $this->db->set('user_id', $user_id);
                            $this->db->set('token', $token);
                            $this->db->update('web_users');

                            $link = base_url() . "bookings/verification/" . sha1($token) . "/" . $user_id;

                            $send_email = array
                            (
                                'user_id' => 0,
                                'subject' => "Email Verification",
                                'message' => "Follow this link to verify your email. The verification link is: " . $link,
                                'email' => $details->email
                            );




                            echo "5";

                            exit(0);

                        }
                    }
                    else {
                        echo "1";

                        exit(0);
                    }

                } else {
                    echo "3";

                    exit(0);
                }

        }
        else {
            echo "1";

            exit(0);
        }


    }
    public function approve_enrollment(){
        $session = $this->check_session();
        $requests=$this->User_model->get_all_bookings_for_approval();
        $data = array
        (
            'title' => "Approval",
            's_id' => $session,
            'page_info' => "Approve Request",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,
        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/approval_request', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);
    }
    public function accept_request(){
        $id=$this->uri->segment(3);
        $session=$this->check_session();
        $this->db->where('id' ,$id);
        $this->db->set('status', 2);
        $this->db->update('services');

        $notification_alert=array(
            'user_id'=>$session,
            'notification'=>'Approved Request',
            'message'=>'This is to notify you that your request has been approved',
            'role'=>2
        );
        $this->db->insert('notifications',$notification_alert);

        redirect('bookings/approve_enrollment' ,'refresh');
    }
    public function delete_request(){
        $id=$this->uri->segment(3);
        $this->db->where('id' ,$id);
        $this->db->delete("services");

        redirect('bookings/approve_enrollment' ,'refresh');
    }
    public function services(){
        $session=$this->check_session();
        $requests=$this->User_model->get_all_services_available();
        $data = array
        (
            'title' => "Book Service",
            's_id' => $session,
            'page_info' => "Book Service",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,
        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/add_service', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);
    }
    public function enable_service(){
        $id=$this->uri->segment(3);
        $this->db->where('id',$id);
        $this->db->set('status',1);
        $this->db->update('available_services');
        redirect('bookings/services' ,'refresh');
    }
    public function disable_service(){
        $id=$this->uri->segment(3);
        $today=date("Y/m/d");
        $this->db->where('id',$id);
        $this->db->set('status',2);
        $this->db->set('date_disabled' ,$today);
        $this->db->update('available_services');
        redirect('bookings/services' ,'refresh');
    }
    public function request_service(){
        $session = $this->check_session();
        $requests=$this->User_model->get_all_services_available();
        $data = array
        (
            'title' => "Book Service",
            's_id' => $session,
            'page_info' => "Book Service",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,
        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/book_service', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);

    }
    public function bookservice_client(){
        $session=$this->check_session();
        $service_id=$this->input->post("service_id");

        $booking_from=$this->input->post("booking_from");
        $booking_to=$this->input->post("booking_to");
        $data=array(
            'service_id'=>$service_id,
            'user_id'=>$session,
            'booking_to'=>$booking_to,
            'booking_from'=>$booking_from
        );
        $this->db->insert('services',$data);
        $notification_alert=array(
            'user_id'=>$session,
            'notification'=>'Booking Request',
            'message'=>'This is to notify you  a booking has been made ,Kindly approve it',
            'role'=>6
        );
        $this->db->insert('notifications',$notification_alert);
        redirect('bookings/mybookings','refresh');
    }
    public function mybookings(){
        $session = $this->check_session();
        $requests=$this->User_model->get_all_mybookings($session);
        $data = array
        (
            'title' => "Book Service",
            's_id' => $session,
            'page_info' => "Book Service",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
            'requests'=>$requests,
        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/mybookings', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);
    }
    public function addservice(){
        $service=$this->input->post("service_name");
        $location=$this->input->post("location");
        $date_from=$this->input->post("date_from");
        $description=$this->input->post("description");
        $session=$this->check_session();

        $data=array(
            'service_name'=>$service,
            'venue'=>$location,
            'description'=>$description,
            'available_from'=>$date_from,
            'added_by'=>$session
        );
        $this->db->insert('available_services',$data);
        redirect('bookings/services','refresh');



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
    public function messages(){
        $session = $this->check_session();
        $user=get_current_user_logged_in();
        $role = get_role($user);
        //print_r($role);

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
    public function mymessages(){
        $session = $this->check_session();
        $user=get_current_user_logged_in();
        $role = get_role($user);

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
    public function user_profile()
    {
        $session = $this->check_session();

        $data = array
        (
            'title' => "ZETECH :: Profile Details",
            's_id' => $session,
            'page_info' => "Profile Details",
            'page' => $this->uri->segment(2),
            'details' => $this->User_model->get_webuser_auth($session),
        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('reporting/temps/header', $data);
        $this->load->view('reporting/temps/sidebar', $data);
        $this->load->view('reporting/pages/edit_profile', $data);
        $this->load->view('reporting/pages/footer', $data);
        $this->load->view('reporting/temps/scripts', $data);
    }
    public function logout()
    {
        $session = $this->check_session();

        $this->session->unset_userdata('web_user_session');

        $activity = array
        (
            'user_id' => $session,
            'message' => "Logged out of portal"
        );

        $this->db->insert('activities', $activity);

        redirect('bookings/login','refresh');
    }

    //Import Files

    // File upload and Insert records
    public function importFile(){
        // Validation
        $input = $this->validate([
            'file' => 'uploaded[file]|max_size[file,1024]|ext_in[file,csv],'
        ]);
        if (!$input) { // Not valid
            $data['validation'] = $this->validator;
            return view('users/index',$data);
        }else{ // Valid
            if($file = $this->request->getFile('file')) {
                if ($file->isValid() && ! $file->hasMoved()) {
                    // Get random file name
                    $newName = $file->getRandomName();
                    // Store file in public/csvfile/ folder
                    $file->move('../public/csvfile', $newName);
                    // Reading file
                    $file = fopen("../public/csvfile/".$newName,"r");
                    $i = 0;
                    $numberOfFields = 4; // Total number of fields
                    $importData_arr = array();
                    // Initialize $importData_arr Array
                    while (($filedata = fgetcsv($file, 1000, ",")) !== FALSE) {
                        $num = count($filedata);
                        // Skip first row & check number of fields
                        if($i > 0 && $num == $numberOfFields){

                            // Key names are the insert table field names - name, email, city, and status
                            $importData_arr[$i]['name'] = $filedata[0];
                            $importData_arr[$i]['email'] = $filedata[1];
                            $importData_arr[$i]['city'] = $filedata[2];
                            $importData_arr[$i]['status'] = $filedata[3];
                        }
                        $i++;
                    }
                    fclose($file);

                    // Insert data
                    $count = 0;
                    foreach($importData_arr as $userdata){
                        $users = new Users();
                        // Check record
                        $checkrecord = $users->where('email',$userdata['email'])->countAllResults();
                        if($checkrecord == 0){
                            ## Insert Record
                            if($users->insert($userdata)){
                                $count++;
                            }
                        }
                    }
                    // Set Session
                    session()->setFlashdata('message', $count.' Record inserted successfully!');
                    session()->setFlashdata('alert-class', 'alert-success');
                }else{
                    // Set Session
                    session()->setFlashdata('message', 'File not imported.');
                    session()->setFlashdata('alert-class', 'alert-danger');
                }
            }else{
                // Set Session
                session()->setFlashdata('message', 'File not imported.');
                session()->setFlashdata('alert-class', 'alert-danger');
            }
        }
        return redirect()->route('/');
    }

}
