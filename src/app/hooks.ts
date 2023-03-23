import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useErrorToast = (
    condition: boolean,
    message: string,
    toastId: string
) => {
    const toast = useToast();
    if (condition && !toast.isActive(toastId)) {
        return () =>
            toast({
                description: message,
                id: toastId,
                title: 'Oops!',
                status: 'error',
                position: 'top',
            });
    }
    return () => null;
};
