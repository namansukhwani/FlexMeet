import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsCameraVideoFill } from 'react-icons/bs';
import { AiFillGithub, AiFillLinkedin, AiOutlineGoogle } from 'react-icons/ai'
import io from 'socket.io-client';

export default function Login() {

  const router = useRouter();

  useEffect(() => {
    // router.push('/me', undefined, { shallow: true })
  }, [])

  return (
    <>
      <div className="relative h-full w-full flex flex-grow justify-center align-middle">
        <div className=" w-4/5 h-2/5 lg:w-1/4 md:w-2/5 p-6 md:p-10 flex flex-col justify-between md:self-center -mt-16 dark:bg-appColor-appLight bg-gray-300 rounded-xl shadow-lg self-center">
          <div>
            <h1 className="font-bold text-4xl ">Welcome to FlexMeet</h1>
            <p className="text-xs text-appColor-caption">By logging in you accept our <a href="" className="underline text-black dark:text-white">Privacy Policy</a> and <a href="" className="underline text-black dark:text-white">Terms of Service</a> .</p>
          </div>

          <button onClick={() => router.push('/me', undefined, { shallow: true })} type="button" className="flex p-3 bg-appColor-light dark:bg-appColor-appExtraLight rounded-xl justify-items-center justify-center align-middle flex-row outline-none focus:outline-none shadow-lg">
            <AiOutlineGoogle size={28} className="self-center" />
            <h1 className="font-bold text-base self-center ml-3"> Login With Google</h1>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex p-8 flex-col md:flex-row justify-center md:justify-between align-middle">
          <div className="flex flex-row self-center">
            <div className="w-14 h-14 md:w-16 md:h-16 flex align-middle justify-center rounded-xl" style={{ backgroundImage: 'linear-gradient(to right top, #008793, #0d81ad, #5d75b5, #9663a2, #b75279)' }}>
              <BsCameraVideoFill className=" self-center text-4xl md:text-4xl" />
            </div>
            <h1 className="font-bold text-3xl md:4xl ml-2 self-center">FlexMeet</h1>
          </div>
          <div className="flex flex-row justify-items-center mt-2 -mb-4 md:mt-0 md:-mb-0 justify-center self-center">
            <a type="button" className=" self-center text-xs md:text-base text-appColor-caption outline-none focus:outline-none mr-3">Privacy Policy</a>
            <a href="https://github.com/namansukhwani/FlexMeet/issues" type="button" className=" self-center text-xs md:text-base text-appColor-caption outline-none focus:outline-none mr-6">Report a bug</a>
            <a href="https://github.com/namansukhwani/FlexMeet" type="button" className=" self-center  text-appColor-caption outline-none focus:outline-none mr-3"><AiFillGithub size={26} /></a>
            <a href="https://www.linkedin.com/in/naman-sukhwani-478939147/" type="button" className=" self-center text-appColor-caption outline-none focus:outline-none"><AiFillLinkedin size={26} /></a>
          </div>
        </div>
      </div>
    </ >
  )
}
