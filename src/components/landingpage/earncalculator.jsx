import Grid from "@mui/material/Grid";
import earningCalcImage from "../../assets/earningcalc.jpg";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {TextField} from "@mui/material";

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

function subValue(value) {
    return `$${value}`;
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
                    <Box sx={{
                        display: "flex",
                        gap: "2",
                        justifyContent: "space-around",
                        alignItems:"center",
                        marginTop: "25px"
                    }}>
                        <TextField
                            id="outlined-number"
                            label="Ilość Twoich fanów"
                            type="number"
                            size={"small"}
                            defaultValue={10000}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="outlined-number"
                            label="Cena miesięcznej subskrypcji"
                            type="number"
                            defaultValue={9.99}
                            size={"small"}
                            InputLabelProps={{
                                shrink: true,
                                startAdornment: '$'
                            }}/>
                    </Box>

                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <img style={{maxWidth: "100%", height: "Auto", marginTop: "100px", borderRadius: "10px"}}
                         src={earningCalcImage} alt="woman earning money"/>
                    <p style={{textAlign: "center"}}>Przykładowe miesięczne dochody to:</p>
                    <h2 style={{textAlign: "center"}}>1000$</h2>

                </Grid>

            </Grid>
        </Container>

    )
}