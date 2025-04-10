import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import SpinnerMini from "../_components/SpinnerMini";

export const revalidate = 3600;
// export const revalidate = 0;

export const metadata = {
  title: "Cabins"
}


export default function Page() {

  return (
    <div className="flex items-center justify-center w-full mt-16">
    <div className="w-[95%] ">
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <Suspense  fallback={<SpinnerMini/>}>
        <CabinList/>
      </Suspense>
    </div>
    </div>
  );
}
