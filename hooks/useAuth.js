import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
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
        localStorage.setItem("user", JSON.stringify(res.data.user))
      } else {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user))
      }
      return res.data;
    },
  });
};

// Step 1 – Send OTP
export const useSendResetOTP = () => {
  return useMutation({
    mutationFn: (data) => api.post('/auth/send-reset-otp', data),
    onSuccess: (data) => {
      toast.success(data.msg || 'OTP sent to your email!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.msg || 'Failed to send OTP');
    }
  });
};

// Step 2 – Verify OTP & Get Reset Token
export const useVerifyResetOTP = () => {
  return useMutation({
    mutationFn: (data) => api.post('/auth/verify-reset-otp', data),
    onSuccess: (data) => {
      toast.success(data.msg || 'OTP verified successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.msg || 'Invalid or expired OTP');
    }
  });
};

// Step 3 – Reset Password with Reset Token
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => api.post('/auth/reset-password', data),
    onSuccess: (data) => {
      toast.success(data.msg || 'Password reset successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.msg || 'Failed to reset password');
    }
  });
};
