function update() {
    let day = moment().format('ddd, MMM-D-YYYY');
    let time = moment().format('h:MM:ss A');
    $('.clock-day').text(day);
    $('.clock-time').text(time);
    // $('#clock').html(moment().format('ddd, MMMM D YYYY h:MM:ss A'));
}

setInterval(update, 1000);
