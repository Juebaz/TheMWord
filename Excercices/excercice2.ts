

type Product = {id: string}
type Id = string;

declare function handleCreation(product: Product): Id // Errors possibles
declare function validateProduct(product: Product): void // Errors possibles
declare function checkForDuplicates(product: Product): void // Errors possibles
declare function generateProductCode(product: Product): string 


const createProduct = (json: string): Id => {
  let product: Product;
    try{

        product = JSON.parse(json);

    } catch(e){

        throw new Error('invalid json')
    }

     validateProduct(product); // throw "validationError"

     checkForDuplicates(product); // throw "duplicateError"

     return handleCreation(product); // throw "operation errors"
}

