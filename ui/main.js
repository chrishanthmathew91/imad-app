var button = document.getElementById('counter');
var count = 0;
button.onclick = function() {
    
    count++;
    var span = document.getElementById('count');
    span.innerHTML = count;
    
};
