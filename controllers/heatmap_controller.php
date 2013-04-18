<?php
   session_start();
   require_once("../models/heatmap_model.php");
   
  /* Use GET or POST to drive the object, ignore COOKIES which is part of $_REQUEST, but we don't want to disable it. */
   $client = new Context(array_merge($_GET, $_POST));
   $client->saveData();
   
?>
