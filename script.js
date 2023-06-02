const form = document.querySelector(".form");
const popup = document.querySelector(".popup");
const closeBtn = popup.querySelector(".close");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // отменяем стандартное поведение формы
    // Здесь твой код
});

const nameInput = document.querySelector('#name');
const secondNameInput = document.querySelector('#secondName');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const agreeCheckbox = document.querySelector('#agree');

// Добавляем обработчик события click на кнопку отправки формы
const sendButton = document.querySelector('#button');
sendButton.addEventListener('click', function(event) {
    //отменяем стандартное поведение кнопки submit
    event.preventDefault();

    if (agreeCheckbox.checked) {
        //если чекбокс отмечен, то отправляем данные на сервер

        //отправляем POST-запрос на сервер
        fetch(`https://polinashneider.space/user`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer: OlgaListopad'
                },
                body: JSON.stringify({
                    "name": nameInput.value,
                    "secondName": secondNameInput.value,
                    "phone": phoneInput.value,
                    "email": emailInput.value,
                    "agree": agreeCheckbox.checked
                }),
            })
            .then(response => response.json()) //преобразуем ответ в json
            .then(data => {
                popup.classList.add("show");
                popup.addEventListener("click", () => {
                    popup.classList.remove("show"); // удаляем класс для скрытия pop-up окна при клике на него
                });
                closeBtn.addEventListener("click", () => {
                    popup.classList.remove("show"); // удаляем класс для скрытия pop-up окна при клике на иконку крестика
                });
                form.reset(); //очищаем поля формы

            })
            .catch(error => {
                console.log(error); //выводим ошибку в консоль
                alert('Произошла ошибка при отправке данных на сервер'); //показываем пользователю сообщение об ошибке
            });
    } else {
        //если чекбокс не отмечен, то выводим сообщение об ошибке
        alert('Необходимо дать согласие на обработку персональных данных');
    }
})

//Получение данных для самопроверки
/*
fetch(`http://46.21.248.81:3001/my-users`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer: OlgaListopad'
        },
    })
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        console.log(data);
    })
    */
