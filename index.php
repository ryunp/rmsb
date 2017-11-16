<?php

$audioDir = 'audio';
$imageDir = 'images';

$audioLabelMap = get_audio_labels("audio_labels.json");
$audioFiles = scan_files($audioDir, "filter_audio");
$imageFiles = scan_files($imageDir, "filter_image");


function get_audio_labels($file) {

	$fileData = file_get_contents($file);
	$labelMap = json_decode($fileData);
	
	return $labelMap;
}


function filter_image($fileName) {

	return preg_match("/.+\.jpg$/i", $fileName);
}


function filter_audio($fileName) {

	return preg_match("/.+\.mp3$/i", $fileName);
}


function scan_files($dir, $filter) {

	$files = array_slice(scandir($dir), 2);
	$filtered = array_filter($files, $filter);

	$pathed = Array();
	foreach ($filtered as $file) {	
		$pathed[] = join_paths($dir, $file);
	}

	return $pathed;
}


function join_paths() {

    $paths = array();

    foreach (func_get_args() as $arg) {
        if ($arg !== '') { $paths[] = $arg; }
    }

    $path = preg_replace('#/+#','/', join('/', $paths));

    return $path;
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Rick & Morty Soundboard</title>
	<meta charset="UTF-8">
	<meta name="description" content="Grass tastes bad">
	<meta name="keywords" content="Soundboard, Rick and Morty">
	<meta name="author" content="ryunp">
	<link rel="shortcut icon" href="favicon.ico" />
		
	<script type="text/javascript" src="js/images.js"></script>
	<script type="text/javascript" src="js/audio.js"></script>
	<link rel="stylesheet" type="text/css" href="css/normalize.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<div id="imageDisplay" data-files="<?php echo join(",", $imageFiles); ?>">
		<div id="image"></div>
	</div>

	<div id="logDisplay">
		<div id="log"></div>
	</div>

	<div id="audioDisplay">
		<div id="audioContainer">
			<?php
				foreach ($audioFiles as $file) {

					$data = "data-file=\"{$file}\"";
					$fileName = basename($file);
					$text = ($audioLabelMap->$fileName) ? $audioLabelMap->$fileName : $fileName;
					$html = "<div class=\"audio\" {$data}>{$text}</div>";
					
					echo $html;
				}
			?>
		</div>
	</div>

	<script>
		initAudio();
		initImages();
	</script>
</body>
</html>