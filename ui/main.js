var button = document.getElementById('login_btn');
button.onclick = function() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log('User logged in');
                alert('Logged in successfully');
            } else if (request.stauts === 403) {
                alert('username/password is invalid');
            } else if (request.status === 500) {
                alert('Something went wrong on the server');
            }
        }
    };
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    console.log(username);
    console.log(password);
    request.open('POST', 'http://chrishanthmathew91.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};

var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                var jsonString = request.responseText;
                var objArray = JSON.parse(jsonString);
                var list = '';
                for (var i=0; i<objArray.length; i++) {
                    list += '<div><blockquote class="blockquote-reverse"><p>' + objArray[i].comment + '</p><footer>' + objArray[i].name + '</footer></blockquote></div>'
                }
                var commentList = document.getElementById('comment_list');
                commentList.innerHTML = list;
            }
        }
    };
    
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET', 'http://chrishanthmathew91.imad.hasura-app.io/submit-comment?comment=' + comment + '&name='+name, true);
    request.send(null);
};
