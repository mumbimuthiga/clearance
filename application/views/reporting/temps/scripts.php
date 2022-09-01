</div>
</div>


<script src="<?php echo base_url() ?>assets/node_modules/jquery/jquery.min.js"></script>
<script src="<?php echo base_url() ?>assets/node_modules/bootstrap/js/popper.min.js"></script>
<script src="<?php echo base_url() ?>assets/node_modules/bootstrap/js/bootstrap.min.js"></script>
<script src="<?php echo base_url() ?>assets/node_modules/ps/perfect-scrollbar.jquery.min.js"></script>
<script src="<?php echo base_url() ?>assets/js/waves.js"></script>
<script src="<?php echo base_url() ?>assets/js/sidebarmenu.js"></script>
<script src="<?php echo base_url() ?>assets/node_modules/sticky-kit-master/dist/sticky-kit.min.js"></script>
<script src="<?php echo base_url() ?>assets/node_modules/sparkline/jquery.sparkline.min.js"></script>
<script src="<?php echo base_url() ?>assets/js/custom.min.js"></script>
<script src="<?php echo base_url() ?>assets/node_modules/moment/min/moment.min.js"></script>


<script src="<?php echo base_url()?>assets/node_modules/select2/dist/js/select2.full.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/node_modules/bootstrap-select/bootstrap-select.min.js" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo base_url()?>assets/node_modules/multiselect/js/jquery.multi-select.js"></script>

<script src="<?php echo base_url() ?>assets/node_modules/sweetalert/sweetalert.min.js"></script>
<script src="<?php echo base_url() ?>assets/node_modules/datatables/jquery.dataTables.min.js"></script>


<script src="https://cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
<!-- end - This is for export functionality only -->
<!--<script>
    $(function () {
        $('#myTable').DataTable({
            "order": [
                [0, 'desc']
            ]
        });
        $('#myTableAsc').DataTable({
            "order": [
                [5, 'asc']
            ]
        });
        $('#myTable2').DataTable({
            "order": [
                [1, 'desc']
            ]
        });
        $('#myTable3').DataTable({
            "order": [
                [1, 'desc']
            ]
        });
        $('#myTable4').DataTable({
            "order": [
                [1, 'desc']
            ]
        });
        var table = $('#example').DataTable({
            "columnDefs": [{
                "visible": false,
                "targets": 2
            }],
            "order": [
                [2, 'asc']
            ],
            "displayLength": 25,
            "drawCallback": function (settings) {
                var api = this.api();
                var rows = api.rows({
                    page: 'current'
                }).nodes();
                var last = null;
                api.column(2, {
                    page: 'current'
                }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before('<tr class="group"><td colspan="5">' + group + '</td></tr>');
                        last = group;
                    }
                });
            }
        });
        // Order by the grouping
        $('#example tbody').on('click', 'tr.group', function () {
            var currentOrder = table.order()[0];
            if (currentOrder[0] === 2 && currentOrder[1] === 'asc') {
                table.order([2, 'desc']).draw();
            } else {
                table.order([2, 'asc']).draw();
            }
        });

    });
    $('#example23').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
</script>-->

<script>
    $('#gownissued').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdf',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8]
                }
            },
            {
                extend: 'csv',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8]
                }

            },
            {
                extend: 'excel',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8]
                }
            },
            {
                extend: 'print',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8]
                }
            }
        ]
    });
</script>


<script>
    $('#returnedgowns').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdf',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8]
                }
            },
            {
                extend: 'csv',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8]
                }

            },
            {
                extend: 'excel',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8]
                }
            },
            {
                extend: 'print',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8]
                }
            }
        ]
    });
</script>


<script>
    $('#graduandsrpt').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdf',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6]
                }
            },
            {
                extend: 'csv',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6]
                }

            },
            {
                extend: 'excel',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6]
                }
            },
            {
                extend: 'print',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6]
                }
            }
        ]
    });
</script>


<script>
    $('#recordsrpt').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdf',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6]
                }
            },
            {
                extend: 'csv',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6]
                }

            },
            {
                extend: 'excel',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6]
                }
            },
            {
                extend: 'print',
                footer: true,
                exportOptions: {
                    columns: [0,1,2,3,4,5,6]
                }
            }
        ]
    });
</script>


<script src="<?php echo base_url() ?>assets/node_modules/icheck/icheck.min.js"></script>
<script src="<?php echo base_url() ?>assets/node_modules/icheck/icheck.init.js"></script>

<script src="<?php echo base_url() ?>assets/node_modules/styleswitcher/jQuery.style.switcher.js"></script>


<script src="<?php echo base_url('assets/amchart/amchart.js')?>"></script>
<script src="<?php echo base_url('assets/amchart/serial.js')?>"></script>
<script src="<?php echo base_url('assets/amchart/pie.js')?>"></script>
<script src="<?php echo base_url('assets/amchart/export.min.js')?>"></script>
<script src="<?php echo base_url('assets/amchart/light.js')?>"></script>

<script src="<?php echo base_url() ;?>assets/ui-date/ui.js"></script>
<script src="<?php echo base_url(); ?>assets/external/custom.js"></script>
<script src="<?php echo base_url(); ?>assets/external/printme.min.js"></script>
<script src="<?php echo base_url(); ?>assets/external/tinymce/tinymce.min.js"></script>

<script src="<?php echo base_url(); ?>assets/external/html2canvas.min.js"></script>
<script src="<?php echo base_url(); ?>assets/external/jspdf.min.js"></script>

<script type="text/javascript">
    function download_card(name)
    {
        html2canvas($('#members_card_body')[0],
            {
                onrendered:function(canvas)
                {

                    var img=canvas.toDataURL("image/png");
                    var doc = new jsPDF();
                    doc.addImage(img,'JPEG',20,20);
                    doc.save(name);
                }
            });

    }
</script>

<script>
    function download_card2(name) {
        var pdf = new jsPDF('p', 'pt', 'letter');

        source = $('#members_card_body')[0];

        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };
        margins = {
            top: 40,
            bottom: 40,
            left: 40,
            width: 522
        };
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {

                pdf.save(name);
            }, margins);
    }
</script>
<script>tinymce.init({selector:'#myTextarea',branding: false,});</script>
<script>tinymce.init({selector:'#anonTextarea',branding: false,});</script>
<script>tinymce.init({selector:'#the_content',branding: false,});</script>

</body>

</html>