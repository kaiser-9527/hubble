import { Fragment, useContext, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { SupaTag } from "~/types/repo";
import { RepoContext } from "~/components/context/repo";

export default function AddTag({
  onSelectChange,
}: {
  onSelectChange: (tag: SupaTag) => void;
}) {
  const [selected, setSelected] = useState<SupaTag | null>(null);
  const [query, setQuery] = useState("");
  const { supaTagList } = useContext(RepoContext);
  const filteredPeople =
    query === ""
      ? supaTagList
      : supaTagList.filter((tag) =>
          tag.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleSelectedChange = (val: SupaTag) => {
    setSelected(null);
    onSelectChange(val);
  };

  return (
    <div className="relative">
      <Combobox value={selected} onChange={handleSelectedChange}>
        <Combobox.Input
          className=" border-bd-1 border rounded-lg bg-transparent p-1 w-40  text-sm leading-5 text-txt-2 focus:ring-0"
          displayValue={(tag: SupaTag) => tag?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 ">
          <i className="i-tabler-separator-horizontal"></i>
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 border border-bd-2 text-txt-2 w-50 overflow-auto rounded-md bg-base-elevated py-1 z-1 scroll-bar">
            {query.length > 0 && (
              <Combobox.Option
                value={{ id: `f-${Date.now()}`, name: query }}
                className={({ active }) =>
                  `relative cursor-default select-none py-1 px-2 flex justify-between ${
                    active ? "bg-primary-600 text-white" : "text-txt-2"
                  }`
                }
              >
                new tag: {query}
              </Combobox.Option>
            )}

            {filteredPeople.map((tag) => (
              <Combobox.Option
                key={tag.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-1 px-2 flex justify-between ${
                    active ? "bg-primary-600 text-white" : "text-txt-2"
                  }`
                }
                value={tag}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {tag.name}
                    </span>
                    {selected ? (
                      <span
                        className={active ? "text-white" : "text-primary-500"}
                      >
                        <i className="i-tabler-check"></i>?
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
}
