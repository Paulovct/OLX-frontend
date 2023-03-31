import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
	name:"user",
	initialState: {
		email : ""
	},
	reducers: {
		setEmail : (state , action)=>{
			state.email = action.payload;
		}
	}
});

export const { setEmail } = slice.actions;
export default slice.reducer;