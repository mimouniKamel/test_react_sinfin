import { useEffect, useState } from "react";
import { getCharacters } from "../../../fetch";
import ReactEcharts from "echarts-for-react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReadModelCharaters } from "../../../types";

const IsAlive = () => {
  const { t } = useTranslation();
  const [isAliveLength, setIsAlive] = useState<number>(0);
  const [isDeadLength, setIsDead] = useState<number>(0);

  useEffect(() => {
    getCharacters(1, 1, "isAlive", "true")
      .then((response: ReadModelCharaters) => {
        setIsAlive(response.lastPage);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getCharacters(1, 1, "isAlive", "false")
      .then((response: ReadModelCharaters) => {
        setIsDead(response.lastPage);
      })
      .catch((err) => console.error(err));
  }, []);

  const option = {
    xAxis: {
      type: "category",
      data: [t("pages.characters.alive"), t("pages.characters.dead")],
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "item",
      responsive: true,
      formatter: "{c}",
    },
    series: [
      {
        data: [isAliveLength, isDeadLength],
        type: "bar",
      },
    ],
  };
  return (
    <Grid container>
      <Grid item xs={3} display={"flex"} alignItems={"center"}>
        <Typography variant={"h3"}>{t("pages.characters.isAlive")}</Typography>
      </Grid>
      <Grid item xs>
        <ReactEcharts option={option} />
      </Grid>
    </Grid>
  );
};

export default IsAlive;
