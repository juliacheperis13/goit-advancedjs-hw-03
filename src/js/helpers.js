const classes = {
  hidden: 'hidden',
};

const toggleVisibility = (element, isHidden) => {
  if (isHidden) {
    element.classList.add(classes.hidden);
  } else {
    element.classList.remove(classes.hidden);
  }
};

export { toggleVisibility };
