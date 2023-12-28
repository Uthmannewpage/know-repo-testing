
// eslint-disable-next-line max-len
function updateContentBlock(mediaType, mediaSrc, textContent, textPosition, mediaContainer, textContainer) {
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
  }

  // Set the text content
  textContainer.textContent = textContent;

  // Set the text position
  if (textPosition === 'left') {
    textContainer.style.order = -1;
  } else {
    textContainer.style.order = 1;
  }
  textContainer.style.width = '50%';
}

export default function decorate(block) {
  const metadata = block.closest('.section').dataset;
  const {
    type, imagepath, text, position,
  } = metadata;

  const cols = [...block.firstElementChild.children];
  block.firstElementChild.classList.add(`columns-${cols.length}-cols`);
  const contentMedia = cols[0];
  const contentText = cols[1];
  updateContentBlock(
    type,
    imagepath,
    text,
    position,
    contentMedia,
    contentText,
  );
}
