// import { UserAuthDataForm } from "@/serviceEntities/User";
import { useNavigate } from "react-router-dom";
import cls from "./MainPage.module.scss";
import { useCallback } from "react";
import { getRouteGame } from "@/sharedComponents/config/routeConfig/routeConfig";
import { ReactComponent as Pic } from '@/sharedComponents/assets/pics/hello.svg';
import { Button } from "@/sharedComponents/ui/Button";

function MainPage() {

  const navigate = useNavigate();

  const onStartGame = useCallback(async () => {
    navigate(getRouteGame());
  }, [navigate]);

  return <div className={cls.MainPage}>
        {/* <UserAuthDataForm /> */}
        <Pic/>
        <p className={cls.header}>Правда или действие?</p>
        <Button className={cls.btn} onClick={onStartGame}>Играть</Button>
        <p className={cls.rulesHeader}>Как играть?</p>
        <ol className={cls.rules}>
          <li className={cls.rule}>Собери вместе всех своих друзей!</li>
          <li className={cls.rule}>Выбирай - правда или действие?</li>
          <li className={cls.rule}>Выбрал правду - отвечай честно на вопрос!</li>
          <li className={cls.rule}>Выбрал действие - выполняй действие!</li>
        </ol>
    </div>;
}


export default MainPage;
