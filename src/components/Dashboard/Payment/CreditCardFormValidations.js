const validations = {
  cvc: {
    custom: {
      isValid: (value) => /^[0-9]{3}$/.test(value),
      message: 'Digite um cvc no fomato 999',
    },
  },
  expiry: {
    custom: {
      isValid: (value) => /^[0-9]{2}\/[0-9]{2}$/.test(value),
      message: 'Digite uma data no formato MM/AA',
    },
  },
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome',
    },
  },
  number: {
    custom: {
      isValid: (value) => !isNaN(parseInt(value)) && value?.length > 10,
      message: 'Digite um número válido',
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
