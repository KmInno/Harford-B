import { useScrollReveal } from '../hooks/responsive';

export default function Footer() {
  const contactRef = useScrollReveal('animate-slide-in-left')
  const mapRef = useScrollReveal('animate-slide-in-right200')
  const bottomRef = useScrollReveal('animate-fadeIn400')

  return (
    <footer id="contact" className="bg-black text-gray-100 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          {/* Contact Info */}
          <div ref={contactRef} className="opacity-0">
            <h3 className="text-2xl font-bold text-secondary mb-6">Contact Us</h3>
            <div className="space-y-3">
              <p>
                <strong>Phone:</strong> +256 708981325
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:harfordbridgeis@gmail.com" className="text-secondary hover:underline">
                  harfordbridgeis@gmail.com
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                <br />
                Bunga, Behind-Emuna Plaza
                <br />
                Uganda
              </p>
            </div>
          </div>

          {/* Map */}
          <div ref={mapRef} className="opacity-0">
            <h3 className="text-2xl font-bold text-secondary mb-6">Location</h3>
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7726554715036!2d32.61392307472324!3d0.27412749972318345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbdea0b5d0371%3A0x2c5f656bbcd28167!2sEmuna%20Plaza!5e0!3m2!1sen!2sug!4v1764885227590!5m2!1sen!2sug"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Emuna Plaza Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-600 my-8" />

        {/* Footer Bottom */}
        <div ref={bottomRef} className="opacity-0 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Harford Bridge International School. All
            rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Unfettered Intelligencies Blooming Tomorrows
          </p>
        </div>
      </div>
    </footer>
  );
}