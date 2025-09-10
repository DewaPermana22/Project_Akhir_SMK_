import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import modalSlice from '@/features/modals/ModalSlice';
import userSlice from '@/features/UserSlice';
import menuSlice from '@/features/ActiveMenu';
import LoadingSlice from '@/features/LoadingSlice';
import SidebarSlice from '@/features/SidebarSlice';
import modalConfirmLogoutSlice from '@/features/modals/ConfirmLogoutModalSlice';
import ModalConfirmdeleteSlice from '@/features/modals/ConfirmDeleteModal';
import PopUpKameraSlice from '@/features/modals/PopUpKameraSlice';

const persist = {
  key : "config",
  storage,
  blacklist: ['loading', 'modal_auth', 'sidebar', 'modal_confirm', 'modal_confirm_delete','popupKamera'],
  whitelist: ['user', 'menu']
}

const rootReducer = combineReducers({
  modal_auth: modalSlice,
  user : userSlice,
  loading : LoadingSlice,
  menu : menuSlice,
  sidebar : SidebarSlice,
  modal_confirm_logout : modalConfirmLogoutSlice,
  modal_confirm_delete : ModalConfirmdeleteSlice,
  popupKamera : PopUpKameraSlice,
});

export const store = configureStore({
  reducer: persistReducer(persist, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);