import { useEffect, useState } from "react";
import { getCharacters } from "../../../fetch";
import ReactEcharts from "echarts-for-react";
import {  Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReadModelCharaters } from "../../../types";

const Gender = () => {
  const { t } = useTranslation();
  const [maleLength, setMaleLength] = useState<number>(0);
  const [femaleLength, setFemaleLength] = useState<number>(0);

  useEffect(() => {
    getCharacters(1, 1, "gender", "male")
      .then((response: ReadModelCharaters) => {
        setMaleLength(response.lastPage);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getCharacters(1, 1, "gender", "female")
      .then((response: ReadModelCharaters) => {
        setFemaleLength(response.lastPage);
      })
      .catch((err) => console.error(err));
  }, []);

  const option = {
    tooltip: {
      trigger: "item",
      responsive: true,
      formatter: "{c}",
    },
    series: [
      {
        data: [
          { value: maleLength, name: t("pages.characters.men") },
          { value: femaleLength, name: t("pages.characters.women") },
        ],
        type: "pie",
      },
    ],
  };
  return (
    <Grid container>
      <Grid item xs={1} display={"flex"} alignItems={"center"}>
        <Typography variant={"h3"}>{t("pages.characters.gender")}</Typography>
      </Grid>
      <Grid item xs>
        <ReactEcharts option={option} />
      </Grid>
    </Grid>
  );
};

export default Gender;
