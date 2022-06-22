import { Client } from "src/app/client/model/Client";
import { Game } from "src/app/game/model/Game";

// Lease class definition
export class Lease {
    id: number;
    game: Game;
    client: Client;
    startDate: Date;
    endDate: Date;
}