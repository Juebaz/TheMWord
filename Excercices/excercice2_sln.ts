import { Result, failure, success } from "../Result"

type Product = {id: string}
type Id = string & {_type: 'id'}; // Opaque type

declare function handleCreation(product: Product): Id 
declare function validateProduct(product: Product): Result<string,Product> 
declare function checkForDuplicates(product: Product): Result<string,Product> 

// declare function createProduct(json: string): Result<string,Id>

const createProduct = (json: string): Result<string,Id> => 
    parseSafe<Product>(json)
        .andThen(validateProduct)
        .andThen(checkForDuplicates)
        .map(product => handleCreation(product))


const parseSafe = <T>(json: string): Result<string, T> => {
    try{
        const item: T = JSON.parse(json);
        return success(item)
    } catch(e){
        return failure('Invalid json')
    }
}
