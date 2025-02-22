import { getItemsAsArray } from "@/lib/utils";
import FilteredValueList from "./filtered-value-list";

export default async function Page() {
  return <FilteredValueList items={await getItemsAsArray()} />;
}
