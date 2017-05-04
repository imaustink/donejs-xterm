import QUnit from 'steal-qunit';
import { Xterm } from './donejs-xterm';

QUnit.module('donejs-xterm');

QUnit.test('Has message', function(){
  var vm = new Xterm();
  
  QUnit.equal(typeof vm.api, 'object');
  QUnit.equal(typeof vm.api.write, 'function');
});