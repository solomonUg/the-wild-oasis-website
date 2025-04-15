import Cabin from "@/app/_components/Cabin";
import Reservations from "@/app/_components/Reservations";
import SpinnerMini from "@/app/_components/SpinnerMini";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({params}) {
  const resolvedParams = await Promise.resolve(params);
  const cabinData = await getCabin(resolvedParams.cabinId);
  const {name} = cabinData;
  return {title: `Cabin ${name}`}
}

// making the dynamic cabin route static
export async function generateStaticParams() {
  const cabins= await getCabins();
  const ids = cabins.map((cabin)=>({cabinId: String(cabin.id)}));
  return ids
}

export default async function Page({params}) {
  const {cabinId} = await params;
  const cabinData = await getCabin(cabinId);
  const { id, name, maxCapacity, regularPrice, discount, image, description } = cabinData;
  

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabinData}/>
      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400">
          Reserve cabin {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<SpinnerMini/>}>
          <Reservations cabinData={cabinData} />
        </Suspense>
      </div>
    </div>
  );
}
