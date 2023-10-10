import { Alert } from "react-bootstrap";
import Pagina from "../templates/Pagina";


export default function Tela404(props) {
    return (
        <Pagina>
            <Alert className="text-center m-2" variant="warning">
            <img className="d-block w-100 shadow-lg  rounded " src={frontalslide1} alt="Primeiro slide" />
            </Alert>
        </Pagina>
    );
}