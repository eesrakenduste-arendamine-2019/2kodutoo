$(document).ready(function(){
  $('#importText').click(function(){
    $.get("text.txt", function(data, status){
      $('#data').html(data);
      alert(status);
    });
  });
});
