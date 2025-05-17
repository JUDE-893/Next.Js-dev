import axiosClient from './axiosClient';

/* CONVERSATION SERVICES */

export const createConversation = async function(id) {
  const result = await axiosClient.get('/conversations/new/'+id)

  console.log('new conv', result);
  return result
}

export const getConversations = async function() {
  const result = await axiosClient.get('/conversations')

  console.log('get convs', result);
  return result
}
