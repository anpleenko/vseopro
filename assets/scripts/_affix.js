const target = $('.nav-afix');
const startPosition = target.offset().top;

$(window).scroll(() => {
  if ($(window).scrollTop() >= startPosition) {
    if (!target.hasClass()) {
      target.addClass('affix');
    }
  } else {
    target.removeClass('affix');
  }
});
