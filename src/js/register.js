var user = document.querySelector(".text");
var password = document.querySelector(".password");
var btn = document.querySelector(".btn");
console.log(btn);
btn.onclick = function() {
    var userVal = user.value;
    var passVal = password.value;
    ajax({
        url: "/api/register",
        type: "post",
        data: {
            user: userVal,
            pass: passVal
        },
        success: function(data) {
            if (data.code === 1) {
                location.href = "login.html";
            }

        }
    });
}