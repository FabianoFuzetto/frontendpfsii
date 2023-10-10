import frontalslide1 from "../Imagens/frontalslide1.png"
import Pagina from "../templates/Pagina";


export default function Tela404(props) {
    return (
        <Pagina>
            
            <img className="d-block w-100 shadow-lg  rounded " src={frontalslide1} alt="Primeiro slide" />  
           
        </Pagina>
    );
}