$(document).ready(function() {
  $(".add-icon").click(function() {
    $(".new-item").fadeIn(500);
  });

  (function() {
    const list = $("#list"),
      form = $("form"),
      item = $("#item");

    /* let thingsToDo = []; */
    let thingsToDo = [];

    $(function() {
      $("form").each(function() {
        $(this)
          .find("input")

          .keypress(function(e) {
            // Enter pressed?
            if (e.which == 10 || e.which == 13) {
              e.preventDefault();
              let value = $(this).val();
              if (thingsToDo == null) {
                // juhul kui array on tühi
                thingsToDo = new Array(
                  '<li class="item new"><input type="checkbox" class="checkbox">' +
                    value +
                    '<img class="close" src="assets/remove.svg">' +
                    "</li>"
                );
              } else {
                let push =
                  '<li class="item new"><input type="checkbox" class="checkbox">' +
                  value +
                  '<img class="close" src="assets/remove.svg">' +
                  "</li>";
                thingsToDo.push(push);
              }

              if (thingsToDo.length > 0) {
              } else {
              }
              /* thingsToDo.push(push); */
              store();
              this.value = "";
              getValues();
            }
          });
        $(this)
          .find("input[type=submit]")
          .hide();
      });
    });

    //click on li element

    list.click(function(ev) {
      if (ev.target.tagName === "LI") {
        $(ev.target).addClass("done");
        store();
      }
    });

    // kui vajutatakse close nupule
    list.click(function(e) {
      let target = e.target;
      if (target.className == "close") {
        let item = $(target)
          .parent("li")
          .wrap("<p />") // TEISITI EI SAA
          .parent()
          .html();
        // SAAB ELEMENDI INDEXI
        let index = thingsToDo.indexOf(item);

        // UNWRAPIB
        $(target)
          .parent("li")
          .unwrap();

        // eemaldab elemendi listist
        thingsToDo.splice(index, 1);
        store();
        getValues();
      }
      if (target.className == "checkbox") {
        let isChecked = $(target).attr("checked") ? true : false;
        if (isChecked) {
          // if the checkbox is checked
          $(target).removeAttr("checked");
          $(target)
            .parent()
            .removeClass("done")
            .addClass("new");
        } else {
          // if it's not checked
          $(target).attr("checked", "checked");
          $(target)
            .parent()
            .addClass("done")
            .removeClass("new");
        }
        let wholeList = $(target)
          .parents("ul")
          .html();

        thingsToDo.length = 0;
        thingsToDo.push(wholeList);

        store();
        getValues();
      }
    });

    const doneCat = $(".done-cat"),
      newCat = $(".new-cat"),
      allCat = $(".all-cat");

    doneCat.click(function() {
      // remove the active from others
      newCat.removeClass("active");
      allCat.removeClass("active");
      //hide new categories
      $(".new").hide();
      // show only done categories (if they're hidden)
      $(".done").show();
      // set the active class
      $(this).addClass("active");
    });

    newCat.click(function() {
      // remove the active from others
      doneCat.removeClass("active");
      allCat.removeClass("active");
      // hide done categories
      $(".done").hide();
      // show only new categories (if they're hidden)
      $(".new").show();
      // set the active class
      $(this).addClass("active");
    });

    allCat.click(function() {
      // remove the active from others
      newCat.removeClass("active");
      doneCat.removeClass("active");
      // set the active class
      $(this).addClass("active");
      // display all cats
      $(".item").show();
    });

    // stores data function
    function store() {
      localStorage.setItem("todoData", JSON.stringify(thingsToDo));
      /* localStorage.clear(); */
    }

    function getValues() {
      let storedValues = JSON.parse(localStorage.getItem("todoData"));
      thingsToDo = storedValues;
      let count = thingsToDo.length;

      if (!storedValues) {
      } else {
        list.html(storedValues);
      }
    }

    getValues();
  })();
});
