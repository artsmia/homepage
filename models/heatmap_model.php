<?php
   class Context {
      private $requestType = null;

      public function __construct($request_type_id = 'default') {

         $keys = array_keys($request_type_id);
         $value = array_values($request_type_id);

         switch ($keys[0]) {
            case 'session':
               $this->requestType = new heatmapData($value[0]);
            break;
            default:
               echo "please enter an object id";
            break;
         }
      }

      public function saveData() {
         return $this->requestType->save_data();
      }
   }

   interface HeatmapRequest {
      function save_data();
   }

   class HeatmapData implements HeatmapRequest {

      protected static $heatmapData;

      function __construct($objectData) {
         $this->heatmapData = $objectData;
         return true;
      }

      function save_data() {
         error_log("saving");
         $file = dirname(__FILE__) . "/../data/session_" . date("Ymd")  . "_" . session_id() . "_heatmap.txt";
         file_put_contents("$file", $this->heatmapData);
         session_regenerate_id(true);
      }
   }

?>
