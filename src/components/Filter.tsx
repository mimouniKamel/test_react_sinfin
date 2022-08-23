import { Button, Grid, Switch, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface FilterProps {
  setSearchOptions: (options: { filter: string; value: string }) => void;
  searchOptions: { filter: string; value: string };
}

const Filter: FC<FilterProps> = ({ setSearchOptions, searchOptions }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = () => {
    if (inputValue.length >0) {
      setSearchOptions({ filter: "name", value: inputValue });
    }
  };

  const handleChange = (value:string) => {
    if (value.length === 0) {
      setSearchOptions({ filter: "", value: "" });      
      setInputValue("")
    }else{
      setInputValue(value)
    }    
  };

  return (
    <Grid
      container
      display={"flex"}
      alignItems={"center"}
      gap={5}
      sx={{ mb: 3 }}
    >
      <Grid item xs display={"flex"} gap={2}>
        <TextField
          fullWidth
          onChange={(e) =>handleChange(e.target.value)}
          label={t("pages.characters.autoCompleteSearch")}
          onKeyUp={(e) => e.code === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} variant={"contained"}>
          {t("pages.characters.search")}
        </Button>
      </Grid>
      <Grid item xs={"auto"}>
        <Typography>{t("pages.characters.alive")}</Typography>
        <Switch
          checked={searchOptions.filter === "isAlive"}
          onChange={(e) =>
            e.target.checked
              ? setSearchOptions({ filter: "isAlive", value: "true" })
              : setSearchOptions({ filter: "", value: "" })
          }
        />
      </Grid>
    </Grid>
  );
};

export default Filter;
