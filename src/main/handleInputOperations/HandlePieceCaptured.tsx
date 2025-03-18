import { InputData } from "../../interfaces/InputData.tsx"

export function handlePieceCaptured(
    data: InputData,
    setGraveyard: React.Dispatch<React.SetStateAction<Array<{ player: number; value: string }>>>,
) {
    setGraveyard((prev) => [
        ...prev,
        {
            player: data.piece?.number_of_player ?? 0,
            value: data.piece?.value ?? "",
        }
    ]);
}