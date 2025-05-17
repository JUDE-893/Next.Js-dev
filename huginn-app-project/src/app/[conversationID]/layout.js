import ContactSideBar from "@/components/main/contact/ContactSideBar"
import Header from "@/components/main/chatbox/Header"


export default function Home({children}) {

  return (
    <div className="flex  min-h-screen font-[family-name:var(--font-geist-sans)]">
      <ContactSideBar />
      <main className="w-full ml-1 px-1">
        {children}
      </main>
    </div>
  );
}
