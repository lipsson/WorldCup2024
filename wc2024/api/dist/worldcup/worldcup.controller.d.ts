import { WorldcupService } from './worldcup.service';
export declare class WorldcupController {
    private readonly worldcupService;
    constructor(worldcupService: WorldcupService);
    findAll(): {
        uid: number;
        name: string;
        year: string;
        teams: {
            id: number;
            name: string;
            icon: string;
            score: number;
            archiveMatches: any[];
        }[];
    }[];
    findAllTeams(cup: number): {
        id: number;
        name: string;
        icon: string;
        score: number;
        archiveMatches: any[];
    }[];
    resetAllScore(cup: number): {
        id: number;
        name: string;
        icon: string;
        score: number;
        archiveMatches: any[];
    }[];
    createNewCup(cupData: {}): any;
    createNewTeam(cup: number, teamData: {}): any;
    findTeamDetails(cup: number, id: number): {
        id: number;
        name: string;
        icon: string;
        score: number;
        archiveMatches: any[];
    };
    updateScore(cup: number, id: number): {
        id: number;
        name: string;
        icon: string;
        score: number;
        archiveMatches: any[];
    }[];
    finishMatch(cup: number, id: number, opponent: number): {
        id: number;
        name: string;
        icon: string;
        score: number;
        archiveMatches: any[];
    }[];
}
