export default function Card({ title, description, className = "" }) {
  return (
    <div className={className}>
      <div className={"bg-white rounded-lg shadow-md p-8 "}>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="flex flex-end">{description}</div>
      </div>
    </div>
  );
}
