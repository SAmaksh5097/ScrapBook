// used to fetch years for which user has memories, used in Dashboard.jsx
export const fetchYears = (async (userId) => { 
    try{
      const response = await fetch(`http://localhost:5000/api/memories/years/${userId}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      return data;

    } catch(err){
      console.error('Error fetching years:', err)
    }  
});

// used to fetch memories of a user for a specific year, used in Yearpage.jsx
export const fetchMemories = async (userId, year)=>{
    try {
      const response = await fetch(`http://localhost:5000/api/memories/${userId}/${year}`)

      if (!response.ok) {
        throw new Error('Failed to fetch memories')
      }

      const data = await response.json()
      return data;
    } catch (error) {
      console.error('Failed to fetch memories:', error)
    }
}

// used to fetch details of a specific memory, used in MemoryPage.jsx
export const fetchMemoryDetails = async (memoryId) => {
    try{
        const response = await fetch(`http://localhost:5000/api/memories/${memoryId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
        })
        const data = await response.json()
        return data;
      } catch (error) {
        console.error('Failed to fetch memory details:', error)
      }
}

// used to add a new memory, used in AddMemoryForm.jsx
export const addMemory = async (user_id, title, date, cover_img_url, location, description)=>{
    try{
      const response = await fetch(`http://localhost:5000/api/memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          title: title.trim(),
          date: date,
          cover_img_url: cover_img_url.trim(),
          description: description.trim(),
          location: location.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to add memory')
      }
    } catch (err){
      console.error('Error adding memory:', err);
    }
}