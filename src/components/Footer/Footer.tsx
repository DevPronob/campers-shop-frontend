function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-0">
      <div className="mx-auto max-w-screen-xl px-6 py-16 grid gap-12 md:grid-cols-2 xl:grid-cols-4 xl:px-10">
        {/* Brand */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-white">Elomus</h2>
          <p className="text-sm leading-relaxed">
            Elevating your digital experience with innovation, creativity, and purpose-driven design.
          </p>
        </div>

        {/* Address */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Address</h3>
          <p className="text-sm leading-relaxed">
            35 Remida Heights<br />
            45 Street<br />
            South Carolina, US
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-[#004E64] transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-[#004E64] transition-colors">Demo</a></li>
            <li><a href="#" className="hover:text-[#004E64] transition-colors">Press</a></li>
            <li><a href="#" className="hover:text-[#004E64] transition-colors">Support Hub</a></li>
            <li><a href="#" className="hover:text-[#004E64] transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Newsletter</h3>
          <p className="mb-4 text-sm">Get the latest updates straight to your inbox.</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="mb-3 w-full rounded-xl bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004E64] sm:mb-0 sm:w-64"
            />
            <button className="rounded-xl bg-[#004E64] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#006b7f]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-screen-xl flex flex-col items-center justify-between px-6 py-6 text-sm md:flex-row xl:px-10">
          <p>© 2025 Elomus. All rights reserved.</p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a href="#" className="hover:text-[#004E64] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#004E64] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#004E64] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
