import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import notFoundImg from "../img/undraw_page_not_found_re_e9o6.svg";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      rowGap={3}
    >
      <Typography variant={"h4"}>{t("error.pageNotFound")}</Typography>
      <img style={{ width: "500px" }} src={notFoundImg} alt="not found" />
      <Button variant={"contained"}>
        <Link to={"/"}>{t("error.backHome")}</Link>
      </Button>
    </Box>
  );
};

export default NotFoundPage;
