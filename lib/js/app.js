(function() {
  $(function() {
    var campaignLevels, canvas, close, currentID, elementHeights, frequency, frequencyChangeMonthly, frequencyChangeYearly, getLevels, maxHeight, onChange, oneTimeLevels, postToFacebook, resize, sizes, toggle, toggleNav;
    if (typeof Handlebars !== 'undefined') {
      Handlebars.registerHelper('if', function(conditional, options) {
        if (conditional) {
          return options.fn(this);
        }
      });
      if (window.location.pathname.indexOf('my-storks') > -1) {
        $.getJSON('https://classy.org/api1/fundraisers?cid=20338&token=zayh1tViJegPhULThoB2&limit=0', function(response) {
          var ctemplate, ext, fundraisers, i, template, _results;
          fundraisers = response.fundraisers;
          i = 0;
          template = Handlebars.compile($("#fundraiserTemplate").html());
          _results = [];
          while (i < 4) {
            ext = fundraisers[i].page_title.length > 16 ? '...' : null;
            fundraisers[i].progress = fundraisers[i].total_raised / fundraisers[i].goal * 100;
            fundraisers[i].page_title = fundraisers[i].page_title.substr(0, 24) + ext;
            fundraisers[i].member_image_medium = fundraisers[i].member_image_medium ? fundraisers[i].member_image_medium : 'https://rainmakerapp.s3.amazonaws.com/storks/images/dummy/fundraiser-module-avatar-public.png';
            ctemplate = template(fundraisers[i]);
            $('.fundraisers-here').append(ctemplate);
            _results.push(i++);
          }
          return _results;
        });
      }
    }
    $('span#amount').on('blur', function() {
      var text;
      text = $(this).text();
      if (text.length <= 0) {
        return $(this).text('50');
      }
    });
    $('.video a').on('click', function() {
      $rain({
        action: 'donate',
        amount: $('#amount').text(),
        message: 'Thank you for your donation!'
      });
      return false;
    });
    if (typeof Dragdealer !== 'undefined') {
      new Dragdealer('slider', {
        steps: 12,
        snap: true,
        animationCallback: function(x, y) {
          var len, pos;
          pos = $('.red-bar').position().left;
          len = $('#slider').width();
          return $('.progress').css({
            right: len - pos
          });
        },
        callback: function(x, y) {
          var step;
          step = this.getStep();
          console.log(step[0]);
          $('.slider-section .amount span').text(step[0] * 30);
          return $('.slider-section .lives').text(step[0] * 20);
        }
      });
    }
    $('.outdated-browser .close').on('click', function() {
      return $('.outdated-browser').hide();
    });
    $('.donation-module span').on('click', function() {
      var amount;
      amount = $(this).data('amount');
      $(this).addClass('active').parent().siblings().find('.active').removeClass('active');
      return $('input[name="amount"]').val(amount);
    });
    $('input[name="amount"]').on('keydown keyup', function() {
      return $(this).parents('.donation-module').find('.active').removeClass('active');
    });
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
    $('form#create').on('submit', function() {
      var date, day, month, year;
      month = $('#m').val();
      day = $('#d').val();
      year = $('#y').val();
      date = month + '/' + day + '/' + year;
      return $('input#date_until').val(date);
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
    $('.modal.video').click(function() {
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
        img: '//rainmakerapp.s3.amazonaws.com/storks/images/tier-2.png',
        level: 'Save A Stork',
        description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $30/month, you can save a mother from the grief and heartache of abortion.',
        gifts: ['Silver Stork Pendant', 'Two Shirts']
      }, {
        img: '//rainmakerapp.s3.amazonaws.com/storks/images/tier-2.jpg',
        level: 'Save A Bundle',
        description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $60/month, you can save two mothers from the grief and heartache of abortion.',
        gifts: ['Silver Stork Pendant', 'Four Shirts']
      }, {
        img: '//rainmakerapp.s3.amazonaws.com/storks/images/tier-4.jpg',
        level: 'Be a Superhero',
        description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $150/month, you can save five mothers from the grief and heartache of abortion.',
        gifts: ['Silver Stork Pendant', 'Four Shirts']
      }, {
        img: '//rainmakerapp.s3.amazonaws.com/storks/images/tier-3.jpg',
        level: 'Save a Flock',
        description: 'We divided the cost of a Bus by the number of moms and children who could be saved in one year. It costs about $30/month to Save a Stork. By partnering with us at $350/month, you can save twelve mothers from the grief and heartache of abortion.',
        gifts: ['Silver Stork Pendant', 'Four Shirts']
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
    oneTimeLevels = function() {
      var amount, first, gift, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
      amount = $('.amount input').val();
      if (amount <= 349) {
        $('.campaign-level').fadeOut();
      } else {
        $('.campaign-level').fadeIn();
      }
      if (amount >= 350 && amount <= 749) {
        $('.level').text(campaignLevels[0].level);
        $('.description').text(campaignLevels[0].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[0].img + '" />');
        _ref = campaignLevels[0].gifts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          gift = _ref[_i];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (amount >= 750 && amount <= 1799) {
        $('.level').text(campaignLevels[1].level);
        $('.description').text(campaignLevels[1].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[1].img + '" />');
        _ref1 = campaignLevels[1].gifts;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          gift = _ref1[_j];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value="' + first + '"></div>');
        }
        return onChange();
      } else if (amount >= 1800 && amount <= 3199) {
        $('.level').text(campaignLevels[2].level);
        $('.description').text(campaignLevels[2].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[2].img + '" />');
        _ref2 = campaignLevels[2].gifts;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          gift = _ref2[_k];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (amount >= 3200) {
        $('.level').text(campaignLevels[3].level);
        $('.description').text(campaignLevels[3].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[3].img + '" />');
        _ref3 = campaignLevels[3].gifts;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          gift = _ref3[_l];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      }
    };
    frequencyChangeYearly = function(val) {
      var first, gift, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
      if (val <= 349) {
        $('.campaign-level').fadeOut();
      } else {
        $('.campaign-level').fadeIn();
      }
      if (val >= 350 && val <= 749) {
        $('.level').text(campaignLevels[0].level);
        $('.description').text(campaignLevels[0].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[0].img + '" />');
        _ref = campaignLevels[0].gifts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          gift = _ref[_i];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (val >= 750 && val <= 1799) {
        $('.level').text(campaignLevels[1].level);
        $('.description').text(campaignLevels[1].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[1].img + '" />');
        _ref1 = campaignLevels[1].gifts;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          gift = _ref1[_j];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value="' + first + '"></div>');
        }
        return onChange();
      } else if (val >= 1800 && val <= 3199) {
        $('.level').text(campaignLevels[2].level);
        $('.description').text(campaignLevels[2].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[2].img + '" />');
        _ref2 = campaignLevels[2].gifts;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          gift = _ref2[_k];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (val >= 3200) {
        $('.level').text(campaignLevels[3].level);
        $('.description').text(campaignLevels[3].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[3].img + '" />');
        _ref3 = campaignLevels[3].gifts;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          gift = _ref3[_l];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      }
    };
    frequencyChangeMonthly = function(val) {
      var first, gift, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
      if (val <= 29) {
        $('.campaign-level').fadeOut();
      } else {
        $('.campaign-level').fadeIn();
      }
      if (val >= 30 && val <= 59) {
        $('.level').text(campaignLevels[0].level);
        $('.description').text(campaignLevels[0].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[0].img + '" />');
        _ref = campaignLevels[0].gifts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          gift = _ref[_i];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (val >= 60 && val <= 149) {
        $('.level').text(campaignLevels[1].level);
        $('.description').text(campaignLevels[1].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[1].img + '" />');
        _ref1 = campaignLevels[1].gifts;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          gift = _ref1[_j];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (val >= 150 && val <= 349) {
        $('.level').text(campaignLevels[2].level);
        $('.description').text(campaignLevels[2].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[2].img + '" />');
        _ref2 = campaignLevels[2].gifts;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          gift = _ref2[_k];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (val >= 350) {
        $('.level').text(campaignLevels[3].level);
        $('.description').text(campaignLevels[3].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[3].img + '" />');
        _ref3 = campaignLevels[3].gifts;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          gift = _ref3[_l];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      }
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
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[0].img + '" />');
        _ref = campaignLevels[0].gifts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          gift = _ref[_i];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (amount >= 60 && amount <= 149) {
        $('.level').text(campaignLevels[1].level);
        $('.description').text(campaignLevels[1].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[1].img + '" />');
        _ref1 = campaignLevels[1].gifts;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          gift = _ref1[_j];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (amount >= 150 && amount <= 349) {
        $('.level').text(campaignLevels[2].level);
        $('.description').text(campaignLevels[2].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift" id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[2].img + '" />');
        _ref2 = campaignLevels[2].gifts;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          gift = _ref2[_k];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      } else if (amount >= 350) {
        $('.level').text(campaignLevels[3].level);
        $('.description').text(campaignLevels[3].description);
        $('.gifts').html('<div class="col width-33"><label for="declineGift">Decline Gift</label><input type="radio" name="gift"  id="declineGift" value="declineGift" class="gift" checked></div>');
        $('.img').html('<img src="' + campaignLevels[3].img + '" />');
        _ref3 = campaignLevels[3].gifts;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          gift = _ref3[_l];
          first = gift.split(' ').join('-');
          $('.gifts').append('<div class="col width-33"><label>' + gift + '</label><input type="radio" name="gift" class="gift" value=' + first + '></div>');
        }
        return onChange();
      }
    };
    sizes = {
      'One': 'Small',
      'Two': 'Small',
      'Three': 'Small',
      'Four': 'Small'
    };
    $('.sizes select').each(function() {
      return $(this).on("change", function() {
        var shirt, val;
        shirt = $(this).data("shirt");
        val = $(this).val();
        sizes[shirt] = val;
      });
    });
    $('.amount input').on('keyup keydown keypress blur', function() {
      $('.any').parent().addClass('active').parent().siblings('.toggle').find('.active').removeClass('active');
      frequency = $('.frequency.active').data('frequency');
      console.log(frequency);
      if (frequency === 'month') {
        return getLevels();
      } else {
        return oneTimeLevels();
      }
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
        oneTimeLevels();
      }
      return $(this).toggleClass('active').parent().siblings('.toggle').find('.active').removeClass('active');
    });
    $('.share').on('click', function() {
      $(this).siblings('.share-flyout').fadeToggle();
      return false;
    });
    $('.frequency').on('click', function() {
      var monthly, val, yearly;
      frequency = $(this).data('frequency');
      monthly = $(document).find('.amount-toggle.active').data('monthly');
      yearly = $(document).find('.amount-toggle.active').data('yearly');
      $('input[name=gift][value=declineGift]').prop('checked', true);
      if (frequency === 'month') {
        if (monthly) {
          $('.amount input').val(monthly);
        }
        val = $('.amount input').val();
        frequencyChangeMonthly(val);
      } else if (frequency === 'year') {
        if (yearly) {
          $('.amount input').val(yearly);
        }
        val = $('.amount input').val();
        frequencyChangeYearly(val);
      }
      $(this).addClass('active').parent().siblings().find('.frequency').not($(this)).removeClass('active');
      return false;
    });
    $('a#donateModal').click(function() {
      var gift;
      frequency = $('.frequency.active').data('frequency');
      gift = $('input[name=gift]:checked').val();
      if (frequency === 'month') {
        frequency = 'm';
      }
      $rain({
        action: 'donate',
        amount: $('.amount input').val(),
        recurring: frequency,
        memo: "Gift: " + gift + ((gift === "Two-Shirts" || gift === "Four-Shirts") && ", Shirt Sizes: " + JSON.stringify(sizes) || ""),
        lockamount: true,
        message: 'Thank you for your donation!'
      });
      return false;
    });
    $('.thanks').click(function() {
      return $(this).fadeOut()(function() {
        $('.overlay').css({
          'opacity': 0,
          'height': 'auto',
          'z-index': 0,
          'display': 'none'
        });
        return $('.modal').css({
          'opacity': 0,
          'height': 'auto',
          'z-index': 0,
          'display': 'none'
        });
      });
    });
    $('.upload').on("click", function() {
      return $('.fundraiser-modal').fadeIn(function() {
        $('.fundraiser-modal .overlay').fadeIn();
        $('.fundraiser-modal .modal').fadeIn();
      });
    });
    $('button#customPhoto').on("click", function() {
      console.log('Setting preference...');
      return $.ajax({
        type: 'POST',
        url: '/api/3.0/contacts/me/',
        async: false,
        data: {
          prop: {
            'prefer-facebook': 0
          }
        },
        success: function() {
          console.log('You now prefer to use your uploaded photo.');
        }
      });
    });
    $('a.button.facebook').on("click", function() {
      return $.ajax({
        type: 'POST',
        url: '/api/3.0/contacts/me/',
        async: false,
        data: {
          prop: {
            'prefer-facebook': 1
          }
        },
        success: function() {
          return console.log('You now prefer to use your Facebook photo.');
        }
      });
    });
    $('.fundraiser-modal .overlay').on("click", function() {
      return $('.fundraiser-modal').fadeOut();
    });
    $('form#apply').on("submit", function() {
      var message;
      message = '';
      $('.form-group').each(function() {
        var label, template, value;
        label = $(this).find('label').text();
        if ($(this).find('input:checked').length > 0) {
          value = $(this).find('input:checked').val();
        } else {
          value = $(this).find('input').val();
        }
        template = '<p><b>' + label + '</b><br>' + value + '</p>';
        return message += template;
      });
      $('input[name=message]').val(message);
    });
    window.setTimeout((function() {
      return $('.thanks').fadeOut();
    }), 2000);
    onChange();
    $.fn.isOnScreen = function() {
      var bounds, viewport, win;
      win = $(window);
      viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
      };
      viewport.right = viewport.left + win.width();
      viewport.bottom = viewport.top + win.height();
      bounds = this.offset();
      bounds.right = bounds.left + this.outerWidth();
      bounds.bottom = bounds.top + this.outerHeight();
      return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
    };
    $('a#upload').on("click", function() {
      $('.upload-new').fadeIn();
    });
    $('span.close-upload').on("click", function() {
      $('.upload-new').fadeOut();
    });
    $('form#conversation').on("submit", function() {
      var church, phone, position, strBuild;
      church = $('#church').val();
      position = $('#position').val();
      phone = $('#phone').val();
      strBuild = '<strong>Church:</strong> ' + church + '<br><strong>Position:</strong> ' + position + '<br><strong>Phone:</strong> ' + phone;
      return $('input[name=message]').val(strBuild);
    });
    currentID = $('#lightbox').data('id');
    $('.gallery-nav').on('click', function() {
      var dir;
      dir = this.className.split(' ')[1];
      if (dir === 'prev') {
        currentID = currentID - 1;
        return $('[data-id="' + currentID + '"]').click();
      } else if (dir === 'next') {
        currentID = currentID + 1;
        return $('[data-id="' + currentID + '"]').click();
      }
    });
    $('.item').on('click', function() {
      var id, item, name, src;
      item = $(this);
      if (item.data('name') && item.data('src')) {
        name = item.data('name');
        src = item.data('src');
        id = item.data('id');
        currentID = id;
        if (src.indexOf('jpg') > -1 || src.indexOf('png') > -1 || src.indexOf('gif') > -1 || src.indexOf('jpeg') > -1 || src.indexOf('resource') > -1) {
          $('.featured-media').find('.item-container').html('<img src="' + src + '" alt="' + name + '" />').parents('.featured-media').find('h2').text(name);
          $('a.facebook-share').attr('href', 'https://www.facebook.com/dialog/feed?app_id=347159378788273&display=popup&href=http://www.savethestorks.com/gallery&redirect_uri=http://www.savethestorks.com/gallery&caption=' + name + '&picture=https://7b7157f59fb5914df25d-83ec9bcc8970758aaa4b1923747e8d1b.ssl.cf1.rackcdn.com/' + src);
          $('a.twitter-share').attr('href', "http://twitter.com/home?status=" + name + " - www.savethestorks.com/gallery?id=" + id);
          $('a.pinterest-share').attr('href', "http://pinterest.com/pin/create/button/?url=http://www.savethestorks.com/gallery?id=" + id + "&amp;media=https://www.savethestorks.com/" + src + "&amp;description=" + name);
        }
      } else if (item.data('video')) {
        name = item.data('name');
        id = item.data('id');
        src = item.find('.video-source').html();
        currentID = id;
        $('.featured-media').find('.item-container').html(src).parents('.featured-media').find('h2').text(name);
        $('a.facebook-share').attr('href', 'https://www.facebook.com/dialog/feed?app_id=347159378788273&display=popup&href=http://www.savethestorks.com/gallery&redirect_uri=http://www.savethestorks.com/gallery&caption=' + name + '&picture=https://7b7157f59fb5914df25d-83ec9bcc8970758aaa4b1923747e8d1b.ssl.cf1.rackcdn.com/' + src);
        $('a.twitter-share').attr('href', "http://twitter.com/home?status=" + name + " - www.savethestorks.com/gallery?id=" + id);
      }
      $('html,body').animate({
        scrollTop: $('#lightbox').offset().top
      }, 500);
    });
    $(window).on("scroll", function() {
      var answers, faqTop, lPos, leftDist, qHeight, relTop, tPos, winTop;
      if (window.location.href.indexOf('/about') > -1) {
        winTop = $(window).scrollTop();
        faqTop = $('#faq').offset();
        relTop = winTop - faqTop.top;
        leftDist = $('.questions').offset();
        answers = $('.answers').width();
        qHeight = $('.questions').height();
        lPos = $('.question').offset().left;
        tPos = $('.question').offset().top;
        if ((Math.abs(winTop - $('.footer').offset().top)) <= (qHeight + 70)) {
          return $('.questions').css({
            "position": "absolute",
            "top": ($('.answers').height() - qHeight) + 30,
            "left": answers + 20
          });
        } else if (relTop >= -15) {
          return $('.questions').css({
            "position": "fixed",
            "top": 15,
            "left": leftDist.left,
            "width": answers
          });
        } else {
          return $('.questions').css({
            "position": "relative",
            "top": 0,
            "left": 0
          });
        }
      }
    });
    $('#search').on("click", function() {
      return $('.search').addClass('active');
    });
    $('*').click(function(e) {
      var className;
      className = $(e.target).attr('class');
      if (e.target.id !== 'search' && className !== 'icon-search' && className !== 'search' && className !== 'search active') {
        return $('.search').removeClass('active');
      }
    });
    $('.gift-handler').each(function() {
      return $(this).on('click', function() {
        var amnt, freq, gift, memo, painting;
        amnt = $(this).data('amount');
        freq = $(this).data('frequency');
        painting = $(this).data('painting');
        gift = $(this).parents('.option').find('input[name="gift"]:checked').val();
        sizes = $(this).parents('.option').find('.size');
        memo = '\n';
        if ($(this).parents('.option').find('input[name="gift"]:checked').val().indexOf('T-Shirts') > -1) {
          $(sizes).each(function(index) {
            index = index + 1;
            return memo += 'Shirt ' + index + ': ' + $(this).find('select').val() + '\n';
          });
          $rain({
            action: 'donate',
            amount: amnt,
            recurring: freq,
            memo: "Painting: " + painting + ", Gift: " + gift + ", Options:\n" + memo,
            lockamount: true,
            message: 'Thank you for your donation!'
          });
          return false;
        } else {
          $rain({
            action: "donate",
            amount: amnt,
            recurring: freq,
            memo: "Painting: " + painting + ', Gift: ' + gift,
            lockamount: true
          });
          return false;
        }
      });
    });
    $('.donation-handler').each(function() {
      return $(this).on('click', function() {
        var amnt, freq, gift, memo;
        amnt = $(this).data('amount');
        freq = $(this).data('frequency');
        gift = $(this).parents('.option').find('input[name="gift"]:checked').val();
        sizes = $(this).parents('.option').find('.size');
        memo = '\n';
        if ($(this).parents('.option').find('input[name="gift"]:checked').val().indexOf('T-Shirts') > -1) {
          $(sizes).each(function(index) {
            index = index + 1;
            return memo += 'Shirt ' + index + ': ' + $(this).find('select').val() + '\n';
          });
          $rain({
            action: 'donate',
            amount: amnt,
            recurring: freq,
            memo: "Gift: " + gift + "Options:\n" + memo,
            lockamount: true,
            message: 'Thank you for your donation!'
          });
          return false;
        } else {
          $rain({
            action: 'donate',
            amount: amnt,
            recurring: freq,
            memo: "Gift: " + gift,
            lockamount: true,
            message: 'Thank you for your donation!'
          });
          return false;
        }
      });
    });
    $('.donation-handler-no-gift').each(function() {
      return $(this).on('click', function() {
        var amnt, freq;
        amnt = $(this).data('amount');
        freq = $(this).data('frequency');
        $rain({
          action: 'donate',
          amount: amnt,
          recurring: freq,
          lockamount: true,
          message: 'Thank you for your donation!'
        });
        return false;
      });
    });
    $('input[name="gift"]').on('change', function() {
      if ($(this).val().indexOf('T-Shirts') > -1) {
        return $(this).parents('.option').addClass('show-sizing');
      } else {
        if ($(this).parents('.option').hasClass('show-sizing')) {
          return $(this).parents('.option').removeClass('show-sizing');
        }
      }
    });
    $('.donation-widget span.amount').on('click', function() {
      $(this).addClass('active').parents('.col').siblings().find('.active').removeClass('active');
      return $('.donation-widget input').val('');
    });
    $('.donation-widget input').on('keyup keydown', function() {
      return $('span.amount.active').removeClass('active');
    });
    $('.custom-amount-handler').on('click', function() {
      var amnt, freq;
      if ($('.donation-widget input').val() !== '') {
        amnt = $('.donation-widget input').val();
        freq = $('.donation-widget select').val();
        $rain({
          action: 'donate',
          amount: amnt,
          recurring: freq,
          memo: "Gift: Declined Gift",
          lockamount: true,
          message: 'Thank you for your donation!'
        });
      } else {
        amnt = $('.donation-widget span.active').data('amount');
        freq = $('.donation-widget select').val();
        $rain({
          action: 'donate',
          amount: amnt,
          recurring: freq,
          memo: "Gift: Declined Gift",
          lockamount: true,
          message: 'Thank you for your donation!'
        });
      }
    });
    $('.city-bar__list li').on('click', function() {
      var target;
      target = $(this).data('target');
      $(this).find('.thumbnail').addClass('active').parents('li').siblings('li').find('.active').removeClass('active');
      return $(target).addClass('in').siblings().removeClass('in');
    });
    $('.city-bar__list .thumbnail').on('click', function() {
      $('html,body').animate({
        scrollTop: $('.city-bar').offset().top
      }, 500);
      console.log('Why the fuck isn\'t it scrolling...');
    });
    $('#explore-map').on('click', function() {
      $('header .map-overlay').fadeOut();
      $('header .container-fluid').css({
        'pointer-events': 'none',
        'background:': 'background:',
        'none': 'none'
      });
      $('header .content').animate({
        top: '-500'
      }, 300);
      $('#mapdiv').css({
        'z-index': 4
      });
      return $('#menuToggle').addClass('black');
    });
    $('.banner-handler').on('click', function() {
      var amnt;
      amnt = $(this).parent().find('input').val();
      $rain({
        action: 'donate',
        amount: amnt,
        lockamount: true,
        message: 'Thank you for your donation!'
      });
      return false;
    });
    $('button.help').on('click', function() {
      var width;
      $('.support-wrapper').addClass('active');
      width = $(this).width();
      $(this).css({
        width: width,
        opacity: 0
      });
      $(this).find('span').css({
        visibility: 'hidden'
      });
      $(this).animate({
        height: 46,
        width: 46
      }, 300);
      setTimeout($(this).css({
        'zIndex': 0
      }), 400);
    });
    $('button.close').on('click', function() {
      var open;
      open = $('button.help');
      $('.support-wrapper').removeClass('active');
      $(open).find('span').css({
        visibility: 'visible'
      });
      $(open).css({
        height: 'auto',
        opacity: 1,
        width: 'auto',
        zIndex: 2
      });
      $('.support-module').removeClass('posting');
      $('.support-module .content').html('<i class="fa fa-spin fa-spinner"></i>');
      $('textarea[name="message"]').each(function() {
        return $(this).val('');
      });
    });
    $('body').on('click', function() {
      var open;
      open = $('button.help');
      $('.support-wrapper').removeClass('active');
      $(open).find('span').css({
        visibility: 'visible'
      });
      $(open).css({
        height: 'auto',
        opacity: 1,
        width: 'auto',
        zIndex: 2
      });
      $('.support-module').removeClass('posting');
      $('.support-module .content').html('<i class="fa fa-spin fa-spinner"></i>');
      $('textarea[name="message"]').each(function() {
        return $(this).val('');
      });
    });
    $('.support-wrapper').on('click', function(e) {
      return e.stopPropagation();
    });
    $('.tab-toggle').on('click', function() {
      var target;
      target = $(this).attr('href').split('#')[1];
      $(this).addClass('active');
      $(this).parents().siblings().find('.active').removeClass('active');
      $('.form-' + target).addClass('active').siblings('.active').removeClass('active');
      return false;
    });
    $('form.email').on('submit', function(e) {
      var data;
      e.preventDefault();
      data = $(this).serialize();
      $('.support-module').addClass('posting');
      return $.post('/api/3.0/form-completions', data, function() {
        return $('.support-module .content').html('<h1>Thank You!</h1><p>Your message has been submitted<br>and we\'ll get back to you shortly.</p>');
      });
    });
    $('form.phone').on('submit', function(e) {
      var data, email, message, name, number;
      e.preventDefault();
      name = $(this).find('input[name="contact[firstName]"]').val() + ' ' + $(this).find('input[name="contact[lastName]"]').val();
      number = $(this).find('input[name="contact[number]"]').val();
      email = $(this).find('input[name="contact[email]"]').val();
      message = $(this).find('textarea[name="message"]').val();
      message += '\nNumber: ' + number;
      data = {
        contact: {
          name: name,
          email: email,
          number: number
        },
        message: message
      };
      $('.support-module').addClass('posting');
      return $.post('/api/3.0/form-completions', data, function() {
        return $('.support-module .content').html('<h1>Thank You!</h1><p>Your message has been submitted<br>and we\'ll get back to you shortly.</p>');
      });
    });
    elementHeights = $('.info').map(function() {
      return $(this).height();
    }).get();
    maxHeight = Math.max.apply(null, elementHeights);
    $('.info').height(maxHeight);
    $('.custom-rain').on('submit', function(e) {
      $rain({
        action: 'donate',
        amount: $('.custom-rain input[name="amount"]').val(),
        recurring: $('.custom-rain input[name="recurring"]').val(),
        group: $('.custom-rain input[name="group"]').val(),
        lockamount: true,
        message: 'Thank you for your donation!'
      });
      e.preventDefault();
      return false;
    });
    $('#custom').on('click', function() {
      return $('.custom-rain input[name="amount"]').prop('disabled', false).val('').focus();
    });
    $('#once').on('click', function() {
      $('.custom-rain').hide();
      return $(this).parents().find('.rain').show();
    });
    $('#back').on('click', function() {
      $('.custom-rain').show();
      $(this).parents().find('.rain').hide();
      return $('.rain').find('input[name=amount]').focus();
    });
    $('input[name="gift"]').on('change', function() {
      if ($(this).val().indexOf('Shirts') > -1) {
        $(this).parents('.rain').find('.module-sizes').addClass('show');
        return $('html,body').animate({
          scrollTop: $('#sizing-anchor').offset().top
        }, 300);
      } else {
        return $(this).parents('.rain').find('.module-sizes').removeClass('show');
      }
    });
    $('.donate-now').on('click', function() {
      $('html,body').animate({
        scrollTop: $('#sizing-anchor').offset().top
      }, 300);
      return false;
    });
    return $('.donation-module.rain').on('submit', function() {
      var gift, i, memo;
      gift = $(this).find('input[name="gift"]:checked');
      if ($(gift).val().indexOf('Shirts') > -1) {
        console.log($(this).find('input[name="gift"]').val());
        memo = $(gift).val();
        i = 1;
        $(this).find('select').each(function() {
          memo += '\nShirt ' + i + ': ' + $(this).val();
          i = i + 1;
        });
        return $(this).find('input[name="memo"]').val(memo);
      } else {
        return $(this).find('input[name="memo"]').val($(gift).val());
      }
    });
  });

}).call(this);
