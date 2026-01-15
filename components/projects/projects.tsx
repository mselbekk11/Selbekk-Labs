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

export default function Projects() {
  return (
    <div className="mx-auto px-4 pt-20 md:pt-40" id="projects">
      <div className="flex flex-col gap-4 max-w-[1300px] mx-auto">
        <Heading title="Projects" />
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-4 overflow-visible">
          <DottedBorder className="hidden md:block" />
          {projects.map((project, index) => (
            <Link
              key={project.title}
              href={project.link}
              target="_blank"
              className={`group relative flex flex-col items-center justify-center p-4 border border-[#2d2d2d] texture-four bg-[#202020] md:z-50`}
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
                className="relative rounded-lg py-10 md:py-15"
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
