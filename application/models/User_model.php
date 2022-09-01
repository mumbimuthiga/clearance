<?php
class User_model extends CI_Model{
    //this the function to get all the notifications of user logged in
    public function get_dash_notifications($user_id)
    {
        $query = "SELECT * FROM notifications where role=$user_id ORDER BY id DESC LIMIT  3 ";

        $result = $this->db->query($query);
        return $result->result();
    }

    //Get All Bookings
    public function get_all_bookings_for_approval(){
        // $this->db->where('status', 1);
        $query = $this->db->get('services');

        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }
    //Get  Available Services
    public function get_all_services_available(){
        //$this->db->where('status', 1);
        $query = $this->db->get('available_services');

        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }

    //Get All My Bookings
    public function get_all_mybookings($id){
        $this->db->where('user_id', $id);
        $query = $this->db->get('services');

        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }
    //this the function to get all the notifications of staff logged in
    public function get_user_notifications($user_id)
    {
        $query = "SELECT * FROM notifications where role=$user_id ORDER BY id DESC";

        $result = $this->db->query($query);
        return $result->result();
    }
    public function get_webuser_auth($doc_no)
    {
        $this->db->where('id', $doc_no);
        $query = $this->db->get('web_users');

        if($query->num_rows() > 0)
        {
            return $query->row();
        }

        else
        {
            return false;
        }
    }

}