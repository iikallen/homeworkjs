document.addEventListener('DOMContentLoaded', function () {
    // Fetch user data from your backend
    fetchUserData()
        .then(userData => {
            // Populate the profile section with user data
            document.getElementById('fullName').textContent = "Имя: " + userData[0].fullName;
            document.getElementById('email').textContent = "Email: " + userData[0].email;
            // Check if phone number is available
            if (userData[0].phone) {
                document.getElementById('phoneContainer').textContent = "Телефон: " + userData[0].phone;
            } else {
                // If phone number is not available, create an input field for it
                const phoneInput = document.createElement('input');
                phoneInput.setAttribute('type', 'text');
                phoneInput.setAttribute('placeholder', 'Введите номер телефона');
                phoneInput.setAttribute('id', 'phoneInput');
                document.getElementById('phoneContainer').appendChild(phoneInput);
            }
        })
        .catch(error => console.error('Error fetching user data:', error));

    // Add event listener to save phone number button
    document.getElementById('savePhoneBtn').addEventListener('click', function () {
        const phone = document.getElementById('phoneInput').value;
        // Call function to save phone number to backend
        savePhone(phone);
    });
});

// Function to fetch user data from your backend
function fetchUserData() {
    // Replace this URL with your actual backend API endpoint
    return fetch('https://bd4712ed75be2cbe.mokky.dev/users', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'), // Add authorization header if needed
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return response.json();
    });
}

// Function to save phone number to backend
function savePhone(phone) {
    // Replace this URL with your actual backend API endpoint
    fetch('https://bd4712ed75be2cbe.mokky.dev/users/1', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'), // Add authorization header if needed
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone: phone }) // Send phone number in the request body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save phone number');
        }
        alert('Номер телефона успешно сохранён');
    })
    .catch(error => console.error('Error saving phone number:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    // Обработчик события для кнопки "Мои заказы"
    document.getElementById('myOrdersBtn').addEventListener('click', function () {
        // Очищаем предыдущий список заказов, если он был
        const myOrdersContainer = document.getElementById('myOrders');
        myOrdersContainer.innerHTML = '';

        // Получаем список мероприятий, на которые пользователь купил билеты
        const boughtEvents = getBoughtEvents(); // Ваша функция для получения списка купленных мероприятий

        // Отображаем каждое мероприятие в списке заказов
        boughtEvents.forEach(event => {
            const eventItem = createEventItem(event);
            myOrdersContainer.appendChild(eventItem);
        });
    });
});

// Функция для создания элемента списка для мероприятия
function createEventItem(event) {
    const eventItem = document.createElement('div');
    eventItem.classList.add('event-item');
    eventItem.innerHTML = `
        <div>
            <h5>${event.name}</h5>
            <p>Дата: ${event.date}</p>
            <p>Цена: ${event.price}</p>
        </div>
    `;
    return eventItem;
}
