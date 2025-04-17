"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabaseClient";
import { getBookings } from "./data-service";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // regular expression validation
  const pattern = /^[a-zA-Z0-9]{6,11}$/;
  if (!pattern.test(nationalID)) throw new Error("Enter a valid National Id");

  const updateData = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings =  await getBookings(session.user.guestId);
 
  const guestBookingIds = guestBookings.map((booking)=>booking.id);

  if(!guestBookingIds.includes(bookingId)) throw new Error("You are noy allowed to delete this cabin");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
