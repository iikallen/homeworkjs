document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const inputs = form.querySelectorAll('.input-field');
        let isValid = true;
        
        inputs.forEach(function (input) {
            const value = input.value.trim();
            const required = input.getAttribute('data-required');
            const maxLength = parseInt(input.getAttribute('data-max-length')) || Infinity;
            const minLength = parseInt(input.getAttribute('data-min-length')) || 0;
            
            if (required && value === '') {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
            
            if (value.length > maxLength) {
                isValid = false;
                input.classList.add('error');
            }
            
            if (value.length < minLength) {
                isValid = false;
                input.classList.add('error');
            }
        });
        
        if (isValid) {
            alert('Форма отправлена успешно!');
            form.reset(); 
        } else {
            alert('Пожалуйста, заполните форму корректно.');
        }
    });
});
