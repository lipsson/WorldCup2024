export declare class WorldcupService {
    private worldcup;
    findAllCups(): {
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
    findTeamDetails(cup: number, id: number): {
        id: number;
        name: string;
        icon: string;
        score: number;
        archiveMatches: any[];
    };
    createNewCup(newCupData: any): any;
    createNewTeam(cup: number, teamData: any): any;
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
    resetAllScore(cup: number): {
        id: number;
        name: string;
        icon: string;
        score: number;
        archiveMatches: any[];
    }[];
}
