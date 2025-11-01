var container = document.getElementById('mobile-modal-container');
var ignoreButton = document.getElementById('ignore-mobile');

ignoreButton.addEventListener('click', function(e) {
    container.style = 'display: none;';
    console.log('click');
});