document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("olympiadsGrid");

    try {
        // Показываем индикатор загрузки
        container.innerHTML = "Загружаем данные...";

        // Запрашиваем данные с API
        const response = await fetch("https://olympiad-api.falpin.ru/api/olympics?page=1&per_page=10 ");
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Получаем текущую дату
        const today = new Date();

        // Фильтруем только будущие олимпиады
        const futureOlympiads = data.filter((olymp) => {
            const startDate = new Date(olymp.start_date);
            return startDate > today;
        });

        // Если нет будущих олимпиад
        if (futureOlympiads.length === 0) {
            container.innerHTML = "<p>Пока нет запланированных олимпиад.</p>";
            return;
        }

        // Очищаем контейнер
        container.innerHTML = "";

        // Рендерим карточки
        futureOlympiads.forEach((olymp) => {
            const card = document.createElement("div");
            card.className = "olympiad-card";
            card.innerHTML = `
                <h3>${olymp.title}</h3>
                <p>Дата начала: ${formatDate(olymp.start_date)}</p>
                <p>Дата окончания: ${formatDate(olymp.end_date)}</p>
                <div class="status upcoming">Скоро</div>
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