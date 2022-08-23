import { useTranslation } from "react-i18next";
import Gender from "../components/stats/characters/Gender";
import IsAlive from "../components/stats/characters/IsAlive";
import AncestralWeapons from "../components/stats/houses/AncestralWeapons";
import HasDiedOut from "../components/stats/houses/IsDiedOut";
import { Paper, Typography } from "@mui/material";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography sx={{ textAlign: "center", mb: 3 }} variant={"h1"}>
        Game of Thrones
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant={"h2"}>{t("characters")}</Typography>
        <Gender />
        <IsAlive />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography sx={{ textAlign: "center" }} variant={"h2"}>
          {t("houses")}
        </Typography>
        <AncestralWeapons />
        <HasDiedOut />
      </Paper>
    </>
  );
};

export default Home;
