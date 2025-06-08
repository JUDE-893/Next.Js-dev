import axiosClient from './axiosClient';

/* TASK SERVICES */

export const getTask = async function(id) {
  console.log('id',id);
  const result = await axiosClient.get('/tasks/'+id)

  console.log('get task', result);
  return result
}

export const getTasks = async function() {
  const result = await axiosClient.get('/tasks')

  console.log('get tasks', result);
  return result
}

export const createTask = async function(payload) {
  const result = await axiosClient.post('/tasks', payload)

  console.log('new conv', result);
  return result
}

export const updateTask = async function({payload, id}) {
  console.log('payload', payload);
  const result = await axiosClient.patch('/tasks/'+id, payload)

  console.log('upd conv', result);
  return result
}

export const deleteTask = async function(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    const result = await axiosClient.delete('/tasks/'+id)

    console.log('upd conv', result);
    return result
  }
}
