const validations = {
  ticketId: {
    custom: {
      isValid: (value) => !isNaN(value),
      message: 'Dever ser um número',
    },
  },
  hasHotel: {
    custom: {
      isValid: (value) => value === true || value === false,
      message: 'Dever ser um booleano',
    },
  },
};

export default validations;
