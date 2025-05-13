document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("olympiadsGrid");

    try {
        // Индикатор загрузки
        container.innerHTML = "Загружаем данные...";

        // Запрос к API
        const response = await fetch("https://olympiad-api.falpin.ru/api/olympics?page=1&per_page=10 ");
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Текущая дата
        const today = new Date();

        // Фильтруем только те, которые сейчас идут
        const currentOlympiads = data.filter((olymp) => {
            const startDate = new Date(olymp.start_date);
            const endDate = new Date(olymp.end_date);
            return startDate <= today && endDate >= today;
        });

        // Если нет текущих олимпиад
        if (currentOlympiads.length === 0) {
            container.innerHTML = "<p>Сейчас нет активных олимпиад.</p>";
            return;
        }

        // Очищаем контейнер
        container.innerHTML = "";

        // Рендерим карточки
        currentOlympiads.forEach((olymp) => {
            const card = document.createElement("div");
            card.className = "olympiad-card";
            card.innerHTML = `
                <h3>${olymp.title}</h3>
                <p>Дата начала: ${formatDate(olymp.start_date)}</p>
                <p>Дата окончания: ${formatDate(olymp.end_date)}</p>
                <div class="status active">Идёт</div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Ошибка:", error);
        container.innerHTML = "<p>Не удалось загрузить данные. Попробуйте позже.</p>";
    }
});

// Форматируем дату под русский формат
function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
}