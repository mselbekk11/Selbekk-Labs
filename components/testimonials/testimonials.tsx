import Image from "next/image";
import Heading from "../misc/heading";
import { DottedBorder } from "@/lib/dotted-border";

const testimonials = [
  {
    text: "Morgan is the contractor that we all want, but often struggle to find. Professional, personable, and incredibly skilled at what he does. Morgan truly cares, he goes the extra mile always and delivers above standard. I wouldn’t recommend anyone else.",
    title: "Chelsea Collindridge",
    description: "Managing Director at We Are Thrive",
    image: "/chelsea.png",
  },
  {
    text: "The speed at which they delivered our high-quality website was simply remarkable. Their constant availability and the subsequent business growth weve seen is a testament to their outstanding service.",
    title: "Joe D'Cunha",
    description: "Co-Founder & Director - Nielson Place",
    image: "/profile-shot-joe.png",
  },
  {
    text: "Opting for their web development services resulted in a fantastic website delivered quickly and cost-effectively. Weve observed a remarkable uptick in our business, all thanks to their skillful and attentive work.",
    title: "Andrew Miller",
    description: "Co-Founder & CEO - Kodama",
    image: "/andrew.png",
  },
  {
    text: "Unmatched in speed and efficiency, their team provided a top-notch website that boosted our online presence and business revenue. Their responsiveness and dedication to our needs were truly exceptional.",
    title: "Danik Budovsky",
    description: "Founder & Owner - Advanced Ortho Labs SF",
    image: "/danik.png",
  },
  {
    text: "They exceeded every expectation with their swift and efficient website delivery, offering incredible value for money. Our business has experienced substantial growth thanks to their exceptional work.",
    title: "Karl Samsen",
    description: "Head of Capital Markets at SGI",
    image: "/karl.png",
  },
  {
    text: "The Selbekk Studio team delivered our project with astonishing speed and quality, far exceeding our expectations. Since the launch, our business has seen a noticeable increase in traffic and sales.",
    title: "Per Selbekk",
    description: "Founder & CEO - Renevo Capital",
    image: "/profile-shot-per.png",
  },
];

export default function Testimonials() {
  return (
    <div
      className="mx-auto px-4 pt-20 md:pt-40 pb-20 md:pb-40"
      id="testimonials"
    >
      <div className="flex flex-col gap-4 max-w-[1300px] mx-auto">
        <Heading title="What people say" />
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-[5px] overflow-visible gap-4 p-4">
          <DottedBorder />
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.title}
              className={`group relative flex flex-col z-50 items-center justify-center p-4 border border-[#404040] texture-four bg-[#202020] rounded-md`}
            >
              <div className="flex flex-col gap-12 z-50">
                <p className="text-sm text-gray-400">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.title}
                    width={40}
                    height={40}
                    className="relative rounded-lg"
                  />
                  <div className="flex flex-col">
                    <p className="text-white font-sans font-medium text-sm">
                      {testimonial.title}
                    </p>
                    <p className="text-gray-400 font-sans text-sm">
                      {testimonial.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
