$(document).ready(function () {
    $("body").removeClass("no-js").addClass("js");
});

//-----------------------
// Logo Animation
// animation with GSAP
//----------
$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from("[data-logo-animation]", {
        duration: 1,
        y: 20,
        opacity: 0,
        ease: "ease",
    });


function animateStaggeredSections() {
  // Select all containers with data-stagger-animation
  const containers = document.querySelectorAll('[data-stagger-animation]');
  const isMobile = window.innerWidth < 768;
  const start = isMobile ? 'top 85%' : 'top 80%';

  containers.forEach((container) => {
    // Check if the container is inside data-lets-start-show
    const isLetsStart = container.closest('[data-lets-start-show]');

    if (isLetsStart) {
      // For data-lets-start-show, animate immediately after delay
      gsap.from(container.children, {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 2.5, // Matches the 2.5s delay from original
        duration: 0.5,
      });
    } else {
      // For other containers, use ScrollTrigger
      gsap.from(container.children, {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: start,
          toggleActions: 'play none none none',
        },
      });
    }
  });

  // Animate loader fade-out
  gsap.to('[data-loader]', {
    opacity: 0,
    duration: 0.5,
    delay: 2, // Matches the 2s delay from original
    onComplete: () => {
      document.querySelector('[data-loader]').remove();
    },
  });
}

// Run the animations
animateStaggeredSections();



    // Hide Loader After 2s
    setTimeout(function() {
        $("[data-loader]").fadeOut(500, function() {
            $(this).remove();
        });
    }, 2000);

      // Show Let's Start After 2.5s
      setTimeout(function() {
          $("[data-lets-start-show]").fadeIn(500);
      }, 2500);
  });
