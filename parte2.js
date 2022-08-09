"use strict";
exports.__esModule = true;
var gameList = [
    {
        id: 1,
        title: "The Witcher 3",
        plataform: "XBOX"
    },
    {
        id: 2,
        title: "The Witcher 3",
        plataform: "PLAYSTATION"
    },
    {
        id: 3,
        title: "Overwatch",
        plataform: "PC"
    },
];
var RecordItemList = [
    {
        gameTitle: "The Witcher 3",
        gamePlataform: "PLAYSTATION",
        genreName: "RPG"
    },
    {
        gameTitle: "The Witcher 3",
        gamePlataform: "XBOX",
        genreName: "RPG"
    },
    {
        gameTitle: "Overwatch",
        gamePlataform: "PC",
        genreName: "Shooter"
    },
    {
        gameTitle: "Overwatch",
        gamePlataform: "PC",
        genreName: "RPG"
    },
    {
        gameTitle: "The Witcher 3",
        gamePlataform: "PLAYSTATION",
        genreName: "RPG"
    },
];
var buildBarSeries = function (games, records) {
    var mappedGames = games.map(function (game) {
        var filteredGames = records.filter(function (item) {
            return (item.gameTitle === game.title && item.gamePlataform === game.plataform);
        });
        return {
            x: "".concat(game.title, " | ").concat(game.plataform),
            y: filteredGames.length
        };
    });
    var sortedGames = mappedGames.sort(function (a, b) { return b.y - a.y; });
    return sortedGames.slice(0, 8);
};
var getPlataformChartData = function (records) {
    var plataforms = ["PC", "PLAYSTATION", "XBOX"];
    var series = plataforms.map(function (plataform) {
        var filteredGames = records.filter(function (record) {
            return record.gamePlataform === plataform;
        });
        return filteredGames.length;
    });
    return {
        lables: plataforms,
        series: series
    };
};
var getGenreChatData = function (records) {
    var computeRecordItem = function (obj, record) {
        if (obj[record.genreName] !== undefined) {
            obj[record.genreName]++;
        }
        else {
            obj[record.genreName] = 1;
        }
        return obj;
    };
    var genreByAmount = records.reduce(computeRecordItem, {});
    var labels = Object.keys(genreByAmount);
    var series = labels.map(function (x) { return genreByAmount[x]; });
    return {
        labels: labels,
        series: series
    };
};
console.log("GRÁFICO DE BARRAS: -------------------------------------------------------------");
console.log(buildBarSeries(gameList, RecordItemList));
console.log("GRÁFICO DE ROSCA (Plataformas): ----------------------------------------------------------------");
console.log(getPlataformChartData(RecordItemList));
console.log("GRÁFICO DE ROSCA (GÊNEROS): ----------------------------------------------------------------");
console.log(getGenreChatData(RecordItemList));
