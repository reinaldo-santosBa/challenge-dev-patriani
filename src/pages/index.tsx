import { useEffect, useState } from "react";
import Head from "next/head";
import ButtonFooter from "../components/buttonFooter/buttonFooter";
import Header from "../components/Header";
import {
    ContainerHome,
    ContentHome,
    TextLoading,
} from "./styles";
import { apiEnterprise } from "../api/apiEnterprises";
import {  useQuery } from "react-query";
import { CardArea } from "../components/cardArea/cardArea";
import { SearchInput } from "../components/searchInput/searchInput";
import { useRouter } from 'next/router';


export default function Home() {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [enterprisesNumber, setEnterprisesNumber] = useState(0)
    const [search, setSearch] = useState("")
    const router = useRouter();

    function numberEnterprises() {
        if (data) {
            setEnterprisesNumber(data.length)
        }
    }

    useEffect(() => {
        numberEnterprises()
    })


    const { data, isError, isLoading } = useQuery("enterprise-list", apiEnterprise.getEnterprise);    

    function handleHereNewEnterprise() {
        router.push('/form/0');
    }

    function handleHome() {
        router.push('/');
    }

    const handleSearch = Array.isArray(data)
        ? data.filter((body: any) => {
            return body.name.toLowerCase().includes(search.toLowerCase());
        })
        : [];

    return (
        <>
            <Head>
                <title>ChallengJob</title>
            </Head>

            <main>
                <Header
                    title="Empreendimentos"
                    button={true}
                    IconReturn={false}
                    PushButton={handleHereNewEnterprise}
                    PushButtonReturn={handleHome}
                />
                <SearchInput setSearch={setSearch} />
                {
                    isLoading
                    ?
                        (
                            <TextLoading/>
                        )
                    : handleSearch?.slice(0, rowsPerPage).map((data: any) => {
                        return (
                            <ContainerHome key={data.id}>
                                <ContentHome>
                                    <CardArea {...data}/>
                                </ContentHome>
                            </ContainerHome>
                        )
                    })
                }

                {(enterprisesNumber > rowsPerPage) && <ButtonFooter description={"Carregar mais"} pushClick={() => setRowsPerPage(rowsPerPage + 5)} />}
            </main>
        </>
    )
}