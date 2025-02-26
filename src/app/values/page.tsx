import { getItemsAsArray } from "@/lib/utils";
import FilteredValueList from "./filtered-value-list";

export default async function Page() {
  return (
    <div>
          <h1 className="font-bold text-3xl text-center -mt-6 mb-6">Jailbreak Trading Values</h1>
          <FilteredValueList items={await getItemsAsArray()} />;
    </div>
  )
}
