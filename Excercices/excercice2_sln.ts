import { Result } from "../Result"

type User = {id: string }
type Trip = {id: string, location: string}

declare function getUser(name: string): Result<Error,User>; //can throw
declare function getTripsForUser(userid: string): Result<Error,Trip[]>; //can throw
declare function isInSameCountry(location: string, userLocation: string): boolean;
declare function getLastestAdmissibleTrip(trip: Trip[]): Result<Error,Trip>;

const isLastTripInSameCountry = (userId: string, nextTrip: Trip): Result<Error, boolean> => 
 getUser(userId)
  .andThen(user => getTripsForUser(user.id))
  .andThen(getLastestAdmissibleTrip)
  .map(trip => isInSameCountry(trip.location, nextTrip.location))

