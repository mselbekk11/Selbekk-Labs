import Image from "next/image";
import Heading from "../misc/heading";
import Link from "next/link";
import { DottedBorder } from "@/lib/dotted-border";

const projects = [
  {
    image: "/roam.png",
    title: "Roam International",
    description: "Luxury travel and investment application",
    link: "https://www.roaminternational.com/",
  },
  {
    image: "/trizzy.png",
    title: "Trizzy",
    description: "Application to virtually try on clothes with AI",
    link: "https://www.trizzy.ai/",
  },
  {
    image: "/picai.png",
    title: "PicAI",
    description: "Transform your selfies into studio quality images using AI",
    link: "https://www.picai.so/",
  },
  {
    image: "/growth.png",
    title: "Growth",
    description: "A Mentorship Programme for personal trainers",
    link: "https://growth-two.vercel.app/",
  },
  {
    image: "/aol.png",
    title: "Advanced Ortho",
    description: "Website for an Orthodontic Appliance manufacturer",
    link: "https://www.advancedortholabsf.com/",
  },
  {
    image: "/fire-icons.png",
    title: "Fire Icons",
    description: "Application to customize and download icons",
    link: "https://www.fireicons.io/",
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
    <div className="mx-auto px-4 pt-20 md:pt-40" id="projects">
      <div className="flex flex-col gap-4 max-w-[1300px] mx-auto">
        <Heading title="Projects" />
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-0 md:border md:border-[#404040] md:texture-four md:bg-[#202020] overflow-visible">
          <DottedBorder />
          {projects.map((project, index) => (
            <Link
              key={project.title}
              href={project.link}
              target="_blank"
              className={`group relative flex flex-col items-center justify-center p-4 border border-[#404040] texture-four bg-[#202020] md:border-0 md:bg-transparent md:bg-none md:z-50 ${getBorderClasses(index, projects.length)}`}
            >
              <div
                className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-cover bg-center pointer-events-none"
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
                <p className="text-white font-sans font-medium text-sm">
                  {project.title}
                </p>
                <p className="text-gray-400 font-sans text-sm">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
