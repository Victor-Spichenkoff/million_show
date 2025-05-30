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
    label: number
    option1: number
    option2: number
    option3: number
    option4: number
    level: number

} | { type: "none" }
