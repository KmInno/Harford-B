import { useScrollReveal } from '../hooks/responsive'

export default function MultipleIntelligencies() {
  const headingRef = useScrollReveal('animate-slide-in-left')
  const textRef = useScrollReveal('animate-fadeIn200')
  const imgRef = useScrollReveal('animate-slide-in-bottom400')

  return (
    <section id="multiple-intelligencies" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto container  bg-white shadow-xl rounded-lg p-8">
        <h3 ref={headingRef} className="opacity-0 text-4xl md:text-5xl font-bold text-primary text-center mb-12">
          Multiple Intelligencies
        </h3>

        <div className="max-w-2xl mx-auto">
          <p ref={textRef} className="opacity-0 text-lg text-gray-700 text-center mb-8">
            Learners are taught following a number of multiple intelligences
          </p>

          <img
            ref={imgRef}
            src="https://openoregon.pressbooks.pub/app/uploads/sites/4/2016/06/Multiple-intelligence.jpg"
            alt="Multiple Intelligence Framework"
            className="opacity-0 w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}