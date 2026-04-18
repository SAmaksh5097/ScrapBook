// used to fetch moments for a specific memory, used in MemoryPage.jsx
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchMoments = async (clerk_user_id, memoryId, getToken, limit = 12, offset = 0)=>{
    try {
      const token = await getToken();
      const url = new URL(`${VITE_API_BASE_URL}/api/moments/${clerk_user_id}/${memoryId}`);
      url.searchParams.append('limit', limit);
      url.searchParams.append('offset', offset);
      
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()
        return data;
      } catch (err) {
        console.error('Error fetching moments:', err)
        return { moments: [], hasMore: false };
      }
}

// used to delete a moment, used in MomentCard.jsx
export const deleteMoment = async(momentId, memoryId, token)=>{
    try{
      const response = await fetch(`${VITE_API_BASE_URL}/api/moments`,{
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({momentId: momentId, memoryId: memoryId})
      })

      if (!response.ok) {
        throw new Error('Failed to delete moment')
      }

      
    } catch(err){
      console.error('Error deleting moment:', err)
    }
}

export const addMoment = async (token, clerk_user_id, memoryId, title, day, img_url, description) =>{
  try{
    const response = await fetch(`${VITE_API_BASE_URL}/api/moments`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        clerk_user_id: clerk_user_id,
        memory_id: memoryId,
        title: title.trim(),
        day: day,
        img_url: img_url.trim(),
        description: description.trim()
      })
    })

    if (!response.ok) {
      throw new Error('Failed to add moment')
    }

    return await response.json()
  } catch(err){
    console.error('Error adding moment:', err)
    throw err
  }
}