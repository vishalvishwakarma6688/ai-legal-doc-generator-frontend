'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

const fetchLogs = async () => {
    const { data } = await api.get('/download-logs');
    return data;
};

export const useFetchLogs = () => {
    return useQuery({
        queryKey: ['downloadLogs'],
        queryFn: fetchLogs,
        staleTime: 1000 * 60 * 2,
    });
};