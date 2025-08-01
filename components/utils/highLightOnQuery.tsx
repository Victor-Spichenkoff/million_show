export const HighLightOnQuery = ({text, searchQuery}: { text: string; searchQuery: string }) => {
    if (!searchQuery) return <span>{text}</span>

    const regex = new RegExp(`(${searchQuery})`, "gi")
    const highlighted = text.replace(regex, "<mark>$1</mark>")

    return <span dangerouslySetInnerHTML={{__html: highlighted}}/>
}
