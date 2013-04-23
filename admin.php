<?php
 /* List of all the heatmaps.  Shift the array to remove the unix directories . and .. respectively */
   $request = array_merge($_GET, $_POST);

   if (isset($request['file'])) {
      echo file_get_contents("data/" . $request['file']);
   }
   else {
      $heatmap_list = scandir('data');
      array_shift($heatmap_list);
      array_shift($heatmap_list);
      echo json_encode($heatmap_list);
   }
?>
