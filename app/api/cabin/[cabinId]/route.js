import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service"

export async function GET( request, {params}) {
    const {cabinId} = await params
    
    try {
       const [cabin, bookedDates]= await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)])
       return Response.json({cabin, bookedDates}) 
    } catch (error) {
        
        return Response.json({message: "could not load cabin data"}) 
    }

    
//  return Response.json({test: "testing.."})
}