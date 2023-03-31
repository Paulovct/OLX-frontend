import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Reducers/userReducer";

export const store = configureStore({
	reducer: {
		user: userReducer,
	}
})

export type RootState = ReturnType<typeof store.getState>;