import axiosClient from './axiosClient';

/* CONVERSATION SERVICES */


export const getMessages = async function(id, page) {

  const result = await axiosClient.get(`/conversations/${id}/messages`, { params: { page } })

  console.log(`get conv ${id}`, result);
  return result
}

export const sendMessage = async function(id, payload) {
  const result = await axiosClient.post(`/conversations/${id}/messages/send`,payload)

  console.log(`send to conv ${id}`, result);
  return result
}

export const encryptMessage = async (message) => {
  const key = process.env.NEXT_PUBLIC_MESSAGES_ENCRYPTION_KEY;
  console.log('key :::', key);
  const encodedMessage = new TextEncoder().encode(message);
  const encodedKey = new TextEncoder().encode(key);
  const importedKey = await crypto.subtle.importKey(
    "raw", encodedKey, { name: "AES-GCM", length: 256 }, false, ["encrypt"]
  );
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate IV
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, importedKey, encodedMessage);
  return { encrypted: new Uint8Array(encrypted), iv };
};

export const decryptMessage = async (encrypted, iv) => {
  const key = process.env.NEXT_PUBLIC_MESSAGES_ENCRYPTION_KEY;
  const encodedKey = new TextEncoder().encode(key);
  const importedKey = await crypto.subtle.importKey(
    "raw", encodedKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
  );

  const decryptedBuffer = await crypto.subtle.decrypt(
  { name: "AES-GCM", iv: Buffer.from(iv, "hex") },
  importedKey,
  Buffer.from(encrypted, "hex") // No need to manually append AuthTag
);


  return new TextDecoder().decode(decryptedBuffer);
};
