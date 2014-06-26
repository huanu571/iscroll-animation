void function ($, IScroll, undefined) {
  
  var iScroll = new IScroll('body', {
    bounce: false,
    momentum: false,
    mouseWheel: true,
    scrollX: false,
    scrollY: true,
    snap: 'section'
  })

  var scrollAnimationFunctions = []

  // Bind section size to body size
  void function (sizeFunc) {
    sizeFunc()
    $(window).resize(sizeFunc)
  } (function () {
    var $body = $('body')
    $('section')
      .width($body.width())
      .height($body.height())
    iScroll.refresh()
  })

  function pageIn(index) {
    var func = scrollAnimationFunctions[index]

    if (typeof func === 'function') {
      func()
      delete scrollAnimationFunctions[index]
    }
  }

  iScroll.on('scrollEnd', function () {
    pageIn(this.currentPage.pageY)
  })

  window.scrollAnimationFunctions = scrollAnimationFunctions

  $().ready(function () {
    pageIn(0)
  })

} (window.Zepto, window.IScroll)