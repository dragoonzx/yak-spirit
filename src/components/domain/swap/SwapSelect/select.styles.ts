export const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    height: '100%',
    // borderRadius: '4px 0 0 4px',
    backgroundColor: 'hsla(var(--b1) / var(--tw-bg-opacity, 1))',
    borderColor: 'hsla(var(--bc) / 0.2)',
    borderWidth: '1px',
    borderRadius: '0.375rem 0 0 0.375rem',
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
      borderColor: 'hsla(var(--bc) / 0.4)',
      // borderOpacity: 0.6,
      // boxShadow: '0 0 0 2px hsl(var(--b1)), 0 0 0 4px hsla(var(--bc) / .2)',
    },
    ':hover': {
      ...styles[':hover'],
      borderColor: 'hsla(var(--bc) / 0.4)',
      // boxShadow: '0 0 0 2px hsl(var(--b1)), 0 0 0 4px hsla(var(--bc) / .2)',
    },
  }),
  input: (styles: any) => ({
    ...styles,
    color: 'inherit',
  }),
  noOptionsMessage: (styles: any) => ({
    ...styles,
    color: 'inherit',
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: 'inherit',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: 'inherit',
    maxWidth: '86px',
    marginLeft: '4px',
  }),
  menu: (styles: any) => ({
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
  option: (styles: any, { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }) => ({
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
  indicatorSeparator: (styles: any) => ({
    ...styles,
    opacity: 0.2,
  }),
};
