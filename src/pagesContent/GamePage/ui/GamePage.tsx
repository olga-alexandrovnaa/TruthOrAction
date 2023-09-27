// import { UserAuthDataForm } from "@/serviceEntities/User";
import { GameForm } from "@/programFeatures/Game";
import cls from "./GamePage.module.scss";

function GamePage() {

  return <div className={cls.GamePage}>
        <GameForm />
    </div>;
}


export default GamePage;
