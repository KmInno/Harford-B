import { useState } from 'react';
import { useScrollReveal } from '../hooks/responsive';

export default function AdmissionForm() {
  const headingRef = useScrollReveal('animate-slide-in-left')
  const subheadingRef = useScrollReveal('animate-fadeIn200')
  const formRef = useScrollReveal('animate-slide-in-bottom400')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    nationality: '',
    grade: '',
    parentName: '',
    relationship: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    previousSchool: '',
    medicalInfo: '',
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRe = /^[A-Za-z\s'-]{2,}$/;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^\+?[0-9\s-]{7,}$/;

    if (!formData.firstName || !nameRe.test(formData.firstName.trim())) {
      newErrors.firstName = 'Enter a valid first name (letters only, min 2 characters).';
    }
    if (!formData.lastName || !nameRe.test(formData.lastName.trim())) {
      newErrors.lastName = 'Enter a valid last name (letters only, min 2 characters).';
    }
    if (!formData.dob) {
      newErrors.dob = 'Please provide date of birth.';
    } else {
      const birth = new Date(formData.dob);
      const today = new Date();
      if (birth > today) {
        newErrors.dob = 'Date of birth cannot be in the future.';
      } else {
        const age = (today - birth) / (365.25 * 24 * 60 * 60 * 1000);
        if (age < 2) {
          newErrors.dob = 'Applicant must be at least 2 years old.';
        } else if (age > 120) {
          newErrors.dob = 'Please enter a valid date of birth.';
        }
      }
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender.';
    }
    if (!formData.parentEmail || !emailRe.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Enter a valid email address.';
    }
    if (!formData.parentPhone || !phoneRe.test(formData.parentPhone.trim())) {
      newErrors.parentPhone = 'Enter a valid phone number (digits, optional +).';
    }
    if (!formData.address || formData.address.trim().length < 8) {
      newErrors.address = 'Enter a more complete address (min 8 characters).';
    }
    if (!formData.grade) {
      newErrors.grade = 'Select a grade.';
    }
    if (!formData.parentName || !nameRe.test(formData.parentName.trim())) {
      newErrors.parentName = 'Enter a valid parent/guardian name.';
    }
    if (!formData.relationship) {
      newErrors.relationship = 'Select a relationship.';
    }
    if (!formData.agree) {
      newErrors.agree = 'You must confirm the information is accurate.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowSuccess(true);

    const emailBody = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const recipient = 'harfordbridgeis@gmail.com';
    const subject = encodeURIComponent('HBIS Admission Application');
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        nationality: '',
        grade: '',
        parentName: '',
        relationship: '',
        parentEmail: '',
        parentPhone: '',
        address: '',
        previousSchool: '',
        medicalInfo: '',
        agree: false,
      });
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <section id="admissions" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-2xl bg-white mx-auto container shadow-xl rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 ref={headingRef} className="opacity-0 text-4xl md:text-5xl font-bold text-red-600 mb-4">
            Harford Bridge International School
          </h1>
          <p ref={subheadingRef} className="opacity-0 text-lg text-gray-600">
            Admission Application Form 2025/2026
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 text-green-700 rounded">
            Thank you! Your application has been submitted successfully.
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="opacity-0 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 mt-6">Student Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.dob ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              placeholder="e.g. Nigerian, British, American"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
              Applying for Grade/Year <span className="text-red-500">*</span>
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.grade ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Grade</option>
              <option value="Nursery 1">Nursery 1</option>
              <option value="Nursery 2">Nursery 2</option>
              <option value="Reception">Reception</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
            </select>
            {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6 mt-6">Parent / Guardian Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.parentName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-2">
                Relationship to Student <span className="text-red-500">*</span>
              </label>
              <select
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.relationship ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Legal Guardian</option>
                <option value="Other">Other</option>
              </select>
              {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.parentEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="parentPhone"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.parentPhone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {errors.parentPhone && <p className="text-red-500 text-sm mt-1">{errors.parentPhone}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Residential Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6 mt-6">Additional Information</h2>

          <div className="mb-4">
            <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700 mb-2">Previous School (if any)</label>
            <input
              type="text"
              id="previousSchool"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="medicalInfo" className="block text-sm font-medium text-gray-700 mb-2">
              Does the student have any medical conditions or allergies?
            </label>
            <textarea
              id="medicalInfo"
              name="medicalInfo"
              rows="3"
              placeholder="Please provide details (e.g., asthma, allergies, etc.)"
              value={formData.medicalInfo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>

          <div className="flex items-start gap-3 mb-6">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="w-5 h-5 mt-1"
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I confirm that all information provided is accurate and complete.{' '}
              <span className="text-red-500">*</span>
            </label>
            {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-all">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}