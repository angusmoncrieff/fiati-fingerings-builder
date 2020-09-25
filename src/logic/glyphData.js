import { glyphData as rawGlyphData } from './rawGlyphData';

export const instruments = [
    'flute',
    'oboe',
    'clarinet',
    'bassoon',
    'saxophone',
    'recorder',
    'woodwind',
]


const glyphData = {};

const className = (name) => {
    if (name.toUpperCase().includes('CHART')) return 'base';
    else if (name.toUpperCase().includes('TRILL')) return 'low';
    else if (name.toUpperCase().includes('HALF')) return 'tertiary';
    else if (name.toUpperCase().includes('QUARTER')) return 'tertiary';
    else if (name.toUpperCase().includes('ONLY')) return 'tertiary';
    else if (name.toUpperCase().includes('SHARP')) return 'secondary';
    else if (name.toUpperCase().includes('SIDE')) return 'secondary';
    else return 'primary'
}

instruments.forEach(inst => {
    const glyphDataForInst = rawGlyphData
        .filter(raw => raw[0].startsWith(inst))
        .map(raw => (
            {
                name: raw[0].substring(inst.length),
                unicode: raw[1],
                className: className(raw[0])
            })
        );
    glyphData[inst] = glyphDataForInst;
})

console.log(glyphData)

export { glyphData };