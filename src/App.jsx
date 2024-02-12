import { useState } from "react";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/ddaaf7d6-fad7-4dde-9203-3a4295661719-0.png");
  const [data, setData] = useState({ prompt: "", negative_prompt: "" });
  const [loading, setLoading] = useState(false);
  // console.log(process.env.REACT_APP_STABLE_KEY);

//  async  function downloadBlob(blob, filename) {
//     // Create a URL for the blob
//     try {
//       // Fetch the image
//       const response = await fetch(imageUrl);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       // Get the image blob
//       const imageBlob = await response.blob();
  
//       // Create a URL for the blob
//       const imageURL = URL.createObjectURL(imageBlob);
  
//       // Create a temporary anchor element and trigger download
//       const tempLink = document.createElement('a');
//       tempLink.href = imageURL;
//       tempLink.download = 'image.jpg'; // You can also dynamically set the file name based on the image URL or other logic
//       document.body.appendChild(tempLink); // Append to body
//       tempLink.click(); // Programmatically click the link to trigger the download
//       document.body.removeChild(tempLink); // Remove the temporary link
//       URL.revokeObjectURL(imageURL); // Clean up by revoking the object URL
//     } catch (error) {
//       console.error('Error downloading the image:', error);
//     }
//   }
  

  const handleClick = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      key: process.env.REACT_APP_STABLE_KEY,
      prompt: data?.prompt,
      negative_prompt: data?.negative_prompt,
      width: "512",
      height: "512",
      samples: "1",
      num_inference_steps: "20",
      seed: null,
      guidance_scale: 7.5,
      safety_checker: "yes",
      multi_lingual: "no",
      panorama: "no",
      self_attention: "no",
      upscale: "no",
      embeddings_model: null,
      webhook: null,
      track_id: null,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log("cLLED");
    setLoading(true)
    await fetch("https://stablediffusionapi.com/api/v3/text2img", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        console.log(JSON.parse(result));
        setImageUrl(res.output[0]);
      })
      .catch((error) => console.log("error", error));

      setLoading(false)
  };
  return (
    <div className="bg-primary min-h-screen w-screen flex flex-col md:flex-row justify-between items-center p-3 text-white">
      {loading && (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-[#00000042]">
          <div className="loader"></div>
        </div>
      )}
      <div className="bg-second md:w-[500px] md:h-[100%] w-full rounded shadow-sm flex flex-col p-3">
        <label>Prompt:</label>
        <textarea value={data?.prompt} onChange={(e) => setData({ ...data, prompt: e.target.value })} name="" id="" cols="10" rows="5" className="bg-tertiary p-3 rounded mt-2" placeholder="Enter your prompt here..."></textarea>
        <label className="mt-2">Things To Remove:</label>
        <textarea value={data?.negative_prompt} onChange={(e) => setData({ ...data, negative_prompt: e.target.value })} name="" id="" cols="10" rows="5" className="bg-tertiary p-3 rounded mt-2" placeholder="Enter your text here..."></textarea>
        <button onClick={handleClick} className="bg-tertiary active:bg-quat transition-all duration-100 self-end px-3 py-1 rounded mt-5">
          Generate
        </button>
      </div>
      <div className="md:w-[calc(100%-500px)] flex justify-center items-center">
        {imageUrl && (
          <>
            {/* <button onClick={()=>{downloadBlob(imageUrl)}} className="bg-quat h-[30px] rounded w-[30px] transition-all hover:bg-tertiary duration-100 hover:-translate-y-1 p-1 fixed top-3 right-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokewidth={2} strokelinecap="round" strokelinejoin="round" className="feather feather-download">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1={12} y1={15} x2={12} y2={3} />
              </svg>
            </button> */}
            <img src={imageUrl} alt="created" className="mt-2 md:mt-0" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
