
type Show = { date: string | undefined, name: string }
declare function parseStringToDate(date: string): Date | undefined
declare function toDDMMYYY(date: Date): string

const formatShowDate = (show: Show) => {
    if (!show.date){
         return "no date available";
    }

    const date = parseStringToDate(show.date)
    
    if (date){
        return toDDMMYYY(date)
    }
    
    return "no date available"
}

