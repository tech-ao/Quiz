export const fetchStudents = async () => {
    const response = await fetch(
      " http://localhost:2000/api/getStudents"
    );
    if (!response.ok) throw new Error("Failed to fetch students");
    console.log(response);
    
    return await response.json();
  };
  

  export const addStudent = async (studentData)=>{
    const response = await fetch (
      " http://localhost:2000/api/registerStudent",
      {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData), 
      }      
    )
    if (!response.ok) throw new Error("Faild to add student")
      return await response.json();
  };

  export const editStudent = async (studentData,studentId)=>{
    const response = await fetch (
      ` http://localhost:2000/api/registerStudent/${studentId}`,
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(studentData)
      }
    )
    if (!response.ok) throw new Error("Faild to edit student")
      return await response.json();
    }

    export const getStudent = async (studentId)=>{
      const response = await fetch(
        ` http://localhost:2000/api/getStudents/${studentId}`,
        {
          method:"GET",
          headers:{
            "Content-Type":"application/json",            
          }
        }
      )
      if(!response.ok)  throw new Error("faild to fetch data")
        return await response.json();
    }