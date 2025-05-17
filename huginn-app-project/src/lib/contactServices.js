import axiosClient from './axiosClient';



/* RELATIONS SERVICES */
export const getRelations = async function() {
  const result = await axiosClient.get('/contact/relations')

  console.log('et rel res', result);
  return result
}


/* INVITATION SERVICES */
export const inviteContact = async function(username) {
  const result = await axiosClient.post('/contact/invite', {username})

  console.log('inite res', result);
  return result
}

export const respondInvition = async function({id, response}) {
  const result = await axiosClient.patch('/contact/invite/respond', {id, response})
  console.log('resp ini res', result);
  return result
}

export const cancelInvitation = async function({id}) {
  const result = await axiosClient.delete('/contact/invite/cancel/'+id)
  console.log('del ini res', result);
  return result
}

export const getInvitations = async function() {
  const result = await axiosClient.get('/contact/invitions')
  console.log('get ini res', result);
  return result
}
