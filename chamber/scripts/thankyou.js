document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);

  function getVal(key){ return params.get(key) || '—'; }

  const firstName = getVal('firstName');
  const lastName = getVal('lastName');
  const email = getVal('email');
  const phone = getVal('phone');
  const organization = getVal('organization');
  const timestamp = getVal('timestamp');

  const summary = document.getElementById('summary');
  if (!summary) return;

  summary.innerHTML = `
    <div class="thank-card" style="background:#fff;padding:1rem;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,0.06);">
      <h2>Submission Summary</h2>
      <dl>
        <dt>First name</dt><dd>${escapeHtml(firstName)}</dd>
        <dt>Last name</dt><dd>${escapeHtml(lastName)}</dd>
        <dt>Email</dt><dd>${escapeHtml(email)}</dd>
        <dt>Mobile phone</dt><dd>${escapeHtml(phone)}</dd>
        <dt>Organization</dt><dd>${escapeHtml(organization)}</dd>
        <dt>Submitted at</dt><dd>${formatTimestamp(timestamp)}</dd>
      </dl>
      <p>Thank you for applying. A chamber representative will contact you shortly.</p>
    </div>
  `;

  function formatTimestamp(ts){
    if (!ts || ts === '—') return '—';
    try {
      const d = new Date(ts);
      return d.toLocaleString();
    } catch(e){
      return ts;
    }
  }

  function escapeHtml(s){
    if (!s) return '';
    return s.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

});