import axiosClient from './axiosClient';

/* User SERVICES */

export const sendVerificationMail = async function() {
  const result = await axiosClient.get('/auth/resend-verification-mail')

  console.log('new v mail ', result);
  return result
}

export const sendPasswordResetRequest = async function(data) {
  console.log('data1', data);
  const result = await axiosClient.post('/auth/forgot-password', data)
  console.log('data2', data);

  console.log('reset request res ', result);
  return result
}

export const resetPassword = async function({ token, data }) {
  const result = await axiosClient.post('/auth/resetPassword/'+ token, data)

  console.log('reset pass res ', result);
  return result
}
