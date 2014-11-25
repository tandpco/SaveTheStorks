$ ->
  postToFacebook = (options) ->
    # calling the API ...
    callback = (response) ->
      console.log response
    obj =
      method: "feed"
      # redirect_uri: window.location.href
      link: options.link
      description: options.message

    obj.actions = options.actions  unless options.actions is `undefined`
    obj.name = options.name  unless options.name is `undefined`
    obj.ref = options.ref  unless options.ref is `undefined`
    obj.picture = options.photo  unless options.photo is `undefined`
    FB.ui obj, callback
    return
  $("a.social-button.twitter, a[rel=twitter-share]").click ->
    if not $(this).data("message")
      message = encodeURIComponent($("title").text())
    else
      message = encodeURIComponent($(this).data("message"))
    link = encodeURIComponent((if $(this).data("link") then $(this).data("link") else (if window.location.search || !window.$memberId then window.location.href else window.location.href+'?_m='+window.$memberId)))
    left = (screen.width / 2) - (550 / 2)
    top = (screen.height / 2) - (450 / 2)
    window.open "https://twitter.com/share?url=" + link + "&text=" + message, "twittershare", "menubar=0,resizable=1,width=550,height=450,scrollbars=0,location=0,directories=0,toolbar=0,top=" + top + ",left=" + left
    false

  $("a.social-button.gplus, a[rel=gplus-share]").click ->
    link = encodeURIComponent((if $(this).data("link") then $(this).data("link") else window.location.href))
    left = (screen.width / 2) - (550 / 2)
    top = (screen.height / 2) - (450 / 2)
    window.open "https://plus.google.com/share?url=" + link, "twittershare", "menubar=0,resizable=1,width=550,height=450,scrollbars=0,location=0,directories=0,toolbar=0,top=" + top + ",left=" + left
    false

  $("a.social-button.facebook, a[rel=facebook-share]").click ->
    options = {}
    options.message = ($(this).data("message"))
    options.link = ((if $(this).data("link") then $(this).data("link") else (if window.location.search || !window.$memberId then window.location.href else window.location.href+'?_m='+window.$memberId)))
    options.photo = $(this).data("photo")  if $(this).data("photo")
    options.ref = $(this).data("ref")  if $(this).data("ref")
    options.name = $(this).data("name")  if $(this).data("name")
    options.actions = "[{'name':'" + $(this).data("action-name") + "','link':'" + ((if $(this).data("action-link") then $(this).data("action-link") else window.location.href)) + "'}]"  if $(this).data("action-name")
    postToFacebook options
    false

  $("span.numberBox").each ->
    $(this).click ->
      $(this).addClass "active"
      $(this).parent().siblings().find(".active").removeClass "active"
      return

    return

  $("span.numberBox").each ->
    $(this).click ->
      val = $(this).data("value")
      $("input[name=\"amount\"]").val val
      return

    return

  $("input[name=\"donationAmount\"]").on "keyup blur change focus", ->
    val = $(this).val()
    $("input[name=\"amount\"]").val val
    $("span.numberBox.active").each ->
        $(this).removeClass "active"
    return

  $(".tab").click ->
    $this = $(this)
    val = $this.data('target')
    $(this).siblings().removeClass "active"
    $(this).addClass "active"
    if $('#' + val).is(':visible')
      # Do nothing.
      console.log('Do Nothing.');
    else
      $("div.tab-content:visible").fadeOut "fast", ->
        $('#' + val).fadeIn("fast")
    return 

  # Sidebar Menu Variables
  toggle = document.getElementById('menuToggle');
  canvas = document.getElementById('canvas');

  # Toggle Nav Function
  toggleNav = ->
    $(toggle).find('i').toggleClass 'active'
    $(canvas).toggleClass 'show-nav'

    false

  # Strict Close Function
  close = ->
    $(toggle).find('i').removeClass 'active'
    $(canvas).removeClass 'show-nav'

    false

  # Toggle Nav Event
  $(toggle).click ->
    toggleNav();

  # Strict Close Event (Sidebar Button)
  $('.sideMenu span.close').click ->
    close();

  # Strict Close Event (Escape Key)
  $(document).keyup (e) ->
    if e.keyCode is 27
      close();

  # Strict Close Event (Document Click)
  $(document).click (e) ->
    className = $(e.target).attr('class');
    if className is 'show-nav'
      close();

  # Add .in to First Completed Project, First Answer in FAQ, First Question in FAQ
  $(window).on 'load', ->
    $('.project-tabs .tab:first-of-type').addClass 'in'
    $('.cities li:first-of-type').addClass 'active'

    $('#faq .question:first-of-type').addClass 'in'
    $('.faq li:first-of-type').addClass 'active'

    return

  $('span.image > img').click ->
    src = $(this).attr('src');
    $('input[name="fileUrl"]').val(src)

  # abso = ->
  #   $("header#home").css
  #     width: $(window).width()
  #     height: $(window).height()
  #   return

  resize = ->
    $(".image").each ->
      content = $(this).parent().find(".content");
      height = $(content).innerHeight();
      $(this).innerHeight(height)

  resize()
  # abso()

  $('ul.tabs li').click ->
    target = $(this).attr('data-target');
    $(this).addClass('active').siblings().removeClass('active');
    $('div.tab').removeClass('in');
    $(target).addClass('in');

    return

  $('ul.faq li').click ->
    target = $(this).attr('data-target');
    $(this).addClass('active').siblings().removeClass('active');
    $('div.question').removeClass('in');
    $(target).addClass('in');

    return

  $(window).resize ->
    resize()
    # abso()
    return

  $('.slider').each ->
    $(this).unslider
      fluid: true

  $('.unslider-arrow').click ->
    fn = @className.split(' ')[2]

    # console.log(fn);
  
    #  Either do unslider.data('unslider').next() or .prev() depending on the className
    $(this).parent().siblings().find('.slider').data('unslider')[fn]()
    return

  $('#video').click ->
    $('body').css
      'overflow': 'hidden'
    $('.modal').css
      'opacity': 1
      'height': 'auto'
      'z-index': 3
      'display': 'inline-block'
    $('.overlay').css
      'opacity': 1
      'height': 'auto'
      'z-index': 2
      'display': 'inline-block'
  $('.modal').click ->
    $('.overlay').css
      'opacity': 0
      'height': 'auto'
      'z-index': 0
      'display': 'none'
    $(this).css
      'opacity': 0
      'height': 'auto'
      'z-index': 0
      'display': 'none'
    $('body').css
      'overflow': 'visible'

  # Scripts for Donate Form Page
  frequency = 'month'
  campaignLevels = [
    {
      img: 'http://rainmakerapp.s3.amazonaws.com/storks/images/tier-2.png'
      level: 'Save A Stork'
      description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $30/month, you can save a mother from the grief and heartache of abortion.'
      gifts: ['Silver Stork Pendant', 'Two T-Shirts']
    },
    {
      img: 'http://rainmakerapp.s3.amazonaws.com/storks/images/tier-2.jpg'
      level: 'Save A Bundle'
      description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $60/month, you can save two mothers from the grief and heartache of abortion.'
      gifts: ['Silver Stork Pendant', 'Four T-Shirts']
    },
    {
      img: 'http://rainmakerapp.s3.amazonaws.com/storks/images/tier-3.jpg'
      level: 'Be a Superhero'
      description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $150/month, you can save five mothers from the grief and heartache of abortion.'
      gifts: ['Silver Stork Pendant', 'Four T-Shirts']
    },
    {
      img: 'http://rainmakerapp.s3.amazonaws.com/storks/images/tier-4.jpg'
      level: 'Save a Flock'
      description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $350/month, you can save twelve mothers from the grief and heartache of abortion.'
      gifts: ['Silver Stork Pendant', 'Four T-Shirts']
    }
  ]

  onChange = ->
    $('input[name="gift"]').change ->

      value = $(this).val()

      if value.indexOf('Four') > -1
        $('.sizes.two').fadeOut()
        $('.sizes.four').fadeIn()
      else if value.indexOf('Two') > -1
        $('.sizes.four').fadeOut()
        $('.sizes.two').fadeIn()
      else
        $('.sizes').fadeOut()

  getLevels = ->

    amount = $('.amount input').val()

    if (amount<=29)
      $('.campaign-level').fadeOut()
    else
      $('.campaign-level').fadeIn()

    # Tier 1
    if (amount>=30 && amount<=59)
      $('.level').text campaignLevels[0].level
      $('.description').text campaignLevels[0].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift"></div>')
      $('.img').html('<img src="' + campaignLevels[0].img + '" />')
      for gift in campaignLevels[0].gifts
        first = gift.split(' ')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first[0] + '></div>'

      onChange()

    # Tier 2
    else if (amount>=60 && amount<=149)
      $('.level').text campaignLevels[1].level
      $('.description').text campaignLevels[1].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift"></div>')
      $('.img').html('<img src="' + campaignLevels[1].img + '" />')
      for gift in campaignLevels[1].gifts
        first = gift.split(' ')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first[0] + '></div>'

      onChange()

    # Tier 3
    else if (amount>=150 && amount<=349)
      $('.level').text campaignLevels[2].level
      $('.description').text campaignLevels[2].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift"></div>')
      $('.img').html('<img src="' + campaignLevels[2].img + '" />')
      for gift in campaignLevels[2].gifts
        first = gift.split(' ')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first[0] + '></div>'

      onChange()

    # Tier 4
    else if (amount>=350)
      $('.level').text campaignLevels[3].level
      $('.description').text campaignLevels[3].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift"></div>')
      $('.img').html('<img src="' + campaignLevels[3].img + '" />')
      for gift in campaignLevels[3].gifts
        first = gift.split(' ')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first[0] + '></div>'

      onChange()

  $('.amount input').on 'keyup keydown keypress blur', ->
    $('.any').parent().addClass('active').parent().siblings('.toggle').find('.active').removeClass('active')
    getLevels()

  $('.amount-toggle').on 'click', ->
    monthly = $(this).data 'monthly'
    yearly = $(this).data 'yearly'

    if frequency == 'month'
      $('.amount input').val monthly
      getLevels()

    else
      $('.amount input').val yearly
      getLevels()

    $(this).toggleClass('active').parent().siblings('.toggle').find('.active').removeClass('active')

  $('.frequency').on 'click', ->
    frequency = $(this).data 'frequency'
    monthly = $(document).find('.amount-toggle.active').data 'monthly'
    yearly = $(document).find('.amount-toggle.active').data 'yearly'

    if frequency == 'month' 
      $('.amount input').val monthly

    else if frequency == 'year'
      $('.amount input').val yearly

    $(this).addClass('active').parent().siblings().find('.frequency').not($(this)).removeClass('active')
    return false

  $('a#donateModal').click ->
    frequency = $('.frequency.active').data 'frequency'
    if frequency == 'month'
      frequency = 'm'
    $rain
      action: 'donate'
      amount: $('.amount input').val()
      project: 249
      recurring: frequency
      lockamount: true
      message: 'Customize this message!'
    false


  return