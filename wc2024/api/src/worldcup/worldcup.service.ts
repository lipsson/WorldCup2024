import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WorldcupService {
    private worldcup = [
        {
            "uid": 1,
            "name": "Katar",
            "year": "2023",
            "teams":
                [
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
        }];

    findAllCups() {
        return this.worldcup;

    };

    findAllTeams(cup: number) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        return cupTeams.teams

    };

    findTeamDetails(cup: number, id: number) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        return cupTeams.teams.find(team => team.id === id);

    };

    createNewCup(newCupData) {

        const highestId = [...this.worldcup].sort((a, b) => a.uid - b.uid)[0].uid
        const newCup = { id: highestId + 1, ...newCupData };
        this.worldcup.push(newCup);
        return newCup;

    };

    createNewTeam(cup: number, teamData) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        const highestId = [...cupTeams.teams].sort((a, b) => a.id - b.id)[0].id
        const newTeam = { id: highestId + 1, ...teamData };
        cupTeams.teams.push(newTeam);
        return newTeam;

    }

    updateScore(cup: number, id: number) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        cupTeams.teams = cupTeams.teams.map(team => team.id === id ? { ...team, score: team.score + 1 } : team)
        return this.findAllTeams(cup);

    };

    finishMatch(cup: number, id: number, opponent: number) {
        const currentMatch = uuidv4();
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        cupTeams.teams = cupTeams.teams.map(team => {
            if (team.id === id) {
                return { ...team, score: 0, archiveMatches: [...team.archiveMatches, { id: currentMatch, score: team.score, opponent }] }
            } else if (team.id === opponent) {
                return { ...team, score: 0, archiveMatches: [...team.archiveMatches, { id: currentMatch, score: team.score, opponent: id }] }
            } else return team
        });
        return this.findAllTeams(cup);

    };

    resetAllScore(cup: number) {
        const cupTeams = this.worldcup.find(c => c.uid === cup);
        cupTeams.teams = cupTeams.teams.map(team => ({ ...team, score: 0, archiveMatches: [] }));
        return this.findAllTeams(cup);

    };
}


