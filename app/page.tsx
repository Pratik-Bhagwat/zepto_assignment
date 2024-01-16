import { Chiplist } from "@/components/chiplist";
import { Search } from "@/components/search";

export default function Home() {
  return (
    <div className="mx-auto w-full px-2 sm:px-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
      <h1 className="text-2xl font-bold text-blue-500 text-center pt-2">
        Pick Users
      </h1>
      <div className="flex items-center gap-3 flex-wrap border-b-2 border-blue-700 select-none w-full mt-6 py-3">
        <Chiplist />
        <Search />
      </div>
    </div>
  );
}
