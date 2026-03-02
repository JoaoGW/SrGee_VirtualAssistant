import OpenAILogo from '@assets/OpenAI/OpenAI-white-wordmark.svg';
import GitHubLogo from '@assets/GitHub/GitHub_Logo_White.png'

import Image from 'next/image';

export function Footer(){
  return(
    <div className="flex flex-row absolute bottom-0 left-0 p-8">
      <div  className="flex flex-row items-center">
        <p className="text-xl">Powered by</p>
        <Image src={ OpenAILogo } alt='OpenAI' height={100} width={100}></Image>
        <p className="text-lg mr-3">&</p>
        <Image src={ GitHubLogo } alt='OpenAI' height={100} width={100}></Image>
        <p className='text-xs pt-5 ml-3'>*This project is not affiliated to none of these companies, it's a community project!</p>
      </div>
    </div>
  )
}