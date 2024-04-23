document.addEventListener('DOMContentLoaded', function () {
    // Получаем список мероприятий пользователя из вашего API
    fetch('https://bd4712ed75be2cbe.mokky.dev/events')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка получения данных с сервера');
            }
            return response.json();
        })
        .then(events => {
            // Получаем контейнер для списка мероприятий
            const eventListContainer = document.getElementById('eventList');

            // Очищаем контейнер
            eventListContainer.innerHTML = '';

            // Отображаем каждое мероприятие в списке
            events.forEach(event => {
                const eventCard = createEventCard(event);
                eventListContainer.appendChild(eventCard);
            });
        })
        .catch(error => console.error('Ошибка:', error));
});

// Функция для создания карточки мероприятия
function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.classList.add('col-md-4');

    // Проверяем наличие необходимых свойств в объекте event
    const imageUrl = event.imageUrl || 'placeholder.jpg';
    const name = event.name || 'Название не указано';
    const price = event.price || 'Цена не указана';
    const time = event.time || 'Время не указано';

    const cardHtml = `
        <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Цена: ${price}</p>
                <p class="card-text">Время: ${time}</p>
            </div>
        </div>
    `;

    eventCard.innerHTML = cardHtml;

    return eventCard;
}

// Функция для создания карточки мероприятия
function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.classList.add('col-md-4');

    // Получаем данные о мероприятии из объекта event
    const imageUrl = event.eventImageURL || 'placeholder.jpg';
    const name = event.eventName || 'Название не указано';
    const price = event.eventPrice || 'Цена не указана';
    const time = event.eventTime || 'Время не указано';

    // Создаем HTML-разметку для карточки мероприятия
    const cardHtml = `
        <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Цена: ${price}</p>
                <p class="card-text">Время: ${time}</p>
            </div>
        </div>
    `;

    // Устанавливаем HTML-разметку в карточку мероприятия
    eventCard.innerHTML = cardHtml;

    return eventCard;
}

// Функция для создания карточки мероприятия
function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.classList.add('col-md-4');

    // Получаем данные о мероприятии из объекта event
    const imageUrl = event.eventImageURL || 'placeholder.jpg';
    const name = event.eventName || 'Название не указано';
    const price = event.eventPrice || 'Цена не указана';
    const time = event.eventTime || 'Время не указано';

    // Создаем HTML-разметку для карточки мероприятия
    const cardHtml = `
        <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Цена: ${price}</p>
                <p class="card-text">Время: ${time}</p>
                <button class="btn btn-primary buyTicketBtn">Купить билет</button>
            </div>
        </div>
    `;

    // Устанавливаем HTML-разметку в карточку мероприятия
    eventCard.innerHTML = cardHtml;

    // Добавляем обработчик события для кнопки "Купить билет"
    const buyTicketBtn = eventCard.querySelector('.buyTicketBtn');
    buyTicketBtn.addEventListener('click', function () {
        // Здесь можно добавить логику для покупки билета
        console.log('Билет на мероприятие куплен:', name);
    });

    return eventCard;
}

