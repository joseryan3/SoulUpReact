const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export function apiUrl(path = '') {
    if (!path) {
        return API_BASE_URL;
    }

    return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function apiFetch(path, options = {}) {
    return fetch(apiUrl(path), {
        credentials: 'include',
        ...options
    });
}

export async function readApiError(response, fallbackMessage) {
    const body = await response.text();

    if (!body) {
        return fallbackMessage;
    }

    try {
        const data = JSON.parse(body);
        return data.message || fallbackMessage;
    } catch {
        return body;
    }
}