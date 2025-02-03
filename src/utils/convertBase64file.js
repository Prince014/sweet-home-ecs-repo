// Function to convert a single file to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Resolve with Base64 string
    reader.onerror = (error) => reject(error); // Reject in case of an error
    reader.readAsDataURL(file); // Read the file as a Data URL
  });
};

// Function to convert all files to Base64
export const convertToBase64 = async (fileInputs) => {
  const base64Files = [];

  for (let i = 0; i < fileInputs.length; i++) {
    const input = fileInputs[i];

    // Ensure the 'files' property is an array and contains files
    const files = Object.values(input.files); // Convert the object to an array
    for (let file of files) {
      if (file) {
        const base64 = await fileToBase64(file); // Convert the file to Base64
        base64Files.push(base64); // Push the Base64 string to the array
      }
    }
  }

  return base64Files; // Return the array of Base64 strings
};
