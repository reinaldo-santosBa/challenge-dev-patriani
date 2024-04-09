import { Alert, Button } from "@material-ui/core"
import { useMutation, useQueryClient } from "react-query";
import { apiEnterprise } from "../../api/apiEnterprises";
import { useState } from "react";
import { Address } from "../../models/address";
import { useRouter } from "next/router";
import { CardEnterprise } from "../cardEnterprise/cardEnterprise";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface props {
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

export const CardArea = (data: props) => {
    const queryClient = useQueryClient();
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const router = useRouter();

    function goEditForm(id: number) {
        router.push('/form/' + id);
    }
    function useDelete() {
        return useMutation(
            (id: number) => apiEnterprise.deleteEnterprise(id),
            {
                onSuccess: () => {
                    queryClient.invalidateQueries("enterprise-list");
                    setOpenModalDelete(false)
                    toast.success('Exclusão feita com sucesso')
                },
                onError: () => {
                    toast.error('Exclusão não foi feita tente novamente')
                }
            }
        );
    }
    const deleteMutation = useDelete();

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };
    return (
        <>
            {openModalDelete &&
                <Alert
                    // maxWidth="md"
                    severity="error"
                    action={
                        <>
                            <Button onClick={() => setOpenModalDelete(false)} color="inherit" size="small">
                                Cancelar
                            </Button>
                            <Button onClick={() => handleDelete(data.id)} color="inherit" size="small">
                                Confirmar
                            </Button>
                        </>
                    }
                >
                    Confirma a exclusão do Empreendimento?
                </Alert>
            }

            {!openModalDelete &&
                <CardEnterprise data={data} goEditForm={goEditForm} setOpenModalDelete={setOpenModalDelete} />
            }
            <ToastContainer/>
        </>
    )
}