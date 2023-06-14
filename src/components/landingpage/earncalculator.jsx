import Grid from "@mui/material/Grid";
import earningCalcImage from "../../assets/earningcalc.jpg";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {InputAdornment, TextField} from "@mui/material";
import {useState} from "react";

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

    const [sliderValue, setSliderValue] = useState(1);
    const handleSliderValue = (event, newValue) => {
        setSliderValue(newValue);
        calculateEarnings(followersValue, subscriptionValue, newValue)
    }

    const [followersValue, setFollowersValue] = useState(10000);

    const handleFollowersValue = (event) => {
    setFollowersValue(event.target.value);
        calculateEarnings(event.target.value, subscriptionValue, sliderValue)
    }

    const [subscriptionValue, setSubscriptionValue] = useState(9.99);

    const handleSubscriptionValue = (event) => {
        setSubscriptionValue(event.target.value);
        calculateEarnings(followersValue, event.target.value, sliderValue)
    }


    const [earnings, setEarnings] = useState((sliderValue*followersValue*subscriptionValue)/100);

    const calculateEarnings = (sliderValue, followersValue, subscriptionValue) => {
        const earnings = Math.round((sliderValue * followersValue * subscriptionValue) / 100);

        setEarnings(earnings.toLocaleString("fi-FI"))
    }



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
                            value={sliderValue}
                            onChange={handleSliderValue}
                        />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        gap: "2",
                        justifyContent: "center",
                        alignItems:"center",
                        marginTop: "25px"
                    }}>
                        <TextField
                            id="outlined-number"
                            label="Ilość followersów"
                            type="number"
                            size={"small"}
                            inputProps={{
                                step: 1000,
                                min: 1000,
                                onKeyPress: (event) => {
                                    if (event.key === '-' || event.key === 'e' || event.key === '.' || event.key === ',') {
                                        event.preventDefault();
                                    }
                                }
                            }}
                            defaultValue={10000}
                            value={followersValue}
                            onChange={handleFollowersValue}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            sx={{marginLeft: '20px'}}
                            id="outlined-number"
                            label="Cena miesięcznej subskrypcji"
                            type="number"
                            defaultValue={9.99}
                            size={"small"}
                            error={false}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                inputProps: {
                                    min: 1,
                                    onKeyPress: (event) => {
                                        if (event.key === '-' || event.key === 'e' || event.key === '.' ) {
                                            event.preventDefault();
                                        }
                                }
                            }}}
                            value={subscriptionValue}
                            onChange={handleSubscriptionValue}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                    </Box>

                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <img style={{maxWidth: "100%", height: "Auto", marginTop: "100px", borderRadius: "10px"}}
                         src={earningCalcImage} alt="woman earning money"/>
                    <p style={{textAlign: "center"}}>Przykładowe miesięczne dochody to:</p>
                    <h2 style={{textAlign: "center"}}>{earnings} $</h2>

                </Grid>

            </Grid>
        </Container>

    )
}