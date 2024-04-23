document.addEventListener('DOMContentLoaded', function () {
    // Обработчик для отправки данных формы при создании мероприятия
    document.getElementById('createEventForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвратить отправку формы по умолчанию

        // Получить данные из формы
        const eventImageURL = document.getElementById('eventImageURL').value;
        const eventName = document.getElementById('eventName').value;
        const eventPrice = document.getElementById('eventPrice').value;
        const eventTime = document.getElementById('eventTime').value;

        // Создать объект для отправки данных на сервер
        const eventData = {
            eventImageURL: eventImageURL,
            eventName: eventName,
            eventPrice: eventPrice,
            eventTime: eventTime
        };

        // Отправляем данные на сервер
        fetch('https://bd4712ed75be2cbe.mokky.dev/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type на application/json
            },
            body: JSON.stringify(eventData) // Преобразуем объект в JSON строку перед отправкой
        })
            .then(response => response.json())
            .then(data => {
                // Обработка ответа от сервера (если необходимо)
                console.log(data);
                // Перенаправить на страницу main.html для отображения мероприятий
                location.href = 'file:///C:/Users/berik/Desktop/events/admin/admin.html';
            })
            .catch(error => console.error('Ошибка:', error));
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Обработчик для открытия модального окна и заполнения данных мероприятия при редактировании
    const editDeleteEventModal = new bootstrap.Modal(document.getElementById('editDeleteEventModal'));
    document.getElementById('editDeleteEventModal').addEventListener('show.bs.modal', function (event) {
        const eventId = event.relatedTarget.dataset.eventId;
        fetch(`https://bd4712ed75be2cbe.mokky.dev/events/${eventId}`)
            .then(response => response.json())
            .then(eventData => {
                // Заполнение формы данными мероприятия
                document.getElementById('editEventImageURL').value = eventData.eventImageURL;
                document.getElementById('editEventName').value = eventData.eventName;
                document.getElementById('editEventPrice').value = eventData.eventPrice;
                document.getElementById('editEventTime').value = eventData.eventTime;

                // Установка атрибута data-event-id для кнопки удаления мероприятия
                document.getElementById('deleteEventBtn').setAttribute('data-event-id', eventId);
            })
            .catch(error => console.error('Ошибка при получении данных мероприятия:', error));
    });

    // Обработчик для отправки данных формы при редактировании мероприятия
    document.getElementById('editEventForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвратить отправку формы по умолчанию

        // Получить данные из формы
        const eventId = document.getElementById('deleteEventBtn').dataset.eventId;
        const eventImageURL = document.getElementById('editEventImageURL').value;
        const eventName = document.getElementById('editEventName').value;
        const eventPrice = document.getElementById('editEventPrice').value;
        const eventTime = document.getElementById('editEventTime').value;

        // Создать объект для отправки данных на сервер
        const eventData = {
            eventImageURL: eventImageURL,
            eventName: eventName,
            eventPrice: eventPrice,
            eventTime: eventTime
        };

        // Отправляем данные на сервер для обновления мероприятия
        fetch(`https://bd4712ed75be2cbe.mokky.dev/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(response => response.json())
            .then(data => {
                // Обработка ответа от сервера (если необходимо)
                console.log(data);
                // Закрыть модальное окно
                editDeleteEventModal.hide();
            })
            .catch(error => console.error('Ошибка при обновлении мероприятия:', error));
    });

    // Обработчик для удаления мероприятия
    document.getElementById('deleteEventBtn').addEventListener('click', function () {
        const eventId = this.dataset.eventId;
        fetch(`https://bd4712ed75be2cbe.mokky.dev/events/${eventId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Обработка успешного удаления мероприятия
                    console.log('Мероприятие успешно удалено');
                    // Закрыть модальное окно
                    editDeleteEventModal.hide();
                } else {
                    throw new Error('Ошибка при удалении мероприятия');
                }
            })
            .catch(error => console.error(error));
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const eventList = document.getElementById('eventList');

    // Функция для отображения списка мероприятий
    function displayEvents(events) {
        eventList.innerHTML = ''; // Очищаем список перед заполнением

        events.forEach(event => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'col', 'mb-4'); // Добавлены классы col и mb-4 для Bootstrap grid system

            // Создаем div для размещения данных мероприятия
            const eventInfo = document.createElement('div');

            // Добавляем изображение мероприятия
            const eventImage = document.createElement('img');
            eventImage.src = event.eventImageURL;
            eventImage.alt = event.eventName;
            eventImage.classList.add('img-thumbnail', 'mb-3', 'img-fluid'); // Добавлен класс img-fluid
            eventInfo.appendChild(eventImage);

            // Добавляем данные мероприятия в блок
            const eventData = document.createElement('div');
            eventData.innerHTML = `
                <p><strong>Название:</strong> ${event.eventName}</p>
                <p><strong>Цена:</strong> ${event.eventPrice}</p>
                <p><strong>Время:</strong> ${event.eventTime}</p>
                <!-- Другие данные мероприятия, если необходимо -->
            `;
            eventInfo.appendChild(eventData);

            // Добавляем блок с данными мероприятия в элемент списка
            listItem.appendChild(eventInfo);

            // Добавляем кнопку редактирования для каждого мероприятия
            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-primary', 'editEventBtn');
            editButton.textContent = 'Редактировать';
            editButton.dataset.eventId = event.id;
            editButton.dataset.bsToggle = 'modal';
            editButton.dataset.bsTarget = '#editDeleteEventModal';
            listItem.appendChild(editButton);

            eventList.appendChild(listItem);
        });
    }

    // Получаем список мероприятий с сервера и отображаем его
    fetch('https://bd4712ed75be2cbe.mokky.dev/events')
        .then(response => response.json())
        .then(events => displayEvents(events))
        .catch(error => console.error('Ошибка при получении списка мероприятий:', error));
});

document.addEventListener('DOMContentLoaded', function () {
    // Обработчик для открытия модального окна и заполнения данных мероприятия при редактировании
    const editDeleteEventModal = new bootstrap.Modal(document.getElementById('editDeleteEventModal'));
    document.getElementById('editDeleteEventModal').addEventListener('show.bs.modal', function (event) {
        const eventId = event.relatedTarget.dataset.eventId;
        fetch(`https://bd4712ed75be2cbe.mokky.dev/events/${eventId}`)
            .then(response => response.json())
            .then(eventData => {
                // Заполнение формы данными мероприятия
                document.getElementById('editEventImageURL').value = eventData.eventImageURL;
                document.getElementById('editEventName').value = eventData.eventName;
                document.getElementById('editEventPrice').value = eventData.eventPrice;
                document.getElementById('editEventTime').value = eventData.eventTime;

                // Установка атрибута data-event-id для кнопки удаления мероприятия
                document.getElementById('deleteEventBtn').setAttribute('data-event-id', eventId);
            })
            .catch(error => console.error('Ошибка при получении данных мероприятия:', error));
    });

    // Обработчик для отправки данных формы при редактировании мероприятия
    document.getElementById('editEventForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвратить отправку формы по умолчанию

        // Получить данные из формы
        const eventId = document.getElementById('deleteEventBtn').dataset.eventId;
        const eventImageURL = document.getElementById('editEventImageURL').value;
        const eventName = document.getElementById('editEventName').value;
        const eventPrice = document.getElementById('editEventPrice').value;
        const eventTime = document.getElementById('editEventTime').value;

        // Создать объект для отправки данных на сервер
        const eventData = {
            eventImageURL: eventImageURL,
            eventName: eventName,
            eventPrice: eventPrice,
            eventTime: eventTime
        };

        // Отправляем данные на сервер для обновления мероприятия
        fetch(`https://bd4712ed75be2cbe.mokky.dev/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(response => response.json())
            .then(data => {
                // Обработка ответа от сервера (если необходимо)
                console.log(data);
                // Закрыть модальное окно
                editDeleteEventModal.hide();
            })
            .catch(error => console.error('Ошибка при обновлении мероприятия:', error));
    });

    // Обработчики для изменения данных мероприятия при вводе в поля формы
    document.getElementById('editEventImageURL').addEventListener('input', function () {
        updateEventData();
    });

    document.getElementById('editEventName').addEventListener('input', function () {
        updateEventData();
    });

    document.getElementById('editEventPrice').addEventListener('input', function () {
        updateEventData();
    });

    document.getElementById('editEventTime').addEventListener('input', function () {
        updateEventData();
    });

    // Функция для обновления объекта eventData при изменении данных мероприятия
    function updateEventData() {
        const eventImageURL = document.getElementById('editEventImageURL').value;
        const eventName = document.getElementById('editEventName').value;
        const eventPrice = document.getElementById('editEventPrice').value;
        const eventTime = document.getElementById('editEventTime').value;

        eventData.eventImageURL = eventImageURL;
        eventData.eventName = eventName;
        eventData.eventPrice = eventPrice;
        eventData.eventTime = eventTime;
    }
});
