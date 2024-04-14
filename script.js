document.getElementById('taxForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const age = document.getElementById('age').value;
  const income = document.getElementById('income').value;
  const extraIncome = document.getElementById('extraIncome').value;
  const deductions = document.getElementById('deductions').value;

  const ageError = document.getElementById('ageError');
  const incomeError = document.getElementById('incomeError');
  const extraIncomeError = document.getElementById('extraIncomeError');
  const deductionsError = document.getElementById('deductionsError');

  // Remove all previously added icons and tooltips
  const errorIcons = document.querySelectorAll('.error-icon');
  errorIcons.forEach(icon => icon.remove());

  const tooltips = document.querySelectorAll('.error-tooltip');
  tooltips.forEach(tooltip => {
    tooltip.style.display = 'none';
  });

  // Validate age
  if (age === '') {
    ageError.textContent = 'Age is mandatory';
    addErrorIcon('age', ageError.textContent);
    return;
  }

  // Validate income, extra income, and deductions
  if (isNaN(income) || income === '') {
    incomeError.textContent = ' Please Enter numbers only';
    addErrorIcon('income', incomeError.textContent);
    return;
  }

  if (isNaN(extraIncome) || extraIncome === '') {
    extraIncomeError.textContent = 'Please enter numbers only';
    addErrorIcon('extraIncome', extraIncomeError.textContent);
    return;
  }

  if (isNaN(deductions) || deductions === '') {
    deductionsError.textContent = 'Please enter numbers only';
    addErrorIcon('deductions', deductionsError.textContent);
    return;
  }

  // Calculate tax
  let tax = 0;
  const totalIncome = parseFloat(income) + parseFloat(extraIncome) - parseFloat(deductions);
  if (totalIncome > 800000) {
    if (age === '<40') {
      tax = (totalIncome - 800000) * 0.3;
    } else if (age === '≥40 & <60') {
      tax = (totalIncome - 800000) * 0.4;
    } else if (age === '≥60') {
      tax = (totalIncome - 800000) * 0.1;
    }
    let finalincome = totalIncome - tax;
  // Display result
  const result = document.getElementById('result');
  result.innerHTML = `Your overall income will be<br> ${finalincome.toFixed(2)}<br> after tax deductions of ${tax.toFixed(2)}`;
  $('#resultModal').modal('show');
  }
  else if( totalIncome >= 0 && totalIncome <= 800000){
    tax = 0;
    let finalincome = totalIncome - tax;
  // Display result
  const result = document.getElementById('result');
  result.innerHTML = `Your overall income will be<br> ${finalincome.toFixed(2)}<br> No tax deductions`;
  $('#resultModal').modal('show');
  } 
  else{
    let finalincome = totalIncome - tax;
  // Display result
  const result = document.getElementById('result');
  result.innerHTML = `Your overall income will be<br>lesser than expenditure`;
  $('#resultModal').modal('show');
  }
});

$('.close').on('click', function() {
  $('#resultModal').modal('hide');
});

function addErrorIcon(inputId, errorMessage) {
  const inputField = document.getElementById(inputId);
  const icon = document.createElement('div');
  icon.classList.add('input-group-append', 'error-icon');
  icon.innerHTML = `
    <span class="input-group-text bg-danger text-white rounded-end error-icon">
      <i class="bi bi-exclamation-circle" data-toggle="tooltip" title="${errorMessage}" data-placement="top"></i>
    </span>
  `;
  inputField.insertAdjacentElement('afterend', icon);
  $(icon).find('[data-toggle="tooltip"]').tooltip();
}
// function addageErrorIcon(inputId, errorMessage) {
//   const inputField = document.getElementById(inputId);
//   const icon = document.createElement('select');
//   icon.classList.add('input-group-append', 'error-icon');
//   icon.innerHTML = `
//     <span class="input-group-text bg-danger text-white rounded-end">
//       <i class="bi bi-exclamation-circle" data-toggle="tooltip" title="${errorMessage}" data-placement="top"></i>
//     </span>
//   `;
//   inputField.insertAdjacentElement('afterend', icon);
//   $(icon).find('[data-toggle="tooltip"]').tooltip();
// }
