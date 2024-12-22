import { useEffect, useState } from "react";
import database from "../data/database";
import Fireworks from "@fireworks-js/react";
import Swal from "sweetalert2";

export default function Home() {
  const [bingoItems, setBingoItems] = useState(database.getNineFlushedItems());

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gray-50">
      <header className="w-full p-6 text-center">
        <h1 className="font-sans text-4xl font-semibold">Bingo SROMC</h1>
      </header>

      <main>
        <Table bingoItems={bingoItems} setBingoItems={setBingoItems} />
      </main>
    </div>
  );
}

function Table({
  bingoItems,
  setBingoItems,
}: {
  bingoItems: Array<string>;
  setBingoItems: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);
  const [winner, setWinner] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<boolean>(false);

  const addSelectedItem = (itemIndex: number) => {
    if (!selectedItems.includes(itemIndex)) {
      setSelectedItems((curr) => [...curr, itemIndex]);
    }
  };

  function resetCurrentGame() {
    setSelectedItems([]);
    setWinner(false);
    setViewMode(false);
  }

  function restartGame() {
    resetCurrentGame();
    setBingoItems(database.getNineFlushedItems());
    setWinner(false);
    setViewMode(false);
  }

  useEffect(() => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const isWinner = winningPatterns.some((pattern) =>
      pattern.every((index) => selectedItems.includes(index)),
    );

    if (isWinner) {
      setWinner(true);

      Swal.fire({
        title: "BINGO!",
        confirmButtonText: "Reiniciar",
        backdrop: false,
        showCloseButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          restartGame();
        } else {
          setWinner(false);
          setViewMode(true);
        }
      });
    }
  }, [selectedItems]);

  return (
    <div>
      <div className="relative z-10 grid grid-cols-3 gap-3">
        {bingoItems.map((item: string, itemIndex: number) => (
          <div
            key={itemIndex}
            className={`size-[120px] cursor-pointer rounded-md border p-4 text-xs font-semibold transition-colors md:size-[200px] md:text-base ${
              selectedItems.includes(itemIndex)
                ? "border-blue-800 bg-blue-800 text-white"
                : `border-blue-800 bg-white text-gray-900 ${!viewMode && "hover:bg-blue-600 hover:text-white"}`
            }`}
            onClick={() => !viewMode && addSelectedItem(itemIndex)}
          >
            {item}
          </div>
        ))}

        {winner && (
          <Fireworks
            options={{ opacity: 0.5 }}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              position: "fixed",
              background: "rgba(0, 0, 0, 0.2)",
            }}
          />
        )}
      </div>

      <div className="flex w-full gap-2 pt-2">
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={restartGame}
        >
          Nova Cartela
        </button>
        {selectedItems.length > 0 && (
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={resetCurrentGame}
          >
            Reiniciar
          </button>
        )}
      </div>
    </div>
  );
}
