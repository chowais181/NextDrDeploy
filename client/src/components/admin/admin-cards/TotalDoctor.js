import { Icon } from "@iconify/react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils

import { useSelector } from "react-redux";

import numeral from "numeral";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: "white",
  backgroundColor: "#02556e",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),

  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

export default function TotalDoctor() {
  const total_doctors = useSelector((state) => state.user?.total_doctors);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="healthicons:doctor" width="26" height="26" />
      </IconWrapperStyle>
      <Typography variant="h3">{numeral(total_doctors).format()}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72, fontSize: 20 }}>
        Total Doctors
      </Typography>
    </RootStyle>
  );
}
