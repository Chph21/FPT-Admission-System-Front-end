import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';

interface Campus {
  timeCreated: string;
  timeUpdatedLast: string | null;
  deleted: boolean;
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  major_campuses: { 
    timeCreated: string;
    timeUpdatedLast: string | null;
    deleted: boolean;
    id: string;
  }[];
}

interface Major {
  timeCreated: string;
  timeUpdatedLast: string | null;
  deleted: boolean;
  id: string;
  name: string;
  description: string;
  duration: number;
  fee: number;
  parentMajors: any;
  major_campuses: { 
    timeCreated: string;
    timeUpdatedLast: string | null;
    deleted: boolean;
    id: string;
  }[];
}

function buildHeaders(token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

const steps = [
  'Chọn cơ sở',
  'Chọn ngành',
  'Thông tin bổ sung',
  'Xác nhận'
];

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  const [step, setStep] = useState(1);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string>('');
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [scholarship, setScholarship] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loadingCampus, setLoadingCampus] = useState(true);
  const [loadingMajors, setLoadingMajors] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/login');
    }
  }, [isAuthenticated, token, navigate]);

  // Don't proceed if not authenticated
  if (!isAuthenticated || !token) {
    return null;
  }

  // Fetch campuses
  useEffect(() => {
    setLoadingCampus(true);
    console.log('Fetching campuses with token:', token);
    fetch('http://localhost:8080/api/campuses', {
      headers: buildHeaders(token),
    })
      .then(res => {
        console.log('Campuses response status:', res.status);
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        console.log('Campuses data:', data);
        setCampuses(data);
      })
      .catch((err) => {
        console.error('Error fetching campuses:', err);
        setError('Không thể tải danh sách cơ sở.');
      })
      .finally(() => setLoadingCampus(false));
  }, [token]);

  // Fetch majors
  useEffect(() => {
    setLoadingMajors(true);
    console.log('Fetching majors with token:', token);
    fetch('http://localhost:8080/api/majors', {
      headers: buildHeaders(token),
    })
      .then(async res => {
        console.log('Majors response status:', res.status);
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Majors API error:', errorText);
          if (res.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
          }
        }
        return res.json();
      })
      .then(data => {
        console.log('Majors data:', data);
        setMajors(data);
      })
      .catch((err) => {
        console.error('Error fetching majors:', err);
        setError('Không thể tải danh sách ngành học.');
      })
      .finally(() => setLoadingMajors(false));
  }, [token]);

  // Lọc majors theo campus đã chọn
  const filteredMajors = selectedCampus
    ? majors.filter(m => 
        m.major_campuses.some(mc => 
          campuses.find(c => c.id === selectedCampus)?.major_campuses.some(cc => cc.id === mc.id)
        )
      )
    : [];

  // Debug logging
  useEffect(() => {
    if (selectedCampus) {
      console.log('Selected campus:', selectedCampus);
      console.log('Available campuses:', campuses);
      console.log('Available majors:', majors);
      console.log('Filtered majors:', filteredMajors);
    }
  }, [selectedCampus, campuses, majors, filteredMajors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const url = `http://localhost:8080/api/applications/create?idCampus=${selectedCampus}&idMajor=${selectedMajor}`;
      console.log('Submitting to URL:', url);
      console.log('Selected campus ID:', selectedCampus);
      console.log('Selected major ID:', selectedMajor);
      console.log('Token:', token);
      
      // Log the actual campus and major objects
      const selectedCampusObj = campuses.find(c => c.id === selectedCampus);
      const selectedMajorObj = majors.find(m => m.id === selectedMajor);
      console.log('Selected campus object:', selectedCampusObj);
      console.log('Selected major object:', selectedMajorObj);
      
      // Try exactly like the curl command
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
        // No body at all, exactly like curl -d ''
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`Gửi đơn thất bại: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('Application created:', data);
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err instanceof Error ? err.message : 'Gửi đơn thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) return (
    <div className="p-8 text-center">
      <div className="inline-block p-6 bg-green-100 rounded-full mb-4">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <div className="text-green-700 font-bold text-2xl mb-2">Đăng ký thành công!</div>
      <div className="text-gray-600">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10 mb-10 animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600 tracking-wide uppercase">Đăng ký tuyển sinh</h2>
      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-10">
        {steps.map((s, idx) => (
          <div key={s} className="flex-1 flex flex-col items-center">
            <div className={`w-9 h-9 flex items-center justify-center rounded-full border-2 text-lg font-bold mb-2 transition-all duration-300 ${step === idx+1 ? 'bg-orange-500 text-white border-orange-500 scale-110 shadow-lg' : step > idx+1 ? 'bg-green-500 text-white border-green-500' : 'bg-gray-200 text-gray-400 border-gray-200'}`}>{idx+1}</div>
            <span className={`text-xs text-center ${step === idx+1 ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>{s}</span>
            {idx < steps.length-1 && <div className="w-full h-1 bg-gray-200 mt-2 mb-2" />}
          </div>
        ))}
      </div>
      {error && <div className="text-red-600 mb-4 text-center font-semibold bg-red-50 rounded p-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Step 1: Chọn cơ sở */}
        {step === 1 && (
          <div className="animate-fade-in">
            <label className="block mb-2 font-semibold text-gray-700">Chọn cơ sở trường học</label>
            <select
              className="w-full border-2 border-orange-200 rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition bg-white text-gray-700 cursor-pointer"
              value={selectedCampus}
              onChange={e => setSelectedCampus(e.target.value)}
              required
              disabled={loadingCampus || campuses.length === 0}
              style={{ 
                zIndex: 9999,
                position: 'relative',
                backgroundColor: 'white',
                color: '#374151'
              }}
            >
              <option value="" style={{ backgroundColor: 'white', color: '#374151' }}>
                {loadingCampus ? 'Đang tải...' : '-- Chọn cơ sở --'}
              </option>
              {!loadingCampus && campuses.map(c => (
                <option key={c.id} value={c.id} style={{ backgroundColor: 'white', color: '#374151', padding: '8px' }}>
                  {c.name}
                </option>
              ))}
            </select>
            <button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow transition disabled:opacity-50" disabled={!selectedCampus || loadingCampus} onClick={() => setStep(2)}>
              Tiếp tục
            </button>
          </div>
        )}
        {/* Step 2: Chọn ngành học */}
        {step === 2 && (
          <div className="animate-fade-in">
            <label className="block mb-2 font-semibold text-gray-700">Chọn ngành học</label>
            <select
              className="w-full border-2 border-orange-200 rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition bg-white text-gray-700 cursor-pointer"
              value={selectedMajor}
              onChange={e => setSelectedMajor(e.target.value)}
              required
              disabled={loadingMajors || filteredMajors.length === 0}
              style={{ 
                zIndex: 9999,
                position: 'relative',
                backgroundColor: 'white',
                color: '#374151'
              }}
            >
              <option value="" style={{ backgroundColor: 'white', color: '#374151' }}>
                {loadingMajors ? 'Đang tải...' : '-- Chọn ngành --'}
              </option>
              {!loadingMajors && filteredMajors.map(m => (
                <option key={m.id} value={m.id} style={{ backgroundColor: 'white', color: '#374151', padding: '8px' }}>
                  {m.name}
                </option>
              ))}
            </select>
            <div className="flex justify-between gap-4">
              <button type="button" className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow transition" onClick={() => setStep(1)}>
                Quay lại
              </button>
              <button type="button" className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow transition disabled:opacity-50" disabled={!selectedMajor || loadingMajors} onClick={() => setStep(3)}>
                Tiếp tục
              </button>
            </div>
          </div>
        )}
        {/* Step 3: Nhập thông tin bổ sung */}
        {step === 3 && (
          <div className="animate-fade-in">
            <label className="block mb-2 font-semibold text-gray-700">Học bổng (nếu có)</label>
            <input
              className="w-full border-2 border-orange-200 rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              value={scholarship}
              onChange={e => setScholarship(e.target.value)}
              placeholder="Không bắt buộc"
            />
            <div className="flex justify-between gap-4">
              <button type="button" className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow transition" onClick={() => setStep(2)}>
                Quay lại
              </button>
              <button type="button" className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow transition" onClick={() => setStep(4)}>
                Tiếp tục
              </button>
            </div>
          </div>
        )}
        {/* Step 4: Xác nhận và gửi đơn */}
        {step === 4 && (
          <div className="animate-fade-in">
            <div className="mb-6 bg-orange-50 rounded-lg p-4">
              <div className="mb-2"><b>Cơ sở:</b> <span className="text-orange-700">{campuses.find(c => c.id === selectedCampus)?.name}</span></div>
              <div className="mb-2"><b>Ngành:</b> <span className="text-orange-700">{majors.find(m => m.id === selectedMajor)?.name}</span></div>
              <div className="mb-2"><b>Học bổng:</b> <span className="text-orange-700">{scholarship || 'Không'}</span></div>
            </div>
            {error && <div className="text-red-600 mb-2 text-center font-semibold bg-red-50 rounded p-2">{error}</div>}
            <div className="flex justify-between gap-4">
              <button type="button" className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow transition" onClick={() => setStep(3)} disabled={submitting}>
                Quay lại
              </button>
              <button type="submit" className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow transition disabled:opacity-50" disabled={submitting}>
                {submitting ? 'Đang gửi...' : 'Gửi đơn'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ApplicationForm; 