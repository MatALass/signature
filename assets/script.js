(function () {
  const data = document.getElementById('data');
  const toast = document.getElementById('toast');

  function setToast(message) {
    toast.textContent = message;
    if (!message) return;
    window.clearTimeout(setToast._t);
    setToast._t = window.setTimeout(() => (toast.textContent = ''), 1600);
  }

  function buildPhone() {
    const cc = data.dataset.phoneCountry;
    const parts = [data.dataset.phoneA, data.dataset.phoneB, data.dataset.phoneC, data.dataset.phoneD, data.dataset.phoneE];
    // Display with spaces (French style)
    return `${cc} ${parts.join(' ')}`;
  }

  function buildEmail() {
    return `${data.dataset.emailUser}@${data.dataset.emailDomain}`;
  }

  const phone = buildPhone();
  const email = buildEmail();

  const phoneLink = document.getElementById('phoneLink');
  phoneLink.textContent = phone;
  phoneLink.href = `tel:${phone.replace(/\s+/g, '')}`;

  const emailLink = document.getElementById('emailLink');
  emailLink.textContent = email;
  emailLink.href = `mailto:${email}`;

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      setToast('Copied ✅');
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setToast('Copied ✅');
    }
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-copy');
      if (key === 'phone') copyText(phone);
      if (key === 'email') copyText(email);
    });
  });

  // vCard generation (kept out of repo files)
  document.getElementById('downloadVcard').addEventListener('click', () => {
    const vcf = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Alassoeur;Mathieu;;;',
      'FN:Mathieu Alassoeur',
      `TEL;TYPE=CELL:${phone.replace(/\s+/g, '')}`,
      `EMAIL;TYPE=INTERNET:${email}`,
      'TITLE:Data Analyst · BI',
      'END:VCARD',
      ''
    ].join('\n');

    const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mathieu-Alassoeur.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    setToast('vCard downloaded ✅');
  });
})();
