<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Web2 extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->library('ciqrcode');
    }


    public function index()
    {
        $data = array
        (
            'title' => 'ZETECH UNIVERSITY Portal : Home'
        );

        $this->load->view('home/temps/head', $data);
        $this->load->view('home/temps/nav', $data);
        $this->load->view('home/temps/banner', $data);
        $this->load->view('home/temps/footers');
        $this->load->view('home/temps/scripts');
    }


    public function login()
    {
        $data = array
        (
            'title' => 'Login',

        );

        $this->load->view('reporting/temps/head', $data);
        $this->load->view('home/temps/nav', $data);
        $this->load->view('home/pages/login', $data);
        $this->load->view('home/temps/footer');
        $this->load->view('home/temps/scripts');
    }




}
