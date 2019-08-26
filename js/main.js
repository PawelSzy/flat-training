$(document).ready(function(){
    $('.explore-link__outside_link').click(function() {
        $(this).children('.explore-link__inside-link').toggle();
    });
});