<?php

function countMenuChildren($parent_submodule_id)
{
    $res =0;
    $ci = get_instance();
    $sql_query = "SELECT count(*) AS children FROM submodules WHERE parent_submodule_id ='$parent_submodule_id'AND status='1'  ORDER by menu_ordering ASC ";
    $query = $ci->db->query($sql_query);
    if ($query->num_rows() > 0)
    {
        //     echo E
        foreach ($query->result_array()  as $r)
        {
            $res = $r["children"];
        }
    }
    //   echo "
    return (int)$res;
}



function get_allowed_role_submodules($id_user, $menu_level="parent")
{
    /*
  * Get the allowed modules
  * */

    //echo "id_user: $id_user<br />";
    

    $role =  get_any_table_field("id_user" , $id_user,"role", "web_users");
    
    //echo "role: $role<br />";

    $submodules_accessible_field="submodules_accessible_ids";
    switch ($menu_level)
    {
        case "parent":
            $submodules_accessible_field = "submodules_accessible_ids";
             //echo "<strong>".$menu_level."</strong><br />";//

            break;
        case  "child":
            $submodules_accessible_field = "submodules_accessible_ids_children";
            //echo "<strong>--".$menu_level."</strong><br />";

            break;
        case "grand_child":
            $submodules_accessible_field = "submodules_accessible_ids_grandchildren";
            //echo "<strong>----".$menu_level."</strong><br />";//

            break;
        default:
            // do nothing
            break;
    }

    $submodules_accessible =  get_any_table_field("id" , $role,$submodules_accessible_field, "roles");
    //echo "<i>submodules accessible: ->".$submodules_accessible."</i><br />";
    return $submodules_accessible;
}

function do_parent_menu($module_id, $page= "")
{

    $ci = get_instance();
    $id_user = get_current_user_logged_in();
    $get_allowed_role_submodules_ids = get_allowed_role_submodules($id_user, "parent");
    $role_conditions = " AND id IN ($get_allowed_role_submodules_ids) ";
    //if ($get_allowed_role_submodules_ids =="ALL" || $get_allowed_role_submodules_ids)
    if ($get_allowed_role_submodules_ids =="ALL")
    {
        $role_conditions = "";
    }

    $sql_query = "SELECT * FROM submodules WHERE parent_submodule_id ='0' AND module_id = '$module_id' AND status='1' $role_conditions AND menu_level LIKE 'parent' ORDER by menu_ordering ASC ";

    // echo "<strong>".$sql_query."</strong>";//

    $query = $ci->db->query($sql_query)->result_array();

    foreach ($query as $r) {
        $the_page_link ="#";
        $parent_submodule_id = $r["id"];
        $page_link = $r["page_link"];
        //echo $page_link;
        if (strlen($page_link)< 3)
        {
            $the_page_link = "#";
        }
        else
        {
            $the_page_link = base_url($page_link);
        }
        // echo $the_page_link;
        ?>
        <li class="<?php echo($page == 'submit_complaint' ? 'active' : '') ?>">
            <a class="has-arrow waves-effect waves-dark" href="<?php echo $the_page_link; ?>"
               aria-expanded="false">
                <i class="<?php echo $r["icon"]; ?>"></i>
                <!--<i class="fa fa-file-text-o"></i>-->
                <span class="hide-menu">
                            <?php echo ucwords(strtolower($r["submodule_name"])); ?>
                        </span>
            </a>
            <!-- Child loops from within here -->
            <?php
            if (countMenuChildren($parent_submodule_id) > 0) {
                do_childmnenu($module_id, $parent_submodule_id, $page);
            }
            ?>
        </li>
        <?php
    }

}

function do_childmnenu($module_id, $parent_submodule_id, $page="")
{

    $id_user = get_current_user_logged_in();
    $allowed_role_submodules_ids = get_allowed_role_submodules($id_user, "child");

    $role_conditions = " AND id IN ($allowed_role_submodules_ids) ";
    if ($allowed_role_submodules_ids =="ALL")
    {
        $role_conditions = "";
    }

    $ci = get_instance();
    $sql_query = "SELECT * FROM submodules WHERE parent_submodule_id ='$parent_submodule_id' AND module_id='$module_id' $role_conditions AND status='1' ORDER by menu_ordering ASC ";
    $query = $ci->db->query($sql_query)->result_array();
      //echo "<strong>".$sql_query."</strong>";//

    ?>
    <ul aria-expanded="false" class="collapse">
        <?php
        foreach ($query as $r) {
            $parent_submodule_id_level2 = $r["id"];

            $the_page_link ="#";
            $parent_submodule_id = $r["id"];
            $page_link = $r["page_link"];
            //echo $page_link;


            if (strlen($page_link)< 3)
            {
                $the_page_link = "#";
            }
            else
            {
                $the_page_link = base_url($page_link);
            }
//
            ?>
            <li class="<?php echo($page == 'submit_complaint' || $page == 'manage_complaints' || $page == 'closed_complaints' ? 'active' : '') ?>" >
                <a class="has-arrow waves-effect waves-dark <?php echo($page == 'submit_complaint' || $page == 'manage_complaints' || $page == 'closed_complaints' ? 'active' : '') ?>"
                   href="<?php echo $the_page_link; ?>" aria-expanded="false">
                    <i class="<?php echo $r["icon"]; ?>"></i>
                    <span class="hide-menu">
                            <?php echo ucwords(strtolower($r["submodule_name"])); ?>
                        </span>
                </a>
                <!-- Child loops from within here -->
                <?php
                if (countMenuChildren($parent_submodule_id_level2) > 0) {
                    do_childmnenu_level2($module_id, $parent_submodule_id_level2, $page);
                }
                ?>
            </li>
            <?php
        }
        ?>
    </ul>
    <?php

}

function do_childmnenu_level2($module_id, $parent_submodule_id, $page="")
{

    $id_user = get_current_user_logged_in();
    $allowed_role_submodules_ids = get_allowed_role_submodules($id_user, "grand_child");



    $role_conditions = " AND id IN ($allowed_role_submodules_ids) ";
    if ($allowed_role_submodules_ids =="ALL")
    {
        $role_conditions = "";
    }

    $ci = get_instance();
    $sql_query = "SELECT * FROM submodules WHERE parent_submodule_id ='$parent_submodule_id' AND module_id='$module_id'  $role_conditions AND status='1' ORDER by menu_ordering ASC ";
    $query = $ci->db->query($sql_query)->result_array();

    //echo "<strong>".$sql_query."</strong>";//

    ?>
    <ul aria-expanded="false" class="collapse">
        <?php
        foreach ($query as $r) {

            $page_link = $r["page_link"];
            ?>

            <li class="<?php echo($page == 'submit_complaint' ? 'active' : '') ?>">
                <a class="waves-effect waves-dark" href="<?php echo base_url($page_link) ?>"
                   aria-expanded="false">
                    <i class="<?php echo $r["icon"]; ?>"></i>
                    <span class="hide-menu">
                            <?php echo ucwords(strtolower($r["submodule_name"])); ?>
                        </span>
                </a>
            </li>

            <?php
        }
        ?>
    </ul>

    <?php
}

?>