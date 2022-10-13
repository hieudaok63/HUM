import { configureStore } from '@reduxjs/toolkit';
import { availabilitySlice } from './todo-slice'

const store = configureStore(
    {
        reducer: { availability: availabilitySlice.reducer }
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;