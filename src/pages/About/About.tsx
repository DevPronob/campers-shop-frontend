function About() {
  return (
    <div>
      {/* Contact Section */}
      <section className="text-gray-800 py-10">
        <div className="mx-auto flex flex-col justify-around lg:flex-row gap-8 max-w-screen-xl">
          {/* Contact Information */}
          <div className="max-w-2xl px-4 lg:pr-24">
            <p className="mb-5 font-medium">Contact Information:</p>

            <div className="mb-5 flex font-medium">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-7 w-7 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                  />
                </svg>
              </div>
              <div>
                <p className="mb-2">Phone: +1 (123) 456-7890</p>
                <span className="font-normal text-gray-600">For inquiries and support.</span>
              </div>
            </div>

            <div className="mb-5 flex font-medium">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-7 w-7 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div>
                <p className="mb-2">Email: contact@example.com</p>
                <span className="font-normal text-gray-600">Send us an email anytime.</span>
              </div>
            </div>

            <div className="mb-5 flex font-medium">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-7 w-7 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <div>
                <p className="mb-2">Address: 123 Main St, City, Country</p>
                <span className="font-normal text-gray-600">Visit our office during business hours.</span>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="relative w-full lg:w-96 h-72 lg:h-auto">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12080.73732861526!2d-74.0059418!3d40.7127847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMDA2JzEwLjAiTiA3NMKwMjUnMzcuNyJX!5e0!3m2!1sen!2sus!4v1648482801994!5m2!1sen!2sus"
              frameBorder="0"
              style={{ border: 0 }}
              aria-hidden="false"
              title="Google Map"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <div className="mb-16">
        <div className="container flex justify-center mx-auto pt-16">
          <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
            The Talented People Behind the Scenes of the Organization
          </h1>
        </div>

        <div className="w-full px-10 pb-10 pt-10">
          <div className="container mx-auto flex flex-wrap justify-around">
            {/* Example Team Member */}
            <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src="https://images.unsplash.com/photo-1570612861542-284f4c12e75f?q=80&w=1470&auto=format&fit=crop"
                      alt="Dean Jones"
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <h1 className="font-bold text-3xl text-center mb-1">Dean Jones</h1>
                  <p className="text-gray-800 text-sm text-center">Director</p>
                  <p className="text-center text-gray-600 text-base pt-3 font-normal">
                    An avid who loves to be creative and inventive.
                  </p>
                  <div className="w-full flex justify-center pt-5 pb-5">
                    {/* Social icons */}
                  </div>
                </div>
              </div>
            </div>
            {/* Add more team members similarly */}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="main__container pb-18 px-4">
        <div className="about__company grid lg:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-12 lg:gap-y-0 items-center">
          <div className="about__company__img">
            <img
              src="https://manufacturer.stylemixthemes.com/industrial/wp-content/uploads/sites/2/2018/08/Fotolia_68431323_Subscription_Monthly_M-660x439.jpg"
              alt="Our Mission"
            />
          </div>
          <div className="about__company__content">
            <h2 className="text-3xl font-bold leading-10 text-gray-900">Our Mission</h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Our mission at Elomus Shop is to inspire outdoor enthusiasts by providing top-quality camping gear and equipment. We aim to foster a community that embraces adventure and reconnects with nature...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
