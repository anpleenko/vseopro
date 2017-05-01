$(document).on(istouch, '.yamm .dropdown-menu', (e) => {
  e.stopPropagation();
});

$('.pages-menu__close').on('click', () => {
  $('.pages-menu').empty();
});

$('.console-close').on(istouch, () => {
  $('.console-wrap').remove();
});
