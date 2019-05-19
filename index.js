function deleteRow(id){
	 var del_id = $(this).attr('id');
   $.ajax({
      type:'POST',
      url:'delete.php',
      data:'delete_id='+del_id,
      success:function(data) {
        if(data) { 
        	echo "sõnum edukalt kustutatud";
        } else { // Error }
      }
   });