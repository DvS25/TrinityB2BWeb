$(document).ready(function(){
$(".search_toggle").click(function(){
$(".search_outer_toggle").slideToggle( "slow" );
});
$('#content select').customSelect();
<!--$('header').after('<div class="content_breadcum"> </div>'); -->
$('.write-review, .review-count').on('click', function() {
$('html, body').animate({scrollTop: $('#tabs_info').offset().top}, 'slow');
});
$("#wishlist-total").clone().appendTo(".mobile_header_top");
$("#cart").clone().appendTo(".mobile_header_top");
});
/*For Grid and List View Buttons*/
function gridlistactive(){
$('.btn-list-grid button').on('click', function() {
if($(this).hasClass('grid')) {
$('.btn-list-grid button').addClass('active');
$('.btn-list-grid button.list').removeClass('active');
}
else if($(this).hasClass('list')) {
$('.btn-list-grid button').addClass('active');
$('.btn-list-grid button.grid').removeClass('active');
}
});
}
$(document).ready(function(){gridlistactive()});
$(window).resize(function(){gridlistactive()});
/*For Back to Top button*/
$(document).ready(function(){
$("body").append("<a class='top_button' title='Back To Top' href=''>TOP</a>");
$(function () {
$(window).scroll(function () {
if ($(this).scrollTop() > 70) {
$('.top_button').fadeIn();
} else {
$('.top_button').fadeOut();
}
});
// scroll body to 0px on click
$('.top_button').click(function () {
$('body,html').animate({
scrollTop: 0
}, 800);
return false;
});
});
});
$(document).ready(function () {
// var $menu1 = $('#menu');
var $menu = $('.ochow-menu-item-toggle');
$('.ochow-menu-item-toggle').on('click', function () {
var $btn = $(this);
$menu
.find('.dropdown')
.removeClass('open')
.find('.ochow-open')
.removeClass('ochow-open')
.addClass('ochow-close');
if ($btn.hasClass('ochow-close')) {
$btn
.removeClass('ochow-close')
.addClass('ochow-open')
.parent()
.addClass('open')
} else {
$btn
.removeClass('ochow-open')
.addClass('ochow-close')
.parent()
.removeClass('open')
}
});
});