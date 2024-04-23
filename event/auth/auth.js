const login = document.getElementById('login')
const password = document.getElementById('password')
const form = document.querySelector('form')
let errorDisplayed = false;

async function getUsers(login, password) {
    const response = await fetch('https://bd4712ed75be2cbe.mokky.dev/users')
    const data = await response.json()
    let isUserAuthenticated = false;

    data.forEach(element => {
        if (element.login === login && element.passwordUser === password) {
            isUserAuthenticated = true;
            // Сохраняем логин и полное имя в локальном хранилище
            localStorage.setItem('loggedInUser', JSON.stringify({
                login: element.login,
                fullName: element.fullName
            }));
            location.href = '../main/main.html';
        }
    });

    if (!isUserAuthenticated && !errorDisplayed) {
        const errorElement = document.createElement('span')
        errorElement.textContent = 'Неправильный логин или пароль'
        errorElement.classList.add('text-danger')
        form.append(errorElement)
        errorDisplayed = true;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    getUsers(login.value, password.value)
})
