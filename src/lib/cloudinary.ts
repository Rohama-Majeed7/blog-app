export const uploadToCloudinary = async (file: File) => {
  const uploadPreset = "blog-app"; // must be unsigned preset created in Cloudinary

  const url = `https://api.cloudinary.com/v1_1/dx0hzrk1y/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  return res.json(); 
};
