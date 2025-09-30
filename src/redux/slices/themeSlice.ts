import {createSlice } from "@reduxjs/toolkit"

interface ThemeState {
    theme: 'music'
}

const initialState: ThemeState = {
    theme: 'music'
}

export const themeSlice = createSlice({
    name: 'theme', 
    initialState,
    reducers: {
        // Mantido para compatibilidade, mas não será usado
    }
})

export default themeSlice.reducer