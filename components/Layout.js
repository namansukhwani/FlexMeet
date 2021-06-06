import Head from 'next/head';
import { useTheme } from 'next-themes'
import { ToastContainer } from 'react-toastify';

function Layout(props) {
    const { theme, setTheme } = useTheme()

    return (
        <div className="relative dark:bg-appColor-dark bg-appColor-light flex h-screen w-screen font-sans" >
            <Head>
                <title>FlexMeet</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                {/* <!-- link manifest.json --> */}
                <link rel="manifest" href="/manifest.json" />
                {/* <!-- this sets the color of url bar  --> */}
                <meta name="theme-color" content={theme === 'dark' ? "#1c1f2e" : "#eeeeee"} />
                <meta name="apple-mobile-web-app-status-bar" content={theme === 'dark' ? "#1c1f2e" : "#eeeeee"} />
            </Head>
            <ToastContainer />
            {props.children}
        </div>
    )
}

export default Layout;