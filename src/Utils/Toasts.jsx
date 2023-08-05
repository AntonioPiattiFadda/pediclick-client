import { toast } from 'react-toastify';

export const addProduct = () => {
  return toast.info('🦄 Wow so easy!', {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
