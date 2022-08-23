import { Box, Button, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import errorImg from "../img/undraw_cancel_re_pkdm.svg"


const Error =()=>{
    const { t } = useTranslation();
    const navigate = useNavigate()     

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} rowGap={3}>
            <Typography variant={"h4"}>{t('error.messageError')}</Typography>
            <img style={{width:"200px"}} src={errorImg} alt="error" />
            <Button onClick={()=>navigate(0)} variant={"contained"}>{t('error.reload')}</Button>
        </Box>
    )
}

export default Error