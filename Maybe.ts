interface IMaybe<T> {
    map<C>(f: (t: T) => C): Maybe<C>;
      
    andThen<C>(f: (t: T) => Maybe<C>): Maybe<C>;
  
    withDefault(fallback: T): T;
  }
  
  export type Maybe<T> = Just<T> | None<T>;
  
  export const just = <T>(value: T): Maybe<T> => new Just(value);
  
  export const none = <T>(): Maybe<T> => new None();
  
  class Just<T> implements IMaybe<T> {
    public readonly tag: 'Just';
    public readonly value: T;
  
    constructor(value: T) {
      this.tag = 'Just';
      this.value = value;
    }

    andThen<C>(f: (t: T) => Maybe<C>): Maybe<C> {
      return f(this.value);
    }
  
    map<C>(f: (t: T) => C): Maybe<C> {
      return just(f(this.value));
    }

    withDefault(_fallback: T): T {
      return this.value;
    }
  }
  
  class None<T> implements IMaybe<T> {
    public readonly tag: 'None';
    public readonly none: undefined;
  
    constructor() {
      this.tag = 'None';
      this.none = undefined;
    }
    andThen<C>(_: (t: T) => Maybe<C>): Maybe<C> {
      return none();
    }
  
    map<C>(_f: (t: T) => C): Maybe<C> {
      return none();
    }   
  
    withDefault(fallback: T): T{
      return fallback;
    }
  }
  
  export const isJust = <T>(result: Maybe<T>): result is Just<T> => result.tag === 'Just';
  
  export const isNone = <T>(result: Maybe<T>): result is None<T> => result.tag === 'None';
  
  export const fromNullable = <T>(value: T | undefined | null): Maybe<T> => {
    if (value == null || value == undefined) {
      return none()
    }

    return just(value);
  };
  

