'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import toast from 'react-hot-toast';

// Fetch all templates
const fetchTemplates = async () => {
    const { data } = await api.get('/templates');
    return data;
};

export const useTemplates = () => {
    return useQuery({
        queryKey: ['templates'],
        queryFn: fetchTemplates,
        staleTime: 1000 * 60 * 2,
    });
};

// Fetch single template by ID
export const useTemplate = (id) => {
    return useQuery({
        queryKey: ['template', id],
        queryFn: async () => {
            const { data } = await api.get(`/templates/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

// Create new template
export const useCreateTemplate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ title, content }) => {
            const { data } = await api.post('/templates', { title, content });
            return data;
        },
        onSuccess: () => {
            toast.success('Template created');
            queryClient.invalidateQueries(['templates']);
        },
        onError: () => {
            toast.error('Failed to create template');
        },
    });
};

export const useDownloadTemplate = () => {
    return useMutation({
        mutationFn: async ({ id, data }) => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await api.post(`/templates/${id}/download`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `template-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        onError: () => {
            toast.error('Failed to download template');
        },
    });
};