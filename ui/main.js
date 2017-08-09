var button = document.getElementById('counter');
button.onclick = function() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.state == 200) {
                var count = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = count;
            }
        }
    };
    
    request.open('GET', 'http://chrishanthmathew91.imad.hasura-app.io/counter', true);
    request.send(null);
};
