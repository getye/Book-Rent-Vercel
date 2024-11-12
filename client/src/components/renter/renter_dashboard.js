import { useState } from "react";
import { Grid, Button, Box } from "@mui/material";
import { RenterFees } from "./renter_dashboard/renter_fees";
import { RenterBookStatus } from "./renter_dashboard/renter_bookstatus";


export const RenterDashboard = () => {
  const [currentSection, setCurrentSection] = useState(0); // 0 for Earnings, 1 for Book Status

  const handleNext = () => {
    setCurrentSection((prevSection) => (prevSection === 0 ? 1 : 0)); // Toggle between 0 and 1
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => (prevSection === 1 ? 0 : 1)); // Toggle between 1 and 0
  };

  return (
    <Box sx={{ paddingTop: 10, alignItems: "center", alignContent: "center", paddingLeft: {xs:1, sm:10, md:20, lg:32}, paddingRight: {xs:0, sm:5}}}>
      <Grid 
        container 
        direction={"row"}
        sx={{width:{xs:'100%', sm:'80%', md:'60%'},}}
        >
        {currentSection === 0 ? <RenterFees/> : <RenterBookStatus/>}
      </Grid>

      <Box display="flex" justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={currentSection === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentSection === 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
