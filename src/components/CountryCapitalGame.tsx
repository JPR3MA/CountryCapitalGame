import '../App.css'
import { useState } from 'react';

type ButtonState = 'DEFAULT' | 'SELECTED' | 'WRONG'
type Option = {
  value: string;
  state: ButtonState;
}

function randomize() {
  return Math.random() - 0.5
}
function getCountries(data: Record<string, string>) {
  return Object.keys(data)
}
function getCapitals(data: Record<string, string>) {
  return Object.values(data)
}
function isPair(opt: Option, selected: Option, option: Option) {
  return opt.value === selected.value || opt.value === option.value
}

export default function CountryCapitalGame({ data }: { data: Record<string, string> }) {
  const [options, setOptions] = useState<Option[]>(
    [...getCountries(data), ...getCapitals(data)].sort(randomize).map((value) => ({
        value,
        state: 'DEFAULT',
      }))
  );
  const [selected, setSelected] = useState<Option>()
  const isGameOver = options.length === 0

  if (isGameOver) {
    return(
      <div>
        Congratulations!
      </div>
    )
  }
  
  function selectButton(option: Option) {
    if (!selected) {
      setSelected(option)
      setOptions(
        options.map(opt => ({
          ...opt,
          state: opt === option ? 'SELECTED' : 'DEFAULT'
        }))
      )
    } else {
      if (
        selected.value === data[option.value] || data[selected.value] === option.value
      ) {
        setOptions(
          options.filter((opt) => !isPair(opt, selected, option))
        )
      } else {
        setOptions(
          options.map((opt) => ({
            ...opt,
            state: isPair(opt, selected, option) ? 'WRONG' : opt.state
          }))
        )
      }
      setSelected(undefined)
    }
  }

  function getButtonClass(option: Option) {
      return (
        option.state === 'SELECTED'
        ? 'selected'
        : option.state === 'WRONG'
          ? 'wrong'
          : ''
      )
    }

  return (
    <>
      {options.map((option) => (
        <button
          key={option.value}
          className={getButtonClass(option)}
          onClick={() => selectButton(option)}
        >{option.value}</button>
      ))}
    </>
  )
}