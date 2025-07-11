interface IFooter {
    notAbsolute?: boolean
}

export const Footer = ({notAbsolute}: IFooter) => {
    const now = new Date()

    const year = now.getFullYear()

    return (
        <footer className={`${!notAbsolute ? "absolute" : "self-end mt-3"}
          bottom-0 right-0  bg-primary border-0 border-y-gray-400 px-2 py-1 
        rounded-lg rounded-br-none
        text-xs text-gray-100/80
        `}>
            Victor Spichenkoff &copy; {year}
        </footer>
    )
}
