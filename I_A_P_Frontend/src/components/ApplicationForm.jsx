// 

import { useState } from 'react';
import { supabase } from '../services/supabase';
import { submitApplication } from '../services/api';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resumeFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       if (!formData.resumeFile) {
//         setMessage('❌ Please upload a resume.');
//         setLoading(false);
//         return;
//       }

//       const fileName = `${Date.now()}-${formData.resumeFile.name}`;
//       const { error: uploadError } = await supabase.storage
//         .from('resumes')
//         .upload(fileName, formData.resumeFile);

//       if (uploadError) throw uploadError;

//       const { data } = supabase.storage
//         .from('resumes')
//         .getPublicUrl(fileName);

//       const resumeUrl = data.publicUrl;

//       //THIS IS FOR DIRECT SUPABASE CONN. WITH FRONTEND

//       // Save metadata in a Supabase table (e.g., applications)
//       // const { error: insertError } = await supabase
//       //   .from('applications')
//       //   .insert([
//       //     {
//       //       name: formData.name,
//       //       email: formData.email,
//       //       phone: formData.phone,
//       //       position: formData.position,
//       //       resume_url: resumeUrl,
//       //     },
//       //   ]);

//       // if (insertError) throw insertError;


//       await submitApplication({
//   name: formData.name,
//   email: formData.email,
//   phone: formData.phone,
//   position: formData.position,
//   resumeUrl: resumeUrl,
// });

//       setMessage('✅ Application submitted successfully!');
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         position: '',
//         resumeFile: null,
//       });
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Submission failed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    if (!formData.resumeFile) {
      setMessage('❌ Please upload a resume.');
      setLoading(false);
      return;
    }

    const fileName = `${Date.now()}-${formData.resumeFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, formData.resumeFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);
    const resumeUrl = data.publicUrl;

    // ✅ Call backend Spring Boot API
    await submitApplication({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      resumeUrl: resumeUrl,
    });

    setMessage('✅ Application submitted successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      resumeFile: null,
    });
  } catch (err) {
  console.error("Error:", err.response?.data);

  if (
  err.response &&                            // error ke andar response object hai kya?
  err.response.data &&                       // uske andar data hai kya?
  err.response.data.error &&                 // us data me error naam ka key hai kya?
  err.response.data.error.includes('Application already submitted')  
  // e JS ka built-in method hai, jo check karta hai:“Kya is string ke andar ye text hai?”
)
 {
    setMessage('❌ You have already submitted an application with this email.');
  } else {
    setMessage('❌ Submission failed. Try again.');
  }
}

 finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-xl mx-auto p-6 mt-10 shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Apply for Internship</h2>

      <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
      <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
      <input name="position" type="text" placeholder="Position" value={formData.position} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
      <input name="resumeFile" type="file" accept=".pdf" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />

      <button type="submit" disabled={loading} className={`w-full text-white py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>

      {message && <p className="text-center text-sm mt-4 text-gray-700">{message}</p>}
    </form>
  );
}
