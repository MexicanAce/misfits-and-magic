export interface House {
    id: number;
    name: string;
    colorHue: number;
    logoUrl: string;
}

export const Houses: House[] = [
    {
        id: 1,
        name: 'Hercinil',
        colorHue: 160, // Crimson Red
        logoUrl: 'images/houses/Hercinil.webp',
    },
    {
        id: 2,
        name: 'Aqrabus',
        colorHue: 260, // Hunter Green
        logoUrl: 'images/houses/Aqrabus.webp',
    },
    {
        id: 3,
        name: 'Messanteu',
        colorHue: 0, // Cobalt Blue
        logoUrl: 'images/houses/Messanteu.webp',
    },
    {
        id: 4,
        name: 'Chimeron', // Buttery Yellow
        colorHue: 208,
        logoUrl: 'images/houses/Chimeron.webp',
    },
]