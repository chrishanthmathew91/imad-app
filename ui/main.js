var button = document.getElementById('counter');
button.onclick = function() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                var count = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = count;
            }
        }
    };
    
    request.open('GET', 'http://chrishanthmathew91.imad.hasura-app.io/counter', true);
    request.send(null);
};

var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for (var i=0; i<names.length; i++) {
                    list += '<li>' + names[i] + '</li>'
                }
                var nameList = document.getElementById('name_list');
                nameList.innerHTML = list;
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
