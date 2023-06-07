import Grid from "@mui/material/Grid";
import React from "react";
import earningCalcImage from "../assets/earningcalc.jpg";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const marks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 25,
        label: '25%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 75,
        label: '75%',
    },
    {
        value: 100,
        label: '100%',
    },
];

function valuetext(value) {
    return `${value}%`;
}

export default function EarnCalculator() {
    return (

        <Container maxWidth="xl" style={{marginTop: "5%"}}>

            <Grid container spacing={2} >
                <Grid item md={6} sm={6} xs={12}>
                    <h1 style={{marginTop: "10%"}}>Zacznij monetyzować swoje social media już dziś!</h1>
                    <h3 style={{marginTop: "10%"}}>Ilu fanów potrafisz przekonać?</h3>
                    <Box
                        sx={{width: 300}}
                        style={{marginTop: "10%"}}
                    >
                        <Slider
                            style={{color: "lightblue"}}
                            aria-label="Always visible"
                            defaultValue={5}
                            getAriaValueText={valuetext}
                            step={1}
                            marks={marks}
                            valueLabelDisplay="on"
                            valueLabelFormat={valuetext}
                        />
                        </Box>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <Box>
                    <img style={{maxWidth: "100%", height: "Auto", marginTop: "10%"}} src={earningCalcImage} alt="woman earning money"/>
                        <p style={{textAlign: "center"}}>Przykładowe miesięcze dochody to:</p>
                        <h3 style={{textAlign: "center"}}>1000$</h3>
                    </Box>
                </Grid>

            </Grid>
        </Container>

)
}