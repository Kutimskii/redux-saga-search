const URL = 'http://localhost:7070/api/search'


export const searchSkills = async (search)=>{
  const params = new URLSearchParams({q:search});
  const response = await fetch(`${URL}?${params}`)
  console.log(response)
  if (!response.ok){
    throw new Error (response.statusText)
  }
  return await response.json()
}