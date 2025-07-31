import {User} from "@/types/user";
import {Question} from "@/types/responses/question";

export const baseAdmCreateUser: User = {
    id: 0,
    userName: "",
    password: "",
    role: "normal",
}


export const baseAdmQuestion: Question ={
    id: 0,
    answerIndex: 1,
    label: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    level: 1,
    isBr: false
}
