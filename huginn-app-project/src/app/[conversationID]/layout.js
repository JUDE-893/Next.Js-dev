import ContactSideBar from "@/components/main/ContactSideBar"
import Header from "@/components/main/chatbox/Header"


export default function Home({children}) {

  const destinator = {
    name: "Jonnas Schmidtmann",
    id: "fe425d6de400p7",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online"
  };

  return (
    <div className="flex  min-h-screen font-[family-name:var(--font-geist-sans)]">
      <ContactSideBar />
      <main className="w-full ml-1 px-1">
        {children}
      </main>
    </div>
  );
}
