import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

export default function DiscreteSliderLabel() {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                style={{color: "lightblue"}}
                aria-label="Always visible"
                defaultValue={5}
                getAriaValueText={valuetext}
                step={1}
                marks={marks}
                valueLabelDisplay="on"
            />
        </Box>
    );
}