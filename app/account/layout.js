import SideNavigation from "../_components/SideNavigation";

export default function Layout({children}) {
  return (
    <div className="flex justify-center w-full mt-10">
      <div className="grid grid-cols-[16rem_1fr] h-full gap-12 w-[95%]">
        <SideNavigation/>
        <div>{children}</div>
      </div>
    </div>
  );
}
