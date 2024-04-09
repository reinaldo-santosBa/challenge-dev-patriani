import Head from "next/head"
import Header from "../../../components/Header"
import { useRouter } from "next/router";
import { AreaForm, Select, Span, TextError, TextField } from "./styles";
import { useEffect, useState } from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ButtonFooter from "../../../components/buttonFooter/buttonFooter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiEnterprise } from "../../../api/apiEnterprises";
import { getByCep } from "../../../api/viaCepApi";
import { Address } from "../../../models/address";
import { Enterprise } from "../../../models/enterprise";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Inputs = {
    name: string
    cep: string
    status: "Breve lançamento" |
    "Lançamento" |
    "Em obras" |
    "Status" |
    "Pronto pra morar"
    purpose: "Residencial" |
    "Comercial" |
    "Propósito"
    district: string
    city: string
    state: string
    street: string
    number: string
}

const Form = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { id } = router.query;
    const [erroCep, setErrorCep] = useState(false);
    const { data, isError, isLoading } = useQuery(["enterprise-by-id", id], () => {
        if (Number(id) > 0) {
            return apiEnterprise.getByIdEnterprise(Number(id))
        }
        return null;
    });

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            district: "Bairro",
            city: 'Cidade',
            state: 'Estado',
            street: 'Rua',
            cep: '',
            name: '',
            number: ''
        }
    })

    useEffect(() => {
        if (data) {
            const { status, purpose, name } = data
            const {
                street,
                number,
                district,
                city,
                state,
                cep
            } = data.address
            setValue('name', name);
            setValue('number', number);
            setValue('purpose', purpose);
            setValue('status', status);
            setValue('cep', cep);
            setValue('district', district)
            setValue('street', street)
            setValue('city', city)
            setValue('state', state)
        }
    }, [data])

    const { isLoading: createLoading, mutate: mutateCreate } = useMutation(apiEnterprise.createEnterprise, {
        onError: () => {
            toast.error('Ação não executada tente novamente')
            queryClient.invalidateQueries("enterprise-list");
        },
        onSuccess: () => {
            toast.success('Criação bem-sucedida!');
        },
    })
    const { isLoading: createAtt, mutate: mutateAtt } = useMutation(apiEnterprise.updateEnterprise,{
        onError: () => {
            toast.error('Ação não executada tente novamente')
            queryClient.invalidateQueries("enterprise-list");
        },
        onSuccess: () => {
            toast.success('Editar bem-sucedida!');
        },
    })

    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        const address: Address = {
            cep: formData.cep,
            id: data ? Number(data.addressId) : 0,
            street: formData.street,
            number: formData.number,
            district: formData.district,
            city: formData.city,
            state: formData.state
        }
        const enterprise: Enterprise = {
            id: data ? Number(data.id) : 0,
            name: formData.name,
            purpose: formData.purpose,
            riNumber: '0',
            addressId: data ? Number(data.addressId) : 0,
            status: formData.status
        }
        if (Number(id) > 0) {
            const address: Address = {
                cep: formData.cep,
                id: data ? Number(data.addressId) : 0,
                street: formData.street,
                number: formData.number,
                district: formData.district,
                city: formData.city,
                state: formData.state
            }
            const enterprise: Enterprise = {
                id: data ? Number(data.id) : 0,
                name: formData.name,
                purpose: formData.purpose,
                riNumber: '0',
                addressId: data ? Number(data.addressId) : 0,
                status: formData.status
            }
            mutateAtt({ address, enterprise })
        } else {
            const address: Address = {
                cep: formData.cep,
                street: formData.street,
                number: formData.number,
                district: formData.district,
                city: formData.city,
                state: formData.state
            }
            const enterprise: Enterprise = {
                name: formData.name,
                purpose: formData.purpose,
                riNumber: '0',
                status: formData.status
            }
            mutateCreate({ address, enterprise })
        }

    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    const handleBlur = async () => {
        let cep = watch('cep')
        if (cep.length === 8) {
            try {
                const responseCep = await getByCep(watch('cep'))
                setValue('district', responseCep.bairro)
                setValue('street', responseCep.logradouro)
                setValue('city', responseCep.localidade)
                setValue('state', responseCep.uf)
                setErrorCep(false);
            } catch {
                setErrorCep(true);

            }
        }
    };
    return (
        <>
            <Head>
                <title>ChallengJob</title>
            </Head>

            <main>
                <Header
                    title={Number(id) === 0 ? "Cadastro de empreendimento" : "Editar empreendimento"}
                    button={false}
                    IconReturn={true}
                    PushButton={() => { }}
                    PushButtonReturn={() => {
                        router.push('/')
                    }}
                />
                <AreaForm>
                    <h3>Informações</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl variant="standard" fullWidth>
                            <Controller
                                name="status"
                                control={control}
                                defaultValue="Status"
                                rules={{
                                    required: 'Status is required',
                                    validate: (e) => {
                                        if (watch('status') === "Status") {
                                            return false
                                        }
                                        return true
                                    }
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        IconComponent={ExpandMoreIcon}
                                        error={Boolean(errors.status)}
                                    >
                                        <MenuItem disabled value="Status">
                                            <em>Status</em>
                                        </MenuItem>
                                        <MenuItem value={"Breve lançamento"}>Breve lançamento</MenuItem>
                                        <MenuItem value={"Lançamento"}>Lançamento</MenuItem>
                                        <MenuItem value={"Em obras"}>Em obras</MenuItem>
                                        <MenuItem value={"Pronto pra morar"}>Pronto pra morar</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>
                        {errors.status && (
                            <TextError>Por favor, insira um status valido.</TextError>
                        )}
                        <TextField
                            id="name"
                            placeholder={'Nome da empresa'}
                            variant="standard"
                            fullWidth
                            inputProps={{ style: { paddingBottom: '1rem' } }}
                            {...register('name', { required: true, minLength: 3 })}
                        />
                        {errors.name && (
                            <TextError>Por favor, insira um nome valido.</TextError>
                        )}
                        <FormControl variant="standard" fullWidth>
                            <Controller
                                name="purpose"
                                control={control}
                                defaultValue="Propósito"
                                rules={{
                                    required: 'Status is required',
                                    validate: (e) => {
                                        if (watch('purpose') === "Propósito") {
                                            return false
                                        }
                                        return true
                                    }
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        IconComponent={ExpandMoreIcon}
                                        error={Boolean(errors.purpose)}
                                    >
                                        <MenuItem disabled value="Propósito">
                                            <em>Proposito</em>
                                        </MenuItem>
                                        <MenuItem value={"Residencial"}>Residencial</MenuItem>
                                        <MenuItem value={"Comercial"}>Comercial</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>
                        {errors.purpose && (
                            <TextError>Por favor, insira um propósito valido.</TextError>
                        )}
                        <TextField
                            id="cep"
                            placeholder={'CEP'}
                            variant="standard"
                            inputProps={{ pattern: '[0-9]*', style: { paddingBottom: '1rem' } }}
                            fullWidth
                            onKeyPress={handleKeyPress}
                            {...register('cep', { required: true, minLength: 8, maxLength: 8 })}
                            onBlur={(e) => {
                                register('cep').onBlur(e)
                                handleBlur()
                            }}
                            error={erroCep}
                            helperText={erroCep}
                        />
                        {errors.cep && (
                            <TextError>Por favor, insira um CEP valido.</TextError>
                        )}

                        <Span>
                            {watch('street')}<br />
                            {watch('district')}<br />
                            {watch('city')}<br />
                            {watch('state')}<br />
                        </Span>
                        <TextField
                            id="number"
                            placeholder={'Número'}
                            variant="standard"
                            inputProps={{ style: { paddingBottom: '1rem' } }}
                            fullWidth
                            {...register('number', { required: true })}
                        />
                        {errors.number && (
                            <TextError>Por favor, insira um número valido.</TextError>
                        )}
                        <ButtonFooter description={Number(id) === 0 ? "Cadastrar" : "Editar"} type pushClick={handleSubmit(onSubmit)} />
                    </form>
                </AreaForm>
            </main>
            <ToastContainer/>
        </>
    )
}

export default Form