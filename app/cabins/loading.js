import SpinnerMini from "../_components/SpinnerMini";

export default function loading() {
  return (
    <div className="grid justify-center items-center">
        <SpinnerMini/>
        <p className="text-xl text-primary-200">loading cabin data...</p>
    </div>
  )
}
