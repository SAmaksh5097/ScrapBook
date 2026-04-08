// used to fetch moments for a specific memory, used in MemoryPage.jsx
export const fetchMoments = async (memoryId)=>{
    try {
        const response = await fetch(`http://localhost:5000/api/moments/${memoryId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()
        return data;
      } catch (err) {
        console.error('Error fetching moments:', err)
      }
}

// used to delete a moment, used in MomentCard.jsx
export const deleteMoment = async(momentId, memoryId)=>{
    try{
      const response = await fetch(`http://localhost:5000/api/moments`,{
        method: 'DELETE',
        headers: {
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

export const addMoment = async (memoryId, title, day, img_url, description) =>{
  try{
    const response = await fetch(`http://localhost:5000/api/moments`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        memory_id: memoryId,
        title: title.trim(),
        day,
        img_url: img_url.trim(),
        description: description.trim()
      })
    })

    if (!response.ok) {
      throw new Error('Failed to add moment')
    }
  } catch(err){
    console.error('Error adding moment:', err)
  }
}