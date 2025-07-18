export type Question = {
    id: number
    isBr: boolean,
    label: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    level: number
    answerIndex?: 1 | 2 | 3 | 4
}
