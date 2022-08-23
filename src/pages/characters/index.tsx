import {
  Box,  
  Grid,
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getCharacters } from "../../fetch";
import { getIDFromUrl } from "../../utils";
import { useTranslation } from "react-i18next";
import { Character } from "../../types";
import Filter from "../../components/Filter";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error";

const Characters = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchOptions, setSearchOptions] = useState({
    filter: "",
    value: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const data = await getCharacters(
        page,
        10,
        searchOptions.filter,
        searchOptions.value
      );
      setCharacters(data.characters);
      setLastPage(data.lastPage);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);      
    }
  }, [page, searchOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <Grid container rowGap={2}>
        <Grid item xs={12} display={"flex"} gap={2}>
          <Skeleton variant="rounded" width={"80%"} height={80} />
          <Skeleton variant="rounded" width={"10%"} height={80} />
          <Skeleton variant="rounded" width={"10%"} height={80} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rounded" width={"100%"} height={500} />
        </Grid>
        <Grid item display={"flex"} justifyContent={"center"} xs={12}>
          <Skeleton variant="rounded" width={"50%"} height={50} />
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return <Error/>;
  }

  return (
    <>
      <Filter
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("pages.characters.name")}</TableCell>
              <TableCell>{t("pages.characters.gender")}</TableCell>
              <TableCell>{t("pages.characters.culture")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.map((c: Character) => {
              let id = getIDFromUrl(c.url);
              return (
                <TableRow
                  hover
                  key={id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { cursor: "pointer" },
                  }}
                  onClick={() => navigate(`/characters/${id}`)}
                >
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.gender}</TableCell>
                  <TableCell>{c.culture}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{py: 3}}        
      >
        <Pagination        
          count={lastPage}
          onChange={(event, value) => setPage(value)}
        />
      </Box>
    </>
  );
};

export default Characters;
