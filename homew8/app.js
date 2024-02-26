document.addEventListener('DOMContentLoaded', function() {
    function zero(date) {
        return date < 10 ? '0' + date : date;
    }

    function updateTime() {
        const currentDate = new Date();
        const hours = zero(currentDate.getHours());
        const minutes = zero(currentDate.getMinutes());
        const seconds = zero(currentDate.getSeconds());

        const timeString = `${hours}:${minutes}:${seconds}`;
        document.querySelector('.timer__items').innerText = timeString;
    }

    setInterval(updateTime, 1000);
});
