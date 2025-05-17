import {useMutation} from '@tanstack/react-query';
import { inviteContact, respondInvition, cancelInvitation } from '@/lib/contactServices';

export function useInviteContact() {

  const {isPending,mutate, error} = useMutation({
    mutationFn: inviteContact,
    onSuccess: () => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>invitation sent successfully!</p>
        }),
    onError: () => toast("Fails", {
           description: <p className='text-destructive text-xs'>Oops Something went wrong. couldn't send the invitation!</p>
        })
  })

  return {sending: isPending,send: mutate, sendError: error}
}

export function useRespondInvite() {

  const {isPending,mutate, error} = useMutation({
    mutationFn: respondInvition,
    onSuccess: () => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>invitation response sent successfully</p>
        }),
    onError: () => toast("Fails", {
           description: <p className='text-destructive text-xs'>Oops Something went wrong. couldn't send the invitation response</p>
        })
  })

  return {responding: isPending,respond: mutate, respondError: error}
}

export function useCancelInvite() {

  const {isPending,mutate, error} = useMutation({
    mutationFn: cancelInvitation,
    onSuccess: () => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>invitation canceled successfully</p>
        }),
    onError: () => toast("Fails", {
           description: <p className='text-destructive text-xs'>Oops Something went wrong. couldn't cancel the invitation</p>
        })
  })

  return {canceling: isPending,cancelInv: mutate, cancelError: error}
}
