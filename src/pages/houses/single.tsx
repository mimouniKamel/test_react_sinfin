import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  RenderArray,
  RenderObjectName,
  RenderString,
} from "../../components/style";
import { a11yProps, TabPanel } from "../../components/TabPanel";
import { getNameAndID, getOneItem } from "../../fetch";
import { House, ReadModelNameAndID } from "../../types";

const SingleHouse = () => {
  const { t } = useTranslation();
  const [house, setHouse] = useState<House>();
  const location = useLocation();
  const pathname = location.pathname;
  const [swornMembers, setSwornMembers] = useState<ReadModelNameAndID[]>([]);
  const [overlord, setOverlord] = useState<ReadModelNameAndID>({
    id: "",
    name: "",
  });
  const [currentLord, setCurrentLord] = useState<ReadModelNameAndID>({
    id: "",
    name: "",
  });
  const [heir, setHeir] = useState<ReadModelNameAndID>({ id: "", name: "" });
  const [founder, setFounder] = useState<ReadModelNameAndID>({
    id: "",
    name: "",
  });
  const [cadetBranches, setCadetBranches] = useState<ReadModelNameAndID[]>([]);
  const [tabValue, setTabValue] = useState<number>(0);

  useEffect(() => {
    getOneItem(pathname)
      .then((response) => {
        setHouse(response.item);
      })
      .catch((err) => console.log(err));
  }, [pathname]);

  useEffect(() => {
    if (house) {
      const swornMembers = house.swornMembers.map(async (item: string) => {
        const response = await getNameAndID("characters", item);
        return response;
      });
      Promise.all(swornMembers).then((results: ReadModelNameAndID[]) => {
        setSwornMembers(results);
      });
    }
  }, [house]);

  useEffect(() => {
    if (house) {
      const cadetBranches = house.cadetBranches.map(async (item: string) => {
        const response = await getNameAndID("houses", item);
        return response;
      });
      Promise.all(cadetBranches).then((results: ReadModelNameAndID[]) => {
        setCadetBranches(results);
      });
    }
  }, [house]);

  useEffect(() => {
    if (house) {
      getNameAndID("houses", house.overlord)
        .then((response: ReadModelNameAndID) => {
          setOverlord(response);
        })
        .catch((err) => console.error(err));
    }
  }, [house]);

  useEffect(() => {
    if (house) {
      getNameAndID("characters", house.currentLord)
        .then((response: ReadModelNameAndID) => {
          setCurrentLord(response);
        })
        .catch((err) => console.error(err));
    }
  }, [house]);

  useEffect(() => {
    if (house) {
      getNameAndID("characters", house.heir)
        .then((response: ReadModelNameAndID) => {
          setHeir(response);
        })
        .catch((err) => console.error(err));
    }
  }, [house]);

  useEffect(() => {
    if (house) {
      getNameAndID("characters", house.founder)
        .then((response: ReadModelNameAndID) => {
          setFounder(response);
        })
        .catch((err) => console.error(err));
    }
  }, [house]);

  if (!house) {
    return <CircularProgress />
  }

  return  (
    <Box>
      <Typography variant={"h2"}>{house.name}</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setTabValue(newValue)
          }
          aria-label="basic tabs example"
        >
          <Tab label={t("pages.houses.tabs.generalInfos")} {...a11yProps(0)} />
          <Tab label={t("pages.houses.tabs.members")} {...a11yProps(1)} />
          <Tab label={t("pages.houses.tabs.weapons")} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <RenderString label={t("pages.houses.region")} item={house.region} />
        <RenderString
          label={t("pages.houses.coatOfArms")}
          item={house.coatOfArms}
        />
        <RenderString label={t("pages.houses.words")} item={house.words} />
        <RenderArray label={t("pages.houses.titles")} item={house.titles} />
        <RenderArray label={t("pages.houses.seats")} item={house.seats} />
        <RenderObjectName
          page={"houses"}
          label={t("pages.houses.overlord")}
          item={overlord}
        />
        <RenderString label={t("pages.houses.founded")} item={house.founded} />
        <RenderString label={t("pages.houses.diedOut")} item={house.diedOut} />
        <RenderObjectName
          page={"houses"}
          label={t("pages.houses.cadetBranches")}
          item={cadetBranches}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <RenderObjectName
          page={"characters"}
          label={t("pages.houses.founder")}
          item={founder}
        />
        <RenderObjectName
          page={"characters"}
          label={t("pages.houses.currentLord")}
          item={currentLord}
        />
        <RenderObjectName
          page={"characters"}
          label={t("pages.houses.heir")}
          item={heir}
        />
        <RenderObjectName
          page={"characters"}
          label={t("pages.houses.swornMembers")}
          item={swornMembers}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <RenderArray
          label={t("pages.houses.ancestralWeapons")}
          item={house.ancestralWeapons}
        />
      </TabPanel>
    </Box>
  )
};

export default SingleHouse;
