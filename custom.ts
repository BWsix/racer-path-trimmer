enum Strategy {
    //% block="left-first"
    LEFT,
    //% block="right-first"
    RIGHT,
}

//% color="#AA278D" weight=100
namespace Racer {
    interface TrimTable {
        searchVal: string;
        replaceVal: string;
    }

    const getTrimTable = (strategy: Strategy) => {
        const trimTableListLeft: TrimTable[] = [
            { searchVal: "LBR", replaceVal: "B" },
            { searchVal: "RBL", replaceVal: "B" },
            { searchVal: "SBS", replaceVal: "B" },
            { searchVal: "LBL", replaceVal: "S" },
            { searchVal: "LBS", replaceVal: "R" },
            { searchVal: "SBL", replaceVal: "R" },
        ];

        const trimTableListRight: TrimTable[] = [
            { searchVal: "LBR", replaceVal: "B" },
            { searchVal: "RBL", replaceVal: "B" },
            { searchVal: "SBS", replaceVal: "B" },
            { searchVal: "RBR", replaceVal: "S" },
            { searchVal: "RBS", replaceVal: "L" },
            { searchVal: "SBR", replaceVal: "L" },
        ];

        return strategy === Strategy.LEFT ? trimTableListLeft : trimTableListRight;
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
                return "ERROR"; //TODO better error message.
            }
        }

        return path;
    }
}
