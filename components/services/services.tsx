import Heading from "../misc/heading";

export default function Services() {
  return (
    <div className="mx-auto px-4 pt-20 pb-20">
      <div className="flex flex-col gap-4 max-w-[1300px] mx-auto">
        <Heading title="Services" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[500px] texture-four border border-[#404040] rounded-[5px]">
          <div className="p-4"></div>
          <div className="border-r border-l border-[#404040] p-4"></div>
          <div className="p-4"></div>
        </div>
      </div>
    </div>
  );
}
