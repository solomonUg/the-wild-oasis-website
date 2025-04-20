"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabaseClient";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { is } from "date-fns/locale";

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

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");


  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    extrasPrice: 0,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    observations: formData.get("observations"),
    };

     const { error } = await supabase
        .from('bookings')
        .insert([newBooking]) 
    
      if (error) throw new Error('Booking could not be created');

      revalidatePath(`/cabin/${bookingData.cabinId}`);
      redirect("/cabins/thankyou");

}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this cabin");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  // carrying out Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //Getting the data out of the formData
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");
  const reservationId = Number(formData.get("reservationId"));

  // Validate observations length (max 200 chars)
  if (observations && observations.length > 200) {
    throw new Error("Observations must not exceed 250 characters.");
  }

  //Carrying out authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(reservationId)) {
    throw new Error("You are not allowed to update this cabin");
  }

  //updating the data in the database
  const updateData = { numGuests, observations };
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", reservationId)
    .select()
    .single();

  //error handling
  if (error) throw new Error("Reservation could not be updated");

  //revalidating
  revalidatePath(`/account/reservations/edit/${reservationId}`);

  //redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
