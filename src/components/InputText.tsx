import { useState } from 'react';
import { Button, Input } from '@mui/material';

interface InputTextProps {
  setValue: (value: string) => void;
}

function InputText({ setValue }: InputTextProps) {
  const [inputValue, setInputValue] = useState('');
  const [savedValue, setSavedValue] = useState('');

  //console.log(savedValue);
  console.log(savedValue);

  const handleButtonClick = () => {
    const ciudad = inputValue.trim()
      ? inputValue.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : 'Guayaquil';
    setSavedValue(ciudad);
    setValue(ciudad);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ingresa una ciudad"
        style={{ marginRight: '10px', marginTop: '20px', color: 'black', width: '80%' }}
      />
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Buscar
      </Button>
    </>
  );
}

export default InputText;
