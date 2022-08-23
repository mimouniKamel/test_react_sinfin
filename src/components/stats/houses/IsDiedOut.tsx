import { useEffect, useState } from "react";
import { getHouses } from "../../../fetch";
import ReactEcharts from "echarts-for-react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReadModelHouses } from "../../../types";

const HasDiedOut = () => {
  const { t } = useTranslation();
  const [hasDiedOut, setHasDiedOut] = useState<number>(0);
  const [hasntDiedOut, setHasntDiedOut] = useState<number>(0);

  useEffect(() => {
    getHouses(1, 1, "hasDiedOut", "true")
      .then((response: ReadModelHouses) => {
        setHasDiedOut(response.lastPage);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getHouses(1, 1, "hasDiedOut", "false")
      .then((response: ReadModelHouses) => {
        setHasntDiedOut(response.lastPage);
      })
      .catch((err) => console.error(err));
  }, []);

  const option = {
    xAxis: {
      type: "category",
      data: [t("pages.houses.hasDiedOut"), t("pages.houses.hasntDiedOut")],
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
        data: [hasDiedOut, hasntDiedOut],
        type: "line",
      },
    ],
  };
  return (
    <Grid container>
      <Grid item xs={3} display={"flex"} alignItems={"center"}>
        <Typography variant={"h3"}>{t("pages.houses.hasDiedOut")}</Typography>
      </Grid>
      <Grid item xs>
        <ReactEcharts option={option} />
      </Grid>
    </Grid>
  );
};

export default HasDiedOut;
