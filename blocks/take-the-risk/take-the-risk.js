export default function decorate(block) {
  const stepsItems = [...block.children];
  const [step0, step1] = stepsItems;

  /* step 1 */
  const ageIntervalsBox = block.querySelector('ul');
  const ageIntervals = ageIntervalsBox.getElementsByTagName('li');

  Array.from(ageIntervals).forEach((interval, i) => {
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'itemRadio';

    const label = document.createElement('label');
    label.textContent = ageIntervals[i].textContent;
    label.appendChild(radioInput);

    ageIntervalsBox.insertBefore(label, ageIntervals[i]);
    ageIntervals[i].style.display = 'none';
  });

  /* end step 1 */
  block.innerHTML = `
    <div class="container-fluid">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-xs-11 col-sm-4 content-left ps-4 d-flex justify-content-center align-items-center">
          <div class="col-xs-11 col-sm-9">
            ${step0.innerHTML}
            </div>
          </div>

          <div class="col-xs-11 col-sm-8 content-right img-box">
            <div class="steps-bullets d-flex justify-content-between align-items-center">
              <div class="active"><span></span></div>
              <div><span></span></div>
              <div><span></span></div>
              <div><span></span></div>
            </div>
            <div class="main-content">
              ${step1.innerHTML}
            </div>
          </div>
        </div>
    </div>`;
}
