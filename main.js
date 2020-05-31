var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };
   

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
    
    var Flipper = (function() {
        var card = $('.card');
        var flipper = card.find('.card__flipper');
        var win = $(window);
        
        var flip = function() {
          var thisCard = $(this);
          var thisFlipper = thisCard.find('.card__flipper');
          var offset = thisCard.offset();
          var xc = win.width() / 2;
          var yc = win.height() / 2;
          var docScroll = $(document).scrollTop();
          var cardW = thisCard.outerWidth() / 2;
          var cardH = thisCard.height() / 2;
      
          var transX = xc - offset.left - cardW;
          var transY = docScroll + yc - offset.top - cardH;
      //     if (offset.top > card.height()) transY = docScroll - offset.top + cardH;
          if (win.width() <= 700) transY = 0;
          
          if (card.hasClass('active')) unflip();
              
          thisCard.css({'z-index': '3'}).addClass('active');
          
          thisFlipper.css({
            'transform': 'translate3d(' + transX + 'px,' + transY + 'px, 0) rotateY(180deg) scale(1)',
            '-webkit-transform': 'translate3d(' + transX + 'px,' + transY + 'px, 0) rotateY(180deg) scale(1)',
            '-ms-transform': 'translate3d(' + transX + 'px,' + transY + 'px, 0) rotateY(180deg) scale(1)'
          }).addClass('active');
          
          return false;
        };
        
        var unflip = function(e) {
          card.css({'z-index': '1'}).removeClass('active');
          flipper.css({
            'transform': 'none',
            '-webkit-transform': 'none',
            '-ms-transform': 'none'
          }).removeClass('active');
        };
        
        var bindActions = function() {
          card.on('click', flip);
          win.on('click', unflip);
        }
        
        var init = function() {
          bindActions();
        };
        
        return {
          init: init
        };
        
      }());
      
      Flipper.init();

