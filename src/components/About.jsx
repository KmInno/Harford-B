import { useScrollReveal } from '../hooks/responsive'


export default function About() {

  const headingRef = useScrollReveal('animate-fadeIn')
  
  const paragraphRefs = [
    useScrollReveal('animate-slide-in-bottom'),
    useScrollReveal('animate-slide-in-bottom200'),
    useScrollReveal('animate-slide-in-bottom400'),
    useScrollReveal('animate-slide-in-bottom400'),
  ]

  const paragraphs = [
    "At Harford Bridge International School, we are dedicated to fostering a nurturing and dynamic learning environment that empowers young minds to thrive in an interconnected world. Our institution blends the timeless values of academic excellence with the innovative spirit of global education, preparing students for success in university and beyond.",
    "Founded with a vision to bridge cultures and cultivate curiosity, we offer a co-educational, English-medium curriculum affiliated with Cambridge International Examinations. From Nursery through Grade XII, our programs emphasize holistic development—integrating rigorous academics in core subjects like mathematics, sciences, and humanities with enriching extracurriculars in arts, sports, and leadership.",
    "Our small class sizes and dedicated faculty ensure personalized attention, allowing each child to learn at their own pace while building confidence, critical thinking, and resilience. We take pride in our diverse community, where students from varied backgrounds collaborate in a supportive atmosphere that celebrates creativity and cultural exchange.",
    "Whether through our house system competitions, community service initiatives, or state-of-the-art facilities, we inspire lifelong learners who are not just knowledgeable, but compassionate global citizens. Join us at Harford Bridge International School, where every day is an opportunity to discover potential and dream big. We invite you to visit our campus and experience the transformative journey firsthand.",
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto container shadow-xl rounded-lg p-8">
        <h2 ref={headingRef} className="opacity-0 text-4xl md:text-5xl font-bold text-primary text-center mb-12">
          About Harford Bridge International School (HBIS)
        </h2>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {paragraphs.map((paragraph, index) => (
            <p key={index} ref={paragraphRefs[index]} className="opacity-0 text-lg text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}