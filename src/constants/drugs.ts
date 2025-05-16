export interface Drug {
    name: string;
    type: 'anabólico' | 'androgênico' | 'antiestrogênico' | 'protetor hepático' | 'outro';
    ester?: string;
    halfLifeHours?: number;
    administration: 'oral' | 'injetável' | 'transdérmico';
    observation?: string;
}

export const DRUGS: Drug[] = [
    {
        name: 'Testosterona Enantato',
        type: 'anabólico',
        ester: 'Enantato',
        halfLifeHours: 120, // ~5 dias
        administration: 'injetável',
    },
    {
        name: 'Testosterona Propionato',
        type: 'anabólico',
        ester: 'Propionato',
        halfLifeHours: 48,
        administration: 'injetável',
    },
    {
        name: 'Dianabol (Metandrostenolona)',
        type: 'anabólico',
        administration: 'oral',
        halfLifeHours: 6,
    },
    {
        name: 'Oxandrolona (Anavar)',
        type: 'anabólico',
        administration: 'oral',
        halfLifeHours: 10,
    },
    {
        name: 'Stanozolol (Winstrol)',
        type: 'anabólico',
        administration: 'oral',
        halfLifeHours: 9,
    },
    {
        name: 'Trembolona Acetato',
        type: 'anabólico',
        ester: 'Acetato',
        administration: 'injetável',
        halfLifeHours: 72,
    },
    {
        name: 'Primobolan (Metenolona Enantato)',
        type: 'anabólico',
        administration: 'injetável',
        halfLifeHours: 120,
    },
    {
        name: 'Anastrozol',
        type: 'antiestrogênico',
        administration: 'oral',
        observation: 'Inibidor de aromatase (IA)',
    },
    {
        name: 'Tamoxifeno',
        type: 'antiestrogênico',
        administration: 'oral',
        observation: 'SERM – usado em TPC',
    },
    {
        name: 'Silimarina',
        type: 'protetor hepático',
        administration: 'oral',
    },
];
