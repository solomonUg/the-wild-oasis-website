"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabaseClient";


export async function updateProfile(formData){
    const session = await auth();
    if (!session) throw new Error ("You must be logged in");
    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");
    
    // regular expression validation 
    const pattern = /^[a-zA-Z0-9]{6,11}$/;
    if(!pattern.test(nationalID)) throw new Error ("Enter a valid National Id")

    const updateData = { nationalID, nationality, countryFlag}
    const { data, error } = await supabase
         .from('guests')
         .update(updateData)
         .eq('id', session.user.guestId)
     
       if (error)  throw new Error('Guest could not be updated');

       revalidatePath('/account/profile')
}



export async function signInAction(){
        await signIn("google", {redirectTo: "/account"})
};

export async function signOutAction(){
    await signOut({redirectTo: "/"})
};
