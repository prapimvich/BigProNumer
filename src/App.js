import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Bisection from "./Bisection";
import Onepoint from "./Onepoint";
import FalsePosition from "./FalsePosition";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{ backgroundColor: "#F0FFFF" }}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Bisection Method" {...a11yProps(0)} />
          <Tab label="False Position Method" {...a11yProps(1)} />
          <Tab label="One-Point lteration Method" {...a11yProps(2)} />
          <Tab label="Newton-Rapson Method" {...a11yProps(3)} />
          <Tab label="Secant Method" {...a11yProps(4)} />
          <Tab label="Cramer's Rule" {...a11yProps(5)} />
          <Tab label="Gauss Elimination Method" {...a11yProps(6)} />
          <Tab label="Gauss-Jordan Method" {...a11yProps(7)} />
          <Tab label="Matrix Inversion Method" {...a11yProps(8)} />
          <Tab label="LU Decomposition Method" {...a11yProps(9)} />
          <Tab label="Jacobi Iteration Method" {...a11yProps(10)} />
          <Tab label="Gauss-Seidel Iteration Method" {...a11yProps(11)} />
          <Tab label="LU Conjugate Gradient Method" {...a11yProps(12)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Bisection />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FalsePosition/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Onepoint />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={8}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={9}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={10}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={11}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={12}>
        Item Seven
      </TabPanel>
    </div>
  );
}
