export declare class ListLoop<T> {
    list: T[];
    count: number;
    index: number;
    constructor(list?: T[], count?: number, index?: number);
    lastRound(): number;
    nextRound(): number;
    currentRoundList(): T[];
}
