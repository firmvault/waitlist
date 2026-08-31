import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
const manrope=Manrope({variable:'--font-manrope',subsets:['latin']});
export const metadata:Metadata={
  metadataBase:new URL('https://firmvault.co.in'),
  title:'FirmVault — Find client documents in seconds',
  description:'A WhatsApp-first document vault for CA, tax and legal practices. Receive, file and find client documents without searching old chats.',
  icons:{icon:[{url:'/favicon.svg',type:'image/svg+xml'}],shortcut:'/favicon.svg'},
  openGraph:{title:'FirmVault — Find client documents in seconds',description:'Receive. File. Find. A WhatsApp-first document vault for professional firms.',images:[{url:'/og.png',width:1200,height:630,alt:'FirmVault — Find client documents in seconds'}]},
  twitter:{card:'summary_large_image',title:'FirmVault — Find client documents in seconds',description:'Receive. File. Find. A WhatsApp-first document vault for professional firms.',images:['/og.png']},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${manrope.variable} antialiased`}>{children}</body></html>}
