import React from 'react';
import { apiFetch, readApiError } from '../../services/api';

export const initialUsers = [];
export const initialVideos = [];
export const initialTickets = [];

const ENDPOINTS_BY_KEY = {
    users: '/api/admin/users',
    videos: '/api/admin/videos',
    tickets: '/api/admin/tickets',
};

export function useAdminCollection(key, initialItems = []) {
    const [items, setItems] = React.useState(initialItems);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    const reload = React.useCallback(async () => {
        const endpoint = ENDPOINTS_BY_KEY[key];
        if (!endpoint) return;

        try {
            setLoading(true);
            setError('');
            const response = await apiFetch(endpoint);

            if (!response.ok) {
                throw new Error(await readApiError(response, `Erro ao carregar ${key}.`));
            }

            const data = await response.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Falha ao conectar com o servidor.');
        } finally {
            setLoading(false);
        }
    }, [key]);

    React.useEffect(() => {
        reload();
    }, [reload]);

    const updateItems = (transform) => {
        setItems((prev) => (typeof transform === 'function' ? transform(prev) : transform));
    };

    return [items, updateItems, { loading, error, reload }];
}

export async function toggleUserStatusApi(id) {
    const response = await apiFetch(`/api/admin/users/${id}/status`, { method: 'PATCH' });
    if (!response.ok) {
        throw new Error(await readApiError(response, 'Erro ao alterar status do usuário.'));
    }
    return response.json();
}

export async function deleteVideoApi(id) {
    const response = await apiFetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(await readApiError(response, 'Erro ao excluir vídeo.'));
    }
}

export async function updateTicketStatusApi(id, status) {
    const response = await apiFetch(`/api/admin/tickets/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) {
        throw new Error(await readApiError(response, 'Erro ao atualizar ticket.'));
    }
    return response.json();
}