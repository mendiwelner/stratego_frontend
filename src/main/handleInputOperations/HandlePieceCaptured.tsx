import { InputData } from "../../interfaces/InputData.tsx";
import { Piece } from "../../interfaces/Piece.tsx";

export function handlePieceCaptured(
    data: InputData,
    setGraveyard: React.Dispatch<React.SetStateAction<Piece[]>>
) {
    setGraveyard((prev) => {
        const newGraveyard = [...prev];
        if (data.piece) {
            if (data.piece.value === 'b') {
                data.piece.value = '0'; 
            }
            newGraveyard.push(data.piece);
        }
        return newGraveyard;
    });
}
