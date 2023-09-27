import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import actions from './actions.json';
import questions from './questions.json';

export const getData = createAsyncThunk<
{
    questions: string[],
    actions: string[],
},
    undefined,
    ThunkConfig<string>
>('game/getData', async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        // const formData = new URLSearchParams();
        // formData.append('email', authData.email);
        // formData.append('password', authData.password);

        // const response = await fetch(
        //     __API__ + 'login', 
        //     {
        //         credentials: 'include',
        //         method: "POST",
        //         body: formData
        //     }
        // );
        // const responseJSON = await response.json();

        // if (!responseJSON.result || responseJSON.result !== true ) {
        //     throw new Error();
        // }

        const responseJSON = {
            data: {
                questions: questions,
                actions: actions,
            }
        }
        
        return responseJSON.data;
 
    } catch (e) {
        
        return rejectWithValue('error');
    }
});
