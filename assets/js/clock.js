function update() {
    let day = moment().format('ddd, MMM-D-YYYY');
    let time = moment().format('h:mm:ssA');
    $('.clock-day').text(day);
    $('.clock-time').text(time);
    // debugger;
    // $('#clock').html(moment().format('ddd, MMMM D YYYY h:MM:ss A'));
}

setInterval(update, 1000);


let url = "https://zidianlyu.herokuapp.com";
let http = new XMLHttpRequest();

setInterval(function(){
  http.open('GET', url, false);
}, 300000);
