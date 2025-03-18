export function handleDisconnectFromGame(
    socketRef: React.MutableRefObject<WebSocket | null>,
    setBoard: Function,
    setMarkedCell: Function,
    setMarkedCellHovered: Function,
    setPossibleMoves: Function,
    setGraveyard: Function,
    showMassage: boolean
) {
    if (!socketRef.current) return;
    if (showMassage) { console.log("✅ Disconnecting WebSocket..."); }
    setBoard(Array(10).fill(null).map(() => Array(10).fill({ number_of_player: 0, value: "" })));
    setMarkedCell(null);
    setMarkedCellHovered(null);
    setPossibleMoves([]);
    setGraveyard([]);
    socketRef.current.close(1000, "User disconnected");
    socketRef.current = null;
}
