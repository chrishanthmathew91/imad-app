console.log('Loaded!');

var element = document.getElementById('main-text');
element.innerHTML = 'New text';

var img = document.getElementById('madi');
img.onclick = function () {
    element.style.marginLeft = '100px';
}