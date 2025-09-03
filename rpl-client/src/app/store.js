import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import modalSlice from '../features/modals/ModalSlice';
import userSlice from '../features/UserSlice';
import menuSlice from '../features/ActiveMenu';
import LoadingSlice from '../features/LoadingSlice';
import SidebarSlice from '../features/SidebarSlice';
import ModalConfirmSlice from '../features/modals/ConfirmModalSlice';
import ModalConfirmdeleteSlice from '../features/modals/ConfirmDeleteModal';

const persist = {
  key : "config",
  storage,
  blacklist: ['loading', 'modal_auth', 'sidebar', 'modal_confirm', 'modal_confirm_delete'],
  whitelist: ['user', 'menu']
}

const rootReducer = combineReducers({
  modal_auth: modalSlice,
  user : userSlice,
  loading : LoadingSlice,
  menu : menuSlice,
  sidebar : SidebarSlice,
  modal_confirm : ModalConfirmSlice,
  modal_confirm_delete : ModalConfirmdeleteSlice
});

export const store = configureStore({
  reducer: persistReducer(persist, rootReducer)
});

export const persistor = persistStore(store);