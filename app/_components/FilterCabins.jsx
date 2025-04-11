"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterCabins({ filter }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        handleFilter={handleFilter}
        filter={"all"}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"small"}
        activeFilter={activeFilter}
      >
        1 &mdash; 3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"medium"}
        activeFilter={activeFilter}
      >
        {" "}
        4 &mdash; 7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"large"}
        activeFilter={activeFilter}
      >
        8 &mdash; 10 guests
      </Button>
    </div>
  );
}
function Button({ children, handleFilter, filter, activeFilter }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 " : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
