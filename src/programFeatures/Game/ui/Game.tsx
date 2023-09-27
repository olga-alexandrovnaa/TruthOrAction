import { useSelector } from "react-redux";
import { memo, useCallback, useEffect, useMemo } from "react";
import cls from "./Game.module.scss";
import {
  getGameFormIsQuestionsAvailable,
  getGameFormIsActionsAvailable,
  getGameFormIsLoading,
  getGameFormError,
  getGameFormCurrentText,
  getGameFormCurrentTaskType,
  getGameFormQuestions,
  getGameFormActions,
} from "../model/selectors/selectors";
import { useAppDispatch } from "@/sharedComponents/lib/hooks/useAppDispatch/useAppDispatch";
import { gameReducer, gameActions } from "../model/slice/gameFormSlice";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/sharedComponents/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/sharedComponents/lib/classNames/classNames";
import { ReactComponent as TruthPic } from "@/sharedComponents/assets/pics/truth.svg";
import { ReactComponent as GameOverPic } from "@/sharedComponents/assets/pics/gameOver.svg";
import { ReactComponent as ActionPic } from "@/sharedComponents/assets/pics/action.svg";
import { Loader } from "@/sharedComponents/ui/Loader";
import { Button } from "@/sharedComponents/ui/Button";
import { getAction } from "../model/services/getAction";
import { getQuestion } from "../model/services/getQuestion";
import { GAME_DATA } from "@/sharedComponents/const/localstorage";
import { getData } from "../model/services/getData";

export interface GameFormProps {
  className?: string;
}

const initialReducers: ReducersList = {
  gameForm: gameReducer,
};

const GameForm = memo(({ className }: GameFormProps) => {
  const dispatch = useAppDispatch();
  const questions = useSelector(getGameFormQuestions);
  const actions = useSelector(getGameFormActions);

  const isQuestionsAvailable = useSelector(getGameFormIsQuestionsAvailable);
  const isActionsAvailable = useSelector(getGameFormIsActionsAvailable);
  const currentText = useSelector(getGameFormCurrentText);
  const currentTaskType = useSelector(getGameFormCurrentTaskType);
  const isLoading = useSelector(getGameFormIsLoading);
  const error = useSelector(getGameFormError);

  console.log("questions", questions)
  console.log("actions", actions)
  console.log('isQuestionsAvailable', isQuestionsAvailable)
  console.log('isActionsAvailable', isActionsAvailable)
  console.log('currentTaskType', currentTaskType)

  const restartGame = useCallback(() => {
    dispatch(getData());
  }, [dispatch]);
  const onGetActionClick = useCallback(async () => {
    dispatch(getAction());
  }, [dispatch]);
  const onGetQuestionClick = useCallback(async () => {
    dispatch(getQuestion());
  }, [dispatch]);

  const pic = useMemo(() => {
    if (!isQuestionsAvailable && !isActionsAvailable) return <GameOverPic />;
    switch (currentTaskType) {
      case "question":
        return <TruthPic />;
      case "action":
        return <ActionPic />;
    }
  }, [currentTaskType, isActionsAvailable, isQuestionsAvailable]);

  useEffect(() => {
    const gameDataString = localStorage.getItem(GAME_DATA);
    if (gameDataString) {
      dispatch(gameActions.initGameData());
    } else {
      dispatch(getData());
    }
  }, []);

  console.log("first");

  if (error)
    return (
      <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        <div className={classNames(cls.GameForm, {}, [className])}>
          <span className={cls.Error}>Произошла ошибка</span>
        </div>
      </DynamicModuleLoader>
    );
  if (isLoading)
    return (
      <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        <div className={cls.loader}>
          <Loader />
        </div>
      </DynamicModuleLoader>
    );

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.GameForm, {}, [className])}>
        {pic}

        <p className={cls.text}>{currentText}</p>

        {!isQuestionsAvailable && !isActionsAvailable && (
          <p className={cls.gameOverText}>
            Вы ответили на все вопросы и выполнили все задания
          </p>
        )}

        <div className={cls.nextTaskActions}>
          <Button
            className={classNames(cls.taskBtn, {
              [cls.taskBtnDisabled]: !isQuestionsAvailable,
            })}
            onClick={onGetQuestionClick}
          >
            Правда
          </Button>
          <Button
            className={classNames(cls.taskBtn, {
              [cls.taskBtnDisabled]: !isActionsAvailable,
            })}
            onClick={onGetActionClick}
          >
            Действие
          </Button>
        </div>

        <footer className={cls.footer}>
          <Button className={cls.restartBtn} onClick={restartGame}>
            Начать заново
          </Button>
        </footer>
      </div>
    </DynamicModuleLoader>
  );
});

export default GameForm;
