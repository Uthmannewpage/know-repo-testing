// generate PDF
function GeneratePDF() {
  /* eslint-disable new-cap */
  // eslint-disable-next-line no-undef
  const pdf = new jsPDF();
  /* eslint-enable new-cap */
  const ageText = document.querySelector('#step4 h4').innerText;
  const healthIssuesText = document.querySelector('#step4 p:nth-of-type(1)').innerText;
  const takeMedicineText = document.querySelector('#step4 p:nth-of-type(2)').innerText;
  const isSmokerText = document.querySelector('#step4 p:nth-of-type(3)').innerText;
  const summeryText = document.querySelector('#step4 table').innerText;
  const talk2DoctorText = document.querySelector('#step4 p:nth-of-type(6)').innerText;

  pdf.setTextColor(128, 0, 128); // Purple color
  pdf.setFontSize(20); // Font size for the title

  // Add empty lines before the title
  pdf.setTextColor(128, 0, 128); // Purple color
  pdf.setFontSize(15); // Font size for the title

  let yCoordinate = 10; // Initial Y-coordinate

  // Add empty lines before the title
  pdf.text('', 10, yCoordinate);
  pdf.text('', 10, yCoordinate + 10);
  pdf.text('', 10, yCoordinate + 20);

  pdf.text('Your risk assessment results for pneumococcal pneumonia.', 10, yCoordinate + 30);

  // Reset text color and font size
  pdf.setTextColor(0); // Reset to black
  pdf.setFontSize(12); // Reset to default font size

  pdf.text(ageText, 10, yCoordinate + 50);
  pdf.text(healthIssuesText, 10, yCoordinate + 60);
  pdf.text(takeMedicineText, 10, yCoordinate + 70);
  pdf.text(isSmokerText, 10, yCoordinate + 80);

  // Draw a line under 'I am a smoker.'
  yCoordinate += 85; // Update Y-coordinate
  pdf.line(10, yCoordinate, 100, yCoordinate);
  yCoordinate += 10; // Update Y-coordinate

  pdf.text(summeryText, 10, yCoordinate + 5, { maxWidth: 180 });

  // Draw a line before the specified text
  yCoordinate += 31; // Update Y-coordinate
  pdf.line(10, yCoordinate, 200, yCoordinate);
  yCoordinate += 10; // Update Y-coordinate

  pdf.text(talk2DoctorText, 10, yCoordinate + 5, { maxWidth: 180 });

  yCoordinate += 50; // Update Y-coordinate

  pdf.setTextColor(128, 128, 128);
  pdf.setFontSize(10);

  // Display disclaimer information
  pdf.text('The health information contained herein is provided for educational purposes only and is not intended to replace discussions with a healthcare provider. All decisions regarding patient care must be made with a healthcare provider, considering the unique characteristics of the patient.', 10, yCoordinate + 5, { maxWidth: 180 });

  // Display copyright information
  pdf.text('PP-PNR-USA-1382-03 © 2023 Pfizer Inc. All rights reserved. July 2023.', 10, yCoordinate + 20, { maxWidth: 180 });

  // Save the PDF
  pdf.save('generated.pdf');
}

// adding script for generating PDF into the head of the page
function loadJsPDFScript() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js';
  script.defer = true;

  document.head.appendChild(script);

  script.onload = () => {
    window.jsPDF = window.jspdf.jsPDF;

    GeneratePDF();
  };
}

export default function decorate(block) {
  const stepsItems = [...block.children];
  const [step0, step1, step2, step3, step4] = stepsItems;

  // function to create radio/checkbox input
  const creteInput = (selector, type, name) => {
    const inputVluesBox = selector;
    const inputVlues = inputVluesBox.getElementsByTagName('li');

    Array.from(inputVlues).forEach((cond, i) => {
      const createInput = document.createElement('input');
      createInput.type = type;
      createInput.name = name;
      createInput.value = inputVlues[i].textContent;
      createInput.id = `input-${inputVlues[i].textContent.replace(/ /g, '-')}`;

      const label = document.createElement('label');
      label.textContent = inputVlues[i].textContent;
      label.setAttribute('for', `input-${inputVlues[i].textContent.replace(/ /g, '-')}`);
      label.appendChild(createInput);

      inputVluesBox.insertBefore(label, inputVlues[i]);
      inputVlues[i].style.display = 'none';
    });
  };

  // get texts to be displayed into step 3 & step 4
  const hasAnyConditionYes = step3.querySelector('p strong').innerText.split('/')[0];
  const hasAnyConditionNo = step3.querySelector('p strong').innerText.split('/')[1];

  const takesAnymMdicineYes = step3.querySelector('p:nth-of-type(2) strong').innerText.split('/')[0];
  const takesAnymMdicineNo = step3.querySelector('p:nth-of-type(2) strong').innerText.split('/')[1];

  const isSmokingYes = step4.querySelector('p:nth-of-type(3) strong').innerText.split('/')[0];
  const isSmokingNo = step4.querySelector('p:nth-of-type(3) strong').innerText.split('/')[1];

  const ageIntervaltext = step4.querySelectorAll('table td');

  // hide all text for buttons
  let step1buttonText;
  let step2buttonText;
  let step3buttonText;
  const steps2hideButtonText = [step1, step2, step3];
  steps2hideButtonText.forEach((step) => {
    const stepbuttonText = step.querySelector('p:last-of-type');
    stepbuttonText.style.display = 'none';

    if (step === step1) {
      step1buttonText = stepbuttonText;
    } else if (step === step2) {
      step2buttonText = stepbuttonText;
    } else if (step === step3) {
      step3buttonText = stepbuttonText;
    }
  });

  /* step 1 */
  // create input radio for age interval
  creteInput(step1.querySelector('ul'), 'radio', 'age_interval');

  // template for Step 1
  block.innerHTML = `
    <div id="step1" class="container-fluid step-box" style="display: block;">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-xs-11 col-sm-4 content-left ps-4 d-flex justify-content-center align-items-center">
          <div class="col-xs-11 col-sm-9">
            ${step0.innerHTML}
            </div>
        </div>

        <div class="col-xs-11 col-sm-8 content-right">
          <div class="steps-bullets d-flex justify-content-between align-items-center">
            <div class="active"><span></span></div>
            <div><span></span></div>
            <div><span></span></div>
            <div><span></span></div>
          </div>

          <div class="main-content step1">
            ${step1.innerHTML}
            <div class="d-flex justify-content-center align-items-center bottom-buttons">
              <button class="change-step append-right-arrow" data-step="2" type="button" disabled>${step1buttonText.innerText}</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  /* end step 1 */

  /* step 2 */
  // create input checbox for health Conditions
  creteInput(step2.querySelector('ul:first-of-type'), 'checkbox', 'health_conds');

  // create input checbox for health Conditions
  creteInput(step2.querySelector('ul:nth-of-type(2)'), 'checkbox', 'no_health_conds');

  // create input radio for medicine suppresses
  creteInput(step2.querySelector('ul:nth-of-type(3)'), 'radio', 'take_medicine');

  // template for Step 2
  block.innerHTML += `
    <div id="step2" class="container-fluid step-box">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12">
          <div class="steps-bullets d-flex justify-content-between align-items-center">
            <div class="inactive"><span></span></div>
            <div class="active"><span></span></div>
            <div><span></span></div>
            <div><span></span></div>
          </div>

          <div class="main-content">
            ${step2.innerHTML}
            <div class="d-flex justify-content-center align-items-center bottom-buttons">
              <button class="change-step append-left-arrow back-btn" data-step="1" type="button">${step2buttonText.innerText.split('|')[0].trim()}</button>
              <button class="change-step append-right-arrow" data-step="3" type="button" disabled>${step2buttonText.innerText.split('|')[1].trim()}</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  /* end step 2 */

  /* step 3 */
  // create input radio for smoker
  creteInput(step3.querySelector('ul'), 'radio', 'a_smoker');

  // template for Step 3
  block.innerHTML += `
    <div id="step3" class="container-fluid step-box">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12">
          <div class="steps-bullets d-flex justify-content-between align-items-center">
            <div class="inactive"><span></span></div>
            <div class="inactive"><span></span></div>
            <div class="active"><span></span></div>
            <div><span></span></div>
          </div>

          <div class="main-content">
            ${step3.innerHTML}
            <div class="d-flex justify-content-center align-items-center bottom-buttons">
              <button class="change-step append-left-arrow back-btn" data-step="2" type="button">${step3buttonText.innerText.split('|')[0].trim()}</button>
              <button class="change-step append-right-arrow" data-step="4" type="button disabled">${step3buttonText.innerText.split('|')[1].trim()}</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  /* end step 3 */

  /* step 4 */
  // get info from the table 2 that contains the text to create the form
  const formTable = step4.querySelector('table:nth-of-type(2)');
  const [label, placeholder, submit] = formTable.innerText.split('|');

  // create email input
  const emailFormBox = document.createElement('div');
  emailFormBox.id = 'email-form-box';
  emailFormBox.innerHTML = `<label for="inputEmail">
    <span>${label.trim()}</span>
    <input id="inputEmail" name="email" type="email" class="form-control" placeholder="${placeholder.trim()}">
  </label>
  <button type="button" class="append-right-arrow">${submit.trim()}</button>
  `;
  formTable.appendChild(emailFormBox);

  // create pdf button
  const PDFbuttonTable = step4.querySelector('table:last-of-type');
  const PDFbuttonText = PDFbuttonTable.innerText.trim();
  const PDFbuttonBox = document.createElement('div');
  PDFbuttonBox.innerHTML = `<button id="pdf-button">${PDFbuttonText}</button>`;
  PDFbuttonTable.appendChild(PDFbuttonBox);

  // template for Step 4
  block.innerHTML += `
    <div id="step4" class="container-fluid step-box">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12">
          <div class="steps-bullets d-flex justify-content-between align-items-center">
            <div class="inactive"><span></span></div>
            <div class="inactive"><span></span></div>
            <div class="inactive"><span></span></div>
            <div class="active"><span></span></div>
          </div>

          <div class="main-content">
            ${step4.innerHTML}
          </div>
        </div>
      </div>
    </div>`;
  /* end step 4 */

  block.querySelector('#pdf-button').addEventListener('click', loadJsPDFScript);

  /* STEP 1: condition for enabling the button */
  block.querySelectorAll('input[name="age_interval"]').forEach((radioButton) => {
    radioButton.addEventListener('click', (e) => {
      const selectedGender = e.target.value;
      block.querySelectorAll('h4').forEach((titleh4) => {
        titleh4.innerText = selectedGender;
      });
      block.querySelector('#step1 button').disabled = false;
    });
  });
  /* end STEP 1: condition for enabling the button */

  /* STEP 2: conditions for enabling the button */
  /* for this step I need at least 2 conditions to be met for the button to be available */
  let countCdt = 0;
  let healthCdtCount = 0;

  const updateButtonState = () => {
    if (countCdt === 2 || (countCdt === 1 && healthCdtCount > 0)) {
      block.querySelector('#step2 button:nth-of-type(2)').disabled = false;
    } else {
      block.querySelector('#step2 button:nth-of-type(2)').disabled = true;
    }
  };

  // when "I do not have any conditons" is checked - all the above checked conditions will be unchecked
  block.querySelector('input[name="no_health_conds"]').addEventListener('click', (e) => {
    if (e.target.checked) {
      block.querySelectorAll('input[name="health_conds"]').forEach((inputChecked) => {
        inputChecked.checked = false;
      });
      countCdt = 1;
    } else {
      countCdt = 0;
    }

    updateButtonState();
  });

  // when some conditions will be checked - "I do not have any conditons" will be unchecked
  block.querySelectorAll('input[name="health_conds"]').forEach((inputChecked) => {
    inputChecked.addEventListener('click', () => {
      healthCdtCount = block.querySelectorAll('input[name="health_conds"]:checked').length;

      if (healthCdtCount) {
        block.querySelector('input[name="no_health_conds"]').checked = false;
      }
      updateButtonState();
    });
  });

  // check if the last input is checked for the button to be enabled
  block.querySelector('input[name="take_medicine"]').addEventListener('click', (radioChecked) => {
    if (radioChecked.checked) {
      block.querySelectorAll('input[name="health_conds"]').forEach((inputChecked) => {
        inputChecked.checked = false;
      });
    }
    countCdt = 2;
    updateButtonState();
  });
  /* end STEP 1: conditions for enabling the button */

  /* add eventlistener on buttons: change steps */
  block.querySelectorAll('button.change-step').forEach((changeStepButton) => {
    changeStepButton.addEventListener('click', () => {
      const { step } = changeStepButton.dataset;
      const stepSelector = `#step${step}`;

      // Hide all step boxes
      block.querySelectorAll('.step-box').forEach((el) => {
        el.style.display = 'none';
      });

      if (step === '3' || step === '4') {
        // verify what is checked to be used on step 3 and 4 for displaying specific text
        const noHealthCondition = block.querySelector('input[name="no_health_conds"]').checked;
        const isTakingMedicine = Array.from(block.querySelectorAll('input[name="take_medicine"]')).some((e) => e.checked && e.value === 'Yes');

        const hasAnyConditionBox = block.querySelector(`${stepSelector} p strong`);
        if (noHealthCondition) {
          hasAnyConditionBox.innerText = hasAnyConditionNo;
        } else {
          hasAnyConditionBox.innerText = hasAnyConditionYes;
          if (block.querySelector('input[name="health_conds"]')) {
            block.querySelectorAll('input[name="health_conds"]').forEach((checkedItem) => {
              if (checkedItem.checked) {
                hasAnyConditionBox.innerText += ` ${checkedItem.value},`;
              }
            });
          }

          const takesAnyMedicineBox = block.querySelector(`${stepSelector} p:nth-of-type(2) strong`);
          takesAnyMedicineBox.innerText = takesAnymMdicineNo;
          block.querySelector('#step4 p:nth-of-type(4)').style.display = 'none';
          if (isTakingMedicine) {
            takesAnyMedicineBox.innerText = takesAnymMdicineYes;
            block.querySelector('#step4 p:nth-of-type(4)').style.display = 'block';
          }
        }
      }

      if (step === '4') {
        // verify what is checked to be used on step 4 for displaying specific text
        const isSmoking = Array.from(block.querySelectorAll('input[name="a_smoker"]')).some((e) => e.checked && e.value === 'Yes');

        const isSmokingBox = block.querySelector('#step4 p:nth-of-type(3) strong');
        isSmokingBox.innerText = isSmokingNo;
        block.querySelector('#step4 p:nth-of-type(5)').style.display = 'none';
        if (isSmoking) {
          isSmokingBox.innerText = isSmokingYes;
          block.querySelector('#step4 p:nth-of-type(5)').style.display = 'block';
        }

        let selectedAgeIntervalIndex = -1;
        block.querySelectorAll('#step1 ul input').forEach((e, index) => {
          if (e.checked) {
            selectedAgeIntervalIndex = index;
          }
        });

        const isAgesConditionBox = block.querySelector('#step4 table');
        if (ageIntervaltext[selectedAgeIntervalIndex]) {
          isAgesConditionBox.innerHTML = `<strong>${ageIntervaltext[selectedAgeIntervalIndex].innerText}</strong>`;
        }
      }

      // Show the selected step box
      block.querySelector(`#step${step}`).style.display = 'block';
    });
  });
}
