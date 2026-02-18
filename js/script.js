
  let selectedFreq = 'MONTHLY';
  let selectedAmt = '';
  let selectedDonationType = 'monetary';
  let selectedInKind = 'School Supplies';
  let selectedCommitment = '3 Months';

  function setFreq(f) {
    selectedFreq = f;
    document.getElementById('btnMonthly').classList.toggle('active', f === 'MONTHLY');
    document.getElementById('btnOneTime').classList.toggle('active', f === 'ONE-TIME');
  }

  function selectAmt(btn, amt) {
    document.querySelectorAll('.amt-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedAmt = amt;
    document.getElementById('customAmt').value = '';
  }

  function clearSelected() {
    document.querySelectorAll('.amt-btn').forEach(b => b.classList.remove('selected'));
    selectedAmt = '';
  }

  function setDonationType(type) {
    selectedDonationType = type;
    document.getElementById('btnMonetary').classList.toggle('active', type === 'monetary');
    document.getElementById('btnInKind').classList.toggle('active', type === 'inkind');
    document.getElementById('monetaryFields').style.display = type === 'monetary' ? '' : 'none';
    document.getElementById('inkindFields').style.display = type === 'inkind' ? '' : 'none';
  }

  function setInKind(type) {
    selectedInKind = type;
    document.getElementById('btnSupplies').classList.toggle('active', type === 'School Supplies');
    document.getElementById('btnHousehold').classList.toggle('active', type === 'Household Essentials');
    document.getElementById('btnOthers').classList.toggle('active', type === 'Others');
  }

  function setCommitment(c) {
    selectedCommitment = c;
    document.getElementById('btn3mo').classList.toggle('active', c === '3 Months');
    document.getElementById('btn6mo').classList.toggle('active', c === '6 Months');
    document.getElementById('btn9mo').classList.toggle('active', c === '9 Months');
    document.getElementById('btn1yr').classList.toggle('active', c === '1 Year');
  }

  function openDonateModal() {
    document.getElementById('donateModal').classList.add('open');
    document.getElementById('donateForm').style.display = '';
    document.getElementById('donateSuccess').style.display = 'none';
  }
  function openAdoptModal() {
    document.getElementById('adoptModal').classList.add('open');
    document.getElementById('adoptForm').style.display = '';
    document.getElementById('adoptSuccess').style.display = 'none';
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
  }

  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
  });

  function submitDonate() {
    const name = document.getElementById('donateName').value.trim();
    const email = document.getElementById('donateEmail').value.trim();
    if (!name || !email) { alert('Please fill in your name and email.'); return; }
    const city = document.getElementById('donateCity').value;
    const phone = document.getElementById('donatePhone').value;
    const msg = document.getElementById('donateMessage').value;
    let donationDetail = '';
    if (selectedDonationType === 'monetary') {
      const custom = document.getElementById('customAmt').value;
      const amount = custom ? '₱' + custom : selectedAmt || '(amount not specified)';
      donationDetail = `Frequency: ${selectedFreq}\nAmount: ${amount}`;
    } else {
      donationDetail = `In-Kind Type: ${selectedInKind}`;
    }
    const subject = encodeURIComponent(`Project LIKHA Donation Pledge – ${name}`);
    const body = encodeURIComponent(
      `Hello Project LIKHA Team,\n\nA new donation pledge has been submitted.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCity, Province: ${city || 'N/A'}\nDonation Type: ${selectedDonationType === 'monetary' ? 'Monetary' : 'In-Kind'}\n${donationDetail}\nMessage: ${msg || 'None'}\n\nPlease reach out to coordinate their donation.\n\nThank you!`
    );
    window.location.href = `mailto:likha.donations@gmail.com?subject=${subject}&body=${body}`;
    document.getElementById('donateForm').style.display = 'none';
    document.getElementById('donateSuccess').style.display = 'block';
  }

  function submitAdopt() {
    const name = document.getElementById('adoptName').value.trim();
    const email = document.getElementById('adoptEmail').value.trim();
    if (!name || !email) { alert('Please fill in your name and email.'); return; }
    const phone = document.getElementById('adoptPhone').value;
    const city = document.getElementById('adoptCity').value;
    const msg = document.getElementById('adoptMessage').value;
    const subject = encodeURIComponent(`Adopt-a-Scholar Interest – ${name}`);
    const body = encodeURIComponent(
      `Hello Project LIKHA Team,\n\nSomeone has expressed interest in the Adopt-a-Scholar Program.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCity, Province: ${city || 'N/A'}\nCommitment: ${selectedCommitment}\nMessage: ${msg || 'None'}\n\nPlease reach out to them.\n\nThank you!`
    );
    window.location.href = `mailto:likha.donations@gmail.com?subject=${subject}&body=${body}`;
    document.getElementById('adoptForm').style.display = 'none';
    document.getElementById('adoptSuccess').style.display = 'block';
  }

