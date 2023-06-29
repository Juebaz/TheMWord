
 export const success = <E, T>(value: T): Result<E, T> => new Success(value);

 export const failure = <E, T>(error: E): Result<E, T> => new Failure(error);
 
 interface IResult<E, T> {
   andThen<C>(f: (t: T) => Result<E, C>): Result<E, C>;

   map<C>(f: (t: T) => C): Result<E, C>;

   mapError<C>(f: (e: E) => C): Result<C, T>;
 
   orElse<C>(f: (e: E) => Result<C, T>): Result<C, T>;

   withDefault<C>(fallback: C): T | C;
 }
 
 export type Result<E, T> = Success<E, T> | Failure<E, T>;
 
 class Success<E, T> implements IResult<E, T> {
   public readonly tag: 'Success';
   public readonly value: T;
 
   constructor(value: T) {
     this.tag = 'Success';
     this.value = value;
   }
 
   isError = (): this is Failure<E, T> => false;
 
   isSuccess = (): this is Success<E, T> => true;
 
   map<C>(f: (t: T) => C): Result<E, C> {
     return success(f(this.value));
   }
 
   mapError<C>(_f: (e: E) => C): Result<C, T> {
     return success(this.value);
   }
 
   andThen<C>(f: (t: T) => Result<E, C>): Result<E, C> {
     return f(this.value);
   }
 
   orElse<C>(_f: (e: E) => Result<C, T>): Result<C, T> {
     return success(this.value);
   }
 
   withDefault<C>(_fallback: C): T | C {
     return this.value;
   }
 }
 
 class Failure<E, T> implements IResult<E, T> {
   public readonly tag: 'Failure';
   public readonly error: E;
 
   constructor(error: E) {
     this.tag = 'Failure';
     this.error = error;
   }
 
   isError = (): this is Failure<E, T> => true;
 
   isSuccess = (): this is Success<E, T> => false;
 
   map<C>(_f: (t: T) => C): Result<E, C> {
     return failure(this.error);
   }
 
   mapError<C>(f: (e: E) => C): Result<C, T> {
     return failure(f(this.error));
   }
 
   andThen<C>(_f: (t: T) => Result<E, C>): Result<E, C> {
     return failure(this.error);
   }
 
   orElse<C>(f: (e: E) => Result<C, T>): Result<C, T> {
     return f(this.error);
   }
 
   withDefault<C>(fallback: C): T | C {
     return fallback;
   }
 }
 
 export const isSuccess = <E, T>(result: Result<E, T>): result is Success<E, T> => result.tag === 'Success';
 
 export const isFailure = <E, T>(result: Result<E, T>): result is Failure<E, T> => result.tag === 'Failure';
 






