import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { ReadModelNameAndID } from "../types";

interface RenderStringProps {
  label: string;
  item: string;
}

export const RenderString: FC<RenderStringProps> = ({
  item,
  label,
}): ReactElement | null => {
  if (item) {
    return (
      <Box display={"flex"} gap={1}>
        <Typography sx={{ fontWeight: "bold" }}>{label} :</Typography>
        <Typography>{item}</Typography>
      </Box>
    );
  }
  return null;
};

interface RenderArrayProps {
  label: string;
  item: string[];
  link?: boolean;
}

export const RenderArray: FC<RenderArrayProps> = ({
  item,
  label,
  link,
}): ReactElement | null => {
  if (Array.isArray(item)) {
    if (typeof item[0] === "string" && item[0].length > 0) {
      return (
        <Box display={"flex"} gap={1}>
          <Typography sx={{ fontWeight: "bold" }}>{label} :</Typography>
          <Box>
            {item.map((value: string) => {
              return <Typography key={value}>{value}</Typography>;
            })}
          </Box>
        </Box>
      );
    }
    if (typeof item[0] === "object") {
      return (
        <Box display={"flex"} gap={1}>
          <Typography sx={{ fontWeight: "bold" }}>{label} :</Typography>
          <Box>
            {item.map((value: any) => {
              return (
                <Typography sx={{ textDecoration: "underline" }} key={value.id}>
                  <Link to={`/houses/${value.id}`}>{value.name}</Link>
                </Typography>
              );
            })}
          </Box>
        </Box>
      );
    }
  }
  return null;
};

interface RenderObjectNameProps {
  label: string;
  item: ReadModelNameAndID | ReadModelNameAndID[];
  page: string;
}

export const RenderObjectName: FC<RenderObjectNameProps> = ({
  item,
  label,
  page,
}): ReactElement | null => {    

  
    if (!Array.isArray(item)) {
      if(item.id.length >0){
      return (
        <Box display={"flex"} gap={1}>
          <Typography sx={{ fontWeight: "bold" }}>{label} :</Typography>
          <Typography sx={{ textDecoration: "underline" }} key={item.id}>
            <Link to={`/${page}/${item.id}`}>{item.name}</Link>
          </Typography>
        </Box>
      );
    }}

    if (Array.isArray(item)) {
      if(item.length>0){
      return (
        <Box display={"flex"} gap={1}>
          <Typography sx={{ fontWeight: "bold" }}>{label} :</Typography>
          <Box >
            {item.map((object) => {
              return (
                <Typography
                  sx={{ textDecoration: "underline" }}
                  key={object.id}
                >
                  <Link to={`/${page}/${object.id}`}>{object.name}</Link>
                </Typography>
              );
            })}
          </Box>
        </Box>
      );
    }}
  return null;
};

interface RenderCharactersInBookProps {
  label: string;
  item: ReadModelNameAndID[];
}


export const RenderCharactersInBook: FC<RenderCharactersInBookProps> = ({
  item,
  label,
}): ReactElement | null => {    
  return (
    <Box>
      <Typography sx={{ fontWeight: "bold" }}>{label} :</Typography>
      <TableContainer>
        <Table>
         <TableBody>
          {item.map((object) => {
          return (
            <TableRow
                hover
                key={object.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { cursor: "pointer" },
                }}                
              >
                <TableCell component="th" scope="row">
                <Typography
              sx={{ textDecoration: "underline" }}
              key={object.id}
            >
              <Link to={`/characters/${object.id}`}>{object.name}</Link>
            </Typography>
                </TableCell>                
              </TableRow>
          );
        })}
         </TableBody>
         </Table>
      </TableContainer>      
    </Box>
  )
};