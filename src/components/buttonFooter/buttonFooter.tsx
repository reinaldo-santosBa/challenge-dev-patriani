import { ContainerButton } from "./style";

interface ButtonFooterProps {
    description: string,
    pushClick: () => void,
    type?: boolean
}

export default function ButtonFooter({description, pushClick,type}: ButtonFooterProps) {
    return (
        <ContainerButton>
            <button onClick={pushClick} type={type ? "button" : "submit"}>{description}</button>
        </ContainerButton>
    )
}
