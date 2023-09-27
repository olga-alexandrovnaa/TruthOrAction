/* eslint-disable max-len */

import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getGameFormQuestions = (state: StateSchema) => state.gameForm?.questions;
export const getGameFormActions = (state: StateSchema) => state.gameForm?.actions;
export const getGameFormCurrentText = (state: StateSchema) => state.gameForm?.currentText;
export const getGameFormCurrentTaskType = (state: StateSchema) => state.gameForm?.currentTaskType;
export const getGameFormIsLoading = (state: StateSchema) => state.gameForm?.isLoading;
export const getGameFormError = (state: StateSchema) => state.gameForm?.error;
export const getGameFormIsQuestionsAvailable = (state: StateSchema) => 
    !!state.gameForm?.questions?.find((e) => !e.used)
export const getGameFormIsActionsAvailable = (state: StateSchema) => 
    !!state.gameForm?.actions?.find((e) => !e.used)

export const getUnusedQuestions = createSelector(getGameFormQuestions, (questions) => {
    return questions.filter((e)=>!e.used);
});

export const getUnusedActions = createSelector(getGameFormActions, (actions) => {
    return actions.filter((e)=>!e.used);
});