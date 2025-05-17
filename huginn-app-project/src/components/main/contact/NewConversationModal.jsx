import { useGetRelations } from '@/hooks/contact/useRelations';
import { useCreateConversation } from '@/hooks/conversation/useConversation';
import { Plus } from "lucide-react"
import ComboModal from "@/components/ui/custom/ComboModal";
import Contact from "./Contact"

export default function NewConversationModal() {

  return (
    <ComboModal
      label='New conversation with ..'
      listElement={<Contact className="bg-background mb-[-15px]" />}
      type='single'
      useResource={useGetRelations}
      useAction={useCreateConversation}
      >
      <Plus /> <p>New conversation</p>
    </ComboModal>,
  )
}
