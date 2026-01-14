export default function Heading({ title }: { title: string }) {
  return (
    <div className="flex flex-col pl-5">
      <h2 className="">{title}</h2>
    </div>
  );
}
