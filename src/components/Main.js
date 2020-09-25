import React, { useState } from 'react';
import { glyphData as allGlyphData, instruments } from '../logic/glyphData';

const Main = () => {

    const [instrument, setInstrument] = useState(instruments[2]);
    const glyphData = allGlyphData[instrument];

    const initialState = () => {
        const arr = glyphData.map(g => (false))
        arr[0] = true;
        return arr;
    };
    const [activeGlyphs, setActiveGlyphs] = useState(initialState);
    const [hoverIndex, setHoverIndex] = useState(-1);

    const handleGlyphClick = (e) => {
        const glyphIndex = +e.currentTarget.value;
        const newActiveGlyphs = activeGlyphs.map((ag, i) => {
            if (i === glyphIndex) return !ag;
            else return ag;
        });
        setActiveGlyphs(newActiveGlyphs);
    }

    const handleHover = (e, hover) => {
        const glyphIndex = +e.currentTarget.value;
        if (hover) setHoverIndex(glyphIndex);
        else setHoverIndex(-1);
    }

    const handleInstrumentSelect = (e) => {
        console.log(e.currentTarget.value)
        setInstrument(e.currentTarget.value)
    }

    const activeGlyphsString = glyphData
        .map((glyph, i) => (activeGlyphs[i] ? '\\u' + glyph.unicode.charCodeAt(0).toString(16).toUpperCase() : ''))
        .slice(1)   // chop off 1st char (assume it's the chart)
        .join('');

    const handleFocus = (event) => event.target.select();


    return (
        <React.Fragment>

            <div className='glyphs-container'>
                <select
                    name="instruments" id="inst-select"
                    value={instrument}
                    onChange={handleInstrumentSelect}
                >
                    {instruments.map(inst => (
                        <option
                            key={inst}
                            value={inst}
                        >
                            {inst}
                        </option>
                    ))}
                </select>
            </div>
            <div className='glyphs-container'>

                <button
                    className={`glyph-item reset`}
                    onClick={() => setActiveGlyphs(initialState)}
                >
                    Reset
                    </button>

                {glyphData.map((glyphItem, index) => (
                    <button
                        key={glyphItem.name}
                        value={index}
                        className={`glyph-item ${glyphItem.className} ${activeGlyphs[index] ? 'active' : ''}`}
                        onClick={handleGlyphClick}
                        onMouseEnter={(e) => handleHover(e, true)}
                        onMouseLeave={(e) => handleHover(e, false)}
                    >
                        {glyphItem.name}
                        {/* <div className='diagram'>{glyphItem.unicode}</div> */}
                    </button>
                )
                )}
            </div>
            <div className='diagrams-container'>
                <div className='diagram base'>
                    {glyphData[0].unicode}
                </div>
                <div className='diagram'>
                    {glyphData.slice(1).map((glyph, i) => (activeGlyphs[i + 1] ? glyph.unicode : ''))}
                    <span className='hover'>
                        {hoverIndex > -1 ? glyphData[hoverIndex].unicode : ''}
                    </span>
                </div>
            </div>
            <input className='string-box'
                type="text"
                // id={'link-' + scaleId}
                // ref={linkElt}
                value={activeGlyphsString}
                readOnly
                onFocus={handleFocus}
            />
            <div className='glyphs-container'>
                <ul>
                    To dos:
                    <li> o type (or paste) in a string </li>
                </ul>
            </div>

        </React.Fragment >
    )
}

export default Main;