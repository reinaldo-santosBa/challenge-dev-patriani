export interface Enterprise {
    id?:number
    name: string
    purpose: "Comercial"| "Residencial" | "Propósito"
    riNumber: string
    addressId?:number
    status: "Breve lançamento"  |
            "Lançamento"        |
            "Em obras"          |
            "Pronto pra morar"  |
            "Status"
}