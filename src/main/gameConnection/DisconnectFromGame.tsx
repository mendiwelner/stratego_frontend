export function handleDisconnectFromGame(socketRef: React.MutableRefObject<WebSocket | null>, setBoard: Function, setMarkedCell: Function, setMarkedCellHovered: Function, setPossibleMoves: Function) {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close(1000, "User disconnected");
        console.log("User disconnected");
        setBoard(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
        setMarkedCell(null);
        setMarkedCellHovered(null);
        setPossibleMoves([]);
    } else {
        console.log("No active connection to disconnect");
    }
}
