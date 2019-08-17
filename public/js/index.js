var toPost = -1;

$.get("/get/user", function(res) {
  console.log(res);
  $("#name").text(res.name);
  toPost = res.id;
  next(res.id);
  next2(res.cat);
});

function next(id) {
  $.get("/api/User/" + id, function(res) {
    console.log(res);
    for (i = 0; i < res.length; i++) {
      var p = $("<p>").text(res[i].question);
      $("#display").append(p);
    }
  });
}

function next2(cat) {
  console.log(cat);
  $.get("/api/all/" + cat, function(res) {
    console.log(res);
    for (i = 0; i < res.length; i++) {
      if (res[i].UserId === parseInt(toPost)) {
        null;
      } else {
        var p = $("<p>").text(res[i].question);
        $("#otherQuestions").append(p);
      }
    }
  });
}
$("#sendQuestion").on("click", function() {
  console.log(toPost);
  var send = {
    question: $("#question").val(),
    UserID: toPost,
    cat: $("#cat").val()
  };

  $.post("/api/post", send, function(r) {
    if (r === "You have to select a category") {
      $("#err").text(r);
    }
  });
});

$("#change").on("click", function() {
  var catc = $("#catChange").val();
  if (catc !== "0") {
    $.ajax({
      url: "/change/" + catc,
      method: "PUT"
    }).then(function(back) {
      console.log(back);
    });
  } else {
    $("#err").text("Please select a category");
  }
});

$("#logout").on("click", function() {
  $.post("/logout/user", function() {
    window.location.href = "/login";
  });
});

$("#toProfile").on("click", function() {
  $("#otherSide").css("display", "none");
  $("#profile").css("display", "block");
});

$("#others").on("click", function() {
  $("#otherSide").css("display", "block");
  $("#profile").css("display", "none");
});

$.get("/question/errors", function(res) {
  console.log(res);
  $("#err").text(res);
});
