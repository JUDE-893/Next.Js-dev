import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import HoverContact from './HoverContact'

export default function Contact ({children, contact, className, sideChild, avatarClasses}) {

  return(
    <HoverContact contact={contact} >
      <div className={`flex flex-cols-2 items-center gap-3 py-1 ${ className }`}>
          <Avatar className={avatarClasses} >
            <AvatarImage src={process.env.PROFILE_IMAGES_URL+'/'+contact.profileImage} />
            <AvatarFallback className="w-50">{contact.nameTag}</AvatarFallback>
          </Avatar>
          <div className='color-accent w-full'>
            <div className='flex flex-cols-2 relative'>
              <p className="text-nowrap">{contact.name}</p>
              {sideChild && sideChild}
            </div>
            {children}
          </div>
      </div>
    </HoverContact>
  )
}
