import Image from "next/image";
import Heading from "../misc/heading";

const testimonials = [
  {
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem .",
    title: "Joe D'Cunha",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
    image: "/profile-one.png",
  },
  {
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem .",
    title: "Andrew Miller",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
    image: "/profile-one.png",
  },
  {
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem .",
    title: "Danik Budovsky",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
    image: "/profile-one.png",
  },
  {
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem .",
    title: "Karl Samsen",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
    image: "/profile-one.png",
  },
  {
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem .",
    title: "Per Selbekk",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
    image: "/profile-one.png",
  },
  {
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem .",
    title: "Greg Cussell",
    description: "Sed ut perspiciatis unde omnis iste natus error sit",
    image: "/profile-one.png",
  },
];

export default function Testimonials() {
  return (
    <div className="mx-auto px-4 pt-20 pb-20">
      <div className="flex flex-col gap-4 max-w-[1300px] mx-auto">
        <Heading title="What people say" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-[5px]  overflow-hidden gap-4">
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
