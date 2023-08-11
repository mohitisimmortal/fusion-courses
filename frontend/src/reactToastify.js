// apiUtils.js
import { toast } from 'react-toastify';

export const handleApiError = (error) => {
  const errorMessage = error?.response?.data?.error || 'Something went wrong';
  toast.error(errorMessage);
};
