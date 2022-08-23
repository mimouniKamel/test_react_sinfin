import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  RenderArray,
  RenderCharactersInBook,
  RenderObjectName,
  RenderString,
} from "../../components/style";
import { a11yProps, TabPanel } from "../../components/TabPanel";
import { getNameAndID, getOneItem } from "../../fetch";
import { Book, ReadModelNameAndID } from "../../types";
import moment from "moment"

const SingleBook = () => {
  const { t } = useTranslation();
  const [book, setbook] = useState<Book>();
  const location = useLocation();
  const pathname = location.pathname;
  const [characters, setCharacters] = useState<ReadModelNameAndID[]>([]);
  const [povCharacters, setPovCharacters] = useState<ReadModelNameAndID[]>([]);
  const [tabValue, setTabValue] = useState<number>(0);
  const [count, setCount] = useState({start:0,end:10});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getOneItem(pathname)
      .then((response) => {
        setbook(response.item);
      })
      .catch((err) => console.log(err));
  }, [pathname]);
  

  useEffect(() => {
    if (book) {
    setIsLoading(true)
    const limitedBook = book.characters.slice(count.start,count.end)        
      const loadCharacters = limitedBook.map(async (item: string) => {
        const response = await getNameAndID("characters", item);
        return response;
      });
      Promise.all(loadCharacters).then((results: ReadModelNameAndID[]) => {
        setCharacters([...characters,...results]);
        setIsLoading(false)
      });
    }
  }, [book,count]);

  useEffect(() => {
    if (book) {
      const povCharacters = book.povCharacters.map(async (item: string) => {
        const response = await getNameAndID("characters", item);
        return response;
      });
      Promise.all(povCharacters).then((results: ReadModelNameAndID[]) => {
        setPovCharacters(results);
      });
    }
  }, [book]);

  return book ? (
    <Box>
      <Typography variant={"h2"}>{book.name}</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setTabValue(newValue)
          }
          aria-label="basic tabs example"
        >
          <Tab label={t("pages.books.tabs.generalInfos")} {...a11yProps(0)} />
          <Tab label={t("pages.books.tabs.characters")} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <RenderString label={t("pages.books.isbn")} item={book.isbn} />
        <RenderArray label={t("pages.books.authors")} item={book.authors} />
        <RenderString
          label={t("pages.houses.region")}
          item={book.numberOfPages}
        />
        <RenderString
          label={t("pages.books.publisher")}
          item={book.publisher}
        />
        <RenderString label={t("pages.books.country")} item={book.country} />
        <RenderString
          label={t("pages.books.mediaType")}
          item={book.mediaType}
        />
        <RenderString label={t("pages.books.released")} item={moment(book.released).format("DD-MM-YYYY")} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Grid container gap={4}>
          <Grid item xs>
            <RenderCharactersInBook              
              label={t("pages.books.characters")}
              item={characters}
            />
            <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        }}
      >        
        {isLoading&&<CircularProgress/>}
        <Button onClick={() => setCount({start:count.end,end:count.end +10})} variant={"text"}>
          {t("showMore")}
        </Button>
      </Box>
          </Grid>
          <Grid item xs={"auto"}>
            <Divider orientation={"vertical"} />
          </Grid>
          <Grid item xs>
            <RenderObjectName
              page={"characters"}
              label={t("pages.books.povCharacters")}
              item={povCharacters}
            />
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  ) : (
    <CircularProgress />
  );
};

export default SingleBook;
