import axios from "axios";

const BASE_URL = "https://api.unsplash.com/";
const ACCESS_KEY = import.meta.env.VITE_API_KEY; // Переконайся, що ключ доступний

const requestParams = {
    orientation: "landscape",
    per_page: 15,
    content_filter: "high",
};

export async function fetchImages(query, page) {
    try {
        // Переконуємося, що API-ключ доступний
        if (!ACCESS_KEY) {
            throw new Error("API ключ не знайдено! Переконайся, що .env файл правильно налаштований.");
        }

        const response = await axios.get(`${BASE_URL}search/photos`, {
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`,
            },
            params: {
                query,
                page,
                ...requestParams, // Використовуємо загальні параметри
            },
        });

        // Перевіряємо, чи API повернув дані
        if (!response.data || !response.data.results) {
            throw new Error("Unsplash API не повернув зображення.");
        }

        return response.data.results; // Повертаємо масив зображень
    } catch (error) {
        console.error("Помилка запиту:", error.message);
        return [];
    }
}

export default fetchImages ; 
