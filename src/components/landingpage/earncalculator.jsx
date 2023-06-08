import Grid from "@mui/material/Grid";
import earningCalcImage from "../../assets/earningcalc.jpg";
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

        <Container maxWidth="xl" style={{marginTop: "50px"}}>

            <Grid container spacing={2} sx={{
                alignItems: "center",
            }}>
                <Grid item md={6} sm={6} xs={12} sx={{
                    textAlign: "center",

                }}>
                    <h2 style={{marginTop: "50px"}}>Zacznij monetyzować swoje social media już dziś!</h2>
                    <h4 style={{marginTop: "50px"}}>Ilu fanów potrafisz przekonać?</h4>
                    <Box
                        sx={{width: 300, margin: "50px auto 0"}}
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
                    <img style={{maxWidth: "100%", height: "Auto", marginTop: "100px"}} src={earningCalcImage} alt="woman earning money"/>
                        <p style={{textAlign: "center"}}>Przykładowe miesięczne dochody to:</p>
                        <h2 style={{textAlign: "center"}}>1000$</h2>

                </Grid>

            </Grid>
        </Container>

)
}