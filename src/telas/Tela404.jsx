import Pagina from "../templates/Pagina";
import frontalslide1 from "../Imagens/frontalslide1.png"
import frontalslide2 from "../Imagens/frontalslide2.png"
import frontalslide3 from "../Imagens/frontalslide3.png"
import Carousel from 'react-bootstrap/Carousel';
import Pagina from "../templates/Pagina";


export default function Tela404(props) {
    return (
        <Pagina>
            <Carousel className="w-75">
                    <Carousel.Item>
                    <img className="d-block w-100 shadow-lg  rounded " src={frontalslide1} alt="Primeiro slide" />  
                    </Carousel.Item>
                    <Carousel.Item>
                    <img className="d-block w-100 shadow-lg  rounded " src={frontalslide2} alt="Primeiro slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img className="d-block w-100 shadow-lg  rounded " src={frontalslide3} alt="Primeiro slide" />
                    </Carousel.Item>
                    {/* Adicione mais Carousel.Items conforme necessário */}
                </Carousel>
        </Pagina>
    );
}