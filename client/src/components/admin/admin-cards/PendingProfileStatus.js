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
  backgroundColor: "#332828",
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
  const total_pending_requests = useSelector(
    (state) => state.profile?.total_pending_requests
  );

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="ic:outline-pending-actions" width="26" height="26" />
      </IconWrapperStyle>
      <Typography variant="h3">
        {numeral(total_pending_requests).format()}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72, fontSize: 20 }}>
        Total Pending Requests for Dr
      </Typography>
    </RootStyle>
  );
}
