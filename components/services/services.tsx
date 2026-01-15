import Image from "next/image";
import Heading from "../misc/heading";
import One from "./one";
// import Two from "./two";
import Three from "./three";
import IntegrationsGrid from "./IntegrationsGrid-2";
import { DottedBorder } from "@/lib/dotted-border";

const services = [
  {
    title: "Development",
    description:
      "Custom web applications, engineered for speed and reliability",
    image: "/one.png",
    component: One,
  },
  {
    title: "Integrations",
    description: "From AI features to payments and CRMs, all under one roof",
    image: "/two.png",
    component: IntegrationsGrid,
  },
  {
    title: "Hosting & Maintenance",
    description: "Fast, secure hosting with reliable, responsive support",
    image: "/three.png",
    component: Three,
  },
];

export default function Services() {
  return (
    <div className="mx-auto px-4 pt-20 md:pt-30" id="services">
      <div className="flex flex-col gap-4 max-w-[1300px] mx-auto">
        <Heading title="Services" />
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4  md:min-h-[500px] ">
          <DottedBorder />
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`relative z-10 flex flex-col p-4 texture-four bg-[#202020] border border-[#2d2d2d]`}
            >
              <div className="flex flex-col mb-4">
                <h3 className="text-white font-sans font-medium">
                  {service.title}
                </h3>
                <p className="text-gray-400 font-sans text-sm">
                  {service.description}
                </p>
              </div>
              <div className="relative flex-1 min-h-[280px] md:min-h-[300px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-md"
                />
                <div className="absolute inset-0 z-10 p-6">
                  <service.component />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
