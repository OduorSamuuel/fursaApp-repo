export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block ml-2 text-sm text-gray-900 leading-5 ` + className}>
            {value ? value : children}
        </label>
    );
}
