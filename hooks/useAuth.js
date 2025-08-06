import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';

export const useRegister = () => {
  return useMutation({
    mutationFn: (data) => api.post('/auth/register', data),
  });
};

export const useVerify = () => {
  return useMutation({
    mutationFn: (data) => api.post('/auth/verify-otp', data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password, remember }) => {
      const res = await api.post('/auth/login', { email, password });
      if (remember) {
        localStorage.setItem('token', res.data.token);
      } else {
        sessionStorage.setItem('token', res.data.token);
      }
      return res.data;
    },
  });
};

