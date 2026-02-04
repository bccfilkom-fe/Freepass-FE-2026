"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterBtns() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  return (
    <>
      
        <label className="" onClick={() => {
          params.delete("type");
          router.push(`${pathname}?${params}`)
        }}>
          <input type="radio" name="type" value="" className="sr-only" checked={params.get("type") === null} readOnly />
          <span className="text-sm font-semibold">Semua</span>
        </label>

        <label className="" onClick={() => {
          params.set("type", "IN");
          router.push(`${pathname}?${params}`);
        }}>
          <input type="radio" name="type" value="IN" className="sr-only" checked={params.get("type") === "IN"} readOnly />
          <span className="text-sm font-semibold">Masuk</span>
        </label>

        <label className="" onClick={() => {
          params.set("type", "OUT");
          router.push(`${pathname}?${params}`);
        }}>
          <input type="radio" name="type" value="OUT" className="sr-only" checked={params.get("type") === "OUT"} readOnly />
          <span className="text-sm font-semibold">Keluar</span>
        </label>
      
    </>
  )
}

export default FilterBtns