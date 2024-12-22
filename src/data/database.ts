const bingoItems = [
  "Victor Hugo",
  "Neves lavando a louça",
  "Alguém zoando a pronúncia da Dircelene",
  "Willian e Junior trocando farpas",
  "Figurinha nova no grupo",
  "'Qual vai ser a próxima viagem?'",
  "'Nunca mais alugo cadeira'",
  "Alugou cadeira",
  "Tentar fazer o Beni repetir alguma coisa sem sucesso",
  "Junior Fazendo drama",
  "Reclamar da Playlist",
] as const;

function shuffleArray(array: Array<any>) {
  // Copia o array original para evitar modificações
  const newArray = [...array];

  // Implementa o algoritmo de Fisher-Yates
  for (let i = newArray.length - 1; i > 0; i--) {
    // Gera um índice aleatório
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Troca os elementos
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }

  return newArray;
}

export default {
  getBingoItems() {
    return [...bingoItems];
  },

  getNineFlushedItems() {
    return shuffleArray(this.getBingoItems()).slice(0, 9);
  },
};
