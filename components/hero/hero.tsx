import Image from "next/image";
import { TextEffectWithCustomDelay } from "./text";
import { DottedBorder } from "@/lib/dotted-border";

export default function Hero() {
  return (
    <div className="mx-auto px-4 pt-14 md:pt-28 ">
      <div className="max-w-[1300px] mx-auto flex flex-col mb-24 md:mb-14">
        <TextEffectWithCustomDelay />
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col">
        <div className="relative aspect-1300/650 bg-[#151515]">
          <DottedBorder />
          <Image
            src="/sl-hero-7.png"
            alt="Hero image"
            fill
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUAEsDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAABQYHCAQD/8QAKhAAAgEDAwMDBAMBAAAAAAAAAQIDBAURBhIhAAcTMUFRFCJhcYGRobH/xAAYAQADAQEAAAAAAAAAAAAAAAACAwQFAf/EACERAAICAQQCAwAAAAAAAAAAAAECAAMRBBIhQRMxUWFx/9oADAMBAAIRAxEAPwDT9Rqu3dvvUNddaOyot2pLjUz1VZTQyeOR5nLs7EbsHJJ44+OiNl7yaW1VYodRWG7UtTa7hGJqWr8DhXTggkFSCDkEfvqQ9y73c7L3asNdbLnPRqaAwl4mwHXzrkMP7HRLsbqq4R9l9MR1l4r6mE0gCLPOzqo3t6An5zj+ejXNbOtYw2fqVKuS0sG5jJdb5YrdRy1sWobNNDE2140qAZJD7AD4J59B0l6X7t6f1rqCDT9snq2rp45JlaWAwptQAnkn8jovrzW1ttukNP1pKaGS0TUlbUtQpIYWnUL4lDZ8bAhi3uQAOcnpM7N60ulm7vWC4UN0rKRPhp0njpn2xysYwN6joVsxSrIc5P1JtTSKyhhzNg9tNYX6W13ix6KumrdL2gIsNwmqC9I8xLZaEKAhAHCq+RxnGM50P1x2e1zYLXVfXdwYNQVcfnSOlvBrIw6kEIyNhSRxyRk/OOkDsLdK2HuJaKqmrKqnq4zI6SwSsjq3jYZBH7HXb3J19qCo1hc7fXam1HPQUs7xQwR1sqRhFJAAQHA/XSNPdYNQ9RGYWnqtZb3zNJW/VcWhO1dvtlNqKxV17o4aGqlNEKiOvkCuCEVdx+7HPOef4GebC0Py2sLrT0lTqbUtbRxT/dFFcZ3jVsEdAwPxxj0PWfNUahr6jT9ho5btcJ6WijkEEU1S7pGGYFgoJ4yQM49cdLtz1BeKHUNzsNPqW8fRVkyyVNO1ZIVZirKcHOQcOcdIYlhgCOAUDBM/9k="
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
