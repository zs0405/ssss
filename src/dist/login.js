var user=document.querySelector(".text"),password=document.querySelector(".password"),btn=document.querySelector(".btn");btn.onclick=function(){var e=user.value,t=password.value;ajax({url:"/api/login",type:"post",data:{user:e,pass:t},success:function(e){1===e.code&&(location.href="detail.html")}})};