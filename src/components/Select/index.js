export default function Select({
  disabled = false,
  className,
  children,
  ...props
}) {
  return (
    <select
      disabled={disabled}
      className={`${className}  mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border`}
      {...props}
    >
      {children}
    </select>
  );
}
