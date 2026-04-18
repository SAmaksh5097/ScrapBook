const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// used to fetch years for which user has memories, used in Dashboard.jsx
export const fetchYears = async (clerk_user_id, getToken) => {
    try{
      
      
      const token = await getToken();
      const url = `${VITE_API_BASE_URL}/api/memories/years/${clerk_user_id}`;
      console.log(url);
      
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorDetails = '';
        
        // Try to parse error response
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } else {
          errorDetails = await response.text();
        }
        
        console.error(`API Error [${response.status}]:`, errorDetails);
        throw new Error(`Failed to fetch years: ${response.status} - ${errorDetails}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];

    } catch(err){
      console.error('Error fetching years:', err)
      return []
    }  
}

// used to fetch memories of a user for a specific year, used in Yearpage.jsx
export const fetchMemories = async (clerk_user_id, year, getToken, limit = 12, offset = 0) => {
    try {
        const token = await getToken();
        const url = new URL(`${VITE_API_BASE_URL}/api/memories/${clerk_user_id}/${year}`);
        url.searchParams.append('limit', limit);
        url.searchParams.append('offset', offset);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

      if (!response.ok) {
        throw new Error('Failed to fetch memories')
      }

      const data = await response.json()
      return data;
    } catch (error) {
      console.error('Failed to fetch memories:', error)
      return { memories: [], hasMore: false };
    }
}

// used to fetch memories with moments in single query (no N+1 problem), used in Yearbook.jsx
export const fetchMemoriesWithMoments = async (clerk_user_id, year, getToken) => {
    try {
        const token = await getToken();
        const response = await fetch(`${VITE_API_BASE_URL}/api/memories/with-moments/${clerk_user_id}/${year}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

      if (!response.ok) {
        throw new Error('Failed to fetch memories with moments')
      }

      const data = await response.json()
      return data;
    } catch (error) {
      console.error('Failed to fetch memories with moments:', error)
      return [];
    }
}

// used to fetch details of a specific memory, used in MemoryPage.jsx
export const fetchMemoryDetails = async (memoryId, getToken) => {
    try{
      const token = await getToken();
        const response = await fetch(`${VITE_API_BASE_URL}/api/memories/${memoryId}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
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
export const addMemory = async (token, clerk_user_id, title, date, cover_img_url, location, description)=>{
    try{
      const response = await fetch(`${VITE_API_BASE_URL}/api/memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          clerk_user_id: clerk_user_id,
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

// used to delete a memory and its related moments, used in Yearpage.jsx
export const deleteMemory = async (memoryId, token) => {
  try {
    const response = await fetch(`${VITE_API_BASE_URL}/api/memories/${memoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to delete memory')
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to delete memory:', error)
    throw error
  }
}