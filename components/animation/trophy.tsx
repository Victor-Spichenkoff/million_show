export function Trophy() {
    return (
        <div className="relative w-24 h-24">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-yellow-400 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 2C10.9 2 10 2.9 10 4v2H5v2c0 3.87 3.13 7 7 7s7-3.13 7-7V6h-5V4c0-1.1-.9-2-2-2zm0 12c-2.67 0-5-2.33-5-5V8h10v1c0 2.67-2.33 5-5 5z" />
            </svg>


            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-10 animate-ping" />
        </div>
    )
}
