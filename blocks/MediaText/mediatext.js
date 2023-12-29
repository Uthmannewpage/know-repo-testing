// eslint-disable-next-line max-len
function updateContentBlock(
  mediaType,
  mediaSrc,
  textContent,
  textPosition,
  mediaContainer,
  textContainer,
  heading,
  buttoncolor,
  buttontext,
  headingcolor,
) {
  // Clear existing content
  mediaContainer.innerHTML = '';
  textContainer.innerHTML = '';
  // Set the media content
  if (mediaType === 'image') {
    const image = document.createElement('img');
    image.src = mediaSrc;
    image.style.width = '50%';
    mediaContainer.appendChild(image);
  } else if (mediaType === 'video') {
    const video = document.createElement('video');
    video.src = mediaSrc;
    video.controls = true;
    video.style.width = '50%';
    mediaContainer.appendChild(video);
    mediaContainer.classList.add('ratio', 'ratio-16x9');
  }

  // Set the text content
  textContainer.innerHTML = `<p>${textContent}</p>`;

  // Set the text position
  if (textPosition === 'left') {
    textContainer.style.order = -1;
  } else {
    textContainer.style.order = 1;
  }
  textContainer.style.width = '50%';
  if (heading) {
    const h1 = `<h2 style='color: ${headingcolor}'>${heading}</h2>`;
    textContainer.innerHTML = h1 + textContainer.innerHTML;
  }
  if (buttontext && buttontext !== '') {
    const btn = `<button class='btn' style='background-color: ${buttoncolor}; padding: 1rem 0.5rem;'> 
    ${buttontext}</button>`;
    textContainer.innerHTML += btn;
  }

  textContainer.classList.add('d-flex', 'flex-column', 'p-1', 'align-items-center');
}

export default function decorate(block) {
  const metadata = block.closest('.section').dataset;
  const {
    type,
    imagepath,
    text,
    position,
    buttoncolor,
    buttontext,
    headingcolor,
    heading,
  } = metadata;

  const cols = [...block.firstElementChild.children];
  block.firstElementChild.classList.add(`columns-media-${cols.length}-cols`);
  const contentMedia = cols[0];
  const contentText = cols[1];
  updateContentBlock(
    type,
    imagepath,
    text,
    position,
    contentMedia,
    contentText,
    heading,
    buttoncolor,
    buttontext,
    headingcolor,
  );
}
