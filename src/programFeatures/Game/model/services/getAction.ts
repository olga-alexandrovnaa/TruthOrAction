import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUnusedActions } from '../selectors/selectors';

export const getAction = createAsyncThunk<
    string | null,
    undefined,
    ThunkConfig<string>
>('game/getAction', async (_, thunkApi) => {
    const { getState } = thunkApi;
    const unusedActions = getUnusedActions(getState());
    if(!unusedActions.length) return null;
    const action = unusedActions[Math.floor(Math.random()*unusedActions.length)];
    return action.text;
});
