export {};

type Plataform = "XBOX" | "PC" | "PLAYSTATION";

type RecordItem = {
  gameTitle: string;
  gamePlataform: Plataform;
  genreName: string;
};

type Game = {
  id: number;
  title: string;
  plataform: Plataform;
};

const gameList: Game[] = [
  {
    id: 1,
    title: "The Witcher 3",
    plataform: "XBOX",
  },
  {
    id: 2,
    title: "The Witcher 3",
    plataform: "PLAYSTATION",
  },
  {
    id: 3,
    title: "Overwatch",
    plataform: "PC",
  },
];

const RecordItemList: RecordItem[] = [
  {
    gameTitle: "The Witcher 3",
    gamePlataform: "PLAYSTATION",
    genreName: "RPG",
  },
  {
    gameTitle: "The Witcher 3",
    gamePlataform: "XBOX",
    genreName: "RPG",
  },
  {
    gameTitle: "Overwatch",
    gamePlataform: "PC",
    genreName: "Shooter",
  },
  {
    gameTitle: "Overwatch",
    gamePlataform: "PC",
    genreName: "RPG",
  },
  {
    gameTitle: "The Witcher 3",
    gamePlataform: "PLAYSTATION",
    genreName: "RPG",
  },
];

const buildBarSeries = (games: Game[], records: RecordItem[]) => {
  const mappedGames = games.map((game) => {
    const filteredGames = records.filter((item) => {
      return (
        item.gameTitle === game.title && item.gamePlataform === game.plataform
      );
    });

    return {
      x: `${game.title} | ${game.plataform}`,
      y: filteredGames.length,
    };
  });

  const sortedGames = mappedGames.sort((a, b) => b.y - a.y);

  return sortedGames.slice(0, 8);
};

const getPlataformChartData = (records: RecordItem[]) => {
  const plataforms = ["PC", "PLAYSTATION", "XBOX"];

  const series = plataforms.map((plataform) => {
    const filteredGames = records.filter((record) => {
      return record.gamePlataform === plataform;
    });
    return filteredGames.length;
  });

  return {
    lables: plataforms,
    series: series,
  };
};

const getGenreChatData = (records: RecordItem[]) => {

    const computeRecordItem = (obj, record) => {
        if(obj[record.genreName] !== undefined) {
            obj[record.genreName]++;
        }
        else {
            obj[record.genreName] = 1;

        }
        return obj;
    }

    const genreByAmount = records.reduce(computeRecordItem, {});

    const labels = Object.keys(genreByAmount);
    const series = labels.map(x => genreByAmount[x]);

    return {
        labels,
        series
    }
}

console.log(
  "GRÁFICO DE BARRAS: -------------------------------------------------------------"
);
console.log(buildBarSeries(gameList, RecordItemList));

console.log(
  "GRÁFICO DE ROSCA (Plataformas): ----------------------------------------------------------------"
);
console.log(getPlataformChartData(RecordItemList));

console.log(
    "GRÁFICO DE ROSCA (GÊNEROS): ----------------------------------------------------------------"
  );
  console.log(getGenreChatData(RecordItemList));
  