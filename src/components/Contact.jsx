import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react"

const Contact = () => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;


    const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....")
    const formData = new FormData(event.target);
    formData.append("access_key", accessKey );

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if(data.success){
        setResult("")
        toast.success("Form Submitted Successfully")
        event.target.reset();
    }else{
        console.log("Error",data);
        toast.error(data.message)
        setResult("")
    }
  };


  return (
    <motion.div
    initial={{ opacity: 0 ,x:-200}}
      transition={{duration:1 }}
      whileInView={{ opacity: 1 ,x:0}}
      viewport={{once:true}} 
      className="text-center py-20 p-6 lg:px-32 w-full overflow-hidden"
      id="Contact"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center  ">
        Contact <span className=" font-light">With Us</span>
      </h1>
      <p className="text-gray-500 mb-12  text-center max-w-80 mx-auto">
        Ready to Make a Move? Let’s Build Your Future Together
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto text-gray-600 pt-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left">
            Your Name
            <input
              className="w-full border-gray-400 border rounded py-3 px-4 mt-2 focus:outline-none  focus:ring-2 focus:ring-gray-600 "
              type="text"
              name="Name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="w-full md:w-1/2 text-left md:pl-4 ">
            Your Email
            <input
              className="w-full border-gray-400 border rounded py-3 px-4 mt-2 focus:outline-none  focus:ring-2 focus:ring-gray-600 "
              type="email"
              name="Email"
              placeholder="Your Email"
              required
            />
          </div>
        </div>
        <div className="my-6 text-left">
          Message
          <textarea
            className="w-full border border-gray-400 rounded py-3 px-4 mt-2 h-48 resize-none focus:outline-none  focus:ring-2 focus:ring-gray-600 "
            name="Message"
            placeholder="Message"
            required
          ></textarea>
        </div>
        <button className="bg-blue-600 text-white py-2 px-12 mb-10 rounded cursor-pointer hover:bg-blue-700">
          {result ? result:"Send Message"}
        </button>
      </form>
    </motion.div>
  );
};

export default Contact;
