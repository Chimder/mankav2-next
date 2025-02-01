import { Link } from 'react-router-dom'

type Props = {
  externalUrl: string
}

const ExternalChapter = ({ externalUrl }: Props) => {
  return (
    <div className="h-screen">
      <div className="flex w-full flex-col justify-center text-center">
        <h2 className="p-4 text-lg text-blue-300 sm:p-6 sm:text-xl md:p-10 md:text-2xl">
          This manga you can read on:
        </h2>
        <Link
          className="flex w-full cursor-pointer break-all px-4 text-4xl text-blue-400"
          to={externalUrl}
        >
          <span className="w-full break-words">{externalUrl}</span>
        </Link>
      </div>
    </div>
  )
}

export default ExternalChapter
