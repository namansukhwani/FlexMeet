import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {

  const router = useRouter();

  useEffect(() => {
    router.push('/me', undefined, { shallow: true })

  }, [])

  return (
    <>
      <div className="flex justify-center container">
        <h1 className="self-center text-3xl">Login Page</h1>
      </div>
    </ >
  )
}
