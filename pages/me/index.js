import { useTheme } from 'next-themes'

export default function Home() {
    const { theme, setTheme } = useTheme()

    return (
        <>

            <button
                aria-label="Toggle Dark Mode"
                type="button"
                className="p-3 h-12 w-12 order-2 md:order-3"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >Toggle Theme</button>
            <p className="dark:text-red-900  p-10 self-center " >Hello from NEXT JS</p>

        </ >
    )
}
