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

  $('form#create').on 'submit', ->
    month = $('#m').val()
    day = $('#d').val()
    year = $('#y').val()

    date = month + '/' + day + '/' + year
    $('input#date_until').val(date)
    

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

  # resize()
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

  # $(window).resize ->
    # resize()
    # abso()
    # return

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
  $('.modal.video').click ->
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
      img: '//rainmakerapp.s3.amazonaws.com/storks/images/tier-2.png'
      level: 'Save A Stork'
      description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $30/month, you can save a mother from the grief and heartache of abortion.'
      # gifts: ['Pendant', 'TwoShirts']
      gifts: ['Silver Stork Pendant', 'Two Shirts']
    },
    {
      img: '//rainmakerapp.s3.amazonaws.com/storks/images/tier-2.jpg'
      level: 'Save A Bundle'
      description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $60/month, you can save two mothers from the grief and heartache of abortion.'
      # gifts: ['Pendant', 'FourShirts']
      gifts: ['Silver Stork Pendant', 'Four Shirts']
    },
    {
      img: '//rainmakerapp.s3.amazonaws.com/storks/images/tier-4.jpg'
      level: 'Be a Superhero'
      description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $150/month, you can save five mothers from the grief and heartache of abortion.'
      # gifts: ['Pendant', 'FourShirts']
      gifts: ['Silver Stork Pendant', 'Four Shirts']
    },
    {
      img: '//rainmakerapp.s3.amazonaws.com/storks/images/tier-3.jpg'
      level: 'Save a Flock'
      description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $350/month, you can save twelve mothers from the grief and heartache of abortion.'
      # gifts: ['Pendant', 'FourShirts']
      gifts: ['Silver Stork Pendant', 'Four Shirts']
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

  oneTimeLevels = ->

    amount = $('.amount input').val()

    if (amount<=349)
      $('.campaign-level').fadeOut()
    else
      $('.campaign-level').fadeIn()

    # Tier 1
    if (amount>=350 && amount<=749)
      $('.level').text campaignLevels[0].level
      $('.description').text campaignLevels[0].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[0].img + '" />')
      for gift in campaignLevels[0].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 2
    else if (amount>=750 && amount<=1799)
      $('.level').text campaignLevels[1].level
      $('.description').text campaignLevels[1].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[1].img + '" />')
      for gift in campaignLevels[1].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value="' + first + '"></div>'

      onChange()

    # Tier 3
    else if (amount>=1800 && amount<=3199)
      $('.level').text campaignLevels[2].level
      $('.description').text campaignLevels[2].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[2].img + '" />')
      for gift in campaignLevels[2].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 4
    else if (amount>=3200)
      $('.level').text campaignLevels[3].level
      $('.description').text campaignLevels[3].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[3].img + '" />')
      for gift in campaignLevels[3].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

  frequencyChangeYearly = (val) ->

    if (val<=349)
      $('.campaign-level').fadeOut()
    else
      $('.campaign-level').fadeIn()

    # Tier 1
    if (val>=350 && val<=749)
      $('.level').text campaignLevels[0].level
      $('.description').text campaignLevels[0].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[0].img + '" />')
      for gift in campaignLevels[0].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 2
    else if (val>=750 && val<=1799)
      $('.level').text campaignLevels[1].level
      $('.description').text campaignLevels[1].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[1].img + '" />')
      for gift in campaignLevels[1].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value="' + first + '"></div>'

      onChange()

    # Tier 3
    else if (val>=1800 && val<=3199)
      $('.level').text campaignLevels[2].level
      $('.description').text campaignLevels[2].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[2].img + '" />')
      for gift in campaignLevels[2].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 4
    else if (val>=3200)
      $('.level').text campaignLevels[3].level
      $('.description').text campaignLevels[3].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[3].img + '" />')
      for gift in campaignLevels[3].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

  frequencyChangeMonthly = (val) ->

    if (val<=29)
      $('.campaign-level').fadeOut()
    else
      $('.campaign-level').fadeIn()

    # Tier 1
    if (val>=30 && val<=59)
      $('.level').text campaignLevels[0].level
      $('.description').text campaignLevels[0].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[0].img + '" />')
      for gift in campaignLevels[0].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 2
    else if (val>=60 && val<=149)
      $('.level').text campaignLevels[1].level
      $('.description').text campaignLevels[1].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[1].img + '" />')
      for gift in campaignLevels[1].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 3
    else if (val>=150 && val<=349)
      $('.level').text campaignLevels[2].level
      $('.description').text campaignLevels[2].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[2].img + '" />')
      for gift in campaignLevels[2].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 4
    else if (val>=350)
      $('.level').text campaignLevels[3].level
      $('.description').text campaignLevels[3].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[3].img + '" />')
      for gift in campaignLevels[3].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()




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
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[0].img + '" />')
      for gift in campaignLevels[0].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 2
    else if (amount>=60 && amount<=149)
      $('.level').text campaignLevels[1].level
      $('.description').text campaignLevels[1].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[1].img + '" />')
      for gift in campaignLevels[1].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 3
    else if (amount>=150 && amount<=349)
      $('.level').text campaignLevels[2].level
      $('.description').text campaignLevels[2].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[2].img + '" />')
      for gift in campaignLevels[2].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

    # Tier 4
    else if (amount>=350)
      $('.level').text campaignLevels[3].level
      $('.description').text campaignLevels[3].description
      $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>')
      $('.img').html('<img src="' + campaignLevels[3].img + '" />')
      for gift in campaignLevels[3].gifts
        first = gift.split(' ').join('-')
        $('.gifts').append '<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>'

      onChange()

  sizes = {
    'One': 'Small'
    'Two': 'Small'
    'Three': 'Small'
    'Four': 'Small'
  }
  $('.sizes select').each ->
    $(this).on "change", ->
      shirt = $(this).data("shirt")
      val = $(this).val()
      sizes[shirt] = val
      return

  $('.amount input').on 'keyup keydown keypress blur', ->
    $('.any').parent().addClass('active').parent().siblings('.toggle').find('.active').removeClass('active')
    frequency = $('.frequency.active').data 'frequency'
    console.log frequency
    if frequency == 'month'
      getLevels()
    else
      oneTimeLevels()

  $('.amount-toggle').on 'click', ->
    monthly = $(this).data 'monthly'
    yearly = $(this).data 'yearly'

    if frequency == 'month'
      $('.amount input').val monthly
      getLevels()

    else
      $('.amount input').val yearly
      oneTimeLevels()

    $(this).toggleClass('active').parent().siblings('.toggle').find('.active').removeClass('active')

  $('.frequency').on 'click', ->
    frequency = $(this).data 'frequency'
    monthly = $(document).find('.amount-toggle.active').data 'monthly'
    yearly = $(document).find('.amount-toggle.active').data 'yearly'

    $('input[name=gift][value=declineGift]').prop('checked', true);

    if frequency == 'month'
      if monthly
        $('.amount input').val monthly 
      val = $('.amount input').val()
      frequencyChangeMonthly(val)

    else if frequency == 'year'
      if yearly
        $('.amount input').val yearly
      val = $('.amount input').val()
      frequencyChangeYearly(val)

    $(this).addClass('active').parent().siblings().find('.frequency').not($(this)).removeClass('active')
    return false

  $('a#donateModal').click ->
    frequency = $('.frequency.active').data 'frequency'
    gift = $('input[name=gift]:checked').val()
    if frequency == 'month'
      frequency = 'm'
    $rain
      action: 'donate'
      amount: $('.amount input').val()
      # project: 249
      recurring: frequency
      memo: "Gift: " + gift + ((gift is "Two-Shirts" or gift is "Four-Shirts") and ", Shirt Sizes: " + JSON.stringify(sizes) or "")
      lockamount: true
      message: 'Thank you for your donation!'
    false

  $('.thanks').click ->  
    $(this).fadeOut() ->
      $('.overlay').css
        'opacity': 0
        'height': 'auto'
        'z-index': 0
        'display': 'none'
      $('.modal').css
        'opacity': 0
        'height': 'auto'
        'z-index': 0
        'display': 'none'

  $('.upload').on "click", ->
    $('.fundraiser-modal').fadeIn ->
      $('.fundraiser-modal .overlay').fadeIn()
      $('.fundraiser-modal .modal').fadeIn()
      return

  $('button#customPhoto').on "click", ->
    console.log('Setting preference...')
    $.ajax
      type: 'POST'
      url: '/api/3.0/contacts/me/'
      async: false,
      data: { prop: { 'prefer-facebook': 0 } },
      success: ->
        console.log('You now prefer to use your uploaded photo.');
        return;

  $('a.button.facebook').on "click", ->
    $.ajax
      type: 'POST'
      url: '/api/3.0/contacts/me/'
      async: false,
      data: { prop: { 'prefer-facebook': 1 } },
      success: ->
        # window.location = window.location;
        console.log('You now prefer to use your Facebook photo.');

  $('.fundraiser-modal .overlay').on "click", ->
    $('.fundraiser-modal').fadeOut()

  message = ''
  $('form#apply').on "submit", ->
    $('.form-group').each ->
      label = $(this).find('label').text()

      if $(this).find('input:checked').length > 0
        value = $(this).find('input:checked').val()
      else
        value = $(this).find('input').val()
      
      template = '<p><b>' + label + '</b><br>' + value + '</p>'

      message += template

    $('input[name=message]').val(message) 
    
    return

  window.setTimeout (->
    $('.thanks').fadeOut()
  ), 2000

  onChange()

  $.fn.isOnScreen = ->
    win = $(window)
    viewport =
      top: win.scrollTop()
      left: win.scrollLeft()

    viewport.right = viewport.left + win.width()
    viewport.bottom = viewport.top + win.height()
    bounds = @offset()
    bounds.right = bounds.left + @outerWidth()
    bounds.bottom = bounds.top + @outerHeight()
    not (viewport.right < bounds.left or viewport.left > bounds.right or viewport.bottom < bounds.top or viewport.top > bounds.bottom)
  $('a#upload').on "click", ->
    $('.upload-new').fadeIn();
    return
  $('span.close-upload').on "click", ->
    $('.upload-new').fadeOut();
    return
  $('form#conversation').on "submit", ->
    church = $('#church').val()
    position = $('#position').val()
    phone = $('#phone').val()
    strBuild = '<strong>Church:</strong> ' + church + '<br><strong>Position:</strong> ' + position + '<br><strong>Phone:</strong> ' + phone
    $('input[name=message]').val(strBuild)

  $(window).on "scroll", ->
    winTop = $(window).scrollTop()
    faqTop = $('#faq').offset()
    relTop = (winTop - faqTop.top)
    leftDist = $('.questions').offset()
    answers = $('.answers').width()
    qHeight = $('.questions').height()

    lPos = $('.question').offset().left
    tPos = $('.question').offset().top

    console.log 'WinTop' + (winTop - $('.footer').offset().top), 'Questions Height' + (qHeight + 70)

    if (Math.abs(winTop - $('.footer').offset().top)) <= (qHeight + 70)
      $('.questions').css
        "position": "absolute"
        "top": ($('.answers').height() - qHeight) + 30
        "left": (answers + 20)
    else if relTop >= -15
      $('.questions').css
        "position": "fixed"
        "top": 15
        "left": leftDist.left
        "width": answers  
    else
      $('.questions').css
        "position": "relative"
        "top": 0
        "left": 0

  $('#search').on "click", ->
    $('.search').addClass 'active'

  $('*').click (e) ->
    className = $(e.target).attr 'class'
    console.log className
    if e.target.id != 'search' && className != 'icon-search' && className != 'search' && className != 'search active'
      $('.search').removeClass 'active'

  return