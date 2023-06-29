import { Maybe } from "../Maybe";

type Show2 = { date: Maybe<string>, name: string }

declare function parseStringToDate(date: string): Maybe<Date>
declare function toDDMMYYY(date: Date): string

const formatShowDate = (show: Show2) => 
show.date
    .andThen(parseStringToDate)
    .map(toDDMMYYY)
    .withDefault("No date available");