import axios from "axios";

const BASE_URL = "https://api.unsplash.com/";
const ACCESS_KEY = import.meta.env.VITE_API_KEY;

const requestParams = {
  orientation: "landscape",
  per_page: 15,
  content_filter: "high",
};

export async function fetchImages(query, page) {
  try {
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
        ...requestParams,
      },
    });

    if (!response.data || !Array.isArray(response.data.results)) {
      throw new Error("Unsplash API не повернув масив зображень.");
    }

    return response.data; // <-- Повертаємо повну відповідь (results + total_pages)
  } catch (error) {
    console.error("❌ Помилка запиту:", error.message);
    return {
      results: [],
      total_pages: 0,
    };
  }
}

export default fetchImages;
