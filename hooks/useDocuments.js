'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

// Fetch all user documents
const fetchDocuments = async () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const { data } = await axios.get('http://localhost:5000/api/documents/my-documents', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
    staleTime: 1000 * 60 * 2, // Cache for 2 mins
  });
};

// Fetch a single document by ID
export const useDocument = (id) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:5000/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    enabled: !!id,
  });
};

// Delete a document
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success('Document deleted');
      queryClient.invalidateQueries(['documents']);
    },
    onError: () => {
      toast.error('Failed to delete document');
    },
  });
};


export const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, title, content }) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const { data } = await axios.put(`http://localhost:5000/api/documents/${id}`, 
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      toast.success('Document updated');
      queryClient.invalidateQueries(['documents']);
    },
    onError: () => {
      toast.error('Failed to update document');
    },
  });
};
