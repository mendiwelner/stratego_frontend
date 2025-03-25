export function handleDisconnectFromGame(
    socketRef: React.MutableRefObject<WebSocket | null>,
    setBoard: Function,
    setNumberOfPlayer: Function,
    setMarkedCell: Function,
    setMarkedCellHovered: Function,
    setPossibleMoves: Function,
    setGraveyard: Function,
    setPlayersData: Function,
    board_setup: any,
    showMassage: boolean
) {
    if (!socketRef.current) return;
    if (showMassage) { console.log("✅ Disconnecting WebSocket..."); }
    setBoard(board_setup);
    setMarkedCell(null);
    setMarkedCellHovered(null);
    setPossibleMoves([]);
    setGraveyard([]);
    setNumberOfPlayer(0);
    setPlayersData({
        your_name: "",
        opponent_name: ""
      });
      
    socketRef.current.close(1000, "User disconnected");
    socketRef.current = null;
}
