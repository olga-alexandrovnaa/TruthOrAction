/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSchema } from '../types/gameSchema';
import { getData } from '../services/getData';
import { GAME_DATA } from '@/sharedComponents/const/localstorage';
import { getAction } from '../services/getAction';
import { getQuestion } from '../services/getQuestion';

const initialState: GameSchema = {
  actions: [],
  questions: [],
  isLoading: false,
  currentText: '',
  currentTaskType: 'question',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGameData: (state) => {
      state.isLoading = true;
      const gameDataString = localStorage.getItem(GAME_DATA);
      if (gameDataString) {
        try {
          const gameData = JSON.parse(gameDataString);
          state.questions = gameData.questions;
          state.actions = gameData.actions;
          state.currentText = gameData.currentText;
          state.currentTaskType = gameData.currentTaskType;
        } catch {
          state.questions = [];
          state.actions = [];
          state.currentText = '';
          state.currentTaskType = 'question';
        }
      }
      state.isLoading = false;
    },
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(getData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
        localStorage.removeItem(GAME_DATA);
    })
    .addCase(getData.fulfilled, (state, action: PayloadAction<{
      questions: string[],
      actions: string[],
    }>) => {
        state.actions = action.payload.actions.map((e)=>({text: e, used: false}));
        state.questions = action.payload.questions.map((e)=>({text: e, used: false}));

        const question = state.questions[Math.floor(Math.random()*state.questions.length)];
        question.used = true;
        state.currentText = question.text;
        state.currentTaskType = 'question';

        localStorage.setItem(GAME_DATA, JSON.stringify({
          actions: state.actions, 
          questions: state.questions, 
          currentText: state.currentText, 
          currentTaskType: state.currentTaskType, 
        }));

        state.isLoading = false;
    })
    .addCase(getData.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
    })
    .addCase(getAction.fulfilled, (state, action: PayloadAction<string | null>) => {
        if(action.payload){
          const item = state.actions.find((e)=>e.text === action.payload);
          item.used = true;
        }
        state.currentText = action.payload ?? '';
        state.currentTaskType = 'action';

        localStorage.setItem(GAME_DATA, JSON.stringify({
          actions: state.actions, 
          questions: state.questions, 
          currentText: state.currentText, 
          currentTaskType: state.currentTaskType, 
        }));
    })
    .addCase(getQuestion.fulfilled, (state, action: PayloadAction<string | null>) => {
      if(action.payload){
        const item = state.questions.find((e)=>e.text === action.payload);
        item.used = true;
      }
      state.currentText = action.payload ?? '';
      state.currentTaskType = 'question';

      localStorage.setItem(GAME_DATA, JSON.stringify({
        actions: state.actions, 
        questions: state.questions, 
        currentText: state.currentText, 
        currentTaskType: state.currentTaskType, 
      }));
    });
    

  },
});

export const { actions: gameActions } = gameSlice;
export const { reducer: gameReducer } = gameSlice;
