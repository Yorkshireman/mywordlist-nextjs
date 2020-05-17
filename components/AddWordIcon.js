const AddWordIcon = ({ onClick }) => {
  return <svg
    onClick={onClick}
    style={{
      bottom: '3em',
      cursor: 'pointer',
      height: '5em',
      position: 'fixed',
      right: '3em',
      stroke: 'grey'
    }} viewBox='0 0 100 100'>
    <circle cx='50' cy='50' r='45' fill='none' strokeWidth='9' strokeOpacity='0.65'></circle>
    <line x1='27.5' y1='50' x2='72.5' y2='50' strokeWidth='9' strokeOpacity='0.65'></line>
    <line x1='50' y1='27.5' x2='50' y2='72.5' strokeWidth='9' strokeOpacity='0.65'></line>
  </svg>;
};

export default AddWordIcon;
