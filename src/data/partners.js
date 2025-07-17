// Function to get partner logos dynamically
export async function getPartnerLogos() {
  try {
    const response = await fetch('/api/partners');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.partners || [];
  } catch (error) {
    console.error('Error fetching partner logos:', error);
    return [];
  }
}