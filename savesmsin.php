<?php
/*
$servername = "localhost";
$username = "wdmsecuser";
$password = "78&#Doc*";
$database = "wdmprod";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

//22384

$telfrom =  $_REQUEST['from'];
$telto = $_REQUEST['to'];

$text = $_REQUEST['text'];

$date = $_REQUEST['date'];
$telid = $_REQUEST['id'];
$tel = $telfrom;

$text_msg = substr($text, 4);

if($text_msg == 'stop')
{
    $phone = substr($telfrom, 4);

    $sql = "SELECT id, password, old_password, phone, old_phone FROM members WHERE old_phone = '$phone'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0)
    {
        while($row = $result->fetch_assoc())
        {
            $new_password = $row['password'];
            $old_password = $row['old_password'];

            $new_phone = $row['phone'];
            $old_phone = $row['old_phone'];

            $user_id = $row['id'];

            $sql_update = "UPDATE members SET phone='$old_phone', old_phone='$new_phone', password='$old_password', old_password='$new_password' WHERE id = '$user_id'";

            if ($conn->query($sql_update) === TRUE)
            {
                $sql_d = "INSERT INTO test_sms_in (phone, res) VALUES ('$telfrom', 'done')";

                $conn->query($sql_d);

                
            } else {

                $sql_e = "INSERT INTO test_sms_in (phone, res) VALUES ('$telfrom', '$conn->error')";

                $conn->query($sql_e);
                //echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
    }
    else
    {
        //echo "none";

        $sql_e = "INSERT INTO test_sms_in (phone, res) VALUES ('$telfrom', 'none')";

        $conn->query($sql_e);
    }

}

else
{
    $sql = "INSERT INTO members_no_query (phone, short_code, message, sent) VALUES ('$telfrom', '$telto', '$text_msg', 0)";

    if ($conn->query($sql) === TRUE)
    {
        //echo "sms done";
    } else {
        //echo "Error: " . $sql . "<br>" . $conn->error;
    }
}


$conn->close();


*/