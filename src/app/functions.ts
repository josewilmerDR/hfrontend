declare var jQuery: any;
declare var $: any;

//Plugin que muestra el carrusel de productos. Los Productos arriba del la oferta del dia.
export let OwlCarouselConfig = {
  fnc: function () {
    var target = $('.owl-slider');
    if (target.length > 0) {
      target.each(function (this: HTMLElement) {
        var el = $(this),
          dataAuto = el.data('owl-auto'),
          dataLoop = el.data('owl-loop'),
          dataSpeed = el.data('owl-speed'),
          dataGap = el.data('owl-gap'),
          dataNav = el.data('owl-nav'),
          dataDots = el.data('owl-dots'),
          dataAnimateIn = (el.data('owl-animate-in')) ? el.data('owl-animate-in') : '',
          dataAnimateOut = (el.data('owl-animate-out')) ? el.data('owl-animate-out') : '',
          dataDefaultItem = el.data('owl-item'),
          dataItemXS = el.data('owl-item-xs'),
          dataItemSM = el.data('owl-item-sm'),
          dataItemMD = el.data('owl-item-md'),
          dataItemLG = el.data('owl-item-lg'),
          dataItemXL = el.data('owl-item-xl'),
          dataNavLeft = (el.data('owl-nav-left')) ? el.data('owl-nav-left') : "<i class='icon-chevron-left'></i>",
          dataNavRight = (el.data('owl-nav-right')) ? el.data('owl-nav-right') : "<i class='icon-chevron-right'></i>",
          duration = el.data('owl-duration'),
          datamouseDrag = (el.data('owl-mousedrag') == 'on') ? true : false;
        if (target.children('div, span, a, img, h1, h2, h3, h4, h5, h5').length >= 2) {
          el.owlCarousel({
            animateIn: dataAnimateIn,
            animateOut: dataAnimateOut,
            margin: dataGap,
            autoplay: dataAuto,
            autoplayTimeout: dataSpeed,
            autoplayHoverPause: true,
            loop: dataLoop,
            nav: dataNav,
            mouseDrag: datamouseDrag,
            touchDrag: true,
            autoplaySpeed: duration,
            navSpeed: duration,
            dotsSpeed: duration,
            dragEndSpeed: duration,
            navText: [dataNavLeft, dataNavRight],
            dots: dataDots,
            items: dataDefaultItem,
            responsive: {
              0: {
                items: dataItemXS
              },
              480: {
                items: dataItemSM
              },
              768: {
                items: dataItemMD
              },
              992: {
                items: dataItemLG
              },
              1200: {
                items: dataItemXL
              },
              1680: {
                items: dataDefaultItem
              }
            }
          });
        }

      });
    }
  }
}


//Redibuja el background de del carrusel de productos una vez carga el DOM por primera vez
export let BackgroundImage = {
  fnc: function () {
    var databackground = $('[data-background]');
    databackground.each(function (this: any) {
      if ($(this).attr('data-background')) {
        var image_path = $(this).attr('data-background');
        $(this).css({
          'background': 'url(' + image_path + ')'
        });
      }
    });
  }
}


export let CarouselNavigation = {

  fnc: function () {
    var prevBtn = $('.ps-carousel__prev'),
      nextBtn = $('.ps-carousel__next');
    prevBtn.on('click', function (this: any, e: any) {
      e.preventDefault();
      var target = $(this).attr('href');
      $(target).trigger('prev.owl.carousel', [1000]);
    });
    nextBtn.on('click', function (this: any, e: any) {
      e.preventDefault();
      var target = $(this).attr('href');
      $(target).trigger('next.owl.carousel', [1000]);
    });
  }
}


//
export let SlickConfig = {
  fnc: function () {
    var product = $('.ps-product--detail');
    if (product.length > 0) {
      var primary = product.find('.ps-product__gallery'),
        second = product.find('.ps-product__variants'),
        vertical = product.find('.ps-product__thumbnail').data('vertical');
      primary.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.ps-product__variants',
        fade: true,
        dots: false,
        infinite: false,
        arrows: primary.data('arrow'),
        prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
        nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>",
      });
      second.slick({
        slidesToShow: second.data('item'),
        slidesToScroll: 1,
        infinite: false,
        arrows: second.data('arrow'),
        focusOnSelect: true,
        prevArrow: "<a href='#'><i class='fa fa-angle-up'></i></a>",
        nextArrow: "<a href='#'><i class='fa fa-angle-down'></i></a>",
        asNavFor: '.ps-product__gallery',
        vertical: vertical,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: second.data('arrow'),
              slidesToShow: 4,
              vertical: false,
              prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
              nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
            }
          },
          {
            breakpoint: 992,
            settings: {
              arrows: second.data('arrow'),
              slidesToShow: 4,
              vertical: false,
              prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
              nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              vertical: false,
              prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
              nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
            }
          },
        ]
      });
    }
  }
}

//Plugin que activa el carrusel de productos, especificamente muestre los productos en miniatura 
export let ProductLightbox = {
  fnc: function () {
    var product = $('.ps-product--detail');
    if (product.length > 0) {
      $('.ps-product__gallery').lightGallery({
        selector: '.item a',
        thumbnail: true,
        share: false,
        fullScreen: false,
        autoplay: false,
        autoplayControls: false,
        actualSize: false
      });
      if (product.hasClass('ps-product--sticky')) {
        $('.ps-product__thumbnail').lightGallery({
          selector: '.item a',
          thumbnail: true,
          share: false,
          fullScreen: false,
          autoplay: false,
          autoplayControls: false,
          actualSize: false
        });
      }
    }
    $('.ps-gallery--image').lightGallery({
      selector: '.ps-gallery__item',
      thumbnail: true,
      share: false,
      fullScreen: false,
      autoplay: false,
      autoplayControls: false,
      actualSize: false
    });
    $('.ps-video').lightGallery({
      thumbnail: false,
      share: false,
      fullScreen: false,
      autoplay: false,
      autoplayControls: false,
      actualSize: false
    });
  }
}

//Plugin que activa el contador de tiempo regresivo
export let CountDown = {
  fnc: function () {
    // console.log("CountDown function called");
    var time = $(".ps-countdown");
    // console.log("Found countdown elements:", time.length);

    // Almacena los valores previos para comparar
    const prevValues = new Map();

    time.each(function (this: any, index: any) {
      const el = $(this);
      const counterId = `countdown-${index}`;

      // Verificar y loguear el valor de data-time
      const rawValue = el.attr("data-time");
      // console.log(`Element ${index} data-time value:`, rawValue);

      // Intentar diferentes formatos para la fecha
      let countDownDate: number | null = null;

      try {
        // Si es un objeto Date serializado (toString)
        if (typeof rawValue === 'string' && rawValue.includes('GMT')) {
          countDownDate = new Date(rawValue).getTime();
        }
        // Si es un timestamp en milisegundos
        else if (!isNaN(Number(rawValue))) {
          countDownDate = Number(rawValue);
        }
        // Si es un formato ISO o similar
        else {
          countDownDate = new Date(rawValue).getTime();
        }

        // console.log(`Countdown date parsed for element ${index}:`, new Date(countDownDate));

        if (isNaN(countDownDate)) {
          console.error(`Invalid date format for element ${index}:`, rawValue);
          return; // Skip this element
        }
      } catch (error) {
        console.error(`Error parsing date for element ${index}:`, error);
        return; // Skip this element
      }

      // Inicializar valores previos
      prevValues.set(counterId, { days: -1, hours: -1, minutes: -1, seconds: -1 });

      // Función para actualizar el contador
      function updateCountdown() {
        try {
          // Check if countDownDate is null before using it
          if (countDownDate === null) {
            console.error(`CountDown date is null for element ${index}`);
            clearInterval(timeInterval);
            return;
          }

          const now = new Date().getTime();
          const distance = countDownDate - now;

          // console.log(`Element ${index} - Distance:`, distance);

          if (distance < 0) {
            // Si el tiempo ha expirado, limpiar intervalo y ocultar sección
            clearInterval(timeInterval);
            el.closest('.ps-section').hide();
            return;
          }

          // Calcular los nuevos valores
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // console.log(`Element ${index} - Values:`, { days, hours, minutes, seconds });

          // Obtener valores previos
          const prev = prevValues.get(counterId);

          // Actualizar solo los valores que han cambiado
          if (prev && days !== prev.days) {
            el.find('.days').html(days.toString());
            prev.days = days;
          }

          if (prev && hours !== prev.hours) {
            el.find('.hours').html(hours.toString().padStart(2, '0'));
            prev.hours = hours;
          }

          if (prev && minutes !== prev.minutes) {
            el.find('.minutes').html(minutes.toString().padStart(2, '0'));
            prev.minutes = minutes;
          }

          if (prev && seconds !== prev.seconds) {
            el.find('.seconds').html(seconds.toString().padStart(2, '0'));
            prev.seconds = seconds;
          }
        } catch (error) {
          console.error(`Error updating countdown for element ${index}:`, error);
        }
      }

      // Ejecutar inmediatamente para mostrar los valores iniciales
      updateCountdown();

      // Establecer intervalo
      const timeInterval = setInterval(updateCountdown, 1000);

      // Guardar el ID del intervalo en el elemento para poder limpiarlo más tarde si es necesario
      el.data('countdownInterval', timeInterval);
    });
  },

  // Método para detener todos los contadores
  stop: function () {
    $(".ps-countdown").each(function (this: any) {
      const interval = $(this).data('countdownInterval');
      if (interval) {
        clearInterval(interval);
      }
    });
  }
}

//Plugin que activa las estrellas de calificación
export let Rating = {
  fnc: function () {
    $('select.ps-rating').each(function (this: any) {
      var readOnly;
      if ($(this).attr('data-read-only') == 'true') {
        readOnly = true
      } else {
        readOnly = false;
      }
      $(this).barrating({
        theme: 'fontawesome-stars',
        readonly: readOnly,
        emptyValue: '0'
      });
    });
  }
}

