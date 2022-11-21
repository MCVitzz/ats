import { CreatableSelect as CSelect } from 'chakra-react-select'

interface CreatableSelectProps {
  options: ValueLabel[]
  disabled?: boolean
  isMulti?: boolean
}

const CreatableSelect: React.FC<CreatableSelectProps> = ({
  options,
  disabled = false,
  isMulti = false,
}) => {
  return <CSelect options={options} isMulti={isMulti} isDisabled={disabled} />
}

export default CreatableSelect
