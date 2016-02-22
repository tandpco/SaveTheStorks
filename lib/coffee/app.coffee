$ ->
  if typeof Handlebars != 'undefined'
    # Contact Server for Fundraisers
    Handlebars.registerHelper 'if', (conditional, options) ->
      if conditional
        return options.fn(this)
      return
    if window.location.pathname.indexOf('my-storks') > -1
      $.getJSON 'https://classy.org/api1/fundraisers?cid=20338&token=zayh1tViJegPhULThoB2&limit=0', (response) ->
        fundraisers = response.fundraisers
        i = 0
        template = Handlebars.compile $("#fundraiserTemplate").html()
        # $('.container').empty()
        while i < 4
          ext = if fundraisers[i].page_title.length > 16 then '...' else null
          fundraisers[i].progress = fundraisers[i].total_raised / fundraisers[i].goal * 100
          fundraisers[i].page_title = fundraisers[i].page_title.substr(0,24) + ext
          fundraisers[i].member_image_medium = if fundraisers[i].member_image_medium then fundraisers[i].member_image_medium else 'https://rainmakerapp.s3.amazonaws.com/storks/images/dummy/fundraiser-module-avatar-public.png'
          ctemplate = template fundraisers[i]
          $('.fundraisers-here').append ctemplate
          i++
      # for fundraiser in fundraisers
        # console.log fundraiser
  # $('span#amount').on 'focus click', ->
    # $(this).parents('h1').find('.blinking').remove()
  $('span#amount').on 'blur', ->
    # $(this).parents('h1').append('<span class="blinking">|</span>');
    text = $(this).text()
    if text.length <= 0
      $(this).text '50'

  $('.video a').on 'click', ->
    $rain
      action: 'donate'
      amount: $('#amount').text()
      # project: 249
      # recurring: 'm'
      # lockamount: true
      message: 'Thank you for your donation!'
    return false

  if typeof(Dragdealer) != 'undefined'
    new Dragdealer('slider', {
      steps: 12,
      snap: true,
      animationCallback: (x, y) ->
        pos = $('.red-bar').position().left
        len = $('#slider').width()
        $('.progress').css
          right: len - pos
      callback: (x, y) ->
        step = this.getStep()
        console.log step[0]
        $('.slider-section .amount span').text step[0] * 30
        $('.slider-section .lives').text step[0] * 20
    })

  $('.outdated-browser .close').on 'click', ->
    $('.outdated-browser').hide()

  $('.donation-module span').on 'click', ->
    amount = $(this).data 'amount'
    $(this).addClass('active').parent().siblings().find('.active').removeClass 'active'
    $('input[name="amount"]').val amount
  $('input[name="amount"]').on 'keydown keyup', ->
    $(this).parents('.donation-module').find('.active').removeClass 'active'

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

  $('.share').on 'click', ->
    $(this).siblings('.share-flyout').fadeToggle();
    return false

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

  $('form#apply').on "submit", ->
    message = ''
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

  # Gallery Script
  currentID = $('#lightbox').data 'id'

  $('.gallery-nav').on 'click', ->
    dir = this.className.split(' ')[1]
    if (dir == 'prev')
      currentID = (currentID - 1)
      $('[data-id="'+currentID+'"]').click()
    else if (dir == 'next')
      currentID = (currentID + 1)
      $('[data-id="'+currentID+'"]').click()

  $('.item').on 'click', ->
    item = $(this)
    if item.data('name') && item.data('src')
      name = item.data 'name'
      src  = item.data 'src'
      id   = item.data 'id'
      currentID = id
      if src.indexOf('jpg') > -1 or src.indexOf('png') > -1 or src.indexOf('gif') > -1 or src.indexOf('jpeg')> -1 or src.indexOf('resource') > -1
        $('.featured-media')
          .find('.item-container')
          .html('<img src="' + src + '" alt="' + name + '" />')
          .parents('.featured-media')
          .find('h2')
          .text(name)
        $('a.facebook-share').attr('href', 'https://www.facebook.com/dialog/feed?app_id=347159378788273&display=popup&href=http://www.savethestorks.com/gallery&redirect_uri=http://www.savethestorks.com/gallery&caption='+name+'&picture=https://7b7157f59fb5914df25d-83ec9bcc8970758aaa4b1923747e8d1b.ssl.cf1.rackcdn.com/' + src)
        $('a.twitter-share').attr('href', "http://twitter.com/home?status="+name+" - www.savethestorks.com/gallery?id=" + id)
        $('a.pinterest-share').attr('href', "http://pinterest.com/pin/create/button/?url=http://www.savethestorks.com/gallery?id="+id+"&amp;media=https://www.savethestorks.com/"+src+"&amp;description="+name)


    else if item.data 'video'
      name = item.data 'name'
      id   = item.data 'id'
      src = item.find('.video-source').html()
      currentID = id
      $('.featured-media')
        .find('.item-container')
        .html(src)
        .parents('.featured-media')
        .find('h2')
        .text(name)
      $('a.facebook-share').attr('href', 'https://www.facebook.com/dialog/feed?app_id=347159378788273&display=popup&href=http://www.savethestorks.com/gallery&redirect_uri=http://www.savethestorks.com/gallery&caption='+name+'&picture=https://7b7157f59fb5914df25d-83ec9bcc8970758aaa4b1923747e8d1b.ssl.cf1.rackcdn.com/' + src)
      $('a.twitter-share').attr('href', "http://twitter.com/home?status="+name+" - www.savethestorks.com/gallery?id=" + id)
    $('html,body').animate {scrollTop: $('#lightbox').offset().top}, 500
    return

  $(window).on "scroll", ->
    if (window.location.href.indexOf('/about') > -1)
      winTop = $(window).scrollTop()
      faqTop = $('#faq').offset()
      relTop = (winTop - faqTop.top)
      leftDist = $('.questions').offset()
      answers = $('.answers').width()
      qHeight = $('.questions').height()

      lPos = $('.question').offset().left
      tPos = $('.question').offset().top

      # console.log 'WinTop' + (winTop - $('.footer').offset().top), 'Questions Height' + (qHeight + 70)

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
    if e.target.id != 'search' && className != 'icon-search' && className != 'search' && className != 'search active'
      $('.search').removeClass 'active'

  $('.gift-handler').each ->
    $(this).on 'click', ->
      amnt      = $(this).data 'amount'
      freq      = $(this).data 'frequency'
      painting  = $(this).data 'painting'
      gift      = $(this).parents('.option').find('input[name="gift"]:checked').val()
      sizes     = $(this).parents('.option').find('.size')
      memo  = '\n'
      if $(this).parents('.option').find('input[name="gift"]:checked').val().indexOf('T-Shirts') > -1
        $(sizes).each (index) ->
          index = index + 1
          memo += 'Shirt ' + index + ': ' + $(this).find('select').val() + '\n'
        $rain
          action: 'donate'
          amount: amnt
          recurring: freq
          memo: "Painting: " + painting + ", Gift: " + gift + ", Options:\n" + memo
          lockamount: true
          message: 'Thank you for your donation!'
        false
      else
        $rain
          action: "donate"
          amount: amnt
          recurring: freq
          memo: "Painting: " + painting + ', Gift: ' + gift
          lockamount: true
        false
  $('.donation-handler').each ->
    $(this).on 'click', ->
      amnt  = $(this).data 'amount'
      freq  = $(this).data 'frequency'
      gift  = $(this).parents('.option').find('input[name="gift"]:checked').val()
      sizes = $(this).parents('.option').find('.size')
      memo  = '\n'
      if $(this).parents('.option').find('input[name="gift"]:checked').val().indexOf('T-Shirts') > -1
        $(sizes).each (index) ->
          index = index + 1
          memo += 'Shirt ' + index + ': ' + $(this).find('select').val() + '\n'
        $rain
          action: 'donate'
          amount: amnt
          recurring: freq
          memo: "Gift: " + gift + "Options:\n" + memo
          # project: '249'
          lockamount: true
          message: 'Thank you for your donation!'
        false
      else
        $rain
          action: 'donate'
          amount: amnt
          recurring: freq
          memo: "Gift: " + gift
          # project: '249'
          lockamount: true
          message: 'Thank you for your donation!'
        false
  $('.donation-handler-no-gift').each ->
    $(this).on 'click', ->
      amnt  = $(this).data 'amount'
      freq  = $(this).data 'frequency'
      # gift  = $(this).parents('.option').find('input[name="gift"]:checked').val()
      # sizes = $(this).parents('.option').find('.size')
      # memo  = '\n'  
      $rain
        action: 'donate'
        amount: amnt
        recurring: freq
        lockamount: true
        message: 'Thank you for your donation!'
      false

  $('input[name="gift"]').on 'change', ->
    if $(this).val().indexOf('T-Shirts') > -1
      $(this).parents('.option').addClass('show-sizing');
    else
      if $(this).parents('.option').hasClass('show-sizing')
        $(this).parents('.option').removeClass('show-sizing')

  $('.donation-widget span.amount').on 'click', ->
    $(this).addClass('active').parents('.col').siblings().find('.active').removeClass 'active'
    $('.donation-widget input').val('')

  $('.donation-widget input').on 'keyup keydown', ->
    $('span.amount.active').removeClass 'active'

  $('.custom-amount-handler').on 'click', ->
    if $('.donation-widget input').val() != ''
      amnt = $('.donation-widget input').val()
      freq = $('.donation-widget select').val()
      $rain
        action: 'donate'
        amount: amnt
        recurring: freq
        memo: "Gift: Declined Gift"
        # project: '249'
        lockamount: true
        message: 'Thank you for your donation!'
    else
      amnt = $('.donation-widget span.active').data 'amount'
      freq = $('.donation-widget select').val()
      $rain
        action: 'donate'
        amount: amnt
        recurring: freq
        memo: "Gift: Declined Gift"
        # project: '249'
        lockamount: true
        message: 'Thank you for your donation!'
    return

  $('.city-bar__list li').on 'click', ->
    target = $(this).data 'target'
    $(this).find('.thumbnail').addClass('active').parents('li').siblings('li').find('.active').removeClass('active')
    $(target).addClass('in').siblings().removeClass 'in'
    
  $('.city-bar__list .thumbnail').on 'click', ->
    $('html,body').animate { scrollTop: $('.city-bar').offset().top }, 500
    console.log 'Why the fuck isn\'t it scrolling...'
    return

  $('#explore-map').on 'click', ->
    $('header .map-overlay').fadeOut()
    $('header .container-fluid').css {
      'pointer-events': 'none',
      'background:', 'none'
    }
    $('header .content')
      .animate {
        top: '-500'
      }, 300
    $('#mapdiv').css {
      'z-index': 4
    }
    $('#menuToggle').addClass 'black'

  $('.banner-handler').on 'click', ->
    amnt = $(this).parent().find('input').val()
    $rain
      action: 'donate'
      amount: amnt
      lockamount: true
      message: 'Thank you for your donation!'
    false

  # Functions for Support Module
  $('button.help').on 'click', ->
    $('.support-wrapper').addClass 'active'
    width = $(this).width()
    $(this).css
      width: width
      opacity: 0
    $(this).find('span').css
      visibility: 'hidden'
    $(this).animate
      height: 46
      width: 46
    , 300
    setTimeout($(this).css('zIndex': 0), 400)
    return

  $('button.close').on 'click', ->
    open = $('button.help')
    $('.support-wrapper').removeClass 'active'
    $(open).find('span').css
      visibility: 'visible'
    $(open).css
      height: 'auto'
      opacity: 1
      width: 'auto'
      zIndex: 2
    $('.support-module').removeClass 'posting'
    $('.support-module .content').html '<i class="fa fa-spin fa-spinner"></i>'
    $('textarea[name="message"]').each ->
      $(this).val ''
    return

  $('body').on 'click', ->
    open = $('button.help')
    $('.support-wrapper').removeClass 'active'
    $(open).find('span').css
      visibility: 'visible'
    $(open).css
      height: 'auto'
      opacity: 1
      width: 'auto'
      zIndex: 2
    $('.support-module').removeClass 'posting'
    $('.support-module .content').html '<i class="fa fa-spin fa-spinner"></i>'
    $('textarea[name="message"]').each ->
      $(this).val ''
    return

  $('.support-wrapper').on 'click', (e) ->
    e.stopPropagation()

  $('.tab-toggle').on 'click', ->
    target = $(this).attr('href').split('#')[1]
    $(this).addClass 'active'
    $(this).parents().siblings().find('.active').removeClass 'active'
    $('.form-' + target).addClass('active').siblings('.active').removeClass 'active'
    return false

  $('form.email').on 'submit', (e)->
    e.preventDefault()
    data = $(this).serialize()
    $('.support-module').addClass 'posting'
    $.post '/api/3.0/form-completions', data, ->
      $('.support-module .content').html '<h1>Thank You!</h1><p>Your message has been submitted<br>and we\'ll get back to you shortly.</p>'

  $('form.phone').on 'submit', (e)->
    e.preventDefault()
    name     = $(this).find('input[name="contact[firstName]"]').val() + ' ' + $(this).find('input[name="contact[lastName]"]').val()
    number   = $(this).find('input[name="contact[number]"]').val()
    email    = $(this).find('input[name="contact[email]"]').val()
    message  = $(this).find('textarea[name="message"]').val()
    message += '\nNumber: ' + number
    data     = {contact: {name: name, email: email, number: number}, message: message}
    $('.support-module').addClass 'posting'
    $.post '/api/3.0/form-completions', data, ->
      $('.support-module .content').html '<h1>Thank You!</h1><p>Your message has been submitted<br>and we\'ll get back to you shortly.</p>'

  elementHeights = $('.info').map(->
    $(this).height()
  ).get()
  maxHeight = Math.max.apply(null, elementHeights)
  $('.info').height maxHeight

  $('.custom-rain').on 'submit', (e)->
    $rain
      action: 'donate'
      amount: $('.custom-rain input[name="amount"]').val()
      recurring: $('.custom-rain input[name="recurring"]').val()
      group: $('.custom-rain input[name="group"]').val()
      lockamount: true
      message: 'Thank you for your donation!'
    e.preventDefault()
    return false

  $('#custom').on 'click', ->
    $('.custom-rain input[name="amount"]').prop('disabled', false).val('').focus()
  $('#once').on 'click', ->
    $('.custom-rain').hide()
    $(this).parents().find('.rain').show()
  $('#back').on 'click', ->
    $('.custom-rain').show()
    $(this).parents().find('.rain').hide()
    $('.rain').find('input[name=amount]').focus()

  $('input[name="gift"]').on 'change', ->
    if $(this).val().indexOf('Shirts') > -1
      $(this).parents('.rain').find('.module-sizes').addClass 'show'
      $('html,body').animate({scrollTop: $('#sizing-anchor').offset().top}, 300);
    else
      $(this).parents('.rain').find('.module-sizes').removeClass 'show'

  $('.donate-now').on 'click', ->
    $('html,body').animate({scrollTop: $('#sizing-anchor').offset().top}, 300);
    false

  $('.donation-module.rain').on 'submit', ->
    gift = $(this).find 'input[name="gift"]:checked'
    if $(gift).val().indexOf('Shirts') > -1
      console.log $(this).find('input[name="gift"]').val()
      memo = $(gift).val()
      i    = 1
      $(this).find('select').each ->
        memo += '\nShirt ' + i + ': ' + $(this).val()
        i = i+1
        return
      $(this).find('input[name="memo"]').val(memo)
    else
      $(this).find('input[name="memo"]').val($(gift).val())