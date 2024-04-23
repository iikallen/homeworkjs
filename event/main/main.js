  // Код JavaScript для взаимодействия с API и управления страницей
        document.addEventListener('DOMContentLoaded', function () {
            // Получаем информацию о пользователе из локального хранилища
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser) {
                // Отображаем имя пользователя в шапке
                document.getElementById('usernamePlaceholder').textContent = loggedInUser.fullName;
            }

            // Обработчик для кнопки выхода из аккаунта
            document.getElementById('logoutBtn').addEventListener('click', function () {
                // Очищаем локальное хранилище и перенаправляем на страницу входа
                localStorage.removeItem('loggedInUser');
                location.href = '../index.html';
            });
        });

        document.addEventListener('DOMContentLoaded', function () {
            // Получаем информацию о пользователе из локального хранилища
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser) {
                // Отображаем имя пользователя в шапке
                document.getElementById('usernamePlaceholder').textContent = loggedInUser.fullName;
            }
        
            // Обработчик для кнопки выхода из аккаунта
            document.getElementById('logoutBtn').addEventListener('click', function () {
                // Очищаем локальное хранилище и перенаправляем на страницу входа
                localStorage.removeItem('loggedInUser');
                location.href = '../index.html';
            });
        });
        
        document.addEventListener('DOMContentLoaded', function () {
            // Находим элемент с именем пользователя
            const usernameElement = document.getElementById('usernamePlaceholder');
        
            // Добавляем обработчик события для нажатия на имя пользователя
            usernameElement.addEventListener('click', function () {
                // Здесь можно добавить логику перехода на личную страницу пользователя
                // Например, перенаправление на страницу личного кабинета или профиля пользователя
                console.log('Переход на личную страницу пользователя');
                // Здесь вы можете использовать window.location.href для перенаправления на другую страницу
                // Например: window.location.href = 'personal_page.html';
            });
        });
        
        document.addEventListener('DOMContentLoaded', function () {
            // Обработчик нажатия кнопки "Купить билет"
            document.querySelectorAll('.buyTicketBtn').forEach(button => {
                button.addEventListener('click', function () {
                    // Получаем информацию о мероприятии из карточки
                    const eventCard = this.closest('.card');
                    const eventName = eventCard.querySelector('.card-title').textContent;
                    const eventPrice = eventCard.querySelector('.card-text').textContent;
        
                    // Отправляем запрос на сервер для регистрации покупки
                    buyTicket(eventName, eventPrice)
                        .then(response => {
                            if (response.ok) {
                                alert('Билет успешно приобретен!');
                            } else {
                                alert('Произошла ошибка при покупке билета.');
                            }
                        })
                        .catch(error => {
                            console.error('Ошибка при отправке запроса:', error);
                            alert('Произошла ошибка при покупке билета.');
                        });
                });
            });
        });
        
        // Функция для отправки запроса на сервер для покупки билета
        function buyTicket(eventName, eventPrice) {
            // Замените этот URL на ваш API endpoint для покупки билетов
            const apiUrl = 'https://your-api.com/buy-ticket';
            // Определите, как передавать данные на сервер, возможно, вам потребуется JSON
            const data = {
                eventName,
                eventPrice
            };
            return fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
        