import $ from 'jquery';

class ThemeFunctions {

  // JQUERY MASK PLUGIN
  static jQueryMaskPlugin() {
    // Credit card config
    let creditCardNumberMaskBehavior = function(val) {
      return val.replace(/\D/g, '').length === 16 ? '0000 0000 0000 0000' : '0000 000000 000009';
    };
    let creditCardNumberMaskOptions = {
      onKeyPress: function(val, e, field, options) {
        field.mask(creditCardNumberMaskBehavior.apply({}, arguments), options);
      }
    };

    // Telephone config
    let telephoneMaskBehavior = function (val) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000 0000' : '(00) 0000 00009';
    };
    let telephoneMaskOptions = {
      onKeyPress: function(val, e, field, options) {
        field.mask(telephoneMaskBehavior.apply({}, arguments), options);
      }
    };

    // Masks
    $('.credit-card-number-mask').mask(creditCardNumberMaskBehavior, creditCardNumberMaskOptions);
    $('.credit-card-month-mask').mask('00');
    $('.credit-card-year-mask').mask('0000');
    $('.credit-card-cvc-mask').mask('0000');
    $('.date-mask').mask('00/00/0000');
    $('.telephone-mask').mask(telephoneMaskBehavior, telephoneMaskOptions);
  }


  // INIT
  static init() {
    this.jQueryMaskPlugin();
  }

};

export default ThemeFunctions;
