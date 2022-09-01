
<div class="row page-titles">
    <div class="col-md-8 align-self-center">
        <h3 class="bluwis-color">
           <b>
               <b>
                 <?php
                 $user=get_current_user_logged_in();
                 $role = get_role($user);
                 if($role==6){?>
                     Student Portal >>
               <?php }else if($role==2) {?>
                     HOD Portal >>
                  <?php }else if($role==7){?>
                     Finance Portal >>
                <?php }else if($role==8){?>
                     Library Portal >>
                 <?php }else if($role==10){?>
                     Records Portal >>
                 <?php }else if($role==11){?>
                   Registrar Portal >>
                   <?php } ?>

               </b>
           </b>
            &nbsp;
            <?php echo $page_info;?>
        </h3>
    </div>
    <div class="col-md-4">
       <h4 style="text-align: right;">
           <i class="fa fa-calendar"></i>
           &nbsp;
           <?php echo date_format(date_create(date('Y-m-d')), 'jS F, Y')?>
       </h4>
    </div>
</div>