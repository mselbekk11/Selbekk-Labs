export default function OldForm() {
  return (
    <form className="flex flex-col gap-4">
      {/* Name field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className="rounded-md border border-[#404040] bg-[#202020] px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>

      {/* Email field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="rounded-md border border-[#404040] bg-[#202020] px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>

      {/* Message field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project..."
          className="rounded-md border border-[#404040] bg-[#202020] px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
        />
      </div>
    </form>
  );
}
