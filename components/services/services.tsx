import Image from "next/image";
import Heading from "../misc/heading";
// import One from "./one";
import Two from "./two";
import Three from "./three";
import Six from "./AnimatedCodeEditor-2";
import Seven from "./AnimatedCodeEditor-3";

const services = [
  {
    title: "Development",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
    image: "/one.png",
    component: Seven,
  },
  {
    title: "Integrations",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
    image: "/two.png",
    component: Two,
  },
  {
    title: "Hosting & Maintenance",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
    image: "/three.png",
    component: Three,
  },
];

export default function Services() {
  return (
    <div className="mx-auto px-4 pt-20 pb-20">
      <div className="flex flex-col gap-4 max-w-[1300px] mx-auto">
        <Heading title="Services" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#404040] rounded-[5px] texture-four min-h-[500px] bg-[#202020]">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`relative z-10 flex flex-col p-4 ${
                index === 1 ? "lg:border-l lg:border-r border-[#404040]" : ""
              }`}
            >
              <div className="flex flex-col mb-4">
                <h3 className="text-white font-sans font-medium">
                  {service.title}
                </h3>
                <p className="text-gray-400 font-sans text-sm">
                  {service.description}
                </p>
              </div>
              <div className="relative flex-1 min-h-[300px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 z-10 ${
                    index === 0 ? "pt-4 pb-4 pl-4" : "p-4"
                  }`}
                >
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
