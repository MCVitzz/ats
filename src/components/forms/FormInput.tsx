import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { HTMLInputTypeAttribute } from 'react'
import { useFormContext } from 'react-hook-form'

interface FormInputProps {
  label: string
  name: string
  type?: HTMLInputTypeAttribute
  autoComplete?: boolean
  disabled?: boolean
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  autoComplete = true,
  disabled = false,
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext()

  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel fontWeight="bold">
        <Text>{label}</Text>
      </FormLabel>
      <Input
        autoComplete={!autoComplete ? 'off' : undefined}
        type={type}
        disabled={disabled}
        {...register(name, {
          valueAsNumber: type === 'number',
        })}
      />
      <FormErrorMessage>{errors[name]?.message?.toString()}</FormErrorMessage>
    </FormControl>
  )
}

export default FormInput
