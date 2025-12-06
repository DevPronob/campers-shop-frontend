
import img1 from '../../assets/images/storyCart.jpg'
import img2 from '../../assets/images/accessories.jpg'
export default function AboutUs() {
  return (
    <div>
         <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-16 bg-white">
      {/* Left: Images */}
      <div className="relative w-full lg:w-1/2 flex justify-center items-center mb-12 lg:mb-0">
        {/* Main Image */}
        <img
          src={img1}
          alt="Craftsperson working"
          className="rounded-lg shadow-lg w-4/5 object-cover"
        />

        {/* Overlapping smaller image */}
        <img
          src={img2}
          alt="Furniture design"
          className="absolute bottom-[-40px] right-10 w-48 md:w-56 rounded-lg shadow-xl border-4 border-white"
        />
      </div>

      {/* Right: Text Content */}
      <div className="w-full lg:w-1/2 lg:pl-12">
        <p className="text-sm text-orange-600 font-semibold uppercase mb-2">
          Unity Collection
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-6">
          Shop Our Limited Edition Collaborations
        </h2>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel mi
          quam. Fusce vehicula vitae mauris sit amet tempor. Donec consectetur
          lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="text-gray-600 mb-8">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <a
          href="#"
          className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-all duration-200"
        >
          More About Us
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
    </div>
  )
}
