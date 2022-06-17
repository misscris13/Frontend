// IMPORTS
import { Pageable } from "src/app/core/model/page/Pageable";
import { Lease } from "./Lease";

// CLASS DEFINITION
export class LeasePage {
    content: Lease[];
    pageable: Pageable;
    totalElements: number;
}