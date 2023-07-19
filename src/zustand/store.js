import { create } from 'zustand';
import authSlice from './authSlice';

export const useAuth = create(authSlice);
