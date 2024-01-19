export type ArchiveMatches = {
    id: number;
    score: number;
    opponent: number;
}

export type TeamsType = {
    id: number;
    name: string;
    icon: string;
    score: number;
    archiveMatches: ArchiveMatches[]
}

export type WorldCupType = {
    uid: number;
    name: string;
    year: string;
    teams: TeamsType[];
}