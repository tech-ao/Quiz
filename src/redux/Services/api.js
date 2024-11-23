export const fetchStudents = async () => {
    const response = await fetch(
      "https://appsail-10091564320.development.catalystappsail.com/api/getStudents"
    );
    if (!response.ok) throw new Error("Failed to fetch students");
    return await response.json();
  };
  