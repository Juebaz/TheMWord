
type User = {id: string }
type Trip = {id: string, location: string, duration: number}

declare function getUser(name: string): User; //can throw
declare function getTripsForUser(userid: string): Trip[]; //can throw
declare function isInSameCountry(location: string, userLocation: string): boolean;
declare function getLastestAdmissibleTrip(trip: Trip[]): Trip; // some buisness rules that might result in a failure 



const isLastestTripInSameCountry = (userId: string, nextTrip: Trip): boolean => {
    const user = getUser(userId); //can throw

    const trips = getTripsForUser(user.id); //can throw
    
    const lastestTrip = getLastestAdmissibleTrip(trips); // can throw
    
    return isInSameCountry(lastestTrip.location, nextTrip.location);  
}


// todo