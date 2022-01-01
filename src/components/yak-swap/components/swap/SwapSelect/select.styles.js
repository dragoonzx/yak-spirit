export const colourStyles = {
    control: (styles) => ({
        ...styles,
        height: '100%',
        // borderRadius: '4px 0 0 4px',
        backgroundColor: 'hsla(var(--b1) / var(--tw-bg-opacity, 1))',
        borderColor: 'hsla(var(--bc) / 0.2)',
        borderWidth: '1px',
        borderRadius: 'var(--rounded-btn, .5rem) 0 0 var(--rounded-btn, .5rem)',
        fontSize: '.875rem',
        lineHeight: 2,
        color: 'inherit',
        cursor: 'text',
        boxShadow: 'inherit',
        paddingLeft: 28,
        ':focus': {
            ...styles[':focus'],
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: '0 0 0 2px hsl(var(--b1)), 0 0 0 4px hsla(var(--bc) / .2)',
        },
        ':hover': {
            ...styles[':hover'],
            borderColor: 'hsla(var(--bc) / 0.2)',
            boxShadow: '0 0 0 2px hsl(var(--b1)), 0 0 0 4px hsla(var(--bc) / .2)',
        },
    }),
    input: (styles) => ({
        ...styles,
        color: 'inherit',
    }),
    noOptionsMessage: (styles) => ({
        ...styles,
        color: 'inherit',
    }),
    placeholder: (styles) => ({
        ...styles,
        color: 'inherit',
    }),
    singleValue: (styles) => ({
        ...styles,
        color: 'inherit',
        maxWidth: '86px',
        marginLeft: '8px',
    }),
    menu: (styles) => ({
        ...styles,
        // borderRadius: '4px 0 0 4px',
        backgroundColor: 'hsla(var(--b1) / var(--tw-bg-opacity, 1))',
        borderColor: 'hsla(var(--bc) / 0.2)',
        borderWidth: '1px',
        fontSize: '.875rem',
        lineHeight: 2,
        color: 'inherit',
        zIndex: 20,
        width: '200%',
        // maxHeight: '200px',
        // overflow: 'auto',
    }),
    option: (styles, { isFocused, isSelected }) => ({
    // ...styles,
    // cursor: 'pointer',
    // backgroundColor: isSelected
    //   ? 'hsla(var(--p) / var(--tw-bg-opacity,1))'
    //   : isFocused
    //   ? 'hsla(var(--p) / 0.2)'
    //   : undefined,
    // ':active': {
    //   ...styles[':active'],
    //   backgroundColor: isSelected
    //     ? 'hsla(var(--pf) / var(--tw-bg-opacity,1))'
    //     : 'hsla(var(--pf) / var(--tw-bg-opacity,1))',
    // },
    }),
    indicatorSeparator: (styles) => ({
        ...styles,
        opacity: 0.2,
    }),
};
