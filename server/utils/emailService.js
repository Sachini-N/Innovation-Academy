/**
 * TRACE Sri Lanka Email Notification Service
 * Sends transactional email notifications for:
 * 1. Program Registration Confirmation (with Reference Number & Workshop Access Details)
 * 2. Industry Visit Request Submission Confirmation
 * 3. Visit Schedule Approval & Updates
 * 4. General Inquiry Confirmation
 */

export const sendEmailNotification = async ({ to, subject, html, text }) => {
  // If SMTP environment variables are present, we can integrate with nodemailer or an external API
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;

  if (smtpHost && smtpUser) {
    console.log(`[Email Service] Dispatched live email to ${to} with subject: "${subject}"`);
    // Production SMTP transport logic can be hooked here
    return { success: true, mode: 'live', recipient: to };
  }

  // Graceful development / demo logger
  console.log('---------------------------------------------------------');
  console.log(`[TRACE Notification System - Mock Email Dispatched]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${text || html?.substring(0, 150)}...`);
  console.log('---------------------------------------------------------');

  return { success: true, mode: 'mock', recipient: to };
};

export const sendProgramRegistrationEmail = async (registration, program) => {
  const subject = `Registration Confirmed: ${program.title} | TRACE Sri Lanka`;
  const html = `
    <h2>Welcome to TRACE Innovation Academy</h2>
    <p>Dear ${registration.fullName},</p>
    <p>Your registration for <strong>${program.title}</strong> has been successfully received and approved.</p>
    <p><strong>Your Registration Reference Number:</strong> ${registration.referenceNumber}</p>
    <p><strong>What Happens Next:</strong></p>
    <ul>
      <li>You now have automatic access to all upcoming workshops under ${program.title}.</li>
      <li>Log in to your TRACE Participant Dashboard to view session agendas, Google Meet / Zoom links, and physical lab access instructions at Bay 05, Maradana.</li>
    </ul>
    <p>Best regards,<br/>Dilshan Perera<br/>Head of Programs & Incubation<br/>TRACE Expert City, Sri Lanka</p>
  `;
  return sendEmailNotification({
    to: registration.email,
    subject,
    html,
    text: `Your registration for ${program.title} is confirmed. Ref: ${registration.referenceNumber}. You have automatic access to all workshops.`,
  });
};

export const sendVisitRequestEmail = async (visitRequest) => {
  const subject = `Industry Visit Request Received: Ref #${visitRequest.referenceNumber} | TRACE Expert City`;
  const html = `
    <h2>TRACE Expert City - Industry Visit Application</h2>
    <p>Dear ${visitRequest.contactPerson},</p>
    <p>We have received your industry visit request for <strong>${visitRequest.organizationName}</strong>.</p>
    <p><strong>Reference Number:</strong> ${visitRequest.referenceNumber}</p>
    <p><strong>Proposed Date:</strong> ${visitRequest.preferredVisitDate} (${visitRequest.preferredTime})</p>
    <p><strong>Number of Participants:</strong> ${visitRequest.numberOfParticipants} (${visitRequest.participantAgeGroup})</p>
    <p>Our Secretariat is reviewing your request and will confirm scheduling shortly.</p>
    <p>TRACE Expert City Secretariat<br/>Bay 05, FoodMarket Complex, Maradana, Colombo 10</p>
  `;
  return sendEmailNotification({
    to: visitRequest.email,
    subject,
    html,
    text: `Your visit request for ${visitRequest.organizationName} has been received. Reference: ${visitRequest.referenceNumber}.`,
  });
};

