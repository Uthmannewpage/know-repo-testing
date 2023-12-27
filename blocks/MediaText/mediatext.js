function updateContentBlock(mediaType, mediaSrc, textContent, textPosition) {
  const mediaContainer = document.querySelector('.content-media');
  const textContainer = document.querySelector('.content-text');

  // Clear existing content
  mediaContainer.innerHTML = '';
  textContainer.innerHTML = '';

  // Set the media content
  if (mediaType === 'image') {
    const image = document.createElement('img');
    image.src = mediaSrc;
    mediaContainer.appendChild(image);
  } else if (mediaType === 'video') {
    const video = document.createElement('video');
    video.src = mediaSrc;
    video.controls = true;
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
}

// Example usage:

export default function decorate(block) {
  const {
    type, imagePath, text, position,
  } = block.dataset;
  updateContentBlock(
    type,
    imagePath,
    text,
    position,
  );
}
