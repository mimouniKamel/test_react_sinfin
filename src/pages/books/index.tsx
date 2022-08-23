import {
  Box,
  Button,
  Grid,
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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import { getBooks } from "../../fetch";
import { Book } from "../../types";
import { getIDFromUrl } from "../../utils";

const Books = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const data = await getBooks(
        page,
        5        
      );            
      setBooks([...books,...data.books]) ;                
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {  
    fetchData()  
  }, [fetchData]);

  if (isLoading) {
    return (
      <Grid container rowGap={2}>        
        <Grid item xs={12}>
          <Skeleton variant="rounded" width={"100%"} height={400} />
        </Grid>
        <Grid item display={"flex"} justifyContent={"center"} xs={12}>
          <Skeleton variant="rounded" width={"20%"} height={50} />
        </Grid>
      </Grid>
    )
  }

  if (error) {
    return <Error/>;
  }
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">{t("pages.books.name")}</TableCell>
              <TableCell align="right">
                {t("pages.books.numberOfPages")}
              </TableCell>
              <TableCell align="right">{t("pages.books.publisher")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            books.map((b) => {
              let id = getIDFromUrl(b.url)
              return (
              <TableRow
                hover
                key={id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() => navigate(`/books/${id}`)}
              >
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{b.name}</TableCell>
                <TableCell align="right">{b.numberOfPages}</TableCell>
                <TableCell align="right">{b.publisher}</TableCell>
              </TableRow>
              )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        }}
      >        
        <Button onClick={() => setPage(page + 1)} variant={"text"}>
          {t("showMore")}
        </Button>
      </Box>
    </>
  );
};

export default Books;
