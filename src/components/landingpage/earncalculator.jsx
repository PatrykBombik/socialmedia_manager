import Grid from "@mui/material/Grid";
import earningCalcImage from "../../assets/earningcalc.jpg";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Chip, InputAdornment, TextField} from "@mui/material";
import {useState} from "react";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Typography from "@mui/material/Typography";

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
                    <Typography variant="h5" gutterBottom sx={{marginTop: "50px"}}>Zacznij monetyzować swoje social media już dziś!</Typography>
                    <Typography variant="h6" gutterBottom sx={{marginTop: "50px"}}>Ilu fanów potrafisz przekonać?</Typography>
                    <Box
                        sx={{width: 300, margin: "50px auto 0"}}
                    >
                        <Slider
                            style={{color: "lightblue"}}
                            aria-label="Always visible"
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
                                defaultValue: 10000,
                                step: 1000,
                                min: 1000,
                                onKeyPress: (event) => {
                                    if (event.key === '-' || event.key === 'e' || event.key === '.' || event.key === ',') {
                                        event.preventDefault();
                                    }
                                }
                            }}
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
                            size={"small"}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                inputProps: {
                                    defaultValue: 9.99,
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
                <Grid item md={6} sm={6} xs={12} sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <img style={{maxWidth: "100%", height: "Auto", marginTop: "100px", borderRadius: "10px"}}
                         src={earningCalcImage} alt="woman earning money"/>
                    <Typography variant="subtitle2" gutterBottom sx={{marginTop: '20px'}}>Przykładowe miesięczne dochody to:</Typography>
                    <Chip icon={<AttachMoneyOutlinedIcon fontSize="large"/>} label={earnings}  sx={{
                        border: 1,
                        fontSize: '28px',
                        width: '250px',
                        height: '45px',
                        display: 'flex',
                        justifyContent: 'space-between'

                    }}/>
                </Grid>

            </Grid>
        </Container>

    )
}