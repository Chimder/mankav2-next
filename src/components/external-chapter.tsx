import Link from 'next/link'

type Props = {
  externalUrl: string
}

const ExternalChapter = ({ externalUrl }: Props) => {
  return (
    <div>
      <h2>This manga you can read on </h2>
      <Link href={externalUrl}></Link>
    </div>
  )
}

export default ExternalChapter
