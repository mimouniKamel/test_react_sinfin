import {
  AppBar,
  Container,
  FormControl,
  Grid, 
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import { MaterialUISwitch } from "./ThemeSwitcher";
import { availableLanguages } from "../locales/i18n";
import frenchFlag from "../locales/flags/france.png";
import englishFlag from "../locales/flags/united-kingdom.png";

const Navbar = () => {
  const { settings, saveSettings } = useTheme();  
  const { t, i18n } = useTranslation();

  let checked = false;
  if (settings.theme === "light") {
    checked = false;
  } else if (settings.theme === "dark") {
    checked = true;
  }

  const handleChange = (value: boolean): void => {
    if (value === true) {
      saveSettings({
        ...settings,
        theme: "dark",
      });
    } else if (value === false) {
      saveSettings({
        ...settings,
        theme: "light",
      });
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth={"lg"} sx={{ py: 1 }}>
        <Grid container display={"flex"} alignItems={"center"}>
          <Grid item xs={"auto"}>            
            <Typography><Link to={"/"}>LOGO</Link></Typography>
          </Grid>
          <Grid item xs display={"flex"} justifyContent={"center"} gap={10}>
            <Link to={"/"}>{t("home")}</Link>
            <Link to={"/characters"}>{t("characters")}</Link>
            <Link to={"/houses"}>{t("houses")}</Link>
            <Link to={"/books"}>{t("books")}</Link>
          </Grid>
          <Grid item xs={"auto"} display={"flex"} alignItems={"center"} gap={3}>
            <MaterialUISwitch
              checked={checked}
              value={settings.theme}
              onChange={(e) => handleChange(e.target.checked)}
            />
            <FormControl>              
              <Select                
                value={i18n.language}
                size={"small"}              
                onChange={(e: SelectChangeEvent<string>, child: ReactNode) =>
                  i18n.changeLanguage(e.target.value)
                }
              >
                {availableLanguages.map((language: string) => (
                  <MenuItem sx={{display:"flex",alignItems:"center",justifyContent:"center"}} value={language} key={language}>
                    <img
                      src={language === "fr" ? frenchFlag : englishFlag}
                      alt={language}
                    />                    
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Navbar;
