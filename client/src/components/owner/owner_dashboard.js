import { useState } from "react";
import { Grid, Button, Box } from "@mui/material";
import { OwnerBookStatus } from "./owner_dashboard/owner_bookstatus";
import { OwnerEarnings } from "./owner_dashboard/owner_earnings";

export const OwnerDashboard = () => {
  const [currentSection, setCurrentSection] = useState(0); // 0 for Earnings, 1 for Book Status

  const handleNext = () => {
    setCurrentSection((prevSection) => (prevSection === 0 ? 1 : 0)); // Toggle between 0 and 1
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => (prevSection === 1 ? 0 : 1)); // Toggle between 1 and 0
  };

  return (
    <Box sx={{ paddingTop: 10, paddingLeft: {xs:1, sm:10, md:20, lg:32}}}>
      <Grid 
        container 
        direction={"row"} 
        sx={{width:{xs:'100%', sm:'80%', md:'60%'},}}
        >
        {currentSection === 0 ? <OwnerEarnings /> : <OwnerBookStatus />}
      </Grid>

      <Box 
        display="flex" 
        justifyContent="space-between" 
        sx={{width:{xs:'100%', sm:'80%', md:'60%'}, marginTop: 2}}
        >
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
