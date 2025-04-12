interface IHeader {
    label: string
    showConfig?: boolean
}

export const Header = ({label, showConfig}: IHeader) => {
    return (
        <header className={"border-text border-b-2 w-screen text-center py-3 text-3xl " +
            "font-black font-merriweather mb-2" }>
            <h1>{ label }</h1>
        </header>
    )

}
