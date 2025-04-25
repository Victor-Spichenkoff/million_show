import { InstructionsFullRow } from './fullRow';

export const GameInstructions = () => {
    return (
        <div className={"w-full bg-secondary flex flex-col game-instructions"}>
            <InstructionsFullRow title='Objective'/>
            {/* <InstructionsFullRow><InstructionHeader title='Objective'/></InstructionsFullRow> */}
            <InstructionsFullRow isFirstItem>Win!</InstructionsFullRow>  
        </div>
    )
}
