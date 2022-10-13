import { Icon } from "@iconify/react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { useSelector } from "react-redux";
import numeral from "numeral";
import { Link } from "react-router-dom";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: "white",
  backgroundColor: "#ed8907",
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
  // backgroundColor: "black",
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

export default function TotalUser() {
  const top_dr = useSelector((state) => state.profile?.top_dr);

  return (
    <RootStyle>
      <Link
        to={`/doctor-list/doctor/${top_dr?.id}`}
        style={{ all: "unset", cursor: "pointer" }}
      >
        <IconWrapperStyle>
          <Icon icon="ic:outline-reviews" width="26" height="26" />
        </IconWrapperStyle>
        <Typography variant="h3">
          {numeral(top_dr?.reviews).format()}
        </Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72, fontSize: 20 }}>
          Top Reviewd Dr : {top_dr?.name}
        </Typography>
      </Link>
    </RootStyle>
  );
}
