export type MatchHint = {

    id: number
    option1: number
    option2: number
    option3: number
    option4: number
    type: "univer"
} | {
    type: "half"
    id: number
    isBr: boolean
    label: string
    option1: string
    option2: string
    option3: string
    option4: string
    level: number

} | { type: "none" }
