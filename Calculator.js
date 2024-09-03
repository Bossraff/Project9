document.getElementById('loan-form').addEventListener('submit', function(e){
  // Prevent actual submit
  e.preventDefault();

  // UI Variables
  const amount = document.getElementById('amount');
  const months = document.getElementById('months');
  const interestRate = document.getElementById('interest-rate');
  const loanAmountDisplay = document.getElementById('loan-amount');
  const loanInterestDisplay = document.getElementById('loan-interest');
  const totalAmountDueDisplay = document.getElementById('total-amount-due');
  const monthlyPaymentDisplay = document.getElementById('monthly-payment');
  const totalPaymentDisplay = document.getElementById('total-payment');
  const displayInterestRate = document.getElementById('display-interest-rate');

  // Get the input values
  const principal = parseFloat(amount.value);
  const totalMonths = parseFloat(months.value);
  const selectedInterestRate = parseFloat(interestRate.value);

  // Calculate interest and total amount due
  const interest = principal * selectedInterestRate * totalMonths;
  const totalAmountDue = principal + interest;

  // Display loan details
  loanAmountDisplay.innerText = principal.toFixed(2);
  displayInterestRate.innerText = (selectedInterestRate * 100).toFixed(0) + '%';
  loanInterestDisplay.innerText = interest.toFixed(2);
  totalAmountDueDisplay.innerText = totalAmountDue.toFixed(2);

  // Calculate monthly payment
  const monthlyPayment = totalAmountDue / totalMonths;

  // Display payment plan
  monthlyPaymentDisplay.innerText = monthlyPayment.toFixed(2);
  totalPaymentDisplay.innerText = (monthlyPayment * totalMonths).toFixed(2);

  // Show results
  document.getElementById('results').style.display = 'block';

  // Show application form
  document.getElementById('application-form').style.display = 'block';
});

// Handle application form submission (example)
document.getElementById('apply-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // You can add your application form submission logic here
  // For example, collect form data and send it to a server

  // Example: Alert message
  const name = document.getElementById('name').value;
  alert(`Thank you, ${name}! Your loan application has been submitted.`);
});
