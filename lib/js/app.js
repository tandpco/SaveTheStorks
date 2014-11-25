(function() {
  $(function() {
    var campaignLevels, canvas, close, frequency, getLevels, onChange, postToFacebook, resize, toggle, toggleNav;
    postToFacebook = function(options) {
      var callback, obj;
      callback = function(response) {
        return console.log(response);
      };
      obj = {
        method: "feed",
        link: options.link,
        description: options.message
      };
      if (options.actions !== undefined) {
        obj.actions = options.actions;
      }
      if (options.name !== undefined) {
        obj.name = options.name;
      }
      if (options.ref !== undefined) {
        obj.ref = options.ref;
      }
      if (options.photo !== undefined) {
        obj.picture = options.photo;
      }
      FB.ui(obj, callback);
    };
    $("a.social-button.twitter, a[rel=twitter-share]").click(function() {
      var left, link, message, top;
      if (!$(this).data("message")) {
        message = encodeURIComponent($("title").text());
      } else {
        message = encodeURIComponent($(this).data("message"));
      }
      link = encodeURIComponent(($(this).data("link") ? $(this).data("link") : (window.location.search || !window.$memberId ? window.location.href : window.location.href + '?_m=' + window.$memberId)));
      left = (screen.width / 2) - (550 / 2);
      top = (screen.height / 2) - (450 / 2);
      window.open("https://twitter.com/share?url=" + link + "&text=" + message, "twittershare", "menubar=0,resizable=1,width=550,height=450,scrollbars=0,location=0,directories=0,toolbar=0,top=" + top + ",left=" + left);
      return false;
    });
    $("a.social-button.gplus, a[rel=gplus-share]").click(function() {
      var left, link, top;
      link = encodeURIComponent(($(this).data("link") ? $(this).data("link") : window.location.href));
      left = (screen.width / 2) - (550 / 2);
      top = (screen.height / 2) - (450 / 2);
      window.open("https://plus.google.com/share?url=" + link, "twittershare", "menubar=0,resizable=1,width=550,height=450,scrollbars=0,location=0,directories=0,toolbar=0,top=" + top + ",left=" + left);
      return false;
    });
    $("a.social-button.facebook, a[rel=facebook-share]").click(function() {
      var options;
      options = {};
      options.message = $(this).data("message");
      options.link = ($(this).data("link") ? $(this).data("link") : (window.location.search || !window.$memberId ? window.location.href : window.location.href + '?_m=' + window.$memberId));
      if ($(this).data("photo")) {
        options.photo = $(this).data("photo");
      }
      if ($(this).data("ref")) {
        options.ref = $(this).data("ref");
      }
      if ($(this).data("name")) {
        options.name = $(this).data("name");
      }
      if ($(this).data("action-name")) {
        options.actions = "[{'name':'" + $(this).data("action-name") + "','link':'" + ($(this).data("action-link") ? $(this).data("action-link") : window.location.href) + "'}]";
      }
      postToFacebook(options);
      return false;
    });
    $("span.numberBox").each(function() {
      $(this).click(function() {
        $(this).addClass("active");
        $(this).parent().siblings().find(".active").removeClass("active");
      });
    });
    $("span.numberBox").each(function() {
      $(this).click(function() {
        var val;
        val = $(this).data("value");
        $("input[name=\"amount\"]").val(val);
      });
    });
    $("input[name=\"donationAmount\"]").on("keyup blur change focus", function() {
      var val;
      val = $(this).val();
      $("input[name=\"amount\"]").val(val);
      $("span.numberBox.active").each(function() {
        return $(this).removeClass("active");
      });
    });
    $(".tab").click(function() {
      var $this, val;
      $this = $(this);
      val = $this.data('target');
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      if ($('#' + val).is(':visible')) {
        console.log('Do Nothing.');
      } else {
        $("div.tab-content:visible").fadeOut("fast", function() {
          return $('#' + val).fadeIn("fast");
        });
      }
    });
    toggle = document.getElementById('menuToggle');
    canvas = document.getElementById('canvas');
    toggleNav = function() {
      $(toggle).find('i').toggleClass('active');
      $(canvas).toggleClass('show-nav');
      return false;
    };
    close = function() {
      $(toggle).find('i').removeClass('active');
      $(canvas).removeClass('show-nav');
      return false;
    };
    $(toggle).click(function() {
      return toggleNav();
    });
    $('.sideMenu span.close').click(function() {
      return close();
    });
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        return close();
      }
    });
    $(document).click(function(e) {
      var className;
      className = $(e.target).attr('class');
      if (className === 'show-nav') {
        return close();
      }
    });
    $(window).on('load', function() {
      $('.project-tabs .tab:first-of-type').addClass('in');
      $('.cities li:first-of-type').addClass('active');
      $('#faq .question:first-of-type').addClass('in');
      $('.faq li:first-of-type').addClass('active');
    });
    $('span.image > img').click(function() {
      var src;
      src = $(this).attr('src');
      return $('input[name="fileUrl"]').val(src);
    });
    resize = function() {
      return $(".image").each(function() {
        var content, height;
        content = $(this).parent().find(".content");
        height = $(content).innerHeight();
        return $(this).innerHeight(height);
      });
    };
    resize();
    $('ul.tabs li').click(function() {
      var target;
      target = $(this).attr('data-target');
      $(this).addClass('active').siblings().removeClass('active');
      $('div.tab').removeClass('in');
      $(target).addClass('in');
    });
    $('ul.faq li').click(function() {
      var target;
      target = $(this).attr('data-target');
      $(this).addClass('active').siblings().removeClass('active');
      $('div.question').removeClass('in');
      $(target).addClass('in');
    });
    $(window).resize(function() {
      resize();
    });
    $('.slider').each(function() {
      return $(this).unslider({
        fluid: true
      });
    });
    $('.unslider-arrow').click(function() {
      var fn;
      fn = this.className.split(' ')[2];
      $(this).parent().siblings().find('.slider').data('unslider')[fn]();
    });
    $('#video').click(function() {
      $('body').css({
        'overflow': 'hidden'
      });
      $('.modal').css({
        'opacity': 1,
        'height': 'auto',
        'z-index': 3,
        'display': 'inline-block'
      });
      return $('.overlay').css({
        'opacity': 1,
        'height': 'auto',
        'z-index': 2,
        'display': 'inline-block'
      });
    });
    $('.modal').click(function() {
      $('.overlay').css({
        'opacity': 0,
        'height': 'auto',
        'z-index': 0,
        'display': 'none'
      });
      $(this).css({
        'opacity': 0,
        'height': 'auto',
        'z-index': 0,
        'display': 'none'
      });
      return $('body').css({
        'overflow': 'visible'
      });
    });
    frequency = 'month';
    campaignLevels = [
      {
        img: 'http://rainmakerapp.s3.amazonaws.com/storks/images/tier-2.png',
        level: 'Save A Stork',
        description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $30/month, you can save a mother from the grief and heartache of abortion.',
        gifts: ['Silver Stork Pendant', 'Two T-Shirts']
      }, {
        img: 'http://rainmakerapp.s3.amazonaws.com/storks/images/tier-2.jpg',
        level: 'Save A Bundle',
        description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $60/month, you can save two mothers from the grief and heartache of abortion.',
        gifts: ['Silver Stork Pendant', 'Four T-Shirts']
      }, {
        img: 'http://rainmakerapp.s3.amazonaws.com/storks/images/tier-3.jpg',
        level: 'Be a Superhero',
        description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $150/month, you can save five mothers from the grief and heartache of abortion.',
        gifts: ['Silver Stork Pendant', 'Four T-Shirts']
      }, {
        img: 'http://rainmakerapp.s3.amazonaws.com/storks/images/tier-4.jpg',
        level: 'Save a Flock',
        description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $350/month, you can save twelve mothers from the grief and heartache of abortion.',
        gifts: ['Silver Stork Pendant', 'Four T-Shirts']
      }
    ];
    onChange = function() {
      return $('input[name="gift"]').change(function() {
        var value;
        value = $(this).val();
        if (value.indexOf('Four') > -1) {
          $('.sizes.two').fadeOut();
          return $('.sizes.four').fadeIn();
        } else if (value.indexOf('Two') > -1) {
          $('.sizes.four').fadeOut();
          return $('.sizes.two').fadeIn();
        } else {
          return $('.sizes').fadeOut();
        }
      });
    };
    getLevels = function() {
      var amount, first, gift, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
      amount = $('.amount input').val();
      if (amount <= 29) {
        $('.campaign-level').fadeOut();
      } else {
        $('.campaign-level').fadeIn();
      }
      if (amount >= 30 && amount <= 59) {
        $('.level').text(campaignLevels[0].level);
        $('.description').text(campaignLevels[0].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift"></div>');
        $('.img').html('<img src="' + campaignLevels[0].img + '" />');
        _ref = campaignLevels[0].gifts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          gift = _ref[_i];
          first = gift.split(' ');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first[0] + '></div>');
        }
        return onChange();
      } else if (amount >= 60 && amount <= 149) {
        $('.level').text(campaignLevels[1].level);
        $('.description').text(campaignLevels[1].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift"></div>');
        $('.img').html('<img src="' + campaignLevels[1].img + '" />');
        _ref1 = campaignLevels[1].gifts;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          gift = _ref1[_j];
          first = gift.split(' ');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first[0] + '></div>');
        }
        return onChange();
      } else if (amount >= 150 && amount <= 349) {
        $('.level').text(campaignLevels[2].level);
        $('.description').text(campaignLevels[2].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift"></div>');
        $('.img').html('<img src="' + campaignLevels[2].img + '" />');
        _ref2 = campaignLevels[2].gifts;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          gift = _ref2[_k];
          first = gift.split(' ');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first[0] + '></div>');
        }
        return onChange();
      } else if (amount >= 350) {
        $('.level').text(campaignLevels[3].level);
        $('.description').text(campaignLevels[3].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift"></div>');
        $('.img').html('<img src="' + campaignLevels[3].img + '" />');
        _ref3 = campaignLevels[3].gifts;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          gift = _ref3[_l];
          first = gift.split(' ');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first[0] + '></div>');
        }
        return onChange();
      }
    };
    $('.amount input').on('keyup keydown keypress blur', function() {
      $('.any').parent().addClass('active').parent().siblings('.toggle').find('.active').removeClass('active');
      return getLevels();
    });
    $('.amount-toggle').on('click', function() {
      var monthly, yearly;
      monthly = $(this).data('monthly');
      yearly = $(this).data('yearly');
      if (frequency === 'month') {
        $('.amount input').val(monthly);
        getLevels();
      } else {
        $('.amount input').val(yearly);
        getLevels();
      }
      return $(this).toggleClass('active').parent().siblings('.toggle').find('.active').removeClass('active');
    });
    $('.frequency').on('click', function() {
      var monthly, yearly;
      frequency = $(this).data('frequency');
      monthly = $(document).find('.amount-toggle.active').data('monthly');
      yearly = $(document).find('.amount-toggle.active').data('yearly');
      if (frequency === 'month') {
        $('.amount input').val(monthly);
      } else if (frequency === 'year') {
        $('.amount input').val(yearly);
      }
      $(this).addClass('active').parent().siblings().find('.frequency').not($(this)).removeClass('active');
      return false;
    });
    $('a#donateModal').click(function() {
      frequency = $('.frequency.active').data('frequency');
      if (frequency === 'month') {
        frequency = 'm';
      }
      $rain({
        action: 'donate',
        amount: $('.amount input').val(),
        project: 249,
        recurring: frequency,
        lockamount: true,
        message: 'Customize this message!'
      });
      return false;
    });
  });

}).call(this);
