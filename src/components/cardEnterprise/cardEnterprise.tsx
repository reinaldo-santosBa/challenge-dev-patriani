import Image from "next/image";
import { BoxNameEnterprise, ContentStatus, IconArea } from "../../pages/styles";
import { Address } from "../../models/address";
import svgDel from '../../../public/images/lixo.svg'
import svgEdit from '../../../public/images/edit.svg'
import { Dispatch, SetStateAction } from "react";
interface props {
    data: {
        id: number;
        name: string;
        purpose: "Comercial" | "Residencial";
        riNumber: string;
        addressId: number;
        status: "Breve lançamento" |
        "Lançamento" |
        "Em obras" |
        "Pronto pra morar";
        address: Address;
    }
    goEditForm: (id: number) => void;

    setOpenModalDelete: Dispatch<SetStateAction<boolean>>
}

export const CardEnterprise = ({data,goEditForm,setOpenModalDelete}: props) => {
    return (
        <div style={{ width: '100%',height: '100%' }}>
            <BoxNameEnterprise>
                <span>{data.name}</span>
                <ContentStatus>
                    <div>{data.status === "Lançamento" ? "Lançamento" : data.status}</div>
                    <div>{data.purpose === "Residencial" ? "Residencial" : data.purpose}</div>
                </ContentStatus>
            </BoxNameEnterprise>
            <BoxNameEnterprise>
                <p>{data.address.street}, {data.address.number} - {data.address.district}, {data.address.state}</p>
                <IconArea>
                    <Image
                        src={svgEdit}
                        alt="Icone de Lapis"
                        onClick={() => { goEditForm(data.id) }}
                    />
                    <Image
                        onClick={() => {
                            setOpenModalDelete(true);
                        }}
                        src={svgDel}
                        alt="Icone de Lixeira"
                    />
                </IconArea>

            </BoxNameEnterprise>
        </div>
    )
}