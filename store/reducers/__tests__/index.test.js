import {
    getGames,
    getGameById,
    areGamesLoaded,
    getRunsUrl,
    getSelectedGame,
    areRunsLoadedByGameId,
    isFetchingGames,
    isFetchingRuns
} from "../index";

const gamesMock = [
    {
        id: "game-1", 
        names: { 
            international: "international-name"
        }, 
        assets: { 
            "cover-small" : { 
                uri: "cover-small-uri"
            }
        },
        links: [
            { 
                rel: "self", 
                uri: "lin-uri-self" 
            },
            { 
                rel: "runs", 
                uri: "link-uri-runs" }
        ]
    },
    {
        id: "game-2", 
        names: { 
            international: "international-name-2"
        }, 
        assets: { 
            "cover-small" : { 
                uri: "cover-small-uri-2"
            }
        },
        links: [
            { 
                rel: "levels", 
                uri: "lin-uri-levels" 
            }
        ]
    }
];
const gameRunsMock = {
    "game-1": [
        {
            id: "run-1",
            videos: {
                links: [
                    {
                        uri: "link-uri"
                    }
                ]
            },
            players: [
                {
                    id: "player-1",
                    name: "player-name"
                }
            ],
            times: {
                primary_t: 23
            }
        },
        {
            id: "run-2",
            videos: {
                links: [
                    {
                        uri: "link-uri-2"
                    }
                ]
            },
            players: [
                {
                    id: "player-2"
                }
            ],
            times: {
                primary_t: 203
            }
        }
    ]
};

describe("#getGames", () => {
    it("return all games", () => {
        const state = {
            games: gamesMock
        };
        const expectedGames = [
            {
                id: "game-1", 
                name: "international-name",
                logoUrl: "cover-small-uri"
            },
            {
                id: "game-2", 
                name: "international-name-2",
                logoUrl: "cover-small-uri-2"
            }
        ];
    
        expect(getGames(state)).toEqual(expectedGames);
    });

    it("return one game left because it is not complete", () => {
        const incompleteGame = {
            id: "game-3", 
            names: { 
                international: "international-name"
            }
        };

        const gamesState = [
            ...gamesMock,
            incompleteGame
        ];
        const state = {
            games: gamesState
        };

        const expectedGames = [
            {
                id: "game-1", 
                name: "international-name",
                logoUrl: "cover-small-uri"
            },
            {
                id: "game-2", 
                name: "international-name-2",
                logoUrl: "cover-small-uri-2"
            }
        ];
    
        expect(getGames(state)).toEqual(expectedGames);
    });
});

describe("#getGameById", () => {
    const state = {
        games: gamesMock
    };
    
    it("return the game with the specified id", () => {
        const gameId = "game-1";
        const expectedGame = {
            id: "game-1", 
            names: { 
                international: "international-name"
            }, 
            assets: { 
                "cover-small" : { 
                    uri: "cover-small-uri"
                }
            },
            links: [
                { 
                    rel: "self", 
                    uri: "lin-uri-self" 
                },
                { 
                    rel: "runs", 
                    uri: "link-uri-runs" }
            ]
        };
    
        expect(getGameById(state, gameId)).toEqual(expectedGame);
    });

    it("returns undefined when the game with specfified id is not found", () => {
        const gameId = "game-17";

        expect(getGameById(state, gameId)).toEqual(undefined);
    });
});

describe("#areGamesLoaded", () => {
    it("returns false when the games are an empty array", () => {
        const state = {
            games: []
        };

        expect(areGamesLoaded(state)).toEqual(false);
    });

    it("returns true when the games are loaded", () => {
        const state = {
            games: gamesMock
        };

        expect(areGamesLoaded(state)).toEqual(true);
    });
});

describe("#getRunsUrl", () => {
    const state = {
        games: gamesMock
    };

    it("returns undefined when the game with specfified id is not found", () => {
        const gameId = "game-17";

        expect(getRunsUrl(state, gameId)).toEqual(undefined);
    });

    it("returns undefined when the game doesn't have runs link", () => {
        const gameId = "game-2";

        expect(getRunsUrl(state, gameId)).toEqual(undefined);
    });

    it("returns the runs url when the game is founded and have runs link", () => {
        const gameId = "game-1";

        expect(getRunsUrl(state, gameId)).toEqual("link-uri-runs");
    });
});

describe("#getSelectedGame", () => {
    const state = {
        games: gamesMock,
        runs: gameRunsMock
    };

    // In a real world application, all the cases must be tested

    it("returns the expected structure when first run and game exist", () => {
        const gameId = "game-1";
        const expectedStructure = {
            id: "game-1", 
            name: "international-name",
            logoUrl: "cover-small-uri", 
            firstRun: {
                firstPlayerName: "player-name",
                timePlayed: 23,
                videoUrl: "link-uri",

            }
        };

        expect(getSelectedGame(state, gameId)).toEqual(expectedStructure);
    });

    it("returns undefined when the game doesn't exist", () => {
        const gameId = "game-17";

        expect(getSelectedGame(state, gameId)).toEqual(undefined);
    });

    it("returns undefined when the first run of that game doesn't exist", () => {
        const state = {
            games: gamesMock,
            runs: {
                "game-1": []
            }
        };
        const gameId = "game-1";

        expect(getSelectedGame(state, gameId)).toEqual(undefined);
    });

    it("returns undefined when the game doesn't have runs", () => {
        const gameId = "game-2";

        expect(getSelectedGame(state, gameId)).toEqual(undefined);
    });
});

describe("#areRunsLoadedByGameId", () => {
    const state = {
        runs: gameRunsMock
    };
    
    it("return true when exist runs for the specified game id", () => {
        const gameId = "game-1";    
        expect(areRunsLoadedByGameId(state, gameId)).toEqual(true);
    });

    it("return false when doesn't exist runs for the specified game id", () => {
        const gameId = "game-17";    
        expect(areRunsLoadedByGameId(state, gameId)).toEqual(false);
    });
});

describe("#isFetchingGames", () => {
    it("return true when games request is running", () => {
        const state = {
            loading: {
                loadingGames: true
            }
        };
        expect(isFetchingGames(state)).toEqual(true);
    });

    it("return false when games request is running", () => {
        const state = {
            loading: {
                loadingGames: false
            }
        };
        expect(isFetchingGames(state)).toEqual(false);
    });
});

describe("#isFetchingRuns", () => {
    it("return true when game runs request is running", () => {
        const state = {
            loading: {
                loadingRuns: true
            }
        };
        expect(isFetchingRuns(state)).toEqual(true);
    });

    it("return false when game runs request is running", () => {
        const state = {
            loading: {
                loadingRuns: false
            }
        };
        expect(isFetchingRuns(state)).toEqual(false);
    });
});