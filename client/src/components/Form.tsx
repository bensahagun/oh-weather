import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";
import { MdGpsFixed } from "react-icons/md";
import { RiSearchEyeLine } from "react-icons/ri";

interface IForm {
  handleFormSubmit: (input: string) => void;
  handleGPSClick: () => void;
  gpsMode: boolean;
}

const Form = ({ handleFormSubmit, handleGPSClick, gpsMode }: IForm) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && input.length > 4 && handleFormSubmit(input);
  };

  const handleClick = () => {
    input.length > 4 && handleFormSubmit(input);
  };

  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement
          onClick={handleGPSClick}
          fontSize='1.2em'
          cursor='pointer'
          height='100%'
          children={<MdGpsFixed />}
          background={gpsMode ? "whiteAlpha.500" : "none"}
        />
        <Input
          data-testid='searchInput'
          _placeholder={{ color: "whiteAlpha.500" }}
          backgroundColor='blackAlpha.600'
          placeholder='Type a city and press Enter'
          variant='outline'
          size='lg'
          fontWeight='medium'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement
          data-testid='searchSubmit'
          onClick={handleClick}
          fontSize='1.4em'
          cursor='pointer'
          height='100%'
          children={<RiSearchEyeLine />}
        />
      </InputGroup>
    </FormControl>
  );
};

export default Form;
