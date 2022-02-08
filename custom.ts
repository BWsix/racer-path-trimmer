enum Strategy {
    //% block="left-first"
    LEFT,
    //% block="right-first"
    RIGHT,
}

//% weight=100 color=#0fbc11 icon=""
namespace Racer {
    interface TrimTable {
        searchVal: string;
        replaceVal: string;
        for?: Strategy;
    }

    const trimTableList: TrimTable[] = [
        { for: null, searchVal: "LBR", replaceVal: "B" },
        { for: null, searchVal: "RBL", replaceVal: "B" },
        { for: null, searchVal: "SBS", replaceVal: "B" },
        { for: Strategy.LEFT, searchVal: "LBL", replaceVal: "S" },
        { for: Strategy.LEFT, searchVal: "LBS", replaceVal: "R" },
        { for: Strategy.LEFT, searchVal: "SBL", replaceVal: "R" },
        { for: Strategy.RIGHT, searchVal: "RBR", replaceVal: "S" },
        { for: Strategy.RIGHT, searchVal: "RBS", replaceVal: "L" },
        { for: Strategy.RIGHT, searchVal: "SBR", replaceVal: "L" },
    ];

    const getTrimTable = (strategy: Strategy) => {
        return trimTableList.filter(
            (trimTable) => trimTable.for === null || trimTable.for === strategy
        );
    };

    //% block="trim $path using strategy $strategy"
    export function pathTrimmer(path: string, strategy: Strategy): string {
        const appliedTrimTable = getTrimTable(strategy);

        while (path.includes("B")) {
            let trimmed = false;

            for (const trim of appliedTrimTable) {
                path = path.replaceAll(trim.searchVal, trim.replaceVal);
                trimmed = true;
            }

            if (!trimmed) {
                return "ERROR;" //TODO better error message.
            }
        }

        return path;
    }
}
