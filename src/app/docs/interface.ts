export interface pkfodoc {
    id: string,
    numberDoc: string,
    documentDate: string,
    organizationId: string,
    organization: any
}



export interface specification {
    id: string,
    nameKaz: string,
    nameRus: string,
    rowCode: string,
    typeActiveId: string,
    typeActive?: string
}


export interface PKFO1item {
    id: string,
    documentId: string,
    document?: string,
    specificationId: string,
    specification: specification,
    fact: number,
    estimate: number,
    prediction1: number,
    prediction2: number,
    prediction3: number
}