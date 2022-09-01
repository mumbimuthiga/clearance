<?php
/**
 * Imap Class
 * This class enables you to use the IMAP Protocol
 *
 * @package    CodeIgniter
 * @subpackage Libraries
 * @category   Email
 * @version    1.0.0-dev
 * @author     Natan Felles
 * @link       http://github.com/natanfelles/codeigniter-imap
 */

defined('BASEPATH') || exit('No direct script access allowed');

/**
 * Class Imap
 */
class Imap
{
    // Open IMAP connection

    function imap_open($host,$username, $password)
    {
        return imap_open($host, $username, $password);
    }

    // Find number of msg in mailbox

    function imap_num_msg($imap_connection)
    {
        return imap_num_msg($imap_connection);
    }

    // Find disk quota amount

    function imap_get_quota($imap_connection)
    {
        $storage = $quota['STORAGE']= imap_get_quotaroot($imap_connection, "INBOX");

        function kilobyte($filesize)
        {
            return round($filesize / 1024, 2) . ' Mb';
        }

        return kilobyte($storage['usage']) . ' / ' . kilobyte($storage['limit']) . ' (' . round($storage['usage'] / $storage['limit'] * 100, 2) . '%)';
    }

}
