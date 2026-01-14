import Image from "next/image";
import Heading from "../misc/heading";

const projects = [
  {
    image: "/roam.png",
    title: "Roam International1",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
  },
  {
    image: "/roam.png",
    title: "Trizzy.ai",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
  },
  {
    image: "/roam.png",
    title: "PicAI.so",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
  },
  {
    image: "/roam.png",
    title: "Growth",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
  },
  {
    image: "/roam.png",
    title: "Advanced Ortho",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
  },
  {
    image: "/roam.png",
    title: "Fire Icons",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
  },
];

const getBorderClasses = (index: number, total: number) => {
  const classes: string[] = [];

  // Mobile (1 col): border-b on all except last
  if (index < total - 1) classes.push("border-b");

  // MD (2 cols): border-r on left column, remove border-b on last row
  if (index % 2 === 0 && index < total - 1) classes.push("md:border-r");
  if (index >= total - 2) classes.push("md:border-b-0");

  // LG (3 cols): adjust borders
  // Remove border-r from items that had it on md but are in last column on lg
  if (index % 3 === 2 && index % 2 === 0) classes.push("lg:border-r-0");
  // Add border-r to first column on lg (odd indices that didn't have md:border-r)
  if (index % 3 === 0 && index % 2 !== 0) classes.push("lg:border-r");
  // Add border-r to middle column on lg
  if (index % 3 === 1) classes.push("lg:border-r");
  // Item 3 needs border-b removed on lg (it's in last row on lg but not md)
  if (index === total - 3) classes.push("lg:border-b-0");

  return classes.join(" ");
};

export default function Projects() {
  return (
    <div className="mx-auto px-4 pt-20 pb-20">
      <div className="flex flex-col gap-4 max-w-[1300px] mx-auto">
        <Heading title="Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#404040] rounded-[5px] texture-four bg-[#202020] overflow-hidden">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative flex flex-col z-50 items-center justify-center p-4 border-[#404040] ${getBorderClasses(index, projects.length)}`}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: "url('/hover.png')" }}
              />
              <Image
                src={project.image}
                alt={project.title}
                width={300}
                height={300}
                className="relative rounded-lg py-15"
              />
              <div className="relative w-full text-left">
                <h3 className="text-white font-sans font-medium">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-sans text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
