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
      const containers = document.querySelectorAll('[data-stagger-animation]');
      const startisMobile = window.innerWidth < 768;
      const start = startisMobile ? 'top 85%' : 'top 80%';

      containers.forEach((container) => {
        gsap.from(container.children, {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          ease: 'ease',
          scrollTrigger: {
            trigger: container,
            start: start,
            toggleActions: 'play none none none',
          },
        });
      });
    }
    animateStaggeredSections();
});
