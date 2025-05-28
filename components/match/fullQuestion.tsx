import { useGetQuestion } from "@/hooks/useGetQuestion"

interface IFullQuestion {
}


export const FullQuestion = ({ }: IFullQuestion) => {
    const { question, setQuestion } = useGetQuestion()

    return (
        <div>
            match {question?.label}
        </div>
    )
}