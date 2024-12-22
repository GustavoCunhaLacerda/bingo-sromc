import { useEffect, useRef, useState } from "react";
import database from "../data/database";
import Fireworks, { FireworksHandlers } from "@fireworks-js/react";

export default function Home() {
  const bingoItems = database.getNineFlushedItems();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gray-50">
      <div className="w-full p-6 text-center">
        <h1 className="font-sans text-4xl font-semibold">Bingo SROMC</h1>
      </div>

      <div>
        <Table bingoItems={bingoItems}></Table>
      </div>
    </div>
  );
}

function Table({ bingoItems }: { bingoItems: Array<string> }) {
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);
  const [winner, setWinner] = useState<boolean>(false);

  function addSelectedItem(itemIndex: number) {
    setSelectedItems((curr) => [...curr, itemIndex]);
  }

  useEffect(() => {
    if (
      (selectedItems.includes(0) &&
        selectedItems.includes(1) &&
        selectedItems.includes(2)) ||
      (selectedItems.includes(3) &&
        selectedItems.includes(4) &&
        selectedItems.includes(5)) ||
      (selectedItems.includes(6) &&
        selectedItems.includes(7) &&
        selectedItems.includes(8)) ||
      (selectedItems.includes(0) &&
        selectedItems.includes(3) &&
        selectedItems.includes(6)) ||
      (selectedItems.includes(1) &&
        selectedItems.includes(4) &&
        selectedItems.includes(7)) ||
      (selectedItems.includes(2) &&
        selectedItems.includes(5) &&
        selectedItems.includes(8)) ||
      (selectedItems.includes(0) &&
        selectedItems.includes(4) &&
        selectedItems.includes(8))
    ) {
      setWinner(true);
    }
  }, [selectedItems]);

  return (
    <div className="z-10 grid grid-cols-3 gap-3">
      {bingoItems.map((item: string, itemIndex: number) => {
        if (selectedItems.includes(itemIndex)) {
          return (
            <div
              key={Math.random()}
              className="size-[120px] rounded-md border border-blue-800 bg-blue-800 p-4 text-sm font-semibold text-white hover:cursor-pointer hover:bg-white hover:text-gray-900"
              onClick={() => addSelectedItem(itemIndex)}
            >
              {item}
            </div>
          );
        }

        return (
          <div
            key={Math.random()}
            className="size-[120px] rounded-md border border-blue-800 bg-white p-4 text-sm font-semibold text-gray-900 hover:cursor-pointer hover:bg-blue-800 hover:text-white"
            onClick={() => addSelectedItem(itemIndex)}
          >
            {item}
          </div>
        );
      })}

      {winner && (
        <Fireworks
          options={{ opacity: 0.5 }}
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "fixed",
            background: "#00000",
          }}
        />
      )}
    </div>
  );
}
