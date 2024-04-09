import axios from "axios";
interface CepData {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  }
  
export async function getByCep(cep: string):Promise<CepData>{
    const response = await axios.get<CepData>('https://viacep.com.br/ws/'+cep+'/json/');    
    return response.data
}