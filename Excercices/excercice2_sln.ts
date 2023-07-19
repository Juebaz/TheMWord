import { Result, failure, success } from "../Result"

type Product = {id: string}

type Error = { message : string }

declare function handleCreation(product: Product): string 
declare function validateProduct(product: Product): Result<Error,Product> 
declare function checkForDuplicates(product: Product): Result<Error,Product> 

const createProduct = (product: Product): Result<Error,string> => 
        validateProduct(product)
        .andThen(checkForDuplicates)
        .map(handleCreation)
