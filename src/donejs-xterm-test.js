import QUnit from 'steal-qunit';
import { ViewModel } from './donejs-xterm';

QUnit.module('donejs-xterm');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  
  QUnit.equal(typeof vm.console, 'object');
  QUnit.equal(typeof vm.console.write, 'function');
});