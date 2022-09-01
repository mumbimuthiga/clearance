<?php
include "dbConnect.php";


// Reads the variables sent via POST from our gateway

$sessionId = $_POST["sessionId"];
$serviceCode = $_POST["serviceCode"];
$phoneNumber = '' . substr($_POST["phoneNumber"], 4);
$text = $_POST["text"];

$registeredUser = false;

#we explode the text using the separator ‘*’ which will give us an array.

//$text        =  'ggdsgdgggdda';
if (strpos($text, '*') !== false)
    $level = explode('*', $text);
else $level[0] = $text;
//check to see of the text variable has data to avoid errors.
if (isset($text)) {

    $arrCount = count($level);
    $arrCount -= 1;
    if (isset($level[0]) && $level[0] != '' && $level[$arrCount] == 99 && strlen($text) > 1) {
        //$lastAsteric = strrpos($text,"*");
        $lastAsteric = strpos($text, "*99");
        $text = substr($text, 0, $lastAsteric);
        $lastAsteric = strrpos($text, "*");
        $text = substr($text, 0, $lastAsteric);

        $level = explode('*', $text);
    }
    if (strpos($text, '*99') !== false) {// check any occurence of 99 (back)
        $lastAsteric = $firstOccurence = strpos($text, "*99"); //GET THE FIRST OCCURRENCE *99 AND REPLACE THE PRECCEDING CHARACTER before *
        $firstPart = substr($text, 0, $lastAsteric);
        $lastAsteric = strrpos($firstPart, "*");//get value following the *99 and remove it
        $firstPart = substr($text, 0, $lastAsteric);
        $text = $firstPart . substr($text, $firstOccurence);
        $text = str_replace("*99", "", $text);
        if (substr($text, 0, 1) == '*') {// if it starts with * remove it
            $text = substr($text, 1);
        }

        $level = explode('*', $text);
        $response = "END Code Error $text";
    }

    $checkUser = mysqli_query($conn, "select * from members where phone='$phoneNumber' ") or die(mysqli_error($conn));
    if ($num_rows = mysqli_num_rows($checkUser) > 0) {
        $fetchUser = mysqli_fetch_array($checkUser);
        $ownerId = $fetchUser['doc_no'];
        $registeredUser = true;
    }

    if ($text == '') {
        //level 0
        if ($num_rows = mysqli_num_rows($checkUser) > 0) {
            $fetchUser = mysqli_fetch_array($checkUser);
            $ownerId = $fetchUser['doc_no'];

            $response = "CON Welcome - WDM Digital Portal. \n";
            $response .= "1. My Wallet \n"; //3
            $response .= "2. Subscribe to Alerts \n"; //4
            $response .= "3. Upgrade Membership \n";//5
            $response .= "4. Renew Membership \n";//6
            $response .= "5. Donate \n";//6
            $response .= "6. Check Profile \n";//6
            $response .= "7. Events \n";//6
            $response .= "8. Quit \n";//7

            //$response .= "6. Miscellaneous \n";//8
            //$response .= "7. Bill Payment ";//9
        } else { // level 0
            $response = "CON The WDM Digital Portal \n";
            $response .= "1. Register \n";
            $response .= "2. Quit \n";
        }
    }

//SUBSCRIBING TO WDM ALERTS


    if (isset($level[0]) && $level[0] == 2 && !isset($level[1]) && $registeredUser) { //

        $response = "CON Available Subscription Plans \n";
        $response .= "1. Daily Plan @ Ksh.10 \n";
        $response .= "2. 7 Day Plan @ Ksh.50 \n";
        $response .= "3. 30 Day Plan @ Ksh.200 \n";
        $response .= "4. Quit \n";

    }

    /* Subscription to the dailiy plan*/

    if (isset($level[0]) && $level[0] == 2 && isset($level[1]) && $level[1] == 1 && $registeredUser) { //

        //Save subscription details into the DataBase
        $data = array(
            'phonenumber' => $phoneNumber,
            'plan' => $level[1],

        );

        //$pwd = md5($level[5]);
        $date = date('Y-m-d h:m:s');

        $end_date2 = date_create("$date");
        date_add($end_date2, date_interval_create_from_date_string("1 days"));
        $end_date = date_format($end_date2, "Y-m-d h:m:s");


        $checkWalletBalance = mysqli_query($conn, "SELECT user_wallet.user_id, user_wallet.id, user_wallet.amount, members.phone, members.doc_no from user_wallet join members on user_wallet.user_id =members.user_id where phone='$phoneNumber' ") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkWalletBalance) > 0) {
            $fetchUser = mysqli_fetch_array($checkWalletBalance);
            $balance = $fetchUser['amount'];
            $idN = $fetchUser['user_id'];


        }

        $checkSubFee = mysqli_query($conn, "select * from ussd_subscription_plans where id = 1 ") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkSubFee) > 0) {
            $fetchUser = mysqli_fetch_array($checkSubFee);
            $daily_sub = $fetchUser['amount'];


        }

        if ($balance < 10) {
            $response = "END Sorry you do not have sufficient funds in your wallet to subscribe for this service! Top up and try again.";

        } else {


            $new_wallet_balance = ($balance - $daily_sub);

            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber' ") or die(mysqli_error($conn));
            $insert = mysqli_query($conn, "insert into ussd_subscriptions(user_id, phone, plan, start_date, end_date, amount) values('$idN', '$phoneNumber', '$level[1]', '$date', '$end_date', '$daily_sub' )") or die(mysqli_error($conn));

            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$idN', 'USSD SMS Subscription Ksh.10',  '$date')") or die(mysqli_error($conn));

            $response = "END You have successfully subscribed to the Daily Plan @ Ksh.10";


        }
    }

    /* Subscription to the 7 Day plan*/

    if (isset($level[0]) && $level[0] == 2 && isset($level[1]) && $level[1] == 2 && $registeredUser) { //


//Save subscription details into the DataBase
        $data = array(
            'phonenumber' => $phoneNumber,
            'plan' => $level[1],

        );

        //$pwd = md5($level[5]);
        $date = date('Y-m-d h:m:s');
        $end_date2 = date_create("$date");
        date_add($end_date2, date_interval_create_from_date_string("7 days"));
        $end_date = date_format($end_date2, "Y-m-d h:m:s");


        $checkWalletBalance = mysqli_query($conn, "select user_wallet.id, user_wallet.user_id, user_wallet.amount, members.phone from user_wallet join members on user_wallet.user_id=members.user_id where phone='$phoneNumber' ") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkWalletBalance) > 0) {
            $fetchUser = mysqli_fetch_array($checkWalletBalance);
            $balance = $fetchUser['amount'];
            $idN = $fetchUser['user_id'];


        }

        $checkSubFee = mysqli_query($conn, "select * from ussd_subscription_plans where id = 2 ") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkSubFee) > 0) {
            $fetchUser = mysqli_fetch_array($checkSubFee);
            $weekly_sub = $fetchUser['amount'];


        }

        if ($balance < 50) {
            $response = "END Sorry you do not have sufficient funds in your wallet to subscribe for this service! Top up and try again.";

        } else {

            $new_wallet_balance = ($balance - $weekly_sub);

            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber' ") or die(mysqli_error($conn));

            $insert = mysqli_query($conn, "insert into ussd_subscriptions(user_id, phone, plan, start_date, end_date, amount) values('$idN', '$phoneNumber', '$level[1]', '$date', '$end_date', '$weekly_sub')") or die(mysqli_error($conn));

            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$idN', 'USSD SMS Subscription Ksh.50',  '$date')") or die(mysqli_error($conn));
            $response = "END You have successfully subscribed to the 7 Day Plan @ Ksh.50";


        }


    }

    /* Subscription to the 30 Day plan*/


    if (isset($level[0]) && $level[0] == 2 && isset($level[1]) && $level[1] == 3 && $registeredUser) { //


        //Save subscription details into the DataBase
        $data = array(
            'phonenumber' => $phoneNumber,
            'plan' => $level[1],

        );

        //$pwd = md5($level[5]);
        $date = date('Y-m-d h:m:s');
        $end_date2 = date_create("$date");
        date_add($end_date2, date_interval_create_from_date_string("30 days"));
        $end_date = date_format($end_date2, "Y-m-d h:m:s");


        $checkWalletBalance = mysqli_query($conn, "select user_wallet.id, user_wallet.user_id, user_wallet.amount, members.phone from user_wallet join members on user_wallet.user_id=members.user_id where phone='$phoneNumber' ") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkWalletBalance) > 0) {
            $fetchUser = mysqli_fetch_array($checkWalletBalance);
            $balance = $fetchUser['amount'];
            $idN = $fetchUser['user_id'];


        }

        $checkSubFee = mysqli_query($conn, "select * from ussd_subscription_plans where id = 3 ") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkSubFee) > 0) {
            $fetchUser = mysqli_fetch_array($checkSubFee);
            $monthly_sub = $fetchUser['amount'];


        }

        if ($balance < 200) {
            $response = "END Sorry you do not have sufficient funds in your wallet to subscribe for this service! Top up and try again.";

        } else {
            $new_wallet_balance = ($balance - $monthly_sub);

            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber' ") or die(mysqli_error($conn));
            $insert = mysqli_query($conn, "insert into ussd_subscriptions(user_id, phone, plan, start_date, end_date, amount) values('$idN', '$phoneNumber', '$level[1]', '$date', '$end_date', '$monthly_sub' )") or die(mysqli_error($conn));
            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$idN', 'USSD SMS Subscription Ksh.200',  '$date')") or die(mysqli_error($conn));

            $response = "END You have successfully subscribed to the 30 Day Plan @ Ksh.100";


        }


    }

    /* Quiting the Subscription menu*/


    if (isset($level[0]) && $level[0] == 2 && isset($level[1]) && $level[1] == 4 && $registeredUser) { //


        $response = "END Thank you for using the WDM Portal, Tibim!";


    }

    //END OF SUBSCRIPTION TO ALERTS


    //UPGRADE MEMBERSHIP

    if (isset($level[0]) && $level[0] == 3 && !isset($level[1]) && $registeredUser) { //

        $checkMemberType = mysqli_query($conn, "select * from members where phone='$phoneNumber' ") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkMemberType) > 0) {

            $fetchUser = mysqli_fetch_array($checkMemberType);
            $memberType = $fetchUser['member_type'];


        }

        if ($memberType == 1) {

            $response = "CON You are Currently a Regular Member \n";
            $response .= "2. Upgrade to Silver @ Ksh.50 \n";
            $response .= "3. Upgrade to Platinum @ Ksh.100 \n";
            $response .= "4. Cancel \n";


        } elseif ($memberType == 2) {

            $response = "CON You are Currently a Silver Member \n";
            $response .= "3. Upgrade to Platinum @ Ksh.100 \n";
            $response .= "4. Cancel \n";

        } elseif ($memberType == 3) {

            $response = "CON You are Currently a Platinum Member \n";
            $response .= "4. Cancel \n";

        }


    }


    if (isset($level[0]) && $level[0] == 3 && isset($level[1]) && $level[1] == 2 && $registeredUser) {
        $checkWalletBalance = mysqli_query($conn, "select user_wallet.id, user_wallet.user_id, user_wallet.amount, members.phone from user_wallet join members on user_wallet.user_id=members.user_id where phone='$phoneNumber' ") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkWalletBalance) > 0) {
            $fetchUser = mysqli_fetch_array($checkWalletBalance);
            $balance = $fetchUser['amount'];
            $user_id = $fetchUser['user_id'];


        }

        if ($balance < 50) {
            $response = "END You do not have sufficient funds to upgrade to Silver Membership. Kindly top up and try again! \n";
        } else {

            $checkFee = mysqli_query($conn, "select * from memberships where id = 2") or die(mysqli_error($conn));
            if ($num_rows = mysqli_num_rows($checkFee) > 0) {
                $fetchUser = mysqli_fetch_array($checkFee);
                $fee = $fetchUser['fee'];

            }
            $date = date('Y-m-d h:m:s');
            $new_wallet_balance = ($balance - $fee);
            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber'") or die(mysqli_error($conn));
            $update_membership = mysqli_query($conn, "update members set member_type = '2' where phone = '$phoneNumber' ") or die(mysqli_error($conn));
            $insert = mysqli_query($conn, "insert into ussd_upgrade_trx(user_id, phone, upgrade_from, upgrade_to, date, amount) values('$user_id','$phoneNumber', '1', '2', '$date', '$fee')") or die(mysqli_error($conn));
            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$user_id', 'USSD Membership Upgrade Ksh.50',  '$date')") or die(mysqli_error($conn));

            $response = "END You have successfully upgraded your membership to silver for Ksh.50 \n";

        }

    }

    if (isset($level[0]) && $level[0] == 3 && isset($level[1]) && $level[1] == 3 && $registeredUser) {

        $checkWalletBalance = mysqli_query($conn, "select user_wallet.id, user_wallet.user_id, user_wallet.amount, members.phone from user_wallet join members on user_wallet.user_id=members.user_id where phone='$phoneNumber'") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkWalletBalance) > 0) {
            $fetchUser = mysqli_fetch_array($checkWalletBalance);
            $balance = $fetchUser['amount'];
            $user_id = $fetchUser['user_id'];


        }

        if ($balance < 100) {
            $response = "END You do not have sufficient funds to upgrade to Platinum Membership. Kindly top up and try again! \n";
        } else {

            $checkFee = mysqli_query($conn, "select * from memberships where id = 3") or die(mysqli_error($conn));
            if ($num_rows = mysqli_num_rows($checkFee) > 0) {
                $fetchUser = mysqli_fetch_array($checkFee);
                $fee = $fetchUser['fee'];

            }
            $date = date('Y-m-d h:m:s');
            $new_wallet_balance = ($balance - $fee);
            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber'") or die(mysqli_error($conn));
            $update_membership = mysqli_query($conn, "update members set member_type = '3' where phone = '$phoneNumber' ") or die(mysqli_error($conn));
            $insert = mysqli_query($conn, "insert into ussd_upgrade_trx(user_id, phone, upgrade_from, upgrade_to, date, amount) values('$user_id','$phoneNumber', '1', '2', '$date', '$fee')") or die(mysqli_error($conn));
            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$user_id', 'USSD Membership Upgrade Ksh.100',  '$date')") or die(mysqli_error($conn));

            $response = "END You have successfully upgraded your membership to Platinum for Ksh.100 \n";

        }


    }

    if (isset($level[0]) && $level[0] == 3 && isset($level[1]) && $level[1] == 4 && $registeredUser) {

        $response = "END Thank you for using the WDM Portal. Tibim! \n";


    }


    //END OF UPGRADE MEMBERSHIP


    //RENEW MEMBERSHIP

    if (isset($level[0]) && $level[0] == 4 && !isset($level[1]) && $registeredUser) { //

        $checkValidStatus = mysqli_query($conn, "select * from members where phone = '$phoneNumber'") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkValidStatus) > 0) {
            $fetchUser = mysqli_fetch_array($checkValidStatus);
            $exp_date = $fetchUser['expiry_date'];

        }

        $date = date('Y-m-d');

        if ($date > $exp_date) {

            $response = "CON Membership Status: Expired! \n";
            $response .= "1. Confirm Renewal  \n";
            $response .= "2. Cancel \n";


        } else {

            $response = "CON Membership Status: Active! \n";
            $response .= "2. Cancel \n";

        }


    }

    if (isset($level[0]) && $level[0] == 4 && isset($level[1]) && $level[1] == 1 && $registeredUser) {

        //check membership type & amount per type
        $checkMemberType = mysqli_query($conn, "select members.phone, members.member_type, memberships.name, members.user_id, memberships.fee  from members join memberships on members.member_type = memberships.id where phone='$phoneNumber' ") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkMemberType) > 0) {
            $fetchUser = mysqli_fetch_array($checkMemberType);
            $memberType = $fetchUser['member_type'];
            $user_id = $fetchUser['user_id'];
            $renewalFee = $fetchUser['fee'];
        }

        //check wallet balance before renewal can be authorized
        $checkWalletBalance = mysqli_query($conn, "select user_wallet.id, user_wallet.user_id, user_wallet.amount, members.phone from user_wallet join members on user_wallet.user_id=members.user_id where phone='$phoneNumber'") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkWalletBalance) > 0) {
            $fetchUser = mysqli_fetch_array($checkWalletBalance);
            $balance = $fetchUser['amount'];


        }

        if ($balance < $renewalFee) {
            $response = "END You do not have sufficient funds in your wallet to proceed with this Request. Kindly top up and try! \n";
        }

        if (($memberType == 1) && ($balance >= $renewalFee)) {

            //Update wallet Balance

            $date = date('Y-m-d');
            $new_exp_date2 = date_create("$date");
            date_add($new_exp_date2, date_interval_create_from_date_string("365 days"));
            $new_exp_date = date_format($new_exp_date2, "Y-m-d");

            $new_wallet_balance = ($balance - $renewalFee);
            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber'") or die(mysqli_error($conn));
            $update_renewal = mysqli_query($conn, "update members set expiry_date = '$new_exp_date' where phone = '$phoneNumber' ") or die(mysqli_error($conn));
            $insert = mysqli_query($conn, "insert into ussd_renewal_trx(user_id, phone, date, expiry_date, amount) values('$user_id', '$phoneNumber', '$date', '$new_exp_date', '$renewalFee')") or die(mysqli_error($conn));
            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$user_id', 'USSD Party Membership Renewal Ksh. $renewalFee',  '$date')") or die(mysqli_error($conn));

            if ($update_renewal) {
                $response = "END You have successfully Renewed Your Party Membership @ Ksh. $renewalFee ! \n";
            } else {
                $response = "END Your attempt to Renew your Party membership has failed. Kindly contact us for further assistance! \n";
            }

        } elseif (($memberType == 2) && ($balance >= $renewalFee)) {

            $date = date('Y-m-d');
            $new_exp_date2 = date_create("$date");
            date_add($new_exp_date2, date_interval_create_from_date_string("365 days"));
            $new_exp_date = date_format($new_exp_date2, "Y-m-d");

            $new_wallet_balance = ($balance - $renewalFee);
            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber'") or die(mysqli_error($conn));
            $update_renewal = mysqli_query($conn, "update members set expiry_date = '$new_exp_date' where phone = '$phoneNumber' ") or die(mysqli_error($conn));
            $insert = mysqli_query($conn, "insert into ussd_renewal_trx(user_id, phone, date, expiry_date, amount) values('$user_id', '$phoneNumber', '$date', '$new_exp_date', '$renewalFee')") or die(mysqli_error($conn));
            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$user_id', 'USSD Party Membership Renewal Ksh. $renewalFee',  '$date')") or die(mysqli_error($conn));

            if ($update_renewal) {
                $response = "END You have successfully Renewed Your Party Membership @ Ksh. $renewalFee ! \n";
            } else {
                $response = "END Your attempt to Renew your Party membership has failed. Kindly contact us for further assistance! \n";
            }


        } elseif (($memberType == 3) && ($balance >= $renewalFee)) {

            $date = date('Y-m-d');
            $new_exp_date2 = date_create("$date");
            date_add($new_exp_date2, date_interval_create_from_date_string("365 days"));
            $new_exp_date = date_format($new_exp_date2, "Y-m-d");

            $new_wallet_balance = ($balance - $renewalFee);
            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber'") or die(mysqli_error($conn));
            $update_renewal = mysqli_query($conn, "update members set expiry_date = '$new_exp_date' where phone = '$phoneNumber' ") or die(mysqli_error($conn));
            $insert = mysqli_query($conn, "insert into ussd_renewal_trx(user_id, phone, date, expiry_date, amount) values('$user_id', '$phoneNumber', '$date', '$new_exp_date', '$renewalFee')") or die(mysqli_error($conn));
            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$user_id', 'USSD Party Membership Renewal Ksh. $renewalFee',  '$date')") or die(mysqli_error($conn));

            if ($update_renewal) {
                $response = "END You have successfully Renewed Your Party Membership @ Ksh. $renewalFee ! \n";
            } else {
                $response = "END Your attempt to Renew your Party membership has failed. Kindly contact us for further assistance! \n";
            }

        } else {

            $response = "Kindly call our Contact Centre (0720-000-123) to update your membership details! \n";
        }


    }

    //End the Renewal Business process

    //Start exit Renewal Menu
    if (isset($level[0]) && $level[0] == 4 && isset($level[1]) && $level[1] == 2 && $registeredUser) {

        $response = "END Thank you for accessing the WDM Portal. We look forward to our continued cooperation! Tilalala! \n";


    }

//END

    //Start Donate to the WDM Party

    if (isset($level[0]) && $level[0] == 5 && !isset($level[1]) && $registeredUser) { //


        $response = "CON Enter Amount (Ksh.) to Donate:";


    }

    if (isset($level[0]) && $level[0] == 5 && isset($level[1]) && $registeredUser) { //


        //check wallet balance before renewal can be authorized
        $checkWalletBalance = mysqli_query($conn, "select user_wallet.id, user_wallet.user_id, user_wallet.amount, members.phone from user_wallet join members on user_wallet.user_id=members.user_id where phone='$phoneNumber'") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkWalletBalance) > 0) {
            $fetchUser = mysqli_fetch_array($checkWalletBalance);
            $balance = $fetchUser['amount'];
            $user_id = $fetchUser['user_id'];

        }

        $date = date('Y-m-d h:m:s');

        if ($level[1] <= 0) {
            $response = "END The amount to be donated must be Ksh.1 and above. Thank you!";
        }


        if ($balance < $level[1]) {
            $response = "END You do not have sufficient funds in your wallet to donate Ksh.$level[1] to the WDM Party. Wallet Balance: Ksh.$balance !";
        } else {

            $donate = mysqli_query($conn, "insert into donations(user_id, amount, date) values('$user_id', '$level[1]', '$date')") or die(mysqli_error($conn));
            $new_wallet_balance = ($balance - $level[1]);
            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber'") or die(mysqli_error($conn));
            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$user_id', 'USSD Donation Ksh. $level[1]',  '$date')") or die(mysqli_error($conn));

            if ($donate) {

                $response = "END You have successfully donated Ksh.$level[1] to the WDM Party, Your wallet balance is Ksh.$new_wallet_balance Thank you!";

            } else {
                $response = "END We are experincing problems completing this transaction. Kindly try after 2 minutes!";


            }


        }
    }

    //END

    //Start of checking profile
    if (isset($level[0]) && $level[0] == 6 && !isset($level[1]) && $registeredUser) {
        $date = date('Y-m-d h:m:s');

        $checkMemberProfile = mysqli_query($conn, "select * from members where phone = '$phoneNumber'") or die(mysqli_error($conn));
        if ($num_rows = mysqli_num_rows($checkMemberProfile) > 0) {
            $fetchUser = mysqli_fetch_array($checkMemberProfile);
            $user_id = $fetchUser['user_id'];
            $fname = $fetchUser['fname'];
            $other_names = $fetchUser['other_names'];
            $voters_no = $fetchUser['voters_no'];
            $member_no = $fetchUser['member_no'];
            $doc_no = $fetchUser['doc_no'];
            $doc_type = $fetchUser['doc_type'];
            $county = $fetchUser['county'];
            $constituency = $fetchUser['constituency'];
            $ward = $fetchUser['ward'];
            $polling_station = $fetchUser['polling_station'];


        }

        if ($fname == '') {
            $fname = 'First Name, ';
        } else {
            $fname = '';
        }
        if ($other_names == '') {
            $other_names = 'Other Name, ';
        } else {
            $other_names = '';
        }
        if ($voters_no == '') {
            $voters_no = 'Voter No, ';
        } else {
            $voters_no = '';
        }
        if ($member_no == '') {
            $member_no = 'Member No, ';
        } else {
            $member_no = '';
        }
        if ($doc_no == '') {
            $doc_no = 'ID Number, ';
        } else {
            $doc_no = '';
        }
        if ($doc_type == '') {
            $doc_type = 'Document Type, ';
        } else {
            $doc_type = '';
        }
        if ($county == '') {
            $county = 'County, ';
        } else {
            $county = '';
        }
        if ($constituency == '') {
            $constituency = 'Constituency, ';
        } else {
            $constituency = '';
        }
        if ($ward == '') {
            $ward = 'Ward, ';
        } else {
            $ward = '';
        }
        if ($polling_station == '') {
            $polling_station = 'Polling Station ';
        } else {
            $polling_station = '';
        }


        if ($fname == '' || $other_names == '' || $voters_no == '' || $member_no == '' || $doc_no == '' || $doc_type == '' || $county == '' || $constituency == '' || $ward == '' || $polling_station == '') {

            $response = "END Your profile is INCOMPLETE, Visit WDM Web Portal to provide: $fname $other_names $voters_no $member_no $doc_no $doc_type $county $constituency $ward $polling_station  ";
            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$user_id', 'USSD User Profile Checked',  '$date')") or die(mysqli_error($conn));

        } else {

            $response = "END Dear member, Your profile is COMPLETE. We value your support!";
        }


    }

    //End

    //Start of WDM Events
    if (isset($level[0]) && $level[0] == 7 && !isset($level[1]) && $registeredUser) { //

        $checkEvents = "select * from events where ussd = 1 AND start_date > CURDATE()";

        @$fetchRecords = mysqli_query($conn, $checkEvents);
        if (@$mynums = mysqli_num_rows($fetchRecords) > 0) {

            $response = "CON Select an Event: \n";

            $count = 0;


            while ($chota = mysqli_fetch_array($fetchRecords)) {

                $event_id = $chota['id'];
                $event_name = $chota['name'];

                $response .= "$event_id.  $event_name \n";


            }


            $count++;

        } else {

            $response = "END Dear member, We have not found any events. Kindly login to the Web Portal for further details! \n";


        }


    }


    //checking events ticket menu upto selection of ticket type


    $checkEvents_x = "select * from events where ussd = 1";

    @$fetchRecords_x = mysqli_query($conn, $checkEvents_x);
    if (@$mynums_x = mysqli_num_rows($fetchRecords_x) > 0) {
        $count_x = 0;


        while ($chota_x = mysqli_fetch_array($fetchRecords_x)) {

            $event_id_x = $chota_x['id'];
            $event_name_x = $chota_x['name'];
            $event_location_x = $chota_x['location'];
            $event_start_x = $chota_x['start_date'];
            $event_end_x = $chota_x['end_date'];
            $start_time = $chota_x['time'];


            if (isset($level[0]) && $level[0] == 7 && isset($level[1]) && $level[1] == $event_id_x && $registeredUser)
            {

                $checkEventsTypes = "select * from event_tickets where event_id = '$event_id_x'";

                @$fetchRecords = mysqli_query($conn, $checkEventsTypes);
                if (@$mynums = mysqli_num_rows($fetchRecords) > 0) {

                    $response = "CON The $event_name_x begins on $event_start_x - $start_time at $event_location_x. Select Ticket Type:\n";

                    $count = 0;


                    while ($chota = mysqli_fetch_array($fetchRecords)) {

                        $event_type_id = $chota['id'];
                        $event_id_x = $chota['event_id'];
                        $event_type = $chota['type'];
                        $ticket_amount = $chota['amount'];


                        $response .= "$event_type_id.  $event_type @ Ksh.$ticket_amount \n";


                    }

                    $count++;


                } else {

                    $response = "END Dear member, We have not found any events. Kindly login to the Web Portal for further details! \n";


                }


            }


            $checkEvents_t = "select event_tickets.id, event_tickets.event_id, event_tickets.type, event_tickets.amount from event_tickets join events on event_tickets.event_id = events.id";

            @$fetchRecords_t = mysqli_query($conn, $checkEvents_t);
            if (@$mynums_t = mysqli_num_rows($fetchRecords_t) > 0) {
                $count_t = 0;


                while ($chota_t = mysqli_fetch_array($fetchRecords_t)) {

                    $ticket_id = $chota_t['id'];
                    $event_id_t = $chota_t['event_id'];
                    $ticket_type = $chota_t['type'];
                    $ticket_amount = $chota_t['amount'];


                    if (isset($level[0]) && $level[0] == 7 && isset($level[1]) && $level[1] == $event_id_x && isset($level[2]) && $level[2] == $ticket_id && $registeredUser) {


                        //check wallet balance
                        $checkWalletBalance = mysqli_query($conn, "select user_wallet.id, user_wallet.user_id, user_wallet.amount, members.phone from user_wallet join members on user_wallet.user_id=members.user_id where phone='$phoneNumber'") or die(mysqli_error($conn));
                        if ($num_rows = mysqli_num_rows($checkWalletBalance) > 0) {
                            $fetchUser = mysqli_fetch_array($checkWalletBalance);
                            $balance = $fetchUser['amount'];
                            $user_id = $fetchUser['user_id'];

                        }

                        if ($balance < $ticket_amount) {
                            $response = "END You do not have sufficient funds in your wallet to proceed with this Request. Kindly top up and try! \n";
                        } else {

                            $date = date('Y-m-d');

                            $new_wallet_balance = ($balance - $ticket_amount);
                            $update_wallet_balance = mysqli_query($conn, "update user_wallet join members on user_wallet.user_id=members.user_id set amount = '$new_wallet_balance' where phone = '$phoneNumber'") or die(mysqli_error($conn));
                            // $update_renewal =  mysqli_query($conn, "update members set expiry_date = '$new_exp_date' where phone = '$phoneNumber' ") or die(mysqli_error($conn));
                            $insert = mysqli_query($conn, "insert into event_attendants(event_id, user_id, name, email, phone, amount, date, paid) values('$event_id_x', '$user_id', 'NAME', 'EMAIL', '$phoneNumber', '$ticket_amount', '$date', '1')") or die(mysqli_error($conn));
                            $update_tickets_bought = mysqli_query($conn, "insert into event_tickets_bought(event_id, user_id, ticket, price, qty, total) values('$event_id_x', '$user_id', '$ticket_type', '$ticket_amount', '1', '$ticket_amount')") or die(mysqli_error($conn));

                            $update_activity_table = mysqli_query($conn, "insert into activities(user_id, message, date) values('$user_id', 'USSD Party Ticket Purchase Ksh. $ticket_amount',  '$date')") or die(mysqli_error($conn));

                            $response = "END You have successfully purchased 1 $ticket_type Ticket @ Ksh.$ticket_amount! \n";


                        }


                    }

                }
            }


        }

        $count_x++;

    }


//End of checking events and various ticket types


    //End of Events


//Quiting the main menu
    if (isset($level[0]) && $level[0] == 8 && !isset($level[1]) && $registeredUser) { //

        $response = "END Thank you for accessing the WDM Portal. We look forward to our continued cooperation! \n";


    }
//End


    /******************
     *
     * USER REGISTRATION
     *
     * When a user select 1: *1#
     *******************/
    //enter first name level 1  *1*firstname#
    if (isset($level[0]) && $level[0] != '' && $level[0] == 1 && !isset($level[1]) && !$registeredUser) {

        $response = "CON Enter your first name";

    } //enter last name level 2  *1*firstname*Lastname#
    else if (isset($level[1]) && $level[1] != '' && !isset($level[2]) && $level[0] == 1 && !$registeredUser) {
        $response = "CON Enter your last name \n";

    } //level 3  *1*firstname*Lastname*nationalId#
    else if (isset($level[1]) && isset($level[2]) && $level[1] != '' && $level[2] != '' && !isset($level[3]) && $level[0] == 1 && !$registeredUser) {
        $response = "CON Enter your national ID number \n";

    } ////level 4  *1*firstname*Lastname*nationalId*email#
    else if (isset($level[1]) && isset($level[2]) && isset($level[3]) && $level[1] != '' && $level[2] != '' && $level[3] != '' && !isset($level[4]) && $level[0] == 1 && !$registeredUser) {
        $response = "CON Select your gender \n";
        $response .= "1. Male \n"; //3
        $response .= "2. Female \n";

    } //level 5  *1*firstname*Lastname*nationalId*email*Pin#
    else if (isset($level[1]) && isset($level[2]) && isset($level[3]) && isset($level[4]) && $level[1] != '' && $level[2] != '' && $level[3] != '' && $level[4] != '' && !isset($level[5]) && $level[0] == 1 && !$registeredUser) {
        $response = "CON Enter PIN for WDM portal. \n";

    } // SAVE REGISTRATION DETAILS
    else if (isset($level[5]) && $level[5] != '' && $level[0] == 1 && !$registeredUser) {
        //Save data to database
        $data = array(
            'phonenumber' => $phoneNumber,
            'first_name' => $level[1],
            'surname' => $level[2],
            'national_id' => $level[3]
        );

        $pwd = sha1($level[5]);
        $date = date('Y-m-d h:m:s');
        $m_user_id = md5($level[3]);

        $expiry_date2 = date_create("$date");
        date_add($expiry_date2, date_interval_create_from_date_string("365 days"));
        $expiry_date = date_format($expiry_date2, "Y-m-d");

        //Insert user details
        $gender = '';
        if ($level[4] == 1) {
            $level[4] = '1';
        }
        if ($level[4] == 2) {
            $level[4] = '2';
        }


        $insert = mysqli_query($conn, "insert into members(user_id, fname, other_names, doc_no, doc_type, status, ussd_password, password, phone, sex, ussd_active_status, ussd_verified_status, date, expiry_date, member_type, web_verified)
     values('$m_user_id', '$level[1]', '$level[2]', '$level[3]', '1', '1', '$pwd', '$pwd', '$phoneNumber', '$level[4]', '1', '0', '$date', '$expiry_date', '1', '1' )") or die(mysqli_error($conn));


        // create wallet
        $insert = mysqli_query($conn, "insert into user_wallet(user_id, amount) values('$m_user_id', '0')") or die(mysqli_error($conn));

        //We end the session using the keyword END.

        $response = "END Thank you $level[1] $level[2] for registering with the WDM Party. Please proceed to members.wdm.co.ke to update your profile. Welcome!";
    }


    /******************
     *
     * My Wallet
     *
     * When a user select 1:
     *1#
     *******************/

    if (isset($level[0]) && $level[0] == 1 && !isset($level[1]) && $registeredUser) { //

        $response = "CON My Wallet \n";
        $response .= "11. Check Wallet Balance \n";
        $response .= "12. Mini Statement \n";
        $response .= "13. Top Up \n";
        $response .= "14. Change PIN \n";
        $response .= "15. Forgot PIN \n";


    }

    //check balance *3*11#
    if ($registeredUser && isset($level[0]) && $level[0] == '1' && isset($level[1]) && $level[1] == 11 && !isset($level[2])) {

        $response = "CON My Wallet \n";
        $response .= "Please enter your PIN";

    }

    //check balance  *1*12#
    if ($registeredUser && isset($level[0]) && $level[0] == '1' && isset($level[1]) && $level[1] == 12 && !isset($level[2])) {

        $response = "CON My Wallet \n";
        $response .= "Please enter your PIN";

    }
    //Top Up instructions
    if ($registeredUser && isset($level[0]) && $level[0] == '1' && isset($level[1]) && $level[1] == 13 && !isset($level[2])) {

        $response = "END Go to your MPESA and select Lipa na M-Pesa. \n";
        $response .= "Choose Paybill. \n ";
        $response .= "Enter Business number: 264146. \n ";
        $response .= "Enter your National ID number as Account number. \n";
        $response .= "Enter the amount you want to Load. \n";
        $response .= "Confirm the details and click okay. \n";
    } //get ministatement   *1*12*PINENTERED#
    else if ($registeredUser && isset($level[2]) && $level[0] == 1 && $level[1] == 12 && !isset($level[3])) {
        $userPin = ($level['2']);
        $ENCuserPin = sha1($level['2']);
        $checkPin = mysqli_query($conn, "select * from members where phone='$phoneNumber' and ussd_password='$ENCuserPin' ") or die(mysqli_error($conn));

        $fetchUser = mysqli_fetch_array($checkPin);
        $idNumber = $fetchUser['doc_no'];

        $m_user_id = md5($idNumber);

        //if user pin correct

        if ($user_rows = mysqli_num_rows($checkPin) > 0) {
            $count = 1;
            $response = "END E-Wallet Mini-Statement : \n";
            $getStatement = mysqli_query($conn, "select wallet_top_ups.id, wallet_top_ups.user_id, wallet_top_ups.amount, wallet_top_ups.trans_type, wallet_top_ups.trans_id, wallet_top_ups.date, members.phone from wallet_top_ups JOIN members on wallet_top_ups.user_id = members.user_id  where phone='$phoneNumber' order by id desc LIMIT 4") or die(mysqli_error($conn));
            while ($fetchStatement = mysqli_fetch_array($getStatement)) {
                $service = $fetchStatement['trans_type'];
                $amount = $fetchStatement['amount'];
                $transDate = strtotime($fetchStatement['date']);
                $transDate = date('d M Y', $transDate);

                $response .= "$count $service - Ksh. $amount --> $transDate \n";
                $count++;
            }
        } else {
            $response = "END Incorrect PIN ";
        }
    } //get balance
    else if ($registeredUser && isset($level[2]) && $level[2] != '' && $level[1] == 11 && !isset($level[3])) {
        $userPin = ($level['2']);
        $ENCuserPin = sha1($level['2']);
        $checkPin = mysqli_query($conn, "select * from members where phone='$phoneNumber' and ussd_password='$ENCuserPin' ") or die(mysqli_error($conn));

        //if user pin correct
        if ($user_rows = mysqli_num_rows($checkPin) > 0) {
            $getBal = mysqli_query($conn, "select user_wallet.id, user_wallet.user_id, user_wallet.amount, members.phone from user_wallet join members on user_wallet.user_id = members.user_id where phone = '$phoneNumber' ") or die(mysqli_error($conn));
            $fetchBal = mysqli_fetch_array($getBal);
            $balance = $fetchBal['amount'];

            $response = "END Your wallet balance is Ksh. $balance ";
        } else {
            $response = "END Incorrect PIN ";
        }
    }


    // Change PIN
    if ($registeredUser && $level[0] == 1 && isset($level[1]) && $level[1] == 14 && !isset($level[2])) {
        //*1*14#
        $response = "CON Enter current WDM Portal PIN. \n";
    }
    if ($registeredUser && $level[0] == 1 && isset($level[1]) && $level[1] == 14 && isset($level[2]) && !isset($level[3])) {
        //*1*14*currentPassword#
        $userPin = ($level['2']);
        $ENCuserPin = sha1($level['2']);
        $checkPin = mysqli_query($conn, "select * from members where phone='$phoneNumber' and ussd_password='$ENCuserPin' ") or die(mysqli_error($conn));

        if ($user_rows = mysqli_num_rows($checkPin) > 0) {
            $response = "CON Enter new WDM Portal PIN. \n";
        } else {
            $response = "END Incorrect PIN ";
        }
    }
    if ($registeredUser && $level[0] == 1 && isset($level[1]) && $level[1] == 14 && isset($level[2]) && isset($level[3]) && !isset($level[4])) {
        //*1*14*currentPassword*newPassword#
        $userPin = ($level['2']);
        $ENCuserPin = sha1($level['2']);
        $checkPin = mysqli_query($conn, "select * from members where phone='$phoneNumber' and ussd_password='$ENCuserPin' ") or die(mysqli_error($conn));

        if ($user_rows = mysqli_num_rows($checkPin) > 0) {


            $response = "CON Confirm new WDM Portal PIN. \n";
        } else {
            $response = "END Incorrect current PIN ";
        }
    }
    if ($registeredUser && $level[0] == 1 && isset($level[1]) && $level[1] == 14 && isset($level[2]) && isset($level[3]) && isset($level[4]) && !isset($level[5])) {
        //*1*14*currentPassword*newPassword*confirmPwsd#
        $userPin = ($level['2']);
        $ENCuserPin = sha1($level['2']);
        $checkPin = mysqli_query($conn, "select * from members where phone='$phoneNumber' and ussd_password='$ENCuserPin' ") or die(mysqli_error($conn));

        if ($user_rows = mysqli_num_rows($checkPin) > 0) {

            if ($level[3] == $level[4]) {
                $NEWCuserPin = sha1($level[3]);
                $checkPin = mysqli_query($conn, "UPDATE members SET ussd_password='$NEWCuserPin' where phone='$phoneNumber' and ussd_password='$ENCuserPin' ") or die(mysqli_error($conn));
                if ($checkPin) {
                    $response = "END PIN changed successfully ";
                } else {
                    $response = "END Error in changing the PIN, please try again after two minutes";
                }
            } else {
                $response = "END New PIN doesn't match. \n";
            }
        } else {
            $response = "END Incorrect current PIN ";
        }
    }


    // Forgot PIN
    if ($registeredUser && isset($level[1]) && $level[0] == '1' && $level[1] == 15 && !isset($level[2])) {
        //*1*14#
        $response = "CON Enter your national ID number \n";
    }
    if ($registeredUser && isset($level[2]) && $level[0] == '1' && $level[1] == 15 && isset($level[2]) && !isset($level[3])) {
        //*1*14*currentPassword#
        $useId = filter_var($level['2'], FILTER_SANITIZE_STRING);
        $checkPin = mysqli_query($conn, "select * from members where phone='$phoneNumber' and doc_no='$useId' ") or die(mysqli_error($conn));

        if ($user_rows = mysqli_num_rows($checkPin) > 0) {
            $response = "CON Enter new WDM Portal PIN. \n";
        } else {
            $response = "END Incorrect national Id number ";
        }
    }
    if ($registeredUser && isset($level[3]) && $level[0] == '1' && $level[1] == 15 && isset($level[2]) && isset($level[3]) && !isset($level[4])) {
        //*1*14*IdNumber*newPassword#
        $useId = filter_var($level['2'], FILTER_SANITIZE_STRING);
        $checkPin = mysqli_query($conn, "select * from members where phone='$phoneNumber' and doc_no='$useId' ") or die(mysqli_error($conn));

        if ($user_rows = mysqli_num_rows($checkPin) > 0) {


            $response = "CON Confirm new WDM Portal PIN. \n";
        } else {
            $response = "END Incorrect national Id number ";
        }
    }
    if ($registeredUser && isset($level[4]) && $level[0] == '1' && $level[1] == 15 && isset($level[2]) && isset($level[3]) && isset($level[4]) && !isset($level[5])) {
        //*1*14*IdNumber*newPassword*confirmPwsd#
        $useId = filter_var($level['2'], FILTER_SANITIZE_STRING);
        $checkPin = mysqli_query($conn, "select * from members where phone='$phoneNumber' and doc_no='$useId' ") or die(mysqli_error($conn));

        if ($user_rows = mysqli_num_rows($checkPin) > 0) {

            if ($level[3] == $level[4]) {
                $NEWCuserPin = sha1($level[3]);
                $checkPin = mysqli_query($conn, "UPDATE members SET ussd_password='$NEWCuserPin' where phone='$phoneNumber' and doc_no='$useId' ") or die(mysqli_error($conn));
                if ($checkPin) {
                    $response = "END PIN updated successfully ";
                } else {
                    $response = "END Error in changing the PIN, please try again after two minutes";
                }
            } else {
                $response = "END New PIN doesn't match. \n";
            }
        } else {
            $response = "END Incorrect national Id number ";
        }
    }


    //End My Wallet

}    // FOR ISSET($TEXT)

// Print the response onto the page so that our gateway can read it
header('Content-type: text/plain');
echo $response;
// DONE!!!
?>