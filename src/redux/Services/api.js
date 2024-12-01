export const fetchStudents = async (paginationDetail) => {
    const response = await fetch(
      "http://localhost:8012/api/SearchAndList/SearchAndListStudent",{

      method: 'POST',
      headers: {
        'Accept': 'text/plain',
        'X-Api-Key': '3ec1b120-a9aa-4f52-9f51-eb4671ee1280',
        'AccessToken': '123',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paginationDetail),
});
    if (!response.ok) throw new Error("Failed to fetch students");
    console.log(response);
    
    return await response.json();
  };
  

  export const addStudent = async (studentData)=>{
    const response = await fetch (
      "http://localhost:8012/api/User/Create",
      {
        method:"POST",
        headers:{
          'Accept': 'text/plain',
        'X-Api-Key': '3ec1b120-a9aa-4f52-9f51-eb4671ee1280',
        'AccessToken': '123',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData), 
      }      
    )
    if (!response.ok) throw new Error("Faild to add student")
      return await response.json();
  };

  export const editStudent = async (studentData)=>{
    console.log(studentData);
    
    const response = await fetch (
      `http://localhost:8012/api/User/Update`,
      {
        method:"PUT",
        headers:{
          'Accept': 'text/plain',
          'X-Api-Key': '3ec1b120-a9aa-4f52-9f51-eb4671ee1280',
          'AccessToken': '123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData)
      }
    )
    if (!response.ok) throw new Error("Faild to edit student")
      return await response.json();
    }

    export const getStudent = async (studentId)=>{
      console.log(studentId);
      
      const response = await fetch(
        `http://localhost:8012/api/User/GetUserById?UserId=${studentId}`,
        {
          method:"GET",
          headers:{
            'Accept': 'text/plain',
          'X-Api-Key': '3ec1b120-a9aa-4f52-9f51-eb4671ee1280',
          'AccessToken': '123',
          'Content-Type': 'application/json',           
          }
        }
      )
      if(!response.ok)  throw new Error("faild to fetch data")
        return await response.json();
    }

    export const deleteStudent = async (studentId)=>{
      const response = await fetch (
        ` http://localhost:8012/api/User/Delete/${studentId}`,
        {
          method:"DELETE",
          headers:{
            'Accept': 'text/plain',
            'X-Api-Key': '3ec1b120-a9aa-4f52-9f51-eb4671ee1280',
            'AccessToken': '123',
            'Content-Type': 'application/json', 
          }
        }
      )
      if(!response.ok) throw new Error ("faild to Delete student")
        return await response.json();
    }