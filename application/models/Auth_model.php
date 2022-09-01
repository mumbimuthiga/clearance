<?php
class Auth_model extends  CI_Model{
    public function get_webuser_auth($doc_no)
    {
        $this->db->where('email', $doc_no);
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
    public function get_studentdetails($doc_no)
    {
        $this->db->where('admission_no', $doc_no);
        $query = $this->db->get('order_of_names');

        if ($query->num_rows() > 0) {
            return $query->row();
        } else {
            return false;
        }
    }
    public function getListStudents($department){
       // $sql="SELECT * FROM order_of_names WHERE status >0  ORDER by id ASC ";
        $sql = "SELECT * FROM order_of_names where department='$department' and  status >0 and status <4 order by id DESC ";
        $query = $this->db->query($sql)->result();
        return $query;
    }
    public function getGraduationListStudents($department){
        // $sql="SELECT * FROM order_of_names WHERE status >0  ORDER by id ASC ";
        $sql = "SELECT * FROM graduation_list where department='$department'  order by id DESC ";
        $query = $this->db->query($sql)->result();
        return $query;
    }
    public function GetGraduationReport(){
        // $sql="SELECT * FROM order_of_names WHERE status >0  ORDER by id ASC ";
        $sql = "SELECT * FROM order_of_names where status>7 order by id DESC ";
        $query = $this->db->query($sql)->result();
        return $query;
    }
    public function getRegGraduationList(){

        $sql = "SELECT * FROM graduation_list order by id DESC ";
        $query = $this->db->query($sql)->result();
        return $query;


    }
    public function getLibraryStud(){
        $sql = "SELECT * FROM library order by id DESC ";
        $query = $this->db->query($sql)->result();
        return $query;
    }
    public function getFinanceStud(){
        $sql = "SELECT * FROM finance  order by id DESC ";
        $query = $this->db->query($sql)->result();
        return $query;
    }
    public function getRecordsStud(){
        $sql = "SELECT * FROM records  order by id DESC ";
        $query = $this->db->query($sql)->result();
        return $query;
    }
    public function getGownsIssued(){
        $sql = "SELECT * FROM gowns  order by id DESC ";
        $query = $this->db->query($sql)->result();
        return $query;
    }
    public function getGownsReturned(){
        $sql = "SELECT * FROM gowns where status=2  order by id DESC ";
        $query = $this->db->query($sql)->result();
        return $query;
    }

}