import ContactSideBar from "@/components/main/ContactSideBar"
import MessagesBox from "@/components/main/chatbox/MessagesBox"
import Header from "@/components/main/chatbox/Header"
import EntryFields from "@/components/main/chatbox/EntryFields"


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
    <div className="flex flex-col w-full ml-0 px-0 min-h-screen font-[family-name:var(--font-geist-sans)] relative">
      <Header contact={destinator} className=" absolute top-0" />
      <main className="flex-1 pt-20">
        {/* messages box */}
        <MessagesBox  />
      </main>
      {/* entry box */}
      <EntryFields className=" absolute bottom-0" />
    </div>
  );
}
