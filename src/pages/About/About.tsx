
export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-[#F8F9FA]">
        <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#FF6B35] uppercase tracking-wider font-semibold mb-2 text-sm">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B1B1B] mb-6 leading-tight">About Elomus</h1>
            <p className="text-gray-500 text-sm mb-4">Home &bull; About</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded by a group of outdoor enthusiasts, Elomus was born out of a shared passion for nature and a desire to make high-quality outdoor gear accessible to everyone. We believe that life is best experienced under the open sky.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you are scaling a rugged mountain peak, setting up camp in a serene forest, or enjoying a weekend family getaway, our mission is to equip you with reliable, state-of-the-art gear built to withstand the elements.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#004E64] opacity-20 blur-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000"
              alt="Cozy camping tent in woods"
              className="relative rounded-2xl shadow-xl object-cover w-full h-[350px]"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-[#002D3A]">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Prepared for Every <span className="text-[#FF6B35]">Adventure</span>
            </h2>
            <p className="text-gray-300 mt-3 max-w-xl mx-auto">
              Our gear is curated and tested by wilderness experts to ensure maximum comfort, durability, and safety on the trails.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group overflow-hidden rounded-xl shadow-lg relative">
              <img
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1537905569824-f89f14cceb68?q=80&w=600"
                alt="Hiking up trail"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h3 className="text-lg font-bold text-white">Rugged Trekking</h3>
              </div>
            </div>
            <div className="group overflow-hidden rounded-xl shadow-lg relative">
              <img
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600"
                alt="Campfire under stars"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h3 className="text-lg font-bold text-white">Starlit Campsites</h3>
              </div>
            </div>
            <div className="group overflow-hidden rounded-xl shadow-lg relative">
              <img
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=600"
                alt="Mountain camping sunrise"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h3 className="text-lg font-bold text-white">Scenic Peaks</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech & Quality Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#004E64] to-[#FF6B35] opacity-10 blur-md"></div>
            <img
              className="relative rounded-2xl shadow-lg w-full h-[400px] object-cover"
              src="https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=1000"
              alt="Camping flatlay gear"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Wilderness Tested. <span className="text-[#004E64]">Explorer Approved.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We collaborate with top gear designers and manufacturers to bring you waterproof fabrics, lightweight materials, and compact designs. Every product undergoes strict field testing before reaching your hands.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="bg-[#F8F9FA] p-4 rounded-xl text-center border border-gray-100">
                <p className="text-3xl font-extrabold text-[#004E64]">10+</p>
                <p className="text-xs text-gray-500 font-medium uppercase mt-1">Years on Trail</p>
              </div>
              <div className="bg-[#F8F9FA] p-4 rounded-xl text-center border border-gray-100">
                <p className="text-3xl font-extrabold text-[#004E64]">15k+</p>
                <p className="text-xs text-gray-500 font-medium uppercase mt-1">Happy Campers</p>
              </div>
              <div className="bg-[#F8F9FA] p-4 rounded-xl text-center border border-gray-100">
                <p className="text-3xl font-extrabold text-[#004E64]">250+</p>
                <p className="text-xs text-gray-500 font-medium uppercase mt-1">Gear Items</p>
              </div>
              <div className="bg-[#F8F9FA] p-4 rounded-xl text-center border border-gray-100">
                <p className="text-3xl font-extrabold text-[#004E64]">50+</p>
                <p className="text-xs text-gray-500 font-medium uppercase mt-1">Expeditions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#F8F9FA] border-t border-gray-100">
        <div className="max-w-md mx-auto text-center px-6">
          <span className="text-[#FF6B35] font-bold text-xs uppercase tracking-widest">Adventure Club</span>
          <h2 className="text-3xl font-extrabold text-[#1B1B1B] mt-2 mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Receive exclusive gear discounts, campground guides, and outdoor hiking tips directly to your inbox.
          </p>
          <div className="flex shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-3 bg-white w-full text-sm outline-none"
            />
            <button className="bg-[#004E64] hover:bg-[#003C4C] px-6 text-white font-semibold text-sm transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
