document.addEventListener('DOMContentLoaded', function () {
    const xInput = document.getElementById('x-input');
    const yButtons = document.querySelectorAll('.num-btn');
    const rRadioButtons = document.querySelectorAll('input[name="R-value"]');
    const submitBtn = document.getElementById('submit-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultTableBody = document.querySelector('.Set-table tbody');

    let selectedY = null;
    let selectedR = null;

    yButtons.forEach(button => {
        button.addEventListener('click', () => {
            yButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedY = parseFloat(button.textContent.replace(',', '.'));
            removePopup('y-error');
        });
    });

    rRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            selectedR = parseFloat(radio.value);
            removePopup('r-error');
        });
    });

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        removeAllPopups();

        let isValid = true;
        const xValue = parseFloat(xInput.value.replace(',', '.'));

        if (isNaN(xValue) || xValue < -3 || xValue > 3) {
            createPopup(xInput, 'Введите значение X от -3 до 3', 'x-error', { topOffset: -10, leftOffset: -90 });
            isValid = false;
        }

        if (selectedY === null) {
            createPopup(yButtons[0], 'Выберите значение Y', 'y-error', { topOffset: -5, leftOffset: -55 });
            isValid = false;
        }

        if (selectedR === null) {
            createPopup(rRadioButtons[0], 'Выберите значение R', 'r-error', { topOffset: 5, leftOffset: -60 });
            isValid = false;
        }

        if (isValid) {
            removeAllPopups();
            sendDataToServer(xValue, selectedY, selectedR);
        }
    });

    clearBtn.addEventListener('click', () => {
        clearTable();
    });

    function sendDataToServer(x, y, r) {
        const queryParams = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&r=${encodeURIComponent(r)}`;
        const url = `http://localhost:8080/fcgi-bin/server.jar?${queryParams}`;

        fetch(url, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert('Ошибка при отправке данных на сервер!');
            }
        }).then(data => {
            if (data) {
                console.log("Ответ сервера:", data);
                if (data.ошибка) {
                    alert(`Ошибка: ${data.ошибка}`);
                } else {
                    addRowToTable(x, y, r, data.сейчас, data.времяВыполнения, data.результат);
                }
            }
        }).catch(error => {
            console.error('Ошибка сети:', error);
            alert('Ошибка сети! Проверьте соединение.');
        });
    }

    function addRowToTable(x, y, r, currentTime, executionTime, result) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td>${x}</td>
        <td>${y}</td>
        <td>${r}</td>
        <td>${currentTime}</td>
        <td>${executionTime}</td>
        <td style="color: ${result ? 'purple' : 'red'};">${result ? 'you are goddamn right' : 'No no no no'}</td>
    `;
        resultTableBody.appendChild(newRow);
    }

    function clearTable() {
        resultTableBody.innerHTML = '';
    }

    function createPopup(element, message, id, options = {}) {
        const rect = element.getBoundingClientRect();
        const popup = document.createElement('div');
        popup.className = 'error-popup';
        popup.id = id;
        popup.textContent = message;

        const topOffset = options.topOffset || -35;
        const leftOffset = options.leftOffset || 10;

        popup.style.top = (rect.top + window.scrollY + topOffset) + 'px';
        popup.style.left = (rect.left + window.scrollX + rect.width + leftOffset) + 'px';

        document.body.appendChild(popup);
    }

    function removePopup(id) {
        const popup = document.getElementById(id);
        if (popup) popup.remove();
    }

    function removeAllPopups() {
        document.querySelectorAll('.error-popup').forEach(popup => popup.remove());
    }
});
