
    document.addEventListener("DOMContentLoaded", function () {
        const sidebarToggle = document.querySelector("#sidebar-toggle");
        sidebarToggle.addEventListener("click", function () {
            document.querySelector("#sidebar").classList.toggle("collapsed");
        });

        document.querySelector(".theme-toggle").addEventListener("click", () => {
            toggleLocalStorage();
            toggleRootClass();
        });

        function toggleRootClass() {
            const current = document.documentElement.getAttribute('data-bs-theme');
            const inverted = current == 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', inverted);
        }

        function toggleLocalStorage() {
            if (isLight()) {
                localStorage.removeItem("light");
            } else {
                localStorage.setItem("light", "set");
            }
        }

        function isLight() {
            return localStorage.getItem("light");
        }

        if (isLight()) {
            toggleRootClass();
        }

        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener("click", function () {
                toggleRadio(this);
            });
        });

        function toggleRadio(radio) {
            if (radio === lastChecked) {
                radio.checked = false;
                lastChecked = null;
            } else {
                lastChecked = radio;
            }
        }

        const chatForm = document.querySelector("#chatForm");
        chatForm.addEventListener("submit", function (event) {
            event.preventDefault();
            postMessage();
        });

        function postMessage() {
            const message = document.getElementById('chatMessage').value;
            if (message.trim() === '') return;

            const chatWindow = document.getElementById('chatWindow');
            const newMessage = document.createElement('p');
            newMessage.textContent = message;
            chatWindow.appendChild(newMessage);

            document.getElementById('chatMessage').value = '';
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    });
