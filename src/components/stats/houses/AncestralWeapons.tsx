import { useEffect, useState } from "react";
import { getHouses } from "../../../fetch";
import ReactEcharts from "echarts-for-react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReadModelHouses } from "../../../types";

const AncestralWeapons = () => {
  const { t } = useTranslation();
  const [hasAncestralWeapons, setHasAncestralWeapons] = useState<number>(0);
  const [hasntAncestralWeapons, setHasntAncestralWeapons] = useState<number>(0);

  useEffect(() => {
    getHouses(1, 1, "hasAncestralWeapons", "true")
      .then((response: ReadModelHouses) => {
        setHasAncestralWeapons(response.lastPage);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getHouses(1, 1, "hasAncestralWeapons", "false")
      .then((response: ReadModelHouses) => {
        setHasntAncestralWeapons(response.lastPage);
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
        type: "pie",
        data: [
          {
            value: hasAncestralWeapons,
            name: t("pages.houses.hasAncestralWeapons"),
          },
          {
            value: hasntAncestralWeapons,
            name: t("pages.houses.hasntAncestralWeapons"),
          },
        ],
        radius: ["40%", "70%"],
      },
    ],
  };
  return (
    <Grid container>
      <Grid item xs={3} display={"flex"} alignItems={"center"}>
        <Typography variant={"h3"}>
          {t("pages.houses.ancestralWeapons")}
        </Typography>
      </Grid>
      <Grid item xs>
        <ReactEcharts option={option} />
      </Grid>
    </Grid>
  );
};

export default AncestralWeapons;
