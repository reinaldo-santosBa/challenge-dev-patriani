import { 
    BoxRetur, 
    HeaderContainerAll, 
    BoxAdd 
} from "./styleHeader";
import svgBack from '../../../public/images/Return.svg'
import Image from "next/image";
interface HeaderProps {
    title: string,
    button: Boolean,
    IconReturn: Boolean,
    PushButton: () => void,
    PushButtonReturn: () => void

}


export default function Header({
    title, 
    button, 
    IconReturn, 
    PushButton, 
    PushButtonReturn
}: HeaderProps) {

    return (
        <HeaderContainerAll>
            {IconReturn && 
            <BoxRetur>
                <Image onClick={PushButtonReturn} src={svgBack} alt="Icone Retornar" />
            </BoxRetur>
            }
            <BoxAdd return={false}>
                <h5>{title}</h5>
                {button && <button onClick={PushButton}>Adicionar +</button>}
            </BoxAdd>
        </HeaderContainerAll>
    )
}