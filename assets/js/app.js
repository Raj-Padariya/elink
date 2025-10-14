$(document).ready(function () {
  $("body").removeClass("no-js").addClass("js");

  $("[data-show]").css("display", "none");

  gsap.registerPlugin(ScrollTrigger);


  gsap.from("[data-logo-animation]", {
    duration: 1,
    y: 20,
    opacity: 0,
    ease: "power2.out",
  });


  function animateStaggeredSections() {
    const $containers = $("[data-stagger-animation]");
    const isMobile = $(window).width() < 768;
    const start = isMobile ? "top 85%" : "top 80%";

    $containers.each(function () {
      const $container = $(this);
      const isLetsStart = $container.closest("[data-show]").length > 0;

      if (isLetsStart) {
        // Animate immediately after delay for data-show children
        gsap.from($container.children(), {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          ease: "power2.out",
          delay: 2.5,
          duration: 0.5,
        });
      } else {
        // Use ScrollTrigger for other containers
        gsap.from($container.children(), {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: $container[0],
            start: start,
            toggleActions: "play none none none",
          },
        });
      }
    });

    // Animate loader fade-out with GSAP
    gsap.to("[data-loader]", {
      opacity: 0,
      duration: 0.5,
      delay: 2,
      onComplete: () => {
        $("[data-loader]").remove();
      },
    });

    // Animate data-show fade-in
    gsap.to("[data-show]", {
      display: "block",
      opacity: 1,
      duration: 0.5,
      delay: 2,
      ease: "power2.out",
    });
  }

  // Add progress class immediately
  $(".onboarding__progress").addClass("progress__on-start");

  // Run animations
  animateStaggeredSections();

  let currentStep = 0;

  // Show popup on page load
  showImagePicker();

  // Handle button click to change steps
  $(".chagne__steps").on("click", function () {
    currentStep = parseInt($("[data-step-change]").attr("data-step")) || 0;
    currentStep += 1;
    $("[data-step-change]").attr("data-step", currentStep);

    // Update button text and show input based on step
    if (currentStep === 1) {
      $(".step__text").text("Continue with Name");
      $(".dynamic-input-container").show();
      $(".dynamic-input-container label").text("Enter Your Name");
      $(".dynamic-input").attr("placeholder", "Enter Your Name");
      $(".dynamic-input").val("");
      hideImagePicker();
    }
  });

  // Image picker popup logic (unchanged)
  function showImagePicker() {
    $("#imagePickerPopup").fadeIn(300);
  }

  function hideImagePicker() {
    $("#imagePickerPopup").fadeOut(300);
  }

  /*-------------------------
  Adding Class On Focus To All Input who contains "site_input" class 
 -----------------*/

  $(".site_input, .search__input").focus(function () {
      $(this).parent().addClass("focus");
    }).blur(function () {
      $(this).parent().removeClass("focus");
    });



  /*----------------------
    Adding class on uncheck to socialpopup
    -----------------*/

  function SocialDataHnalding() {
    function handleToggleState(isChecked) {
      const tl = gsap.timeline({
        defaults: { ease: isChecked ? "power3.out" : "power3.inOut" },
      });

      if (!isChecked) {
        // Unchecked: Show shield__content, hide verfiy__content
        tl.to(".verfiy__content", {
          autoAlpha: 0,
          y: -15,
          height: 0,
          duration: 0.35,
          stagger: 0.06,
        })
          .to(".profile_contact-ctas, .profile_bottom-contact_ctas", {
            autoAlpha: 0,
            y: -15,
            height: 0,
            duration: 0.35,
            stagger: 0.06,
          })
          .to(
            ".shared_data-item",
            {
              autoAlpha: 0,
              y: -15,
              height: 0,
              marginBottom: 0,
              paddingTop: 0,
              paddingBottom: 0,
              overflow: "hidden",
              duration: 0.3,
              stagger: 0.06,
            },
            "-=0.25"
          )
          .to(
            ".or-separator",
            {
              autoAlpha: 0,
              height: 0,
              marginTop: 0,
              marginBottom: 0,
              duration: 0.3,
            },
            "-=0.2"
          )
          .to(
            ".shared_data-items",
            {
              height: 0,
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: 0,
              marginBottom: 0,
              duration: 0.2,
            },
            "-=0.1"
          )
          .to(
            ".shield__content, .profile_bottom-social_links",
            {
              autoAlpha: 1,
              y: 0,
              height: "auto",
              duration: 0.2,
            },
            "-=0.1"
          )
          .set(
            [
              ".or-separator",
              ".shared_data-items",
              ".verfiy__content",
              ".profile_contact-ctas",
              ".profile_bottom-contact_ctas",
            ],
            {
              visibility: "hidden",
              pointerEvents: "none",
            }
          )
          .set(".shield__content, .profile_bottom-social_links", {
            visibility: "visible",
            pointerEvents: "auto",
          });

        $(".socialPopup-content").addClass("active");
      } else {
        // Checked: Show verfiy__content, hide shield__content
        tl.set(
          [
            ".or-separator",
            ".shared_data-items",
            ".verfiy__content",
            ".profile_contact-ctas",
            ".profile_bottom-contact_ctas",
          ],
          {
            visibility: "visible",
            pointerEvents: "auto",
            clearProps: "height,padding,margin",
          }
        )
          .set(".shield__content, .profile_bottom-social_links", {
            visibility: "hidden",
            pointerEvents: "none",
          })
          .fromTo(
            ".or-separator",
            { autoAlpha: 0, height: 0 },
            { autoAlpha: 1, height: "auto", duration: 0.35 }
          )
          .fromTo(
            ".shared_data-item",
            { autoAlpha: 0, y: -15, height: 0 },
            {
              autoAlpha: 1,
              y: 0,
              height: "auto",
              duration: 0.4,
              stagger: 0.08,
              clearProps: "overflow,padding",
            },
            "-=0.15"
          )
          .fromTo(
            ".verfiy__content, .profile_contact-ctas, .profile_bottom-contact_ctas",
            { autoAlpha: 0, y: -15, height: 0, marginTop: 0 },
            {
              autoAlpha: 1,
              y: 0,
              height: "auto",
              duration: 0.4,
              stagger: 0.08,
              clearProps: "overflow,padding",
            },
            "-=0.15"
          )
          .to(
            ".shield__content, .profile_bottom-social_links",
            {
              autoAlpha: 0,
              y: 15,
              height: "auto",
              opacity: 0,
              duration: 0.4,
            },
            "-=0.15"
          );

        $(".socialPopup-content").removeClass("active");
      }
    }

    // Run on toggle change
    $("#toggleSwitch").on("change", function () {
      const isChecked = $(this).is(":checked");
      handleToggleState(isChecked);
    });

    const isChecked = $("#toggleSwitch").is(":checked");
    handleToggleState(isChecked);
  }
  SocialDataHnalding();

  /*----------------------
    Displaying Social Icons On Click on the "add social" CTA
    -----------------*/

function ShowSocialIcons() {
  $(".social__enable-cta .popup_upload-btn").on("click", function () {
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    // Hide #SocialContent child elements with stagger
    tl.to("#SocialContent > *", {
      autoAlpha: 0,
      y: -15,
      height: 0,
      duration: 0.35,
      stagger: 0.1,
      onComplete: function () {
        gsap.set("#SocialContent", {
          visibility: "hidden",
          pointerEvents: "none",
          height: 0,
        });
      },
    })
      .to(
        "#socialIconsShowCase",
        {
          visibility: "visible",
          pointerEvents: "auto",
          height: "auto",
          opacity: 1,
          duration: 0,
        },
        "-=0.2"
      )
      .fromTo(
        "#socialIconsShowCase > .social-icons__inner > *",
        {
          autoAlpha: 0,
          y: 15,
          height: 0,
        },
        {
          autoAlpha: 1,
          y: 0,
          height: "auto",
          duration: 0.35,
          stagger: 0.1,
          opacity: 1,
          clearProps: "height",
        },
        "-=0.15"
      );
  });
}

// Show More/Show Less functionality
$('.show-more-btn').on('click', function () {
  const $btn = $(this);
  const $hiddenItems = $('.icon-item.hidden');
  const isShowingMore = $btn.text() === 'Show More';

  const tl = gsap.timeline({
    defaults: { ease: 'power3.inOut' }
  });

  if (isShowingMore) {
    tl.set($hiddenItems, { display: 'flex', visibility: 'visible' })
      .fromTo(
        $hiddenItems,
        { autoAlpha: 0, y: 15, height: 0 },
        { autoAlpha: 1, y: 0, height: 'auto', duration: 0.35, stagger: 0.1 }
      );
    $btn.text('Show Less');
  } else {
    tl.to(
      $hiddenItems,
      { autoAlpha: 0, y: -15, height: 0, duration: 0.35, stagger: 0.1 }
    ).set($hiddenItems, { display: 'none', visibility: 'hidden' });
    $btn.text('Show More');
  }
});

// Search functionality
function filterIcons() {
  const searchTerm = $('.search__input').val().toLowerCase().trim();
  const $allIconItems = $('.icon-item'); // Include all icons, hidden or not
  const $hideBtn = $('.show-more-btn'); // Include all icons, hidden or not
  let hasMatches = false;

  $allIconItems.each(function () {
    const $item = $(this);
    const $label = $item.find('label');
    const altText = $label.find('img').attr('alt').toLowerCase();
    const isMatch = altText.includes(searchTerm);

    if (isMatch && $item.hasClass('hidden')) {
      // If a hidden icon matches, remove hidden class and show
      $item.removeClass('hidden').css('display', 'flex');
      hasMatches = true;
    } else if (!isMatch && !$item.hasClass('hidden')) {
      // If a visible icon doesn't match, hide
      $item.css('display', 'none');
    } else if (isMatch && !$item.hasClass('hidden')) {
      // If a visible icon matches, ensure it's visible
      $item.css('display', 'flex');
      hasMatches = true;
    }
  });

  // Update button text if all hidden items are shown due to search
  const $hiddenItems = $('.icon-item.hidden');
  if ($hiddenItems.length === 0) {
    $('.show-more-btn').text('Show Less');
  }

  // Dynamic message for no results
  const $message = $('.search-message');
  if (searchTerm && !hasMatches) {
    $message.html(`<span style="color:#fff; margin-right:5px;"> No results found </span> for "<span style="text-wrap: nowrap; text-overflow: ellipsis;  max-width: 120px; overflow: hidden;">${searchTerm}</span>"`).css('display', 'flex');
    $hideBtn.css('display', 'none')
    $hiddenItems.css('display', 'none')
  } else {
    $message.css('display', 'none');
    $hideBtn.css('display', 'block')
    $hiddenItems.css('display', 'flex')
  }
}
// Real-time search on input
$('.search__input').on('input', filterIcons);

// Trigger search on search icon click
$('.controls__search').on('click', function () {
  filterIcons();
  
});

// Clear search on close icon click
$('.controls__close').on('click', function () {
  $('.search__input').val('');
  filterIcons(); // Reset to show all visible icons
});

ShowSocialIcons();
});
