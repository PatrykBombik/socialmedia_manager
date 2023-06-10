import Container from "@mui/material/Container";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import avatar3 from "../../assets/avatar3.png";

const avatarStyle = {
width: "10%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center"
}

export default function TextCarousel() {

    return (
        <Container maxWidth="xl" style={{marginTop: "50px"}}>
            <Carousel showThumbs={false} autoPlay infiniteLoop showArrows={true}>
                <div>
                    <p>"Genialny poradnik i zarazem narzędzie, dzięki któremu jestem sama sobie szefem!"</p>
                    <img src={avatar1} alt="Avatar 1" style={avatarStyle}/>
                </div>
                <div>
                    <p>"Narzędzie do zarządzania social media jest niesamowite! Pomaga mi w organizowaniu kampanii i monitorowaniu wyników w jednym miejscu. Naprawdę usprawnia moją pracę i zwiększa efektywność."</p>
                    <img src={avatar2} alt="Avatar 2" style={avatarStyle}/>
                </div>
                <div>
                    <p>"To narzędzie do zarządzania social media jest niezbędne dla każdego marketera. Ułatwia mi harmonogramowanie postów, analizowanie danych i zarządzanie różnymi platformami społecznościowymi. Wysokiej jakości funkcje i intuicyjny interfejs - po prostu fantastyczne!"</p>
                    <img src={avatar3} alt="Avatar 3" style={avatarStyle}/>
                </div>
            </Carousel>
        </Container>
    )
}