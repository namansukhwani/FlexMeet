import Head from 'next/head';

function Layout(props) {
    return (
        <div className="dark:bg-appColor-dark bg-appColor-light min-h-screen flex font-sans" >
            <Head>
                <title>FlexMeet</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                {/* <!-- link manifest.json --> */}
                <link rel="manifest" href="/manifest.json" />
                {/* <!-- this sets the color of url bar  --> */}
                <meta name="theme-color" content="#1c1f2e" />
                <meta name="apple-mobile-web-app-status-bar" content="#1c1f2e" />
            </Head>
            {props.children}
        </div>
    )
}

export default Layout;