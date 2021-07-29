export default {
  data () {
    return {
      validationErrors: {
        inn: {},
        snils: {},
        ogrn: {},
        ogrnip: {}
      }
    }
  },
  methods: {
    resetValidation () {
      Object.assign(this.validationErrors, {
        inn: {},
        snils: {}
      })
    },
    validateInn (inn) {
      let result = false
      if (typeof inn === 'number') {
        inn = inn.toString()
      } else if (typeof inn !== 'string') {
        inn = ''
      }
      if (!inn.length) {
        this.validationErrors.inn = {
          code: 1,
          message: 'ИНН пуст'
        }
      } else if (/[^0-9]/.test(inn)) {
        this.validationErrors.inn = {
          code: 2,
          message: 'ИНН может состоять только из цифр'
        }
      } else if (![10, 12].includes(inn.length)) {
        this.validationErrors.inn = {
          code: 3,
          message: 'ИНН может состоять только из 10 или 12 цифр'
        }
      } else {
        const checkDigit = function (inn, coefficients) {
          let n = 0
          for (const i in coefficients) {
            n += coefficients[i] * inn[i]
          }
          return parseInt(n % 11 % 10)
        }
        if (inn.length === 10) {
          const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8])
          if (n10 === parseInt(inn[9])) {
            result = true
          }
        }
        if (inn.length === 12) {
          const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
          const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
          if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
            result = true
          }
        }
        if (!result) {
          this.validationErrors.inn = {
            code: 4,
            message: 'Неправильное контрольное число'
          }
        }
      }
      return result
    },
    validateSnils (snils) {
      let result = false
      if (typeof snils === 'number') {
        snils = snils.toString()
      } else if (typeof snils !== 'string') {
        snils = ''
      }
      if (!snils.length) {
        this.validationErrors.snils = {
          code: 1,
          message: 'СНИЛС пуст'
        }
      } else if (/[^0-9]/.test(snils)) {
        this.validationErrors.snils = {
          code: 2,
          message: 'СНИЛС может состоять только из цифр'
        }
      } else if (snils.length !== 11) {
        this.validationErrors.snils = {
          code: 3,
          message: 'СНИЛС может состоять только из 11 цифр'
        }
      } else {
        let sum = 0
        for (let i = 0; i < 9; i++) {
          sum += parseInt(snils[i]) * (9 - i)
        }
        let checkDigit = 0
        if (sum < 100) {
          checkDigit = sum
        } else if (sum > 101) {
          checkDigit = parseInt(sum % 101)
          if (checkDigit === 100) {
            checkDigit = 0
          }
        }
        if (checkDigit === parseInt(snils.slice(-2))) {
          result = true
        } else {
          this.validationErrors.snils = {
            code: 4,
            message: 'Неправильное контрольное число'
          }
        }
      }
      return result
    },
    validateOgrn (ogrn) {
      let result = false
      if (typeof ogrn === 'number') {
        ogrn = ogrn.toString()
      } else if (typeof ogrn !== 'string') {
        ogrn = ''
      }
      if (!ogrn.length) {
        this.validationErrors.ogrn = {
          code: 1,
          message: 'ОГРН пуст'
        }
      } else if (/[^0-9]/.test(ogrn)) {
        this.validationErrors.ogrn = {
          code: 2,
          message: 'ОГРН может состоять только из цифр'
        }
      } else if (ogrn.length !== 13) {
        this.validationErrors.ogrn = {
          code: 3,
          message: 'ОГРН может состоять только из 13 цифр'
        }
      } else {
        const n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1))
        if (n13 === parseInt(ogrn[12])) {
          result = true
        } else {
          this.validationErrors.ogrn = {
            code: 4,
            message: 'Неправильное контрольное число'
          }
        }
      }
      return result
    },
    validateOgrnip (ogrnip) {
      let result = false
      if (typeof ogrnip === 'number') {
        ogrnip = ogrnip.toString()
      } else if (typeof ogrnip !== 'string') {
        ogrnip = ''
      }
      if (!ogrnip.length) {
        this.validationErrors.ogrnip = {
          code: 1,
          message: 'ОГРНИП пуст'
        }
      } else if (/[^0-9]/.test(ogrnip)) {
        this.validationErrors.ogrnip = {
          code: 2,
          message: 'ОГРНИП может состоять только из цифр'
        }
      } else if (ogrnip.length !== 15) {
        this.validationErrors.ogrnip = {
          code: 3,
          message: 'ОГРНИП может состоять только из 15 цифр'
        }
      } else {
        const n15 = parseInt((parseInt(ogrnip.slice(0, -1)) % 13).toString().slice(-1))
        if (n15 === parseInt(ogrnip[14])) {
          result = true
        } else {
          this.validationErrors.ogrnip = {
            code: 4,
            message: 'Неправильное контрольное число'
          }
        }
      }
      return result
    }
  }
}
