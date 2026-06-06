import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="w-full">
     

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-[#FF6B35]">Contacts</h2>
          <p className="text-gray-700">
            Your thoughts, questions, and feedback matter. Reach out anytime — we’d love to connect with you!
          </p>

          <div className="space-y-4 text-gray-800">
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#FF6B35]" /> +1 800 354 4321
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#FF6B35]" /> +1 800 123 4567
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-[#FF6B35]" /> info@example.com
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-[#FF6B35]" /> darix@example.com
            </p>
            <p className="flex items-center gap-3">
              <FaClock className="text-[#FF6B35]" /> Mon-Fri: 8am - 4pm
            </p>
            <p className="flex items-center gap-3">
              <FaClock className="text-[#FF6B35]" /> Sat-Sun: 9am - 5pm
            </p>
          </div>

          
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#004E64] mb-6">Leave a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name *"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
              <input
                type="email"
                placeholder="Email *"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
            </div>
            <textarea
              placeholder="Your question here..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            />
            <button
              type="submit"
              className="bg-[#FF6B35] text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:bg-[#FF8252] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

       <div className="w-full h-[400px] md:h-[500px]">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422938392705!2d-73.98731968459377!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c8da903b%3A0x558f41a3cda11223!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
