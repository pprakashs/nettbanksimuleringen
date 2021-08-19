function removeTooltipFormDom() {
  document.querySelectorAll('.tooltip-popup').forEach((tooltip) => {
    tooltip.remove();
  });
}
function setTooltipFalse(selector) {
  document.querySelectorAll('.tooltip').forEach((tooltip) => {
    tooltip.setAttribute('data-tooltip-clicked', false);
  });
}
function removeTooltip() {
  document.body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('tooltip')) {
      removeTooltipFormDom();
      setTooltipFalse();
    }
  });
}

const tooltip = () => {
  let i = 0;
  let closeTimeout;
  document.querySelectorAll('.tooltip').forEach((tooltip) => {
    tooltip.setAttribute('data-tooltip-clicked', false);
    tooltip.addEventListener('click', (e) => {
      i++;
      const current = e.currentTarget;
      const { x, y } = e;
      if (i > 0) {
        clearTimeout(closeTimeout);
      }
      closeTimeout = setTimeout(() => {
        removeTooltipFormDom();
        current.setAttribute('data-tooltip-clicked', false);
      }, 2500);

      removeTooltipFormDom();

      let width = 180;
      let height = 100;
      let boxSize = 360;

      let left = x - width;

      if (document.body.clientWidth < 1190) {
        width = 80;
        height = 70;
        boxSize = 224;
      }

      let topOffset = y - height;
      const totalSize = x + boxSize;

      if (totalSize > document.body.clientWidth) {
        left = document.body.clientWidth - boxSize - 10;
      }
      if (x < boxSize) {
        left = x - 40;
      }

      if (y < 100) topOffset = y * 1.5;

      const clickedState = JSON.parse(current.getAttribute('data-tooltip-clicked'));
      const bg = current.getAttribute('data-tooltip-bg') ? current.getAttribute('data-tooltip-bg') : '#FFD36C';

      const markup = `<div class="${bg} lg:p-4 p-2 border shadow-md border-primary text-center lg:text-xl text-sm lg:w-[360px] w-56 tooltip-popup absolute transition duration-300 opacity-0" style="left: ${left}px; top: ${topOffset}px">${current.getAttribute(
        'data-tooltip-text'
      )}</div>`;

      if (!clickedState) {
        document.body.insertAdjacentHTML('beforeend', markup);
        setTimeout(() => {
          document.querySelector('.tooltip-popup').classList.remove('opacity-0');
        }, 50);
        current.setAttribute('data-tooltip-clicked', true);
      } else {
        setTooltipFalse();
      }
    });
  });
  removeTooltip();
};

export default tooltip;
