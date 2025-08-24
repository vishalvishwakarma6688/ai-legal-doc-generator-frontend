'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useGenerateDocument = () => {
  return useMutation({
    mutationFn: async (prompt) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const { data } = await axios.post(
        'http://localhost:5000/api/documents/generate',
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      toast.success('Document generated successfully!');
    },
    onError: () => {
      toast.error('Failed to generate document. Try again.');
    },
  });
};