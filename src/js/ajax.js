function ajax(opt) {
    var json = opt || {};
    var url = json.url;
    if (!url) {
        return;
    }
    var type = json.type || 'get';
    var data = json.data || {};
    var async = json.async === false ? json.async : true;

    var arr = [];
    for (var i in data) {
        arr.push(i + '=' + data[i]);
    }
    var params = arr.join("&");

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft-XMLHTTP");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    typeof json.success === 'function' && json.success(JSON.parse(xhr.responseText));
                } catch (e) {
                    typeof json.success === 'function' && json.success(xhr.responseText);
                }
            }
        }
    }
    switch (type.toUpperCase()) {
        case "GET":
            url = json.data ? url + "?" + params : url;
            xhr.open(type, url, async);
            xhr.send();
            break;
        case "POST":
            xhr.open(type, url, async);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(params);
            break;
    }
}