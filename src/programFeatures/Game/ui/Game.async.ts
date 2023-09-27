import { FC, lazy } from 'react';
import { GameFormProps } from './Game';

export const GameFormAsync = lazy<FC<GameFormProps>>(
    () => import('./Game'),
);
