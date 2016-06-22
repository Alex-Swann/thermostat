(function () {
   'use strict';
}());


describe('Thermostat', function(){
  var thermo;

  beforeEach(function(){
    thermo = new Thermostat();
  });

  describe('#temp', function(){
    it('shows temperature', function(){
      expect(thermo.temp()).toEqual(thermo.defaultTemp());
    });
  });

  describe('#increase', function(){
    it('increases temp by 1 degree', function(){
      expect(thermo.increase()).toEqual(thermo.defaultTemp()+1);
    });
  });

  describe('#decrease', function(){
    it('decreases temp by 1 degree', function(){
      expect(thermo.decrease()).toEqual(thermo.defaultTemp()-1);
    });

    it('doesn\'t go below 10', function(){
      for (var i = 0; i < 40 ; i++) {
        thermo.decrease();
      }
      expect(thermo.temp()).toEqual(10);
    });
  });

  describe('#reset', function(){
    it('reset temp to default', function(){
      expect(thermo.reset()).toEqual(thermo.defaultTemp());
    });
  });

  describe('#powerSave', function(){
    it('is on by default, max temperature is 25', function(){

      thermo.powerSave();
      thermo.powerSave();

      for (var i = 0; i < 20 ; i++) {
        thermo.increase();
      }

      expect(thermo.temp()).toEqual(25);
    });

    it('is off, max temperature is 32', function(){

      thermo.powerSave();

      for (var i = 0; i < 20 ; i++) {
        thermo.increase();
      }

      expect(thermo.temp()).toEqual(32);
    });
  });

  describe('#powerSaveStatus', function(){
    it('power save status on', function(){
      expect(thermo.powerSaveStatus()).toEqual('On');
    });

    it('power save status off', function(){
      thermo.powerSave();
      expect(thermo.powerSaveStatus()).toEqual('Off');
    });
  });

  describe('#energyUsage', function(){
    it('high usage', function(){
      thermo.powerSave();
      for (var i = 0; i < 20 ; i++) {
        thermo.increase();
      }
      expect(thermo.energyUsage()).toEqual('high-usage');
    });

    it('medium usage', function(){
      thermo.powerSave();
      expect(thermo.energyUsage()).toEqual('medium-usage');
    });

    it('low usage', function(){
      thermo.powerSave();
      for (var i = 0; i < 3 ; i++) {
        thermo.decrease();
      }
      expect(thermo.energyUsage()).toEqual('low-usage');
    });
  });

});
