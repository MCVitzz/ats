import {
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

export type SelectOption = {
  key: string | number
  value: string
}

type SingleSelectProps = {
  multiple?: false
  value: SelectOption | undefined
  onChange: (value?: SelectOption) => void
}

type MultiSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultiSelectProps)

export const Select: React.FC<SelectProps> = ({
  multiple,
  options,
  value,
  onChange,
}) => {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure()
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const clearOptions = () => {
    if (multiple) onChange([])
    else onChange()
  }

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (isOptionSelected(option)) {
        onChange(value.filter((v) => v.key !== option.key))
      } else onChange([...value, option])
    } else if (!isOptionSelected(option)) onChange(option)
  }

  const isOptionSelected = (option: SelectOption) => {
    if (multiple) {
      return value.some((o) => option.key === o.key)
    } else {
      return option.key === value?.key
    }
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen, setHighlightedIndex])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== ref.current) return
      switch (e.code) {
        case 'Enter':
        case 'Space':
          onToggle()
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            onOpen()
            break
          }
          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)
          if (newValue >= 0 && newValue < options.length)
            setHighlightedIndex(newValue)
          break
        }
        case 'Escape':
          onClose()
          e.stopPropagation()
          break
      }
    }
    ref.current?.addEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => ref.current?.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, highlightedIndex, options])

  return (
    <Flex
      ref={ref}
      position="relative"
      width={80}
      minH={10}
      border="0.05em solid"
      borderColor="gray.200"
      align="center"
      gap={2}
      px={4}
      borderRadius="md"
      tabIndex={0}
      onClick={onToggle}
      onBlur={onClose}
    >
      <Box flexGrow={1}>
        {multiple ? (
          <Flex gap={1} flexWrap="wrap">
            {value.map((v) => (
              <ValueLabel key={v.key} value={v} onClick={selectOption} />
            ))}
          </Flex>
        ) : (
          value?.value
        )}
      </Box>
      <Button
        variant="unstyled"
        cursor="pointer"
        tabIndex={0}
        color="gray.400"
        fontSize="1.25em"
        _hover={{ color: 'gray.800' }}
        onClick={(e) => {
          e.stopPropagation()
          clearOptions()
        }}
      >
        &times;
      </Button>
      <Box bg="gray.300" w="1px" alignSelf="stretch" my={1} />
      <Box
        transform="translateY(50%)"
        border=".25em solid transparent"
        borderTopColor="gray.400"
        cursor="pointer"
        onClick={onToggle}
      />
      {isOpen && (
        <UnorderedList
          position="absolute"
          variant="unstyled"
          bg="white"
          listStyleType="none"
          maxH={60}
          w="full"
          overflowY="auto"
          border="1px solid"
          borderRadius="md"
          borderColor="gray.200"
          left={-4} // Padding
          top="calc(100% + .25em)"
          zIndex={999}
        >
          {options.map((option, index) => (
            <ListItem
              px={4}
              py={1}
              cursor="pointer"
              onMouseEnter={() => setHighlightedIndex(index)}
              color={highlightedIndex === index ? 'white' : undefined}
              bg={
                isOptionSelected(option)
                  ? 'brand.300'
                  : highlightedIndex === index
                  ? 'brand.400'
                  : 'transparent'
              }
              key={option.key}
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
              }}
            >
              {option.value}
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Flex>
  )
}

interface ValueLabelProps {
  value: SelectOption
  onClick: (value: SelectOption) => void
}

const ValueLabel = ({ onClick, value }: ValueLabelProps) => {
  return (
    <Button
      p={1}
      h="min-content"
      fontWeight="normal"
      onClick={(e) => {
        e.stopPropagation()
        onClick(value)
      }}
      _hover={{
        bg: 'red.100',
      }}
    >
      {value.value}
      <Text ml={1} color="gray.400">
        &times;
      </Text>
    </Button>
  )
}
