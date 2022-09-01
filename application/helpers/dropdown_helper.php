<?php
/* File name: dropdown_helper.php
   Date Created: 2021-08-05
   Created by: Veronica Mumbi
   Email: veronicmuthiga@gmail.com
   Description: Creates dropdowns from within php functions
   */

function do_departments_drop_down($dropown_id, $dropdown_name,  $default_value="")
{
    $drop_down_query = "SELECT * FROM department ORDER BY id ASC";
    //  echo $drop_down_query."<br />";
    do_dropdown("Select Department",$dropown_id, $dropdown_name, "program_name", "program_name", $drop_down_query, $default_value,"");
}


//Terminals
function do_programs_drop_down($dropown_id, $dropdown_name,  $default_value="")
{
    $drop_down_query = "SELECT * FROM programs ORDER BY id ASC";
    //  echo $drop_down_query."<br />";
    do_dropdown("Select Program",$dropown_id, $dropdown_name, "program_name", "program_name", $drop_down_query, $default_value,"");
}




function do_dropdown($title, $dropown_id, $dropdown_name, $value_field, $display_field, $drop_down_query, $default_value="", $js_function="")
{
    /*
Description: Function to automatically generate a dropdown from a database query
Date Created: 2021-08-04
Created by: Lewis Munene
Email: lewismunenek@gmail.com
*/

    $ci = get_instance();

    $query = $ci->db->query($drop_down_query);
    //        echo "<p>".$drop_down_query."</p>";

    $result = $query->result_array();

    ?>
    <select class="form-control" id="<?php echo $dropown_id; ?>" name="<?php echo $dropdown_name; ?>" onchange="<?php echo $js_function; ?>">
        <option value="">---<?php echo $title; ?>---</option>
        <?php
        if(is_array($result))
        {
            foreach ($result as $r)
            {
                $selected ="";
                if ($r[$value_field]== $default_value)
                {
                    $selected  =  "SELECTED='SELECTED'";
                }
                ?>
                <option <?php echo $selected; ?>  value="<?php echo $r[$value_field]; ?>" ><?php echo $r[$display_field];?></option><?php
            }
        }
        ?>
    </select>
    <?php

}

function do_edit_dropdown($title, $dropown_id, $dropdown_name, $value_field, $display_field, $drop_down_query, $edit_value, $default_value="", $js_function="")
{
    /*
Description: Function to automatically generate a dropdown from a database query
Date Created: 2021-08-04
Created by: Lewis Munene
Email: lewismunenek@gmail.com
*/

    $ci = get_instance();

    $query = $ci->db->query($drop_down_query);
    //        echo "<p>".$drop_down_query."</p>";

    $result = $query->result_array();

    ?>
    <select class="form-control select2" id="<?php echo $dropown_id; ?>" name="<?php echo $dropdown_name; ?>" onchange="<?php echo $js_function; ?>">
        <option value="<?php echo $edit_value; ?>"><?php echo $edit_value; ?></option>
        <?php
        if(is_array($result))
        {
            foreach ($result as $r)
            {
                $selected ="";
                if ($r[$value_field]== $edit_value)
                {
                    $selected  =  "SELECTED='SELECTED'";
                }
                ?>
                <option <?php echo $selected; ?>  value="<?php echo $r[$value_field]; ?>" ><?php echo $r[$display_field];?></option><?php
            }
        }
        ?>
    </select>
    <?php

}




?>