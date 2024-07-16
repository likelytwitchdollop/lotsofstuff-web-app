export const rotate180deg = {
  start: { rotate: 0, transition: { duration: 0.5 } },
  rotate: { rotate: 45, transition: { duration: 0.5 } },
}

export const accordion = {
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      opacity: { delay: 0.1, duration: 0.2 },
      height: { duration: 0.6 },
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
  },
}
