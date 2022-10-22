import Image from 'next/image'

interface FlagProps {
  code: string
}

const Flag: React.FC<FlagProps> = ({ code }) => {
  return (
    <Image
      src={`/flags/${code}.svg`}
      width={15}
      height={7}
      alt={`${code} flag`}
    />
  )
}

export default Flag
