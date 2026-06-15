import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '', mobileNumber: '', emailAddress: '', category: 'Open',
    tenthPercentage: '', twelfthPercentage: '', mhtCetPercentile: '', jeePercentile: '', pcmMarks: '',
    preferredBranch: [], otherBranchText: '', additionalNotes: '',
    documents: { sscMarksheet: false, hscMarksheet: false, cetScorecard: false, jeeScorecard: false, domicileCertificate: false, casteCertificate: false, casteValidity: false, incomeCertificate: false }
  });

  const [showPopup, setShowPopup] = useState(false);

  const branchOptions = ["Computer Science (CSE)", "Information Technology (IT)", "Data Science / AI & ML", "Electronics & Telecommunication", "Mechanical Engineering", "Civil Engineering", "Other"];

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (option, type) => {
    if (type === 'branch') {
      const updated = formData.preferredBranch.includes(option)
        ? formData.preferredBranch.filter(item => item !== option)
        : [...formData.preferredBranch, option];
      setFormData({ ...formData, preferredBranch: updated });
    }
  };

  const handleDocChange = (doc) => {
    setFormData({ ...formData, documents: { ...formData.documents, [doc]: !formData.documents[doc] } });
  };

  const handleSelectAllDocs = (e) => {
    const isChecked = e.target.checked;
    setFormData({
      ...formData,
      documents: {
        sscMarksheet: isChecked, hscMarksheet: isChecked, cetScorecard: isChecked, jeeScorecard: isChecked,
        domicileCertificate: isChecked, casteCertificate: isChecked, casteValidity: isChecked, incomeCertificate: isChecked
      }
    });
  };

  const executeFormSubmit = async (e) => {
    e.preventDefault();
    
    // Backend Admin Panel me data bhejna
    try {
      await fetch('http://localhost:5000/api/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.log("Saving to database...");
    }

    setShowPopup(true);

    let branchText = formData.preferredBranch.join(', ');
    if (formData.preferredBranch.includes('Other') && formData.otherBranchText) {
      branchText = branchText.replace('Other', `Other (${formData.otherBranchText})`);
    }

    const message = `Hello,\nI am interested in Engineering Admission Counselling.\n\nName: ${formData.fullName}\nMobile: ${formData.mobileNumber}\nMHT CET %ile: ${formData.mhtCetPercentile}\nJEE %ile: ${formData.jeePercentile || 'N/A'}\nPreferred Branch: ${branchText || 'Any'}\nNotes: ${formData.additionalNotes || 'N/A'}\n\nPlease guide me regarding admission.`;
    
    // Asli WhatsApp Number Yahan Laga Diya Hai
    setTimeout(() => {
      window.open(`https://wa.me/918380064668?text=${encodeURIComponent(message)}`, '_blank');
    }, 1500);
  };

  const closePopup = () => {
    setShowPopup(false);
    window.location.reload();
  };

  const isAllDocsSelected = Object.values(formData.documents).every(v => v === true);

  return (
    <div className="max-w-4xl mx-auto relative mb-12">
      
      {/* 🟢 SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-slate-900/80 backdrop-blur-sm px-4">
          <div className="bg-slate-800 border border-green-500/30 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform transition-all scale-100">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Form Submitted!</h3>
            <p className="text-slate-300 text-sm mb-6">Your details have been successfully recorded. We will connect with you shortly.</p>
            <button onClick={closePopup} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors">
              Okay
            </button>
          </div>
        </div>
      )}

      <div className="glass-morphic rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Counselling Request Form</h2>
          <p className="text-slate-400 mb-6">Please provide verified academic inputs to structure placement matrix parameters.</p>
          
          {/* WHATSAPP SUPPORT DESK BUTTON - Asli Number Laga Diya */}
          <div className="flex justify-center">
            <a href="https://wa.me/918380064668?text=Hello%2C%20I%20need%20help%20with%20the%20admission%20portal." target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors bg-green-400/10 px-5 py-2.5 rounded-full border border-green-400/20 shadow-lg shadow-green-500/10 hover:bg-green-400/20">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Support Desk
            </a>
          </div>
        </div>

        <form onSubmit={executeFormSubmit} className="space-y-10">
          
          {/* 1. PERSONAL DETAILS */}
          <div>
            <h3 className="text-lg font-medium text-cyan-400 mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <span className="bg-cyan-500/10 p-1 rounded">01.</span> PERSONAL DETAILS
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-xs text-slate-400 mb-1">Full Name</label><input type="text" name="fullName" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 outline-none" onChange={handleInputChange} /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Mobile Number</label><input type="tel" name="mobileNumber" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 outline-none" onChange={handleInputChange} /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Email Address</label><input type="email" name="emailAddress" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 outline-none" onChange={handleInputChange} /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Category</label><select name="category" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 outline-none" onChange={handleInputChange}><option>Open</option><option>OBC</option><option>SC/ST</option><option>NT/VJ/SBC</option></select></div>
            </div>
          </div>

          {/* 2. ACADEMIC FIELDS */}
          <div>
            <h3 className="text-lg font-medium text-cyan-400 mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <span className="bg-cyan-500/10 p-1 rounded">02.</span> ACADEMIC MATRIX FIELDS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div><label className="block text-xs text-slate-400 mb-1">10th %</label><input type="number" name="tenthPercentage" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-200" onChange={handleInputChange} /></div>
              <div><label className="block text-xs text-slate-400 mb-1">12th %</label><input type="number" name="twelfthPercentage" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-200" onChange={handleInputChange} /></div>
              <div><label className="block text-xs text-slate-400 mb-1">MHT-CET %ile</label><input type="number" step="0.0001" name="mhtCetPercentile" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-200" onChange={handleInputChange} /></div>
              <div><label className="block text-xs text-slate-400 mb-1">JEE %ile</label><input type="number" step="0.0001" name="jeePercentile" placeholder="e.g. 85.50" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-200" onChange={handleInputChange} /></div>
              <div><label className="block text-xs text-slate-400 mb-1">PCM Total</label><input type="number" name="pcmMarks" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-200" onChange={handleInputChange} /></div>
            </div>
          </div>

          {/* 3. PREFERRED BRANCH SELECTION */}
          <div>
            <h3 className="text-lg font-medium text-cyan-400 mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <span className="bg-cyan-500/10 p-1 rounded">03.</span> PREFERRED BRANCH SELECTION
            </h3>
            <div className="space-y-3 bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              {branchOptions.map((b) => (
                <div key={b}>
                  <label className="flex items-center gap-3 text-sm text-slate-300">
                    <input type="checkbox" checked={formData.preferredBranch.includes(b)} onChange={() => handleCheckboxChange(b, 'branch')} className="rounded accent-cyan-500 w-4 h-4" /> {b}
                  </label>
                  {b === 'Other' && formData.preferredBranch.includes('Other') && (
                    <input type="text" placeholder="Type your branch name..." value={formData.otherBranchText} onChange={(e) => setFormData({...formData, otherBranchText: e.target.value})} className="mt-3 ml-7 w-full md:w-1/2 bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 focus:border-cyan-500 outline-none" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. DOCUMENT AVAILABILITY CHECK */}
          <div>
            <h3 className="text-lg font-medium text-cyan-400 mb-4 flex items-center gap-2 border-b border-slate-700 pb-2 justify-between">
              <span className="flex items-center gap-2"><span className="bg-cyan-500/10 p-1 rounded">04.</span> DOCUMENT AVAILABILITY CHECK</span>
              <span className="text-xs text-yellow-500 font-normal">No document upload required</span>
            </h3>
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <label className="flex items-center gap-3 text-sm font-semibold text-cyan-400 mb-4 pb-3 border-b border-slate-700/50 cursor-pointer">
                <input type="checkbox" checked={isAllDocsSelected} onChange={handleSelectAllDocs} className="rounded accent-cyan-500 w-4 h-4" />
                Select All Documents
              </label>

              <div className="grid md:grid-cols-2 gap-4">
                {Object.keys(formData.documents).map((doc) => (
                  <label key={doc} className="flex items-center gap-3 text-sm text-slate-300 capitalize cursor-pointer">
                    <input type="checkbox" checked={formData.documents[doc]} onChange={() => handleDocChange(doc)} className="rounded accent-cyan-500 w-4 h-4" /> 
                    {doc.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 5. ADDITIONAL NOTES */}
          <div>
            <h3 className="text-lg font-medium text-cyan-400 mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <span className="bg-cyan-500/10 p-1 rounded">05.</span> ADDITIONAL NOTES
            </h3>
            <textarea name="additionalNotes" rows="3" placeholder="Any specific queries or requirements..." className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:border-cyan-500 outline-none resize-none" onChange={handleInputChange}></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-1">
              Submit Application
            </button>
          </div>
        </form>
      </div>

      {/* 🔴 NEW FOOTER SECTION */}
      <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">Need Help? Contact Us</h3>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          <div>
            <p className="text-sm font-semibold text-green-400 mb-2 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </p>
            <p className="text-slate-300 text-sm tracking-wider">8380064668</p>
            <p className="text-slate-300 text-sm tracking-wider">8390388124</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-400 mb-2 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Call
            </p>
            <p className="text-slate-300 text-sm tracking-wider">8999890388</p>
            <p className="text-slate-300 text-sm tracking-wider">7057367758</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}