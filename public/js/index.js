var toPost = -1;

$.get("/get/user", (res) => {
    console.log(res)
    $("#name").text(res.name);
    toPost = res.id
    next(res.id);
    next2(res.cat)
})

function next(id) {
    $.get(`/api/User/${id}`, (res) => {
        console.log(res)
        for (let k in res) {
            var p = $("<p>").text(res[k].question)
            $("#display").append(p);
        }
    })
}

function next2(cat){
    console.log(cat)
    $.get(`/api/all/${cat}`, (res) => {
        console.log(res)
        for (let i = 0; i < res.length; i++) {
            if (res[i].UserId == parseInt(toPost)){
                null
            } else {
            var p = $("<p>").text(res[i].question)
            $("#otherQuestions").append(p);
            }
        }
    })
}
$("#sendQuestion").on("click", () => {
    console.log(toPost)
    var send = {
        question: $("#question").val(),
        UserID: toPost,
        cat: $("#cat").val()
    }

    $.post("/api/post", send, (r) => {
        if(r == "You have to select a category"){
            $("#err").text(r);
        }
    })
})

$("#logout").on("click", () => {
    $.post("/logout/user", () => {
        window.location.href = "/login"
    })
})

$("#toProfile").on("click", () => {
    $("#otherSide").css("display", "none")
    $("#profile").css("display", "block")
})

$("#others").on("click", () => {
    $("#otherSide").css("display", "block")
    $("#profile").css("display", "none")
})

$.get("/question/errors", (res) => {
    console.log(res);
    $("#err").text(res);
})