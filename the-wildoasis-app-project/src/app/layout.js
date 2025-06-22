import ReservationProvider from '@/app/_components/ReservationProvider';
import Header from '@/app/_components/Header';
import '@/app/_styles/globals.css'
import {Josefin_Sans} from 'next/font/google';

export const metadata = {
  title: {
    template: "%s - The WildOasis",
    default: "The WildOasis"
  },
  description: 'The WildOasis Hotel, The most luxurous cabin the the heart of the Frensh Alpes, Mother Nature Awaits!',
}

const josef  = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josef.className} antialiased  bg-primary-950 text-primary-100 flex flex-col min-h-screen `}>
      <Header />
      <div className='flex-1 px-8 py-12 grid '>
        <main className="max-w-7xl mx-auto w-full">
          <ReservationProvider>{children}</ReservationProvider>
        </main>
      </div>
      </body>
    </html>
  )
}
