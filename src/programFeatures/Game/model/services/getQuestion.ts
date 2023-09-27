import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUnusedQuestions } from '../selectors/selectors';

export const getQuestion = createAsyncThunk<
    string | null,
    undefined,
    ThunkConfig<string>
>('game/getQuestion', async (_, thunkApi) => {
    const { getState } = thunkApi;
    const unusedQuestions = getUnusedQuestions(getState());
    if(!unusedQuestions || !unusedQuestions.length) return null;
    const question = unusedQuestions[Math.floor(Math.random()*unusedQuestions.length)];
    return question.text;
});
