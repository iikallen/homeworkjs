const loginInput = document.getElementById('login');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const fullNameInput = document.getElementById('fullName');
const form = document.querySelector('form');

// Добавляем обработчик события для формы
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения из полей формы
    const login = loginInput.value;
    const email = emailInput.value;
    const passwordUser = passwordInput.value;
    const fullName = fullNameInput.value;

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        // Если пользователь уже существует, обновляем его данные
        await updateUser(existingUser.id, login, passwordUser, fullName);
    } else {
        // Если пользователь не существует, добавляем нового пользователя
        await addUser(login, email, passwordUser, fullName);
    }

    // Перенаправляем пользователя после успешной регистрации или обновления
    location.href = '../auth/auth.html';
});

// Функция для получения пользователя по email
async function getUserByEmail(email) {
    try {
        const response = await fetch(`https://bd4712ed75be2cbe.mokky.dev/users?email=${email}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        return userData.length > 0 ? userData[0] : null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

// Функция для добавления нового пользователя
async function addUser(login, email, passwordUser, fullName) {
    try {
        const response = await fetch('https://bd4712ed75be2cbe.mokky.dev/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login,
                email,
                passwordUser,
                fullName,
                number: 12345
            })
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Функция для обновления данных пользователя
async function updateUser(userId, login, passwordUser, fullName) {
    try {
        const response = await fetch(`https://bd4712ed75be2cbe.mokky.dev/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login,
                passwordUser,
                fullName
            })
        });
        if (!response.ok) {
            throw new Error('Failed to update user data');
        }
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}
