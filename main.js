const backend = 'https://backend-s79.onrender.com';
let currentCustomer = null;

window.onload = async () => {
  const qrImage = document.getElementById('link-qrcode');
  const confirmBtn = document.getElementById('confirm-btn');
  const nameInput = document.getElementById('customer-name');
  const phoneInput = document.getElementById('phone-number');

  const res = await fetch(`${backend}/customer`);
  currentCustomer = await res.json();

  if (currentCustomer && currentCustomer.qrUrl) {
    qrImage.src = currentCustomer.qrUrl;
    document.getElementById('madatban').textContent = currentCustomer.madatban;
  }

  confirmBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    if (!name || !phone || !currentCustomer?.id) return;

    await fetch(`${backend}/customer/${currentCustomer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...currentCustomer, name, phone, status: true })
    });
  });
};
