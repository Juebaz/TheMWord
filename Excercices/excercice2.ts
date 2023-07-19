
type Product = {id: string}

declare function handleCreation(product: Product): string // Erreurs possibles
declare function validateProduct(product: Product): void // Erreurs possibles
declare function checkForDuplicates(product: Product): void // Erreurs possibles

const createProduct = (product: Product): string => {

     validateProduct(product); // can throw 
     
     checkForDuplicates(product); // can throw 

     return handleCreation(product); // can throw 
}

