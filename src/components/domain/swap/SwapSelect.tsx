import WindowedSelect from 'react-windowed-select';

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    height: '100%',
    borderRadius: '4px 0 0 4px',
  }),
};

const SwapSelect = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div className="flex h-16 pt-2">
      <WindowedSelect className="w-64" options={options} styles={colourStyles} />
      <div className="form-control h-full w-full">
        <input type="text" placeholder="0" className="input input-bordered rounded-l-none h-full" />
      </div>
    </div>
  );
};

export default SwapSelect;
