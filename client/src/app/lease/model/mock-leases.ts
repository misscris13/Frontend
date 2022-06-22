// IMPORTS
import { LeasePage } from "./LeasePage";

// DATA
export const LEASE_DATA: LeasePage = {
    content: [
        { 
            id: 1, 
            game: { id: 1, title: 'Juego 1', age: 6, 
                category: { id: 1, name: 'Categoría 1' }, 
                author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, 
            client: { id: 1, name: 'Bernat Parejo' },
            startDate: new Date(2022, 4, 7), endDate: new Date(2022, 4, 12)
        },
        { 
            id: 2, 
            game: { id: 2, title: 'Juego 2', age: 8, 
                category: { id: 1, name: 'Categoría 1' }, 
                author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, 
            client: { id: 1, name: 'Bernat Parejo' },
            startDate: new Date(2022, 4, 13), endDate: new Date(2022, 4, 14)
        },
        { 
            id: 3, 
            game: { id: 3, title: 'Juego 3', age: 1, 
                category: { id: 3, name: 'Categoría 3' }, 
                author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, 
            client: { id: 2, name: 'Gemma Miguel' },
            startDate: new Date(2022, 4, 15), endDate: new Date(2022, 4, 22)
        },
        { 
            id: 4, 
            game: { id: 1, title: 'Juego 1', age: 6, 
                category: { id: 1, name: 'Categoría 1' }, 
                author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } },
            client: { id: 2, name: 'Gemma Miguel' },
            startDate: new Date(2022, 4, 13), endDate: new Date(2022, 4, 15)
        },
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