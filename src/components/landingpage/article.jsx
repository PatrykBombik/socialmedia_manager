import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import range from "../../assets/range.svg"
import noface from "../../assets/noface.svg"
import money from "../../assets/money.svg"
import platform from "../../assets/platform.jpg"

const imgStyle = {
    width: "25%",
    height: "100px",
    marginTop: "50px",
}

const gridStyle = {
    marginTop: "50px",
    width: "30%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

const h2Style = {
    position: "center"
}

export default function Article() {
    return (
        <Container maxWidth="xl" style={{marginTop: "50px"}}>
            <Grid container spacing={2}>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={4} xs={12} style={gridStyle}>
                        <img src={range} style={imgStyle}/>
                        <h2 style={h2Style}>Nie masz zbudowanych zasięgów?</h2>
                        <p>Nic straconego! Dzięki naszemu doświadczeniu i opracowanemu systemowi pracy, monetyzację swojego kontentu możesz zacząć od 0.</p>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} style={gridStyle}>
                        <img src={noface} style={imgStyle}/>
                        <h2 style={h2Style}>Nie chcesz pokazywać twarzy?</h2>
                        <p>Pokażemy Ci jak zarabiać nadal pozostając anonimowym!</p>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} style={gridStyle}>
                        <img src={money} style={imgStyle}/>
                        <h2 style={h2Style}>Chcesz zostać osobą niezależną finansowo?</h2>
                        <p>Dołącz do nas i stań się niezależnym finansowo!vTeraz to tym będziesz dla siebie Szefem!</p>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={12} style={gridStyle}>
                        <h1>Dostęp do naszej platformy to tylko 24,99$!</h1>
                        <p>Za 24,99$ dostaniesz dostęp do wiedzy zdobywanej ponad 3 lata, dzięki której zarobki rzędu 10 000 zł - 12 000 zł to normalność. Jeżeli nie uda, Ci się zarobić w pierwszym miesiącu 25$ zwrócimy Ci pieniądze!</p>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12} style={gridStyle}>
                        <img src={platform} style={{width:"100%"}}/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}