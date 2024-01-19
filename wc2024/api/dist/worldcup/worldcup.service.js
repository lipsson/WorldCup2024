"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldcupService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let WorldcupService = class WorldcupService {
    constructor() {
        this.worldcup = [
            {
                "uid": 1,
                "name": "Katar",
                "year": "2023",
                "teams": [
                    {
                        "id": 1,
                        "name": "Germany",
                        "icon": "",
                        "score": 0,
                        "archiveMatches": []
                    },
                    {
                        "id": 2,
                        "name": "Poland",
                        "icon": "",
                        "score": 0,
                        "archiveMatches": []
                    },
                    {
                        "id": 3,
                        "name": "Brazil",
                        "icon": "",
                        "score": 0,
                        "archiveMatches": []
                    },
                    {
                        "id": 4,
                        "name": "Mexico",
                        "icon": "",
                        "score": 0,
                        "archiveMatches": []
                    },
                    {
                        "id": 5,
                        "name": "Argentina",
                        "icon": "",
                        "score": 0,
                        "archiveMatches": []
                    },
                    {
                        "id": 6,
                        "name": "Uruguay",
                        "icon": "",
                        "score": 0,
                        "archiveMatches": []
                    },
                ]
            }
        ];
    }
    findAllCups() {
        return this.worldcup;
    }
    ;
    findAllTeams(cup) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        return cupTeams.teams;
    }
    ;
    findTeamDetails(cup, id) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        return cupTeams.teams.find(team => team.id === id);
    }
    ;
    createNewCup(newCupData) {
        const highestId = [...this.worldcup].sort((a, b) => a.uid - b.uid)[0].uid;
        const newCup = { id: highestId + 1, ...newCupData };
        this.worldcup.push(newCup);
        return newCup;
    }
    ;
    createNewTeam(cup, teamData) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        const highestId = [...cupTeams.teams].sort((a, b) => a.id - b.id)[0].id;
        const newTeam = { id: highestId + 1, ...teamData };
        cupTeams.teams.push(newTeam);
        return newTeam;
    }
    updateScore(cup, id) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        cupTeams.teams = cupTeams.teams.map(team => team.id === id ? { ...team, score: team.score + 1 } : team);
        return this.findAllTeams(cup);
    }
    ;
    finishMatch(cup, id, opponent) {
        const currentMatch = (0, uuid_1.v4)();
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        cupTeams.teams = cupTeams.teams.map(team => {
            if (team.id === id) {
                return { ...team, score: 0, archiveMatches: [...team.archiveMatches, { id: currentMatch, score: team.score, opponent }] };
            }
            else if (team.id === opponent) {
                return { ...team, score: 0, archiveMatches: [...team.archiveMatches, { id: currentMatch, score: team.score, opponent: id }] };
            }
            else
                return team;
        });
        return this.findAllTeams(cup);
    }
    ;
    resetAllScore(cup) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        cupTeams.teams = cupTeams.teams.map(team => ({ ...team, score: 0 }));
        return this.findAllTeams(cup);
    }
    ;
};
exports.WorldcupService = WorldcupService;
exports.WorldcupService = WorldcupService = __decorate([
    (0, common_1.Injectable)()
], WorldcupService);
//# sourceMappingURL=worldcup.service.js.map