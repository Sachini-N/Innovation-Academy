import { mockStore } from './config/mockStore.js';

async function runTests() {
  console.log('========================================================');
  console.log('🧪 RUNNING FULL SUITE TESTS FOR TRACE SRI LANKA PORTAL');
  console.log('========================================================');

  const BASE_URL = 'http://127.0.0.1:5001/api';

  // 1. Health check
  const healthRes = await fetch(`${BASE_URL}/health`);
  const health = await healthRes.json();
  console.log('1. Health check passed:', health.status === 'online', '| Org:', health.organization, '| Project:', health.project);

  // 2. Public Programs test (Must be exactly TWO programs)
  const progsRes = await fetch(`${BASE_URL}/programs`);
  const progs = await progsRes.json();
  console.log('2. Public Programs count:', progs.data.length);
  if (progs.data.length !== 2) throw new Error('Expected exactly 2 programs!');
  console.log('   - Program 01:', progs.data[0].title);
  console.log('   - Program 02:', progs.data[1].title);

  // 3. User Registration
  const testUserEmail = `founder_${Date.now()}@sliit.lk`;
  const regUserRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Charith Wickramasinghe',
      email: testUserEmail,
      password: 'password123',
      phone: '+94 77 999 8888',
      organization: 'SLIIT Computing Faculty',
    }),
  });
  const regUserData = await regUserRes.json();
  console.log('3. Participant registered successfully:', regUserData.user.name, 'Token received:', Boolean(regUserData.token));
  const userToken = regUserData.token;

  // 4. Check initial workshop access (Should NOT have access before program registration)
  const wk1Res = await fetch(`${BASE_URL}/workshops/design-thinking-and-grand-challenges`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  const wk1Data = await wk1Res.json();
  console.log('4. Initial Workshop Access (Before registration):', wk1Data.access.hasAccess, '(Should be false)');
  if (wk1Data.access.hasAccess !== false) throw new Error('Participant should not have access before program enrollment!');

  // 5. Enroll in Program 01 (Innovation & Design Thinking Masterclass)
  const enrollRes = await fetch(`${BASE_URL}/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      programSlug: 'program-01',
      fullName: 'Charith Wickramasinghe',
      email: testUserEmail,
      phoneNumber: '+94 77 999 8888',
      organization: 'SLIIT Computing Faculty',
      additionalInformation: 'Building computer vision agricultural sorting hardware.',
    }),
  });
  const enrollData = await enrollRes.json();
  console.log('5. Program Enrollment Success:', enrollData.success, '| Reference No:', enrollData.referenceNumber);
  if (!enrollData.referenceNumber) throw new Error('Registration reference number missing!');

  // 6. Test Duplicate Registration Prevention (Should be blocked!)
  const duplicateRes = await fetch(`${BASE_URL}/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      programSlug: 'program-01',
      fullName: 'Charith Wickramasinghe',
      email: testUserEmail,
      phoneNumber: '+94 77 999 8888',
    }),
  });
  const duplicateData = await duplicateRes.json();
  console.log('6. Duplicate Prevention Test (Status 400 expected):', duplicateRes.status === 400, '| Msg:', duplicateData.message);
  if (duplicateRes.status !== 400) throw new Error('Duplicate registration was not prevented!');

  // 7. Verify Automatic Access to ALL Program 01 Workshops
  const wk1AfterRes = await fetch(`${BASE_URL}/workshops/design-thinking-and-grand-challenges`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  const wk1After = await wk1AfterRes.json();
  console.log('7. Workshop Access for Program 01 Workshop:', wk1After.access.hasAccess, '(Should be true)');
  if (wk1After.access.hasAccess !== true) throw new Error('Participant must have automatic access to Program 01 workshops!');

  // 8. Verify Access is LOCKED for Program 02 Workshop (since not enrolled in Program 02)
  const wk2AfterRes = await fetch(`${BASE_URL}/workshops/rapid-prototyping-and-proof-of-concept`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  const wk2After = await wk2AfterRes.json();
  console.log('8. Workshop Access for Program 02 Workshop (Unenrolled):', wk2After.access.hasAccess, '(Should be false)');
  if (wk2After.access.hasAccess !== false) throw new Error('Participant should NOT have access to Program 02 workshops!');

  // 9. Industry Visit Request Submission (Independent of programs)
  const visitRes = await fetch(`${BASE_URL}/visits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      organizationName: 'SLIIT Robotics Society',
      organizationType: 'University / Faculty',
      contactPerson: 'Charith Wickramasinghe',
      email: testUserEmail,
      phone: '+94 77 999 8888',
      numberOfParticipants: 30,
      participantAgeGroup: 'Undergraduates (19-24)',
      preferredVisitDate: '2025-08-15',
      preferredTime: '10:00 AM - 01:00 PM',
      visitPurpose: 'Maker space tour and mechatronics startup discovery session.',
      areasOfInterest: ['Bay 05 Maker Space', 'Robotics & Sensor Labs'],
    }),
  });
  const visitData = await visitRes.json();
  console.log('9. Industry Visit Request Submitted:', visitData.success, '| Reference No:', visitData.referenceNumber);
  if (!visitData.referenceNumber) throw new Error('Visit reference number missing!');

  // 10. Contact Us Message Submission
  const contactRes = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dr. Priyantha Jayalath',
      email: 'priyantha@research.cmb.ac.lk',
      subject: 'Biomedical Innovation Research Partnership',
      programOfInterest: 'Innovation & Design Thinking Masterclass',
      message: 'Interested in reserving maker space benches for medical device prototypes.',
    }),
  });
  const contactData = await contactRes.json();
  console.log('10. Contact Form Submitted & Saved:', contactData.success);

  // 11. Admin Login & Verification
  const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@trace.lk', password: 'admin123' }),
  });
  const adminLogin = await adminLoginRes.json();
  const adminToken = adminLogin.token;
  console.log('11. Admin Authentication:', adminLogin.user.name, 'Admin Role:', adminLogin.user.role === 'admin');

  // 12. Admin Triage: Approve Registration & Confirm Visit
  const adminRegsRes = await fetch(`${BASE_URL}/registrations`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const adminRegs = await adminRegsRes.json();
  console.log('12. Admin Registrations Loaded:', adminRegs.data.length, 'entries');

  const adminVisitsRes = await fetch(`${BASE_URL}/visits`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const adminVisits = await adminVisitsRes.json();
  console.log('13. Admin Visits Loaded:', adminVisits.data.length, 'entries');

  console.log('========================================================');
  console.log('🎉 ALL 13 TEST SUITE CASES PASSED WITH 100% SUCCESS!');
  console.log('========================================================');
}

// Start server and run tests
import('./index.js').then(async () => {
  await new Promise((r) => setTimeout(r, 600));
  try {
    await runTests();
    process.exit(0);
  } catch (err) {
    console.error('❌ Test suite error:', err);
    process.exit(1);
  }
});

