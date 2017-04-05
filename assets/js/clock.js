function update() {
    // debugger;
    $('#clock').html(moment().format('ddd, MMMM D YYYY h:MM:ss A'));
}

setInterval(update, 1000);
