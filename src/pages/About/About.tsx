

export default function About() {
  return (
    <div className="bg-white">
      <section className="pt-20 pb-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h1>
            <p className="text-gray-500 text-sm mb-3">Home • About</p>
            <p className="text-gray-700 leading-7">
              We provide high-quality printing services with advanced technology
              and professional craftsmanship. Our mission is to deliver superior
              print solutions with precision, speed, and premium results.
            </p>
          </div>
          <div>
            <img
              src="https://www.outdoorsbd.com/wp-content/uploads/2021/09/240712946_243779584180859_6675806882773263326_n.jpg"
              className="rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111]">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">
            Perfection In <span className="text-yellow-400">Printing</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <img
              className="rounded-lg shadow-lg h-52 w-full object-cover"
              src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1470"
            />
            <img
              className="rounded-lg shadow-lg h-52 w-full object-cover"
              src="https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1470"
            />
            <img
              className="rounded-lg shadow-lg h-52 w-full object-cover"
              src="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1470"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <img
            className="rounded-xl shadow-md"
            src="https://www.outdoorsbd.com/wp-content/uploads/2021/09/241419993_984524502281089_5879255848103443352_n.jpg"
          />

          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Using The Latest <span className="text-yellow-500">Technology</span>
            </h2>
            <p className="text-gray-600 leading-7 mb-6">
              Our facility uses cutting-edge printing machines and high-quality
              materials to ensure precise color, sharp detail, and durable
              results for all types of print projects.
            </p>

            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">17+</p>
                <p className="text-sm text-gray-700">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">200+</p>
                <p className="text-sm text-gray-700">Clients</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">90+</p>
                <p className="text-sm text-gray-700">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">10</p>
                <p className="text-sm text-gray-700">Awards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111]">
        <div className="max-w-screen-xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our <span className="text-yellow-400">Newsletter</span>
          </h2>
          <p className="text-gray-400 mb-6">
            Subscribe to receive updates, special offers, and printing tips.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-l-lg w-72"
            />
            <button className="bg-yellow-500 px-6 rounded-r-lg font-semibold text-black">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
