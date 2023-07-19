import { Result, failure, success } from "../Result"

type Product = {id: string}
type Error = { message : string }

declare function handleCreation(product: Product): string 
declare function validateProduct(product: Product): Result<Error,void> 
declare function checkForDuplicates(product: Product): Result<Error,void> 

const createProduct = (product: Product): Result<Error,string> => {
    return validateProduct(product)
        .andThen(_ => checkForDuplicates(product))
        .map(_ => handleCreation(product))
}

