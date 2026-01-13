export default function Heading({ title }: { title: string }) {
  return (
    <div className="mb-4 flex flex-col">
      <h2 className="">{title}</h2>
    </div>
  );
}
