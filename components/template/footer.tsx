interface IFooter {
    notAbsolute?: boolean
}

export const Footer = ({notAbsolute}: IFooter) => {
    const now = new Date()

    const year = now.getFullYear()

    return (
        <footer className={`${!notAbsolute ? "absolute" : "self-end mt-3"}
          bottom-0 right-0 bg-gray-600 bg-highlight border-0 border-y-gray-400 px-2 py-1 
        rounded-lg rounded-br-none
        text-xs
        `}>
            Victor Spichenkoff &copy; {year}
        </footer>
    )
}
