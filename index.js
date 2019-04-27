//jshint esversion:6

$(document).ready(function() {

  $(".taskform").fadeIn(600);
  $(".taskbox, .taskboxExpired, .taskboxToday").fadeIn(700);

  $("#display_area").animate({
    width: "80%"
  }, 600);

  $("#task").val("");
  $("#taskdate").val("");
  $("body").css("background-image", "url('images/" + Math.floor(Math.random() * 10) + ".jpg')");

  $("#submit_btn").on("click", function() {
    if ($("#task").val() != "") {

      let task = $("#task").val();
      let taskdate = $("#taskdate").val();
      $.ajax({
        url: "server.php",
        type: "POST",
        data: {
          "save": 1,
          "task": task,
          "taskdate": taskdate,
        },
        success: function(response) {
          $("#task").val("");
          $("#taskdate").val("");
          $("#display_area").append(response);
          $("body").fadeOut(500, function() {
            location.reload(true);
          });
        }
      });
    }
  });

  $("#search").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    $(".taskbox, .taskboxExpired, .taskboxToday").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  $(".delete, .edit").on("click", function() {
    $(this).parent().css("opacity", "0.85");
  });

  $(".delete").on("click", function() {
    let id = $(this).data("id");
    $clicked_btn = $(this);
    $.ajax({
      url: "server.php",
      type: "GET",
      data: {
        "delete": 1,
        "id": id,
      },
      success: function(response) {
        $clicked_btn.parent().fadeOut(500, function() {
          $clicked_btn.parent().remove();
        });
        $("#task").val("");
        $("#taskdate").val("");
      }
    });
  });

  let edit_id;
  let $edit_taskdate;
  $(".edit").on("click", function() {
    edit_id = $(this).data("id");
    $edit_taskdate = $(this).parent();

    let task = $(this).siblings(".tasktext").text();
    let taskdate = $(this).siblings(".taskdatetext").text();

    $("#task").val(task);
    $("#taskdate").val(taskdate);
    $("#submit_btn").hide();
    $("#update_btn").show();
  });

  $("#update_btn").on("click", function() {
    let id = edit_id;
    let task = $("#task").val();
    let taskdate = $("#taskdate").val();
    $.ajax({
      url: "server.php",
      type: "POST",
      data: {
        "update": 1,
        "id": id,
        "task": task,
        "taskdate": taskdate,
      },
      success: function(response) {
        $("#task").val("");
        $("#taskdate").val("");
        $("#submit_btn").show();
        $("#update_btn").hide();
        $edit_taskdate.replaceWith(response);
        $("body").fadeOut(500, function() {
          location.reload(true);
        });
      }
    });
  });
});
