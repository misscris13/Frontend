// IMPORTS
import { LeasePage } from "./LeasePage";

// DATA
export const LEASE_DATA: LeasePage = {
    content: [
        { id: 1, gameName: 'Game 1', clientName: 'Client 1', startDate: new Date(2022, 4, 7), endDate: new Date(2022, 4, 12) },
        { id: 2, gameName: 'Game 2', clientName: 'Client 1', startDate: new Date(2022, 4, 13), endDate: new Date(2022, 4, 14) },
        { id: 3, gameName: 'Game 3', clientName: 'Client 1', startDate: new Date(2022, 4, 15), endDate: new Date(2022, 4, 22) },
        { id: 4, gameName: 'Game 1', clientName: 'Client 2', startDate: new Date(2022, 4, 13), endDate: new Date(2022, 4, 15) },
        { id: 5, gameName: 'Game 2', clientName: 'Client 2', startDate: new Date(2022, 4, 16), endDate: new Date(2022, 4, 19) },
        { id: 6, gameName: 'Game 3', clientName: 'Client 2', startDate: new Date(2022, 4, 19), endDate: new Date(2022, 4, 30) },
        { id: 7, gameName: 'Game 1', clientName: 'Client 3', startDate: new Date(2022, 5, 1), endDate: new Date(2022, 1, 12) },
    ],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            { property: "id", direction: "ASC"}
        ]
    },
    totalElements: 7
}