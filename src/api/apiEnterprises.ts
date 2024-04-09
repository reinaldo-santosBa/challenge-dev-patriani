import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { Address } from "../models/address";
import { instance } from "./basicApiConfig";
import { Enterprise } from "../models/enterprise";
interface EnterpriseWithAddress {
    id:number;
    name: string;
    purpose: "Comercial"| "Residencial";
    riNumber: string;
    addressId:number;
    status: "Breve lançamento"  |
            "Lançamento"        |
            "Em obras"          |
            "Pronto pra morar";
    address: Address
}
interface EnterpriseAndAddress{
    address: Address
    enterprise:Enterprise
}
async function getEnterprise():Promise<EnterpriseWithAddress[]>{
    const response = await instance.get<EnterpriseWithAddress[]>('');    
    return response.data
}

async function getByIdEnterprise(id:number):Promise<EnterpriseWithAddress>{
    const response = await instance.get<EnterpriseWithAddress>('/' + id);    
    return response.data
}

async function deleteEnterprise(id: number) {
    const response = await instance.delete(`${id}`);
    return response.data
}

async function createEnterprise({address,enterprise}:EnterpriseAndAddress):Promise<Enterprise> {    
    const response = await instance.post('',{address,enterprise});
    console.log(response.data);

    return response.data;
}
async function updateEnterprise({address,enterprise}:EnterpriseAndAddress):Promise<Enterprise> {
    const response = await instance.patch('',{address,enterprise});
    return response.data;
}
export const apiEnterprise = {
    getEnterprise, deleteEnterprise,getByIdEnterprise,createEnterprise,updateEnterprise
}