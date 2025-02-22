"use client";

import { Button } from "@/components/ui/button";
import { Items, Submissions as _Submissions } from "@/lib/utils";
import { Edit, List } from "lucide-react";
import FilteredValueList from "../../filtered-value-list";
import { useState } from "react";
import Submissions from "./submissions";

export default function ListOrSubs(props: { list: Items; subs: _Submissions }) {
  const [listSelected, setListSelected] = useState(true);

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row mb-8 space-x-4">
        <Button
          variant={listSelected ? "default" : "outline"}
          onClick={() => setListSelected(true)}
          className="flex flex-row space-x-4 w-full"
        >
          <List />
          Value list
        </Button>
        <Button
          variant={!listSelected ? "default" : "outline"}
          onClick={() => setListSelected(false)}
          className="flex flex-row space-x-4 w-full"
        >
          <Edit />
          Submissions
        </Button>
      </div>

      {listSelected ? (
        <FilteredValueList items={props.list} />
      ) : (
        <Submissions submissions={props.subs} />
      )}
    </div>
  );
}
