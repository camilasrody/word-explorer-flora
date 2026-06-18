import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  selectedWord: string | null
}

const initialState: UiState = {
  selectedWord: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedWord(state, action: PayloadAction<string | null>) {
      state.selectedWord = action.payload
    },
  },
})

export const { setSelectedWord } = uiSlice.actions
export default uiSlice.reducer
