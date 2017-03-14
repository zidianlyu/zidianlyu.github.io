// $('button').on('click', function (e) {
//     var offset = $(this).offset();
//     var x = e.pageX;
//     var y = e.pageY;
//     var $ripple = $('<span class="ripple"></span>');
//     $ripple.appendTo(this).css({
//         left: x - offset.left - $ripple.width() / 2,
//         top: y - offset.top - $ripple.height() / 2
//     });
// });
//
//
// $('body').on('click', function (e) {
//     var x = e.pageX;
//     var y = e.pageY;
//     var $ripple = $('<span class="ripple"></span>');
//     $ripple.appendTo(this).css({
//         left: x - $ripple.width() / 2,
//         top: y - $ripple.height() / 2
//     });
// });


var addRippleEffect = function (e) {
    var target = e.target;
    if (target.tagName.toLowerCase() !== 'a') return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    return false;
}

document.addEventListener('click', addRippleEffect, false);
