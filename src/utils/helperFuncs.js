export const toCamelCase = (str = '') => str.charAt(0).toLowerCase() + str.slice(1)

export const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const deleteLocalStorageData = (key) => {
  localStorage.removeItem(key)
}

export const getLocalStorageData = (key = '') => {
  return localStorage.key(key) ? JSON.parse(localStorage.getItem(key)) : null
}

export const formatErrorMsg = (err) => {
  const message = Array.isArray(err) ? err?.[0]?.message : err?.message
  return message
}
