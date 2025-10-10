$(document).ready(function () {
  // Add JS class to body
  $('body').removeClass('no-js').addClass('js');

  // Initially hide data-show
  $('[data-show]').css('display', 'none');

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Logo Animation
  gsap.from('[data-logo-animation]', {
    duration: 1,
    y: 20,
    opacity: 0,
    ease: 'power2.out',
  });

  // Staggered Sections Animation
  function animateStaggeredSections() {
    const $containers = $('[data-stagger-animation]');
    const isMobile = $(window).width() < 768;
    const start = isMobile ? 'top 85%' : 'top 80%';

    $containers.each(function () {
      const $container = $(this);
      const isLetsStart = $container.closest('[data-show]').length > 0;

      if (isLetsStart) {
        // Animate immediately after delay for data-show children
        gsap.from($container.children(), {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 2.5,
          duration: 0.5,
        });
      } else {
        // Use ScrollTrigger for other containers
        gsap.from($container.children(), {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: $container[0],
            start: start,
            toggleActions: 'play none none none',
          },
        });
      }
    });

    // Animate loader fade-out with GSAP
    gsap.to('[data-loader]', {
      opacity: 0,
      duration: 0.5,
      delay: 2,
      onComplete: () => {
        $('[data-loader]').remove();
      },
    });

    // Animate data-show fade-in
    gsap.to('[data-show]', {
      display: 'block',
      opacity: 1,
      duration: 0.5,
      delay: 2,
      ease: 'power2.out',
    });
  }




  // Add progress class immediately
  $('.onboarding__progress').addClass('progress__on-start');

  // Run animations
  animateStaggeredSections();



  let currentStep = 0;

  // Show popup on page load
  showImagePicker();

  // Handle button click to change steps
  $('.chagne__steps').on('click', function () {
    currentStep = parseInt($('[data-step-change]').attr('data-step')) || 0;
    currentStep += 1;
    $('[data-step-change]').attr('data-step', currentStep);

    // Update button text and show input based on step
    if (currentStep === 1) {
      $('.step__text').text('Continue with Name');
      $('.dynamic-input-container').show();
      $('.dynamic-input-container label').text('Enter Your Name');
      $('.dynamic-input').attr('placeholder', 'Enter Your Name');
      $('.dynamic-input').val(''); // Clear input
      hideImagePicker(); // Hide popup after photo selection
    } else if (currentStep === 2) {
      $('.step__text').text('Continue with Role');
      $('.dynamic-input-container').show();
      $('.dynamic-input-container label').text('Enter Your Role');
      $('.dynamic-input').attr('placeholder', 'Enter Your Role');
      $('.dynamic-input').val(''); // Clear input
    } else if (currentStep > 2) {
      $('.dynamic-input-container').hide(); // Hide input after both steps
      $('.chagne__steps').prop('disabled', true); // Optionally disable button
      $('.step__text').text('Completed');
    }
  });

  // Update span text based on input
  $('.dynamic-input').on('input', function () {
    const inputText = $(this).val();
    if (currentStep === 1) {
      $('#displayName_actual').text(inputText);
    } else if (currentStep === 2) {
      $('#displayRole__actual').text(inputText);
    }
  });

  // Image picker popup logic (unchanged)
  function showImagePicker() {
    $('#imagePickerPopup').fadeIn(300);
  }

  function hideImagePicker() {
    $('#imagePickerPopup').fadeOut(300);
  }
});