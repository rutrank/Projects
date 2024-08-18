const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});
var timeout;

function firstpageAnim() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: .2
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut
    })
}
function circleMouseFollower(xscale, yscale) {

  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale} , ${yscale})`
  })
}
function circleChaptaKaro() {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout); //this is used to remove previous timeouts created so that till you are using the mouse that function will not run


    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev)
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev)

    xprev = dets.clientX
    yprev = dets.clientY

    circleMouseFollower(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1 , 1)`

    }, 100)


  })
}
circleChaptaKaro()


circleMouseFollower();
firstpageAnim();

document.querySelectorAll("#elem")
  .forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (details) {

      gsap.to(elem.querySelector("img"), { //ek selected element par bhi querySelector lag sakta hai this was unknown to you 

        opacity: 0,
        ease: Power3,
        duration: 0.5

      })
    })

    elem.addEventListener("mousemove", function (details) {

      var diff = details.clientY - elem.getBoundingClientRect().top;

      diffrot = details.clientX - rotate;
      rotate = details.clientX;



      gsap.to(elem.querySelector("img"), { //ek selected element par bhi querySelector lag sakta hai this was unknown to you 

        opacity: 1,
        ease: Power3,
        top: diff,
        left: details.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot)
      })
    })
  })