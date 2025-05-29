import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLightbulb, faArrowRotateForward, faUser} from "@fortawesome/free-solid-svg-icons";



interface IHelps {
    half: number
    skip: number
    univer: number
}

export const Helps = ({univer, skip, half}: IHelps) => {

    return (
        <div className={"flex justify-around bg-hint border-b border-question-border border-collapse" +
            " rounded-tl-lg rounded-tr-lg relative"}>
            <button className={"hint-box"}>
                <div><FontAwesomeIcon icon={faLightbulb} className={"text-yellow-500"}/> 50/50</div>
                <span className={"text-gold"}>X{half}</span>
            </button>
            <div className={"h-[80%] w-[.5px] bg-white absolute left-[33%] top-[50%] translate-y-[-50%]"}></div>
            <button className={"hint-box"}>
                <div><FontAwesomeIcon icon={faArrowRotateForward} className={"text-gold"}/> Skip</div>
                <span className={"text-gold"}>X{skip}</span>
            </button>
            <div className={"h-[80%] w-[.5px] bg-white absolute left-[66%] top-[50%] translate-y-[-50%]"}></div>
            <button className={"hint-box"}>
                <div><FontAwesomeIcon icon={faUser} className={"text-highlight"}/> Univer</div>
                <span className={"text-gold"}>X{univer}</span>
            </button>
        </div>
    )
}
