import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import { CreatableSelect } from 'chakra-react-select'
import { useController, useFormContext } from 'react-hook-form'

interface FormCreatableSelectProps {
  label: string
  name: string
  options: ValueLabel[]
  disabled?: boolean
  isMulti?: boolean
}

const FormCreatableSelect: React.FC<FormCreatableSelectProps> = ({
  label,
  name,
  disabled = false,
  isMulti = false,
  options,
}) => {
  const {
    formState: { errors },
    control,
  } = useFormContext()

  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
  })

  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel fontWeight="bold">
        <Text>{label}</Text>
      </FormLabel>
      <CreatableSelect
        isMulti={isMulti}
        selectedOptionStyle="check"
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        options={options}
        isDisabled={disabled}
      />
      <FormErrorMessage>{errors[name]?.message?.toString()}</FormErrorMessage>
    </FormControl>
  )
}

export default FormCreatableSelect
