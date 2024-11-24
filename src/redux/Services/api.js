export const fetchStudents = async () => {
    const response = await fetch(
      "https://appsail-10091564320.development.catalystappsail.com/api/getStudents"
    );
    if (!response.ok) throw new Error("Failed to fetch students");
    return await response.json();
  };
  

  export const addStudent = async (studentData)=>{
    const response = await fetch (
      "https://appsail-10091564320.development.catalystappsail.com/api/registerStudent",
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
      `https://appsail-10091564320.development.catalystappsail.com/api/registerStudent/${studentId}`,
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