import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import range from "../../assets/range.svg"
import noface from "../../assets/noface.svg"
import money from "../../assets/money.svg"
import platform from "../../assets/platform.jpg"
import Typography from "@mui/material/Typography";

const imgStyle = {
    width: "25%",
    height: "100px",
}

const gridStyle = {
    marginTop: "50px",
    width: "30%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
}

const h2Style = {
    textAlign: "center"
}

const pStyle = {
    textAlign: "center"
}

export default function Article() {
    return (
        <Container maxWidth="xl" style={{marginTop: "50px"}}>
            <Grid container spacing={2}>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={4} xs={12} style={gridStyle}>
                        <img src={range} style={imgStyle}/>
                        <Typography variant="h5" gutterBottom sx={h2Style}>Nie masz zbudowanych zasięgów?</Typography>
                        <Typography variant="body" gutterBottom sx={pStyle}>Nic straconego! Dzięki naszemu doświadczeniu i opracowanemu systemowi pracy, monetyzację swojego kontentu możesz zacząć od 0.</Typography>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} style={gridStyle}>
                        <img src={noface} style={imgStyle}/>
                        <Typography variant="h5" gutterBottom sx={h2Style}>Nie chcesz pokazywać twarzy?</Typography>
                        <Typography variant="body" gutterBottom sx={pStyle}>Pokażemy Ci jak zarabiać nadal pozostając anonimowym!</Typography>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} style={gridStyle}>
                        <img src={money} style={imgStyle}/>
                        <Typography variant="h5" gutterBottom sx={h2Style}>Chcesz zostać osobą niezależną finansowo?</Typography>
                        <Typography variant="body" gutterBottom sx={pStyle}>Dołącz do nas i stań się niezależnym finansowo! Teraz to tym będziesz dla siebie Szefem!</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50px'
                }}
                >
                    <Grid item md={6} sm={6} xs={12} style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"}}>
                        <Typography variant="h4" gutterBottom sx={{textAlign: "center", marginLeft: "15px"}}>Dostęp do naszej platformy to tylko 24,99$!</Typography>
                        <Typography variant="subtitle2" gutterBottom sx={{textAlign: "center", marginLeft: "15px"}}>Za 24,99$ dostaniesz dostęp do wiedzy zdobywanej ponad 3 lata, dzięki której zarobki rzędu 10 000 zł - 12 000 zł to normalność. Jeżeli nie uda, Ci się zarobić w pierwszym miesiącu 25$ zwrócimy Ci pieniądze!</Typography>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <img src={platform} style={{width:"100%", marginLeft: "10px", borderRadius: "10px", marginTop: '30px'}}/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}