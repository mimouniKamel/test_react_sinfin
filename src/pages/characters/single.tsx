import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Location, useLocation } from "react-router-dom";
import {
  RenderArray,
  RenderObjectName,
  RenderString,
} from "../../components/style";
import { a11yProps, TabPanel } from "../../components/TabPanel";
import { getNameAndID, getOneItem } from "../../fetch";
import { Character, ReadModelNameAndID } from "../../types";

const SingleCharacter = () => {
  const { t } = useTranslation();
  const location: Location = useLocation();
  const pathname = location.pathname;
  const [character, setCharacter] = useState<Character>();
  const [allegiances, setAllegiances] = useState<ReadModelNameAndID[]>([]);
  const [books, setBooks] = useState<ReadModelNameAndID[]>([]);
  const [povBooks, setPovBooks] = useState<ReadModelNameAndID[]>([]);
  const [father, setFather] = useState<ReadModelNameAndID>({
    id: "",
    name: "",
  });
  const [mother, setMother] = useState<ReadModelNameAndID>({
    id: "",
    name: "",
  });
  const [spouse, setSpouse] = useState<ReadModelNameAndID>({
    id: "",
    name: "",
  });
  const [tabValue, setTabValue] = useState<number>(0);

  useEffect(() => {
    getOneItem(pathname)
      .then((response) => {
        setCharacter(response.item);
      })
      .catch((err) => console.log(err));
  }, [pathname]);

  useEffect(() => {
    if (character) {
      const houses = character.allegiances.map(async (item: string) => {
        const response = await getNameAndID("houses", item);
        return response;
      });
      Promise.all(houses).then((results: ReadModelNameAndID[]) => {
        setAllegiances(results);
      });
    }
  }, [character]);

  useEffect(() => {
    if (character) {
      const books = character.books.map(async (item: string) => {
        const response = await getNameAndID("books", item);
        return response;
      });
      Promise.all(books).then((results: ReadModelNameAndID[]) => {
        setBooks(results);
      });
    }
  }, [character]);

  useEffect(() => {
    if (character) {
      const povBooks = character.povBooks.map(async (item: string) => {
        const response = await getNameAndID("books", item);
        return response;
      });
      Promise.all(povBooks).then((results: ReadModelNameAndID[]) => {
        setPovBooks(results);
      });
    }
  }, [character]);

  useEffect(() => {
    if (character) {
      getNameAndID("characters", character.father)
        .then((response: ReadModelNameAndID) => {
          setFather(response);
        })
        .catch((err) => console.error(err));
    }
  }, [character]);

  useEffect(() => {
    if (character) {
      getNameAndID("characters", character.mother)
        .then((response: ReadModelNameAndID) => {
          setMother(response);
        })
        .catch((err) => console.error(err));
    }
  }, [character]);

  useEffect(() => {
    if (character) {
      getNameAndID("characters", character.spouse)
        .then((response: ReadModelNameAndID) => {
          setSpouse(response);
        })
        .catch((err) => console.error(err));
    }
  }, [character]);

  return character ? (
    <Box>
      <Typography variant={"h2"}>
        {character.name.length > 0
          ? character.name
          : t("pages.characters.noName")}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setTabValue(newValue)
          }
          aria-label="basic tabs example"
        >
          <Tab
            label={t("pages.characters.tabs.generalInfos")}
            {...a11yProps(0)}
          />
          <Tab
            label={t("pages.characters.tabs.allegiances")}
            {...a11yProps(1)}
          />
          <Tab label={t("pages.characters.tabs.books")} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <RenderString
          label={t("pages.characters.gender")}
          item={character.gender}
        />
        <RenderString
          label={t("pages.characters.culture")}
          item={character.culture}
        />
        <RenderString
          label={t("pages.characters.born")}
          item={character.born}
        />
        <RenderString
          label={t("pages.characters.died")}
          item={character.died}
        />
        <RenderArray
          label={t("pages.characters.title")}
          item={character.titles}
        />
        <RenderArray
          label={t("pages.characters.aliases")}
          item={character.aliases}
        />
        <RenderObjectName
          page={"characters"}
          label={t("pages.characters.father")}
          item={father}
        />
        <RenderObjectName
          page={"characters"}
          label={t("pages.characters.mother")}
          item={mother}
        />
        <RenderObjectName
          page={"characters"}
          label={t("pages.characters.spouse")}
          item={spouse}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <RenderObjectName
          page={"houses"}
          label={t("pages.characters.allegiances")}
          item={allegiances}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <RenderObjectName
          page={"books"}
          label={t("pages.characters.books")}
          item={books}
        />
        <RenderObjectName
          page={"books"}
          label={t("pages.characters.povBooks")}
          item={povBooks}
        />
        <RenderArray
          label={t("pages.characters.actor")}
          item={character.playedBy}
        />
        <RenderArray
          label={t("pages.characters.series")}
          item={character.tvSeries}
        />
      </TabPanel>
    </Box>
  ) : (
    <CircularProgress />
  );
};

export default SingleCharacter;
