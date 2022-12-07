import * as React from "react";
import { Container, Grid } from "@mui/material";
import AppChart from "../../sections/AppChart";
import Configuration from "./Configuration";
import AppAnalysis from "../../sections/AppAnalysis";
import DashboardPageProvider from "../../components/PageProvider/DashboardPageProvider";
import axios from "axios";

function RevenueContent() {
  const [ordersData, setOrdersData] = React.useState([{
    name: "Item A",
    type: "line",
    fill: "solid",
    data: [],
  }]);
  const [ordersLabels, setOrdersLabels] = React.useState([]);
  React.useEffect(() => {
    axios.get(process.env.NODE_ENV === "production" ? process.env.REACT_APP_HEROKU_HOST : process.env.REACT_APP_API_URL+"/orders").then((res) => {
      const data = res.data;
      setOrdersData([
        {
          name: "Revenue",
          type: "line",
          fill: "solid",
          data: data.map((i) => i.price),
        }
      ]);
      setOrdersLabels(data.map((i) => i.date));
    });
    document.title = "B2ST | Dashboard | Revenue"
  }, []);
  return (
    <DashboardPageProvider name="Revenue">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppChart
              title="Revenue"
              subheader="in last 12 months"
              chartLabels={ordersLabels}
              chartData={ordersData}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Configuration />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppAnalysis title="Analysis" />
          </Grid>
        </Grid>
      </Container>
    </DashboardPageProvider>
  );
}

export default function Revenue() {
  return <RevenueContent />;
}
