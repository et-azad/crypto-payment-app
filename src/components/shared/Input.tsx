
export default function Input(
	{
		type,
		name,
		label,
		value,
		required,
		disabled,
		errorMessage
	}: {
		type: "text" | "number";
		name: string;
		label: string;
		value?: any;
		required?: boolean;
		disabled?: boolean;
		errorMessage?: string;
	}
) {
	return (
		<div className="relative z-0 w-full mb-6 group">
			<input
				id={name}
				type={type}
				name={name}
				defaultValue={value}
				className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
				required={required}
				disabled={disabled}
				placeholder=" "
			/>
			<label
				htmlFor={name}
				className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
				{label}
			</label>
		</div>
	)
}