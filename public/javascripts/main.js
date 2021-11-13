$(function () {
  $("#zoom_1").elevateZoom({ scrollZoom: true });

  $(".add_to_cart_alert").on("click", (e) => {
    e.preventDefault()
    alert('Davomi yoq:)')
  });
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const search_input_btn = document.querySelector(".search_input button");

search_input_btn.addEventListener("click", (e) => {
  e.preventDefault();
});


// search.on('click', () => {
//   alert("Asd")
// })



const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const seconds = document.getElementById("seconds");

const clock = setInterval(function time() {
  let dateToday = new Date();
  let hr = dateToday.getHours();
  let min = dateToday.getMinutes();
  let sec = dateToday.getSeconds();

  if (hr < 10) {
    hr = "0" + hr;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }

  hour.textContent = hr;
  minute.textContent = min;
  seconds.textContent = sec;
}, 1000);
