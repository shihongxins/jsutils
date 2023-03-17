export declare class ListLoop<T> {
    list: T[];
    count: number;
    index: number;
    constructor(list?: T[], count?: number, index?: number);
    get total(): number;
    lastRound(): number;
    nextRound(): number;
    get currentRoundList(): T[];
}
