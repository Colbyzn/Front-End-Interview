const tree = {
  value: 'C',
  left: {
    value: 'B',
    left: {
      value: 'A',
      left: null,
      right: null
    },
    right: null
  },
  right: {
    value: 'D',
    left: {
      value: 'E',
      left: null,
      right: {
        value: 'G',
        left: {
          value: 'F',
          left: null,
          right: null
        },
        right: {
          value: 'H',
          left: null,
          right: null
        }
      }
    },
    right: null
  }
};

module.exports = tree
