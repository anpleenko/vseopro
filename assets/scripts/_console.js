const toConsole = (obj) => {
  if (obj.exp) {
    $('.console').append(`${obj.success}<br/>`);
    console.log(obj.success);
  } else {
    $('.console').append(`${obj.error}<br/>`);
    console.error(obj.error);
  }
};

toConsole({
  exp: $,
  error: 'Нет Jquery',
  success: 'Есть Jquery',
});

toConsole({
  exp: $('.seo-text').length,
  error: 'Нет SEO текста на странице',
  success: 'Есть SEO текст на странице',
});
